import React, { useState, useEffect, useRef, useCallback } from 'react';
import { RAINY_NIGHT_CAFE_MANIFEST } from '../diorama/content/rainyNightCafeManifest';
import { GLASSHOUSE_BOTANIST_MANIFEST } from '../diorama/content/glasshouseBotanistManifest';
import { GLASSHOUSE_SHELF_PILOT } from '../diorama/content/glasshouseShelfPilot';
import { GLASSHOUSE_WORKBENCH_PILOT } from '../diorama/content/glasshouseWorkbenchPilot';
import { GLASSHOUSE_COMBINED_PILOT } from '../diorama/content/glasshouseCombinedPilot';
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
import { audioManager, MusicTrackId } from '../diorama/services/audioManager';
import { SoundPanel } from '../diorama/components/SoundPanel/SoundPanel';
import { exportDioramaToPNG, downloadDataUrl } from '../diorama/domain/export';

interface StickerbookPageProps {
  shelfPilot?: boolean;
  workbenchPilot?: boolean;
  combinedPilot?: boolean;
  initialThemeId?: 'glasshouse-botanist' | 'rainy-night-cafe';
  locale?: 'ko' | 'en';
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  onExit?: () => void;
}

function readPreference(key: string): string | null {
  try { return localStorage.getItem(key); } catch { return null; }
}

