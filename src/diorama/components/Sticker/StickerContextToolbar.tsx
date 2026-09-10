import React from 'react';
import { 
  ChevronsUp, 
  ChevronUp, 
  ChevronDown, 
  ChevronsDown, 
  FlipHorizontal, 
  Lock, 
  Unlock, 
  Copy, 
  Trash2 
} from 'lucide-react';
import { PlacedSticker } from '../../types/manifest';

interface StickerContextToolbarProps {
  sticker: PlacedSticker;
  stickerHeight: number;
  canvasWidth: number;
  canvasHeight: number;
  onBringToFront: () => void;
  onBringForward: () => void;
  onSendBackward: () => void;
  onSendToBack: () => void;
  onFlipX: () => void;
  onToggleLock: () => void;
  onDuplicate: () => void;
  onDelete: () => void;
}

export const StickerContextToolbar: React.FC<StickerContextToolbarProps> = ({
  sticker,
  stickerHeight,
  canvasWidth,
  canvasHeight,
  onBringToFront,
  onBringForward,
  onSendBackward,
  onSendToBack,
  onFlipX,
  onToggleLock,
  onDuplicate,
  onDelete,
}) => {
  // 툴바 크기 추정치 (너비 약 280px, 높이 36px)
  const toolbarWidth = 280;
  const toolbarHeight = 36;
  const margin = 12;

  // 스티커의 실제 렌더링 반높이 (스케일 고려)
  const halfH = (stickerHeight * sticker.scale) / 2;

  // 기본적으로 스티커 상단에 배치, 상단 공간 부족 시 하단에 배치
  let top = sticker.y - halfH - toolbarHeight - margin;
  if (top < 10) {
    top = sticker.y + halfH + margin;
  }
  // 캔버스 하단 경계 검사
  if (top + toolbarHeight > canvasHeight - 10) {
    top = Math.max(10, canvasHeight - toolbarHeight - 10);
  }

  // 좌우 중앙 정렬 및 캔버스 경계 클램핑
  let left = sticker.x - toolbarWidth / 2;
  if (left < 10) left = 10;
  if (left + toolbarWidth > canvasWidth - 10) {
    left = canvasWidth - toolbarWidth - 10;
  }

  return (
    <div
      style={{
        position: 'absolute',
        left: `${left}px`,
        top: `${top}px`,
        width: `${toolbarWidth}px`,
        height: `${toolbarHeight}px`,
        zIndex: 99999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'rgba(28, 25, 23, 0.92)',
        backdropFilter: 'blur(8px)',
        border: '1px solid rgba(255, 255, 255, 0.15)',
        borderRadius: '20px',
        padding: '0 8px',
        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.45)',
        userSelect: 'none',
      }}
      onPointerDown={(e) => e.stopPropagation()}
      onClick={(e) => e.stopPropagation()}
    >
      {/* 1. 레이어 순서 제어 그룹 */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
        <button
          type="button"
          title="맨 앞으로 가져오기 (Bring to Front)"
          disabled={sticker.locked}
          onClick={onBringToFront}
          style={buttonStyle(sticker.locked)}
        >
          <ChevronsUp size={15} />
        </button>
        <button
          type="button"
          title="한 단계 앞으로 (Bring Forward)"
          disabled={sticker.locked}
          onClick={onBringForward}
          style={buttonStyle(sticker.locked)}
        >
          <ChevronUp size={15} />
        </button>
        <button
          type="button"
          title="한 단계 뒤로 (Send Backward)"
          disabled={sticker.locked}
          onClick={onSendBackward}
          style={buttonStyle(sticker.locked)}
        >
          <ChevronDown size={15} />
        </button>
        <button
          type="button"
          title="맨 뒤로 보내기 (Send to Back)"
          disabled={sticker.locked}
          onClick={onSendToBack}
          style={buttonStyle(sticker.locked)}
        >
          <ChevronsDown size={15} />
        </button>
      </div>

      <div style={{ width: '1px', height: '18px', backgroundColor: 'rgba(255, 255, 255, 0.2)' }} />

      {/* 2. 스티커 변형 및 상태 제어 그룹 */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
        <button
          type="button"
          title="좌우 반전 (Flip Horizontal)"
          disabled={sticker.locked}
          onClick={onFlipX}
          style={buttonStyle(sticker.locked)}
        >
          <FlipHorizontal size={15} />
        </button>
        <button
          type="button"
          title={sticker.locked ? '잠금 해제 (Unlock)' : '위치 고정 (Lock)'}
          onClick={onToggleLock}
          style={{
            ...buttonStyle(false),
            color: sticker.locked ? '#f59e0b' : '#e5e7eb',
          }}
        >
          {sticker.locked ? <Lock size={15} /> : <Unlock size={15} />}
        </button>
        <button
          type="button"
          title="복제하기 (Duplicate)"
          onClick={onDuplicate}
          style={buttonStyle(false)}
        >
          <Copy size={15} />
        </button>
        <button
          type="button"
          title="삭제하기 (Delete)"
          onClick={onDelete}
          style={{
            ...buttonStyle(false),
            color: '#ef4444',
          }}
        >
          <Trash2 size={15} />
        </button>
      </div>
    </div>
  );
};

const buttonStyle = (disabled: boolean): React.CSSProperties => ({
  background: 'none',
  border: 'none',
  color: disabled ? 'rgba(255, 255, 255, 0.25)' : '#e5e7eb',
  padding: '6px',
  borderRadius: '6px',
  cursor: disabled ? 'not-allowed' : 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'all 0.15s ease',
});
