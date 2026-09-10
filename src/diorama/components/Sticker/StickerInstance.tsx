import React, { useRef } from 'react';
import { RotateCw, Maximize2, Lock } from 'lucide-react';
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

  const isRotating = useRef(false);
  const isScaling = useRef(false);
  const scaleStart = useRef<{ startY: number; startScale: number }>({ startY: 0, startScale: 1 });

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

  // 2. 회전(Rotate) 핸들러
  const handlePointerDownRotate = (e: React.PointerEvent) => {
    e.stopPropagation();
    if (sticker.locked || isViewMode) return;

    isRotating.current = true;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMoveRotate = (e: React.PointerEvent) => {
    if (!isRotating.current || sticker.locked || isViewMode) return;

    const canvasElem = (e.target as HTMLElement).closest('[data-diorama-canvas="true"]');
    if (!canvasElem) return;

    const rect = canvasElem.getBoundingClientRect();
    const currentLogicalX = (e.clientX - rect.left) / canvasScale;
    const currentLogicalY = (e.clientY - rect.top) / canvasScale;

    // 스티커 중심점(sticker.x, sticker.y) 기준 각도 계산
    const angleRad = Math.atan2(currentLogicalY - sticker.y, currentLogicalX - sticker.x);
    let angleDeg = Math.round((angleRad * 180) / Math.PI) + 90;
    if (angleDeg > 180) angleDeg -= 360;

    // 15도 단위 근접 스냅
    if (Math.abs(angleDeg % 15) < 3) {
      angleDeg = Math.round(angleDeg / 15) * 15;
    }

    onUpdateTransform({ rotation: angleDeg });
  };

  const handlePointerUpRotate = (e: React.PointerEvent) => {
    if (isRotating.current) {
      isRotating.current = false;
      try {
        (e.target as HTMLElement).releasePointerCapture(e.pointerId);
      } catch {
        // 무시
      }
      onCommitTransform();
    }
  };

  // 3. 크기 조절(Scale) 핸들러
  const handlePointerDownScale = (e: React.PointerEvent) => {
    e.stopPropagation();
    if (sticker.locked || isViewMode) return;

    isScaling.current = true;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    scaleStart.current = {
      startY: e.clientY,
      startScale: sticker.scale,
    };
  };

  const handlePointerMoveScale = (e: React.PointerEvent) => {
    if (!isScaling.current || sticker.locked || isViewMode) return;

    const dy = (e.clientY - scaleStart.current.startY) / canvasScale;
    // 아래로 당기면 확대, 위로 올리면 축소
    const scaleDelta = dy * 0.006;
    let nextScale = Math.max(0.3, Math.min(2.5, scaleStart.current.startScale + scaleDelta));
    nextScale = Math.round(nextScale * 100) / 100;

    onUpdateTransform({ scale: nextScale });
  };

  const handlePointerUpScale = (e: React.PointerEvent) => {
    if (isScaling.current) {
      isScaling.current = false;
      try {
        (e.target as HTMLElement).releasePointerCapture(e.pointerId);
      } catch {
        // 무시
      }
      onCommitTransform();
    }
  };

  const isBankerLamp = sticker.assetId === 'light-banker-lamp';

  return (
    <div
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

      {/* 에디트 모드 선택 핸들 (테두리 가이드라인 제거) */}
      {!isViewMode && isSelected && (
        <div
          style={{
            position: 'absolute',
            inset: `-${Math.round(8 * sticker.scale)}px`,
            pointerEvents: 'none',
          }}
        >
          {/* 잠금 상태 배지 */}
          {sticker.locked && (
            <div
              style={{
                position: 'absolute',
                top: '-12px',
                right: '-12px',
                backgroundColor: '#f59e0b',
                color: '#fff',
                padding: '4px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
              }}
            >
              <Lock size={12} />
            </div>
          )}

          {/* 회전 조절 핸들 (상단) */}
          {!sticker.locked && (
            <div
              style={{
                position: 'absolute',
                top: '-28px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '24px',
                height: '24px',
                backgroundColor: '#ffffff',
                border: '1.5px solid #38bdf8',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#0284c7',
                cursor: 'grab',
                pointerEvents: 'auto',
                boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
              }}
              onPointerDown={handlePointerDownRotate}
              onPointerMove={handlePointerMoveRotate}
              onPointerUp={handlePointerUpRotate}
              title="회전 (Rotate)"
            >
              <RotateCw size={13} />
            </div>
          )}

          {/* 크기 조절 핸들 (우하단 코너) */}
          {!sticker.locked && (
            <div
              style={{
                position: 'absolute',
                bottom: '-12px',
                right: '-12px',
                width: '24px',
                height: '24px',
                backgroundColor: '#ffffff',
                border: '1.5px solid #38bdf8',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#0284c7',
                cursor: 'nwse-resize',
                pointerEvents: 'auto',
                boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
              }}
              onPointerDown={handlePointerDownScale}
              onPointerMove={handlePointerMoveScale}
              onPointerUp={handlePointerUpScale}
              title="크기 조절 (Scale)"
            >
              <Maximize2 size={13} />
            </div>
          )}
        </div>
      )}
    </div>
  );
};
