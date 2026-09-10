import React, { useState, useEffect, useRef, useCallback } from 'react';
import { RAINY_NIGHT_CAFE_MANIFEST } from '../diorama/content/rainyNightCafeManifest';
import { GLASSHOUSE_BOTANIST_MANIFEST } from '../diorama/content/glasshouseBotanistManifest';
import { PlacedSticker, Creation } from '../diorama/types/manifest';
import { DioramaCanvas } from '../diorama/components/Canvas/DioramaCanvas';
import { TopToolbar } from '../diorama/components/Toolbar/TopToolbar';
import { StickerTray } from '../diorama/components/Tray/StickerTray';
import { 
  normalizeZIndexes, 
  bringForward, 
  sendBackward, 
  bringToFront, 
  sendToBack 
} from '../diorama/domain/layers';
import { 
  HistoryState, 
  createHistory, 
  recordAction, 
  undo, 
  redo 
} from '../diorama/domain/history';
import { 
  saveCreationToStorage, 
  loadCreationFromStorage, 
  clearSavedCreationFromStorage 
} from '../diorama/services/autosave';
import { audioManager } from '../diorama/services/audioManager';
import { exportDioramaToPNG, downloadDataUrl } from '../diorama/domain/export';

export const StickerbookPage: React.FC = () => {
  const [currentThemeId, setCurrentThemeId] = useState<'glasshouse-botanist' | 'rainy-night-cafe'>('glasshouse-botanist');
  const manifest = currentThemeId === 'glasshouse-botanist' ? GLASSHOUSE_BOTANIST_MANIFEST : RAINY_NIGHT_CAFE_MANIFEST;

  const [stickers, setStickers] = useState<PlacedSticker[]>(() => {
    const loaded = loadCreationFromStorage(GLASSHOUSE_BOTANIST_MANIFEST.setId);
    return loaded?.stickers || GLASSHOUSE_BOTANIST_MANIFEST.defaultCreation.stickers;
  });
  const [lampOn, setLampOn] = useState<boolean>(() => {
    const loaded = loadCreationFromStorage(GLASSHOUSE_BOTANIST_MANIFEST.setId);
    return loaded?.sceneState?.lampOn ?? GLASSHOUSE_BOTANIST_MANIFEST.defaultCreation.sceneState.lampOn;
  });
  const [history, setHistory] = useState<HistoryState>(() => createHistory(stickers));

  const [selectedInstanceId, setSelectedInstanceId] = useState<string | null>(null);
  const [isViewMode, setIsViewMode] = useState<boolean>(false);
  const [isGuideEnabled, setIsGuideEnabled] = useState<boolean>(false);
  const [isTrayOpen, setIsTrayOpen] = useState<boolean>(true);

  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(0.4);
  const [isExporting, setIsExporting] = useState<boolean>(false);

  const saveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const persistCurrentCreation = useCallback(() => {
    const creationToSave: Creation = {
      schemaVersion: 1,
      creationId: `diorama-${manifest.setId}`,
      setId: manifest.setId,
      setVersion: manifest.version,
      canvasWidth: manifest.canvas.width,
      canvasHeight: manifest.canvas.height,
      name: manifest.title.ko,
      stickers,
      sceneState: { lampOn },
      updatedAt: new Date().toISOString(),
    };
    saveCreationToStorage(manifest.setId, creationToSave);
  }, [lampOn, manifest, stickers]);

  const handleSelectTheme = (themeId: string) => {
    if (themeId === currentThemeId) return;
    persistCurrentCreation();
    const nextTheme = themeId as 'glasshouse-botanist' | 'rainy-night-cafe';
    const nextManifest = nextTheme === 'glasshouse-botanist' ? GLASSHOUSE_BOTANIST_MANIFEST : RAINY_NIGHT_CAFE_MANIFEST;
    const saved = loadCreationFromStorage(nextManifest.setId);
    const nextStickers = saved?.stickers || nextManifest.defaultCreation.stickers;
    const nextLamp = saved?.sceneState?.lampOn ?? nextManifest.defaultCreation.sceneState.lampOn;

    setCurrentThemeId(nextTheme);
    setStickers(nextStickers);
    setLampOn(nextLamp);
    setSelectedInstanceId(null);
    setHistory(createHistory(nextStickers));
  };

  // 1. 자동 저장 (Debounced Autosave)
  useEffect(() => {
    if (saveTimerRef.current) clearTimeout(saveTimerRef.current);

    saveTimerRef.current = setTimeout(() => {
      persistCurrentCreation();
    }, 600);

    return () => {
      if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    };
  }, [persistCurrentCreation]);

  // 2. 잔잔한 재즈 BGM 사운드 라이프사이클 관리
  useEffect(() => {
    audioManager.setVolume(volume);
    audioManager.setMuted(isMuted);

    const startAudioOnFirstInteraction = () => {
      if (!isMuted) {
        audioManager.startJazz();
      }
      window.removeEventListener('pointerdown', startAudioOnFirstInteraction);
      window.removeEventListener('keydown', startAudioOnFirstInteraction);
    };

    window.addEventListener('pointerdown', startAudioOnFirstInteraction);
    window.addEventListener('keydown', startAudioOnFirstInteraction);

    if (!isMuted) {
      audioManager.startJazz();
    }

    return () => {
      window.removeEventListener('pointerdown', startAudioOnFirstInteraction);
      window.removeEventListener('keydown', startAudioOnFirstInteraction);
      audioManager.stopJazz();
    };
  }, [isMuted, volume]);

  // 볼륨 변경 핸들러
  const handleChangeVolume = (newVol: number) => {
    setVolume(newVol);
    audioManager.setVolume(newVol);
    if (isMuted && newVol > 0) {
      setIsMuted(false);
      audioManager.setMuted(false);
      audioManager.startJazz();
    }
  };

  // 음소거 토글
  const handleToggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    audioManager.setMuted(nextMuted);
    if (!nextMuted) {
      audioManager.startJazz();
    } else {
      audioManager.stopJazz();
    }
  };

  // 3. 실행취소 / 다시실행
  const handleUndo = useCallback(() => {
    const result = undo(history);
    if (result) {
      setHistory(result.newHistory);
      setStickers(result.stickers);
    }
  }, [history]);

  const handleRedo = useCallback(() => {
    const result = redo(history);
    if (result) {
      setHistory(result.newHistory);
      setStickers(result.stickers);
    }
  }, [history]);

  // 4. 스티커 드래그 등 연속 변형 처리 (연속 드래그는 단 1개의 History 액션으로 기록)
  const handleUpdateStickerTransform = (instanceId: string, updates: Partial<PlacedSticker>) => {
    setStickers((prev) =>
      prev.map((s) => (s.instanceId === instanceId ? { ...s, ...updates } : s))
    );
  };

  const handleCommitStickerTransform = () => {
    setHistory((prev) => recordAction(prev, stickers));
  };

  // 5. 레이어 순서 제어 (단일 정규화 알고리즘)
  const handleBringToFront = (instanceId: string) => {
    const updated = bringToFront(stickers, instanceId);
    setStickers(updated);
    setHistory((prev) => recordAction(prev, updated));
  };

  const handleBringForward = (instanceId: string) => {
    const updated = bringForward(stickers, instanceId);
    setStickers(updated);
    setHistory((prev) => recordAction(prev, updated));
  };

  const handleSendBackward = (instanceId: string) => {
    const updated = sendBackward(stickers, instanceId);
    setStickers(updated);
    setHistory((prev) => recordAction(prev, updated));
  };

  const handleSendToBack = (instanceId: string) => {
    const updated = sendToBack(stickers, instanceId);
    setStickers(updated);
    setHistory((prev) => recordAction(prev, updated));
  };

  // 6. 스티커 좌우 반전 및 잠금
  const handleFlipX = (instanceId: string) => {
    const updated = stickers.map((s) =>
      s.instanceId === instanceId ? { ...s, flipX: !s.flipX } : s
    );
    setStickers(updated);
    setHistory((prev) => recordAction(prev, updated));
  };

  const handleToggleLock = (instanceId: string) => {
    const updated = stickers.map((s) =>
      s.instanceId === instanceId ? { ...s, locked: !s.locked } : s
    );
    setStickers(updated);
    setHistory((prev) => recordAction(prev, updated));
  };

  // 7. 스티커 복제
  const handleDuplicate = (instanceId: string) => {
    const target = stickers.find((s) => s.instanceId === instanceId);
    if (!target) return;

    const newInstanceId = `sticker-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    const cloned: PlacedSticker = {
      ...target,
      instanceId: newInstanceId,
      x: Math.min(manifest.canvas.width - 60, target.x + 25),
      y: Math.min(manifest.canvas.height - 60, target.y + 25),
      zIndex: Math.max(...stickers.map((s) => s.zIndex), 0) + 10,
      locked: false,
    };

    const updated = normalizeZIndexes([...stickers, cloned]);
    setStickers(updated);
    setSelectedInstanceId(newInstanceId);
    setHistory((prev) => recordAction(prev, updated));
    audioManager.playStickerPop();
  };

  // 8. 스티커 삭제
  const handleDelete = (instanceId: string) => {
    const updated = normalizeZIndexes(stickers.filter((s) => s.instanceId !== instanceId));
    setStickers(updated);
    if (selectedInstanceId === instanceId) {
      setSelectedInstanceId(null);
    }
    setHistory((prev) => recordAction(prev, updated));
  };

  // 9. 신규 스티커 추가 (트레이 클릭 또는 드롭)
  const handleAddSticker = (assetId: string, customX?: number, customY?: number) => {
    const asset = manifest.assets.find((a) => a.assetId === assetId);
    if (!asset) return;

    const newInstanceId = `sticker-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    const newSticker: PlacedSticker = {
      instanceId: newInstanceId,
      assetId,
      x: customX ?? asset.defaultPosition?.x ?? manifest.canvas.width / 2,
      y: customY ?? asset.defaultPosition?.y ?? manifest.canvas.height / 2,
      scale: asset.defaultTransform.scale,
      rotation: asset.defaultTransform.rotation,
      flipX: asset.defaultTransform.flipX,
      zIndex: (asset.layer?.defaultZIndex ?? 20) * 10 + (stickers.length + 1),
      locked: false,
    };

    const updated = normalizeZIndexes([...stickers, newSticker]);
    setStickers(updated);
    setSelectedInstanceId(newInstanceId);
    setHistory((prev) => recordAction(prev, updated));
    audioManager.playStickerPop();
  };

  // 10. 인터랙티브 뱅커스 램프 온/오프 토글
  const handleToggleLamp = () => {
    const nextState = !lampOn;
    setLampOn(nextState);
    audioManager.playLampSwitch(nextState);
  };

  // 11. 씬 전체 초기화 (기본 세팅으로 복구)
  const handleResetScene = () => {
    if (window.confirm('디오라마를 처음 상태로 되돌리시겠습니까?')) {
      clearSavedCreationFromStorage(manifest.setId);
      const defaultStickers = manifest.defaultCreation.stickers;
      setStickers(defaultStickers);
      setLampOn(manifest.defaultCreation.sceneState.lampOn);
      setSelectedInstanceId(null);
      setHistory(createHistory(defaultStickers));
    }
  };

  // 12. 고해상도 2048x1536 PNG 내보내기
  const handleExportPNG = async () => {
    try {
      setIsExporting(true);
      const dataUrl = await exportDioramaToPNG(stickers, manifest.backgroundSrc);
      downloadDataUrl(dataUrl, `${manifest.setId}-diorama-${Date.now()}.png`);
    } catch (err) {
      console.error('Failed to export diorama PNG:', err);
      alert('이미지 생성에 실패했습니다. 다시 시도해 주세요.');
    } finally {
      setIsExporting(false);
    }
  };

  // 13. 키보드 단축키
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // 텍스트 인풋 등에서 발생한 이벤트는 스킵
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as HTMLElement).tagName)) {
        return;
      }

      if ((e.metaKey || e.ctrlKey) && !e.shiftKey && e.key.toLowerCase() === 'z') {
        e.preventDefault();
        handleUndo();
      } else if (
        ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key.toLowerCase() === 'z') ||
        ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'y')
      ) {
        e.preventDefault();
        handleRedo();
      } else if (e.key === 'Delete' || e.key === 'Backspace') {
        if (selectedInstanceId) {
          e.preventDefault();
          handleDelete(selectedInstanceId);
        }
      } else if (e.key === 'Escape') {
        setSelectedInstanceId(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleUndo, handleRedo, selectedInstanceId, stickers]);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100vw',
        height: '100vh',
        backgroundColor: '#0c0a09',
        overflow: 'hidden',
        color: '#f3f4f6',
      }}
    >
      {/* 1. 상단 글로벌 툴바 */}
      <TopToolbar
        title={manifest.title.ko}
        currentThemeId={currentThemeId}
        onSelectTheme={handleSelectTheme}
        isViewMode={isViewMode}
        isGuideEnabled={isGuideEnabled}
        canUndo={history.past.length > 0}
        canRedo={history.future.length > 0}
        isMuted={isMuted}
        volume={volume}
        isExporting={isExporting}
        onToggleViewMode={() => {
          setIsViewMode((prev) => !prev);
          setSelectedInstanceId(null);
        }}
        onToggleGuide={() => setIsGuideEnabled((prev) => !prev)}
        onUndo={handleUndo}
        onRedo={handleRedo}
        onResetScene={handleResetScene}
        onToggleMute={handleToggleMute}
        onChangeVolume={handleChangeVolume}
        onExportPNG={handleExportPNG}
      />

      {/* 2. 메인 워크스페이스: 캔버스 + 스티커 트레이 (가로 랜드스케이프 레이아웃) */}
      <div
        style={{
          display: 'flex',
          flex: 1,
          height: 'calc(100vh - 54px)',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        {/* 디오라마 4:3 논리 캔버스 */}
        <div style={{ flex: 1, height: '100%', position: 'relative' }}>
          <DioramaCanvas
            stickers={stickers}
            selectedInstanceId={selectedInstanceId}
            isViewMode={isViewMode}
            isGuideEnabled={isGuideEnabled}
            lampOn={lampOn}
            backgroundSrc={manifest.backgroundSrc}
            assets={manifest.assets}
            setId={manifest.setId}
            onSelectSticker={setSelectedInstanceId}
            onUpdateStickerTransform={handleUpdateStickerTransform}
            onCommitStickerTransform={handleCommitStickerTransform}
            onBringToFront={handleBringToFront}
            onBringForward={handleBringForward}
            onSendBackward={handleSendBackward}
            onSendToBack={handleSendToBack}
            onFlipX={handleFlipX}
            onToggleLock={handleToggleLock}
            onDuplicate={handleDuplicate}
            onDelete={handleDelete}
            onToggleLamp={handleToggleLamp}
            onDropNewSticker={(assetId, x, y) => handleAddSticker(assetId, x, y)}
          />
        </div>

        {/* 편집 모드에서만 표시되는 우측 스티커 트레이 */}
        {!isViewMode && (
          <StickerTray
            isOpen={isTrayOpen}
            assets={manifest.assets}
            onToggleOpen={() => setIsTrayOpen((prev) => !prev)}
            onAddSticker={(assetId) => handleAddSticker(assetId)}
          />
        )}
      </div>
    </div>
  );
};

export default StickerbookPage;
