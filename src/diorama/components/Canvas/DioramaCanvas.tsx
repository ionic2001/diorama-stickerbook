import React, { useRef, useState, useEffect } from 'react';
import { PlacedSticker, Asset } from '../../types/manifest';
import { StickerInstance } from '../Sticker/StickerInstance';
import { StickerContextToolbar } from '../Sticker/StickerContextToolbar';
import { GuideOverlay } from './GuideOverlay';
import { ViewEffectsOverlay } from '../ViewEffects/ViewEffectsOverlay';
import { RAINY_NIGHT_CAFE_ASSETS } from '../../content/rainyNightCafeManifest';

interface DioramaCanvasProps {
  stickers: PlacedSticker[];
  selectedInstanceId: string | null;
  isViewMode: boolean;
  isGuideEnabled: boolean;
  lampOn: boolean;
  backgroundSrc: string;
  assets?: Asset[];
  setId?: string;
  onSelectSticker: (instanceId: string | null) => void;
  onUpdateStickerTransform: (instanceId: string, updates: Partial<PlacedSticker>) => void;
  onCommitStickerTransform: () => void;
  onBringToFront: (instanceId: string) => void;
  onBringForward: (instanceId: string) => void;
  onSendBackward: (instanceId: string) => void;
  onSendToBack: (instanceId: string) => void;
  onFlipX: (instanceId: string) => void;
  onToggleLock: (instanceId: string) => void;
  onDuplicate: (instanceId: string) => void;
  onDelete: (instanceId: string) => void;
  onToggleLamp: () => void;
  onDropNewSticker?: (assetId: string, x: number, y: number) => void;
}

const CANVAS_WIDTH = 1024;
const CANVAS_HEIGHT = 768;

