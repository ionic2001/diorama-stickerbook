import { GLASSHOUSE_BOTANIST_MANIFEST } from './glasshouseBotanistManifest';
import type { Asset, ContentSet } from '../types/manifest';

// A separate content identity preserves all legacy greenhouse saves and asset IDs.
const setId = 'glasshouse-shelf-intermediate-pilot-v1';
const entries = [
  ['shelf', '빈 원목 선반', 'Empty wooden shelf', 300, 390.63, 512, 450],
  ['bottom', '하단 식물 묶음', 'Lower-tier plants', 252, 126, 512, 478],
  ['middle', '중단 식물 묶음', 'Middle-tier plants', 270, 96.39, 512, 382],
  ['top', '상단 식물 묶음', 'Upper-tier plants', 288, 144, 512, 270],
] as const;
const assets: Asset[] = entries.map(([id, ko, en, width, height, x, y], index) => ({
  setId, assetId: `pilot-${id}`, name: { ko, en, ja: en, zh: en, es: en },
  type: 'static', category: 'furniture',
  src: `/assets/diorama/glasshouse-shelf-pilot/${id}-borderless.png`,
  dimensions: { width, height }, defaultPosition: { x, y },
  defaultTransform: { scale: 1, rotation: 0, flipX: false },
  layer: { defaultZIndex: index + 1 },
}));

export const GLASSHOUSE_SHELF_PILOT: ContentSet = {
  ...GLASSHOUSE_BOTANIST_MANIFEST,
  setId, version: 1, published: false,
  title: { ko: '온실 선반 · 중급 시제품 4종', en: 'Greenhouse shelf · 4-piece pilot', ja: 'Shelf pilot', zh: 'Shelf pilot', es: 'Shelf pilot' },
  assets, assetIds: assets.map(asset => asset.assetId),
  defaultCreation: {
    sceneState: { lampOn: false },
    stickers: assets.map((asset, index) => ({
      instanceId: `pilot-default-${index}`, assetId: asset.assetId,
      x: asset.defaultPosition!.x, y: asset.defaultPosition!.y,
      scale: 1, rotation: 0, flipX: false, zIndex: index, locked: false,
    })),
  },
};
