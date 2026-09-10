import { PlacedSticker } from '../types/manifest';

/**
 * 단일 정규화 레이어 알고리즘 (Canonical Layer Ordering Algorithm)
 * 렌더링, 저장, 내보내기, Undo/Redo 모든 단계에서 이 단일 정렬을 공유함.
 */

// 배열의 인덱스 순서대로 정규화된 zIndex(10, 20, 30...)를 재부여
function reindexByArrayOrder(stickers: PlacedSticker[]): PlacedSticker[] {
  return stickers.map((sticker, index) => ({
    ...sticker,
    zIndex: (index + 1) * 10,
  }));
}

// 기존 zIndex 값을 기준으로 정렬 후 재색인
export function normalizeZIndexes(stickers: PlacedSticker[]): PlacedSticker[] {
  const sorted = [...stickers].sort((a, b) => a.zIndex - b.zIndex);
  return reindexByArrayOrder(sorted);
}

export function bringForward(stickers: PlacedSticker[], targetId: string): PlacedSticker[] {
  const normalized = normalizeZIndexes(stickers);
  const idx = normalized.findIndex((s) => s.instanceId === targetId);
  if (idx === -1 || idx === normalized.length - 1) return normalized;

  // 잠금된 스티커는 레이어 조작 불가 (기획서 P0 Case D 규정)
  if (normalized[idx].locked) return normalized;

  const next = [...normalized];
  const temp = next[idx];
  next[idx] = next[idx + 1];
  next[idx + 1] = temp;
  return reindexByArrayOrder(next);
}

export function sendBackward(stickers: PlacedSticker[], targetId: string): PlacedSticker[] {
  const normalized = normalizeZIndexes(stickers);
  const idx = normalized.findIndex((s) => s.instanceId === targetId);
  if (idx <= 0) return normalized;

  if (normalized[idx].locked) return normalized;

  const next = [...normalized];
  const temp = next[idx];
  next[idx] = next[idx - 1];
  next[idx - 1] = temp;
  return reindexByArrayOrder(next);
}

export function bringToFront(stickers: PlacedSticker[], targetId: string): PlacedSticker[] {
  const normalized = normalizeZIndexes(stickers);
  const target = normalized.find((s) => s.instanceId === targetId);
  if (!target || target.locked) return normalized;

  const rest = normalized.filter((s) => s.instanceId !== targetId);
  return reindexByArrayOrder([...rest, target]);
}

export function sendToBack(stickers: PlacedSticker[], targetId: string): PlacedSticker[] {
  const normalized = normalizeZIndexes(stickers);
  const target = normalized.find((s) => s.instanceId === targetId);
  if (!target || target.locked) return normalized;

  const rest = normalized.filter((s) => s.instanceId !== targetId);
  return reindexByArrayOrder([target, ...rest]);
}
