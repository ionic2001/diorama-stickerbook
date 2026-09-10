import React, { useRef } from 'react';
import { PlacedSticker, Asset } from '../../types/manifest';
import { STICKER_COMPONENTS } from '../../content/stickerSVGs';

interface StickerInstanceProps {
  sticker: PlacedSticker;
  asset: Asset;
  isSelected: boolean;
  isViewMode: boolean;
  canvasScale: number;
  lampOn?: boolean;
  onSelect: () => void;
  onUpdateTransform: (updates: Partial<PlacedSticker>) => void;
  onCommitTransform: () => void;
  onInteractiveClick?: () => void;
}

export const StickerInstance: React.FC<StickerInstanceProps> = ({
  sticker,
  asset,
  isSelected,
  isViewMode,
  canvasScale,
  lampOn = true,
  onSelect,
  onUpdateTransform,
  onCommitTransform,
  onInteractiveClick,
}) => {
  const isDragging = useRef(false);
  const dragStart = useRef<{ x: number; y: number; stickerX: number; stickerY: number }>({
    x: 0,
    y: 0,
    stickerX: 0,
    stickerY: 0,
  });

  const Component = STICKER_COMPONENTS[sticker.assetId];
  if (!asset.src && !Component) return null;

  const baseW = asset.dimensions.width;
  const baseH = asset.dimensions.height;

  // 1. 본체 드래그 이동 핸들러
  const handlePointerDownBody = (e: React.PointerEvent) => {
    if (isViewMode) {
      if (asset.type === 'interactive' && onInteractiveClick) {
        onInteractiveClick();
      }
      return;
    }

    e.stopPropagation();
    onSelect();

    if (sticker.locked) return;

    isDragging.current = true;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);

    dragStart.current = {
      x: e.clientX,
      y: e.clientY,
      stickerX: sticker.x,
      stickerY: sticker.y,
    };
  };

  const handlePointerMoveBody = (e: React.PointerEvent) => {
    if (!isDragging.current || isViewMode || sticker.locked) return;

    const dx = (e.clientX - dragStart.current.x) / canvasScale;
    const dy = (e.clientY - dragStart.current.y) / canvasScale;

    onUpdateTransform({
      x: Math.round(dragStart.current.stickerX + dx),
      y: Math.round(dragStart.current.stickerY + dy),
    });
  };

  const handlePointerUpBody = (e: React.PointerEvent) => {
    if (isDragging.current) {
      isDragging.current = false;
      try {
        (e.target as HTMLElement).releasePointerCapture(e.pointerId);
      } catch {
        // 이미 릴리즈된 경우
      }
      onCommitTransform();
    }
  };

  const isBankerLamp = sticker.assetId === 'light-banker-lamp';

  return (
    <div
      data-sticker-id={sticker.instanceId}
      style={{
        position: 'absolute',
        left: `${sticker.x}px`,
        top: `${sticker.y}px`,
        width: `${baseW}px`,
        height: `${baseH}px`,
        transform: `translate(-50%, -50%) rotate(${sticker.rotation}deg) scale(${sticker.flipX ? -1 : 1}, 1)`,
        zIndex: sticker.zIndex,
        userSelect: 'none',
        cursor: isViewMode
          ? isBankerLamp
            ? 'pointer'
            : 'default'
          : sticker.locked
          ? 'not-allowed'
          : 'move',
        touchAction: 'none',
      }}
      onPointerDown={handlePointerDownBody}
      onPointerMove={handlePointerMoveBody}
      onPointerUp={handlePointerUpBody}
    >
      {/* 실제 스티커 이미지 (원본 투명 PNG 또는 SVG 폴백) */}
      <div
        style={{
          transform: `scale(${sticker.scale})`,
          transformOrigin: 'center center',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {asset.src ? (
          <img
            src={asset.src}
            alt={asset.name.ko}
            draggable={false}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              pointerEvents: 'none',
              filter: isBankerLamp && lampOn
                ? 'drop-shadow(0 0 14px rgba(254, 240, 138, 0.85))'
                : 'none',
              transition: 'filter 0.2s ease',
            }}
          />
        ) : (
          Component && <Component width={baseW} height={baseH} isLit={isBankerLamp ? lampOn : true} />
        )}
      </div>

      {!isViewMode && isSelected && <div aria-hidden="true" style={{position:'absolute', inset:0, border:'2px solid #596d50', transform:`scale(${sticker.scale})`, pointerEvents:'none', borderRadius:6}} />}
    </div>
  );
};