export const StickerbookPage: React.FC<StickerbookPageProps> = ({ initialThemeId = 'glasshouse-botanist', locale = 'ko', difficulty = 'beginner', onExit, shelfPilot = false, workbenchPilot = false, combinedPilot = false }) => {
  const greenhouseManifest = combinedPilot ? GLASSHOUSE_COMBINED_PILOT : workbenchPilot ? GLASSHOUSE_WORKBENCH_PILOT : shelfPilot ? GLASSHOUSE_SHELF_PILOT : GLASSHOUSE_BOTANIST_MANIFEST;
  const initialManifest = initialThemeId === 'glasshouse-botanist' ? greenhouseManifest : RAINY_NIGHT_CAFE_MANIFEST;
  const [currentThemeId, setCurrentThemeId] = useState<'glasshouse-botanist' | 'rainy-night-cafe'>(initialThemeId);
  const manifest = currentThemeId === 'glasshouse-botanist' ? greenhouseManifest : RAINY_NIGHT_CAFE_MANIFEST;

  const [stickers, setStickers] = useState<PlacedSticker[]>(() => {
    const loaded = loadCreationFromStorage(initialManifest.setId);
    return loaded?.stickers || initialManifest.defaultCreation.stickers;
  });
  const [lampOn, setLampOn] = useState<boolean>(() => {
    const loaded = loadCreationFromStorage(initialManifest.setId);
    return loaded?.sceneState?.lampOn ?? initialManifest.defaultCreation.sceneState.lampOn;
  });
  const [history, setHistory] = useState<HistoryState>(() => createHistory(stickers));

  const [selectedInstanceId, setSelectedInstanceId] = useState<string | null>(null);
  const [isViewMode, setIsViewMode] = useState<boolean>(false);
  const [isGuideEnabled, setIsGuideEnabled] = useState<boolean>(false);
  const [isTrayOpen, setIsTrayOpen] = useState<boolean>(true);

  const [isMuted, setIsMuted] = useState<boolean>(() => readPreference('diorama:sound-muted') !== 'false');
  const [volume, setVolume] = useState<number>(() => { const v = Number(readPreference('diorama:music-volume') ?? 0.4); return Number.isFinite(v) ? Math.max(0, Math.min(1, v)) : 0.4; });
  const [selectedTrack, setSelectedTrack] = useState<MusicTrackId | null>(() => {
    const savedTrack = readPreference('diorama:music-track');
    if (savedTrack === 'none') return null;
    return ['window-afternoon', 'greenhouse-morning', 'cozy-night'].includes(savedTrack || '') ? savedTrack as MusicTrackId : initialThemeId === 'glasshouse-botanist' ? 'greenhouse-morning' : 'window-afternoon';
  });
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [audioError, setAudioError] = useState('');
  const [isSoundPanelOpen, setIsSoundPanelOpen] = useState(false);
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

  const latestSave = useRef(persistCurrentCreation);
  latestSave.current = persistCurrentCreation;
  useEffect(() => {
    const flush = () => latestSave.current();
    window.addEventListener('pagehide', flush);
    return () => { window.removeEventListener('pagehide', flush); flush(); };
  }, []);

  const handleSelectTheme = (themeId: string) => {
    if (themeId === currentThemeId) return;
    persistCurrentCreation();
    const nextTheme = themeId as 'glasshouse-botanist' | 'rainy-night-cafe';
    const nextManifest = nextTheme === 'glasshouse-botanist' ? greenhouseManifest : RAINY_NIGHT_CAFE_MANIFEST;
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

  // 2. 배경음은 사용자가 재생한 뒤에만 시작한다. 설정은 이 기기에만 저장한다.
  useEffect(() => {
    audioManager.setVolume(volume);
    audioManager.setMuted(isMuted);
    try {
      localStorage.setItem('diorama:sound-muted', String(isMuted));
      localStorage.setItem('diorama:music-volume', String(volume));
      localStorage.setItem('diorama:music-track', selectedTrack || 'none');
    } catch { /* Playback remains available when browser storage is blocked. */ }
  }, [isMuted, volume, selectedTrack]);

  useEffect(() => {
    const pauseHidden = () => { if (document.hidden) { audioManager.stopJazz(); setIsAudioPlaying(false); } };
    document.addEventListener('visibilitychange', pauseHidden);
    return () => { document.removeEventListener('visibilitychange', pauseHidden); audioManager.stopJazz(); };
  }, []);

  // 볼륨 변경 핸들러
  const handleChangeVolume = (newVol: number) => {
    setVolume(newVol);
    audioManager.setVolume(newVol);
  };

  // 음소거 토글
  const handleToggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    audioManager.setMuted(nextMuted);
    if (nextMuted) {
      audioManager.stopJazz();
      setIsAudioPlaying(false);
    }
  };

  const handleSelectTrack = (trackId: MusicTrackId | null) => {
    setSelectedTrack(trackId);
    audioManager.stopJazz();
    setIsAudioPlaying(false);
    if (!trackId) {
      setIsAudioPlaying(false);
      return;
    }
    audioManager.selectTrack(trackId);
  };

  const handlePlayTrack = async (trackId: MusicTrackId) => {
    setAudioError('');
    audioManager.stopJazz();
    setSelectedTrack(trackId);
    setIsMuted(false);
    audioManager.setVolume(volume);
    audioManager.setMuted(false);
    try {
      const started = await audioManager.startTrack(trackId);
      setIsAudioPlaying(started);
      if (!started && !document.hidden) setAudioError('재생 버튼을 다시 눌러 주세요.');
    } catch {
      setIsAudioPlaying(false);
      setAudioError(locale === 'ko' ? '소리를 재생할 수 없습니다. 브라우저 소리 권한을 확인한 뒤 다시 눌러 주세요.' : 'Audio could not start. Check browser sound permissions and try again.');
    }
  };

  const handleTogglePlaying = () => {
    if (!selectedTrack) return;
    if (isAudioPlaying) {
      audioManager.stopJazz();
      setIsAudioPlaying(false);
    } else {
      void handlePlayTrack(selectedTrack);
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
      const dataUrl = await exportDioramaToPNG(stickers, manifest.backgroundSrc, 2048, 1536, manifest.canvas.width, manifest.canvas.height, manifest.assets);
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
    <div className="studio-shell">
      <div className="studio-service-bar"><button onClick={onExit}>← {locale === 'ko' ? '테마로' : 'Themes'}</button><span>{locale === 'ko' ? ({ beginner: '초급', intermediate: '중급', advanced: '고급' }[difficulty]) : difficulty}</span><small>{locale === 'ko' ? '작품은 이 기기에 저장됩니다' : 'Saved on this device'}</small></div>
      {/* 1. 상단 글로벌 툴바 */}
      <TopToolbar
        title={manifest.title[locale]}
        locale={locale}
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
        onOpenSound={() => setIsSoundPanelOpen(true)}
        onChangeVolume={handleChangeVolume}
        onExportPNG={handleExportPNG}
      />

      {/* 2. 메인 워크스페이스: 캔버스 + 스티커 트레이 (가로 랜드스케이프 레이아웃) */}
      <div className="studio-workspace"
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
            onDiscreteTransform={(id, updates) => { const updated = stickers.map(s => s.instanceId === id ? { ...s, ...updates } : s); setStickers(updated); setHistory(prev => recordAction(prev, updated)); }}
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
            locale={locale}
            isOpen={isTrayOpen}
            assets={manifest.assets}
            onToggleOpen={() => setIsTrayOpen((prev) => !prev)}
            onAddSticker={(assetId) => handleAddSticker(assetId)}
          />
        )}
        <SoundPanel open={isSoundPanelOpen} locale={locale} muted={isMuted} playing={isAudioPlaying} volume={volume} selectedTrack={selectedTrack} onClose={() => setIsSoundPanelOpen(false)} onToggleMute={handleToggleMute} onTogglePlaying={handleTogglePlaying} onChangeVolume={handleChangeVolume} onSelectTrack={handleSelectTrack} onPlayTrack={handlePlayTrack} themeId={currentThemeId} error={audioError} />
      </div>
    </div>
  );
};

export default StickerbookPage;
