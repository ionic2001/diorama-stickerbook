import { GLASSHOUSE_BOTANIST_MANIFEST } from './glasshouseBotanistManifest';
import type { Asset, ContentSet } from '../types/manifest';

const setId = 'glasshouse-workbench-intermediate-pilot-v1';
const entries = [
  ['workbench', '빈 분갈이 작업대', 'Empty potting workbench', 460, 431.58, 440, 450],
  ['soil', '흙 주머니', 'Potting soil bag', 95, 89.06, 500, 491],
  ['seeds', '씨앗 상자', 'Seed packet box', 95, 89.13, 360, 318],
  ['pots', '화분 묶음', 'Seedling pot pair', 100, 93.82, 515, 302],
  ['tools', '도구 트레이', 'Gardening tool tray', 125, 41.67, 437, 347],
] as const;
const assets: Asset[] = entries.map(([id, ko, en, width, height, x, y], index) => ({
  setId, assetId: `workbench-pilot-${id}`, name: { ko, en, ja: en, zh: en, es: en },
  type: 'static', category: 'furniture',
  src: `/assets/diorama/glasshouse-workbench-pilot/${id}-borderless.png`,
  dimensions: { width, height }, defaultPosition: { x, y },
  defaultTransform: { scale: 1, rotation: 0, flipX: false },
  layer: { defaultZIndex: index + 1 },
}));

export const GLASSHOUSE_WORKBENCH_PILOT: ContentSet = {
  ...GLASSHOUSE_BOTANIST_MANIFEST, setId, version: 1, published: false,
  title: { ko: '온실 작업대 · 시제품 5종', en: 'Potting workbench · 5-piece pilot', ja: 'Workbench pilot', zh: 'Workbench pilot', es: 'Workbench pilot' },
  assets, assetIds: assets.map(asset => asset.assetId),
  defaultCreation: {
    sceneState: { lampOn: false },
    stickers: assets.map((asset, index) => ({
      instanceId: `workbench-default-${index}`, assetId: asset.assetId,
      x: asset.defaultPosition!.x, y: asset.defaultPosition!.y,
      scale: 1, rotation: 0, flipX: false, zIndex: index, locked: false,
    })),
  },
};