export const DioramaCanvas: React.FC<DioramaCanvasProps> = ({
  stickers,
  selectedInstanceId,
  isViewMode,
  isGuideEnabled,
  lampOn,
  backgroundSrc,
  assets,
  setId,
  onSelectSticker,
  onUpdateStickerTransform,
  onCommitStickerTransform,
  onBringToFront,
  onBringForward,
  onSendBackward,
  onSendToBack,
  onFlipX,
  onToggleLock,
  onDuplicate,
  onDelete,
  onToggleLamp,
  onDropNewSticker,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState<number>(1);

  // 컨테이너 크기에 맞춘 4:3 뷰포트 종횡비 유지 스케일 계산
  useEffect(() => {
    const handleResize = () => {
      if (!containerRef.current) return;
      const { clientWidth, clientHeight } = containerRef.current;
      if (clientWidth <= 0 || clientHeight <= 0) return;

      const scaleX = clientWidth / CANVAS_WIDTH;
      const scaleY = clientHeight / CANVAS_HEIGHT;
      const computedScale = Math.min(scaleX, scaleY);
      setScale(computedScale);
    };

    handleResize();
    const observer = new ResizeObserver(handleResize);
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    window.addEventListener('resize', handleResize);
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const assetMap = new Map<string, Asset>((assets || RAINY_NIGHT_CAFE_ASSETS).map((a) => [a.assetId, a]));

  // zIndex 오름차순으로 정렬하여 렌더링
  const sortedStickers = [...stickers].sort((a, b) => a.zIndex - b.zIndex);
  const selectedSticker = stickers.find((s) => s.instanceId === selectedInstanceId);
  const selectedAsset = selectedSticker ? assetMap.get(selectedSticker.assetId) : null;

  // 빈 캔버스 클릭 시 선택 해제
  const handleCanvasClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget || (e.target as HTMLElement).dataset.isCanvasBackground === 'true') {
      onSelectSticker(null);
    }
  };

  // 트레이에서 드래그 앤 드롭으로 스티커 추가
  const handleDragOver = (e: React.DragEvent) => {
    if (isViewMode) return;
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
  };

  const handleDrop = (e: React.DragEvent) => {
    if (isViewMode || !onDropNewSticker) return;
    e.preventDefault();
    const assetId = e.dataTransfer.getData('application/diorama-asset-id');
    if (!assetId) return;

    const canvasElem = containerRef.current?.querySelector('[data-diorama-canvas="true"]');
    if (!canvasElem) return;

    const rect = canvasElem.getBoundingClientRect();
    const logicalX = Math.round((e.clientX - rect.left) / scale);
    const logicalY = Math.round((e.clientY - rect.top) / scale);

    onDropNewSticker(assetId, logicalX, logicalY);
  };

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#0c0a09',
        overflow: 'hidden',
        userSelect: 'none',
      }}
      onClick={handleCanvasClick}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      {/* 1024 x 768 논리 캔버스 (Scale 변환 적용) */}
      <div
        data-diorama-canvas="true"
        style={{
          position: 'relative',
          width: `${CANVAS_WIDTH}px`,
          height: `${CANVAS_HEIGHT}px`,
          transform: `scale(${scale})`,
          transformOrigin: 'center center',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.8)',
          overflow: 'hidden',
          borderRadius: '4px',
          flexShrink: 0,
        }}
      >
        {/* 1. 배경 이미지 레이어 */}
        <img
          src={backgroundSrc}
          alt="Diorama Background"
          data-is-canvas-background="true"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            pointerEvents: 'auto',
            userSelect: 'none',
          }}
          draggable={false}
        />

        {/* 2. 스티커 인스턴스 렌더링 레이어 (zIndex 순서대로) */}
        {sortedStickers.map((sticker) => {
          const asset = assetMap.get(sticker.assetId);
          if (!asset) return null;

          return (
            <StickerInstance
              key={sticker.instanceId}
              sticker={sticker}
              asset={asset}
              isSelected={sticker.instanceId === selectedInstanceId}
              isViewMode={isViewMode}
              canvasScale={scale}
              lampOn={lampOn}
              onSelect={() => onSelectSticker(sticker.instanceId)}
              onUpdateTransform={(updates) => onUpdateStickerTransform(sticker.instanceId, updates)}
              onCommitTransform={onCommitStickerTransform}
              onInteractiveClick={onToggleLamp}
            />
          );
        })}

        {/* 3. 뷰 모드 루프 이펙트 (비 오는 카페 전용 효과) */}
        {isViewMode && setId === 'rainy-night-cafe' && (
          <ViewEffectsOverlay
            stickers={stickers}
            lampOn={lampOn}
            width={CANVAS_WIDTH}
            height={CANVAS_HEIGHT}
          />
        )}

        {/* 4. 에디트 모드 가이드라인 레이어 */}
        {!isViewMode && isGuideEnabled && (
          <GuideOverlay width={CANVAS_WIDTH} height={CANVAS_HEIGHT} />
        )}

        {/* 5. 선택된 스티커 직속 컨텍스트 툴바 (레이어 제어 등) */}
        {!isViewMode && selectedSticker && selectedAsset && (
          <StickerContextToolbar
            sticker={selectedSticker}
            stickerHeight={selectedAsset.dimensions.height}
            canvasWidth={CANVAS_WIDTH}
            canvasHeight={CANVAS_HEIGHT}
            onBringToFront={() => onBringToFront(selectedSticker.instanceId)}
            onBringForward={() => onBringForward(selectedSticker.instanceId)}
            onSendBackward={() => onSendBackward(selectedSticker.instanceId)}
            onSendToBack={() => onSendToBack(selectedSticker.instanceId)}
            onFlipX={() => onFlipX(selectedSticker.instanceId)}
            onToggleLock={() => onToggleLock(selectedSticker.instanceId)}
            onDuplicate={() => onDuplicate(selectedSticker.instanceId)}
            onDelete={() => onDelete(selectedSticker.instanceId)}
          />
        )}
      </div>
    </div>
  );
};
