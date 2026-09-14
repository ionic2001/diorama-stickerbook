import React from 'react';
import { ArrowDown, ArrowUp, FlipHorizontal, Lock, RotateCcw, RotateCw, Trash2, Unlock } from 'lucide-react';
import { PlacedSticker } from '../../types/manifest';

interface Props {
  sticker: PlacedSticker;
  onBringToFront: () => void; onBringForward: () => void;
  onSendBackward: () => void; onSendToBack: () => void;
  onFlipX: () => void; onToggleLock: () => void;
  onDelete: () => void;
  onRotate: (degrees: number) => void; onScale: (scale: number) => void;
}

export function StickerContextToolbar(p: Props) {
  return <div className="selection-tools" role="toolbar" aria-label="스티커 편집" onPointerDown={e => e.stopPropagation()} onClick={e => e.stopPropagation()}>
    <div className="selection-row">
      <button disabled={p.sticker.locked} onClick={() => p.onRotate(-15)} aria-label="왼쪽으로 15도 회전"><RotateCcw size={18} /> −15°</button>
      <output aria-label="현재 회전 각도">{Math.round(p.sticker.rotation)}°</output>
      <button disabled={p.sticker.locked} onClick={() => p.onRotate(15)} aria-label="오른쪽으로 15도 회전"><RotateCw size={18} /> +15°</button>
      <label>크기 <input aria-label="스티커 크기" type="range" min="0.3" max="2.5" step="0.05" disabled={p.sticker.locked} value={p.sticker.scale} onChange={e => p.onScale(Number(e.target.value))} /></label>
    </div>
    <div className="selection-row">
      <button disabled={p.sticker.locked} onClick={p.onBringForward} title="한 단계 앞으로" aria-label="한 단계 앞으로"><ArrowUp size={17} /></button>
      <button disabled={p.sticker.locked} onClick={p.onSendBackward} title="한 단계 뒤로" aria-label="한 단계 뒤로"><ArrowDown size={17} /></button>
      <button disabled={p.sticker.locked} onClick={p.onBringToFront}>맨 앞</button>
      <button disabled={p.sticker.locked} onClick={p.onSendToBack}>맨 뒤</button>
      <button disabled={p.sticker.locked} onClick={p.onFlipX} title="좌우 반전" aria-label="좌우 반전"><FlipHorizontal size={17} /></button>
      <button onClick={p.onToggleLock} title={p.sticker.locked ? '잠금 해제' : '잠금'} aria-label={p.sticker.locked ? '잠금 해제' : '잠금'}>{p.sticker.locked ? <Lock size={17} /> : <Unlock size={17} />}</button>
      <button onClick={p.onDelete} title="삭제" aria-label="삭제"><Trash2 size={17} /></button>
    </div>
  </div>;
}
