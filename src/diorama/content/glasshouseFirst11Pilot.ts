import { GLASSHOUSE_BOTANIST_MANIFEST } from './glasshouseBotanistManifest';
import type { Asset, ContentSet } from '../types/manifest';

const setId = 'glasshouse-first11-pilot-v1';
const assetRoot = '/assets/diorama/glasshouse-first12-v1/service/';
const entries = [
  ['shelf', '빈 식물 선반', 'Empty plant shelf', 300, 328, 285, 430],
  ['workbench', '빈 원예 작업대', 'Empty potting workbench', 320, 293, 675, 470],
  ['potted-monstera', '몬스테라 화분', 'Potted monstera', 190, 190, 510, 430],
  ['botany-book', '식물학 책', 'Botany book', 62, 65, 500, 420],
  ['garden-journal', '원예 일지', 'Gardening journal', 62, 66, 500, 420],
  ['pressed-flower-notebook', '압화 노트', 'Pressed flower notebook', 62, 67, 500, 420],
  ['trowel', '손삽', 'Hand trowel', 105, 70, 500, 430],
  ['pruning-shears', '전지가위', 'Pruning shears', 105, 70, 500, 430],
  ['tool-tray', '빈 도구 트레이', 'Empty tool tray', 130, 87, 500, 430],
  ['watering-can', '금속 물뿌리개', 'Metal watering can', 130, 108, 500, 430],
  ['stool', '낮은 스툴', 'Low stool', 105, 96, 500, 480],
] as const;

const assets: Asset[] = entries.map(([id, ko, en, width, height, x, y], index) => ({
  setId,
  assetId: `first11-${id}`,
  name: { ko, en, ja: en, zh: en, es: en },
  type: 'static',
  category: 'decor',
  src: `${assetRoot}${id}.png`,
  dimensions: { width, height },
  defaultPosition: { x, y },
  defaultTransform: { scale: 1, rotation: 0, flipX: false },
  layer: { defaultZIndex: index + 1 },
}));

export const GLASSHOUSE_FIRST11_PILOT: ContentSet = {
  ...GLASSHOUSE_BOTANIST_MANIFEST,
  setId,
  version: 1,
  published: false,
  title: {
    ko: '햇살 온실 · 대표 스티커 11종',
    en: 'Sunlit Greenhouse · 11-piece pilot',
    ja: 'Sunlit Greenhouse pilot',
    zh: 'Sunlit Greenhouse pilot',
    es: 'Sunlit Greenhouse pilot',
  },
  assets,
  assetIds: assets.map(asset => asset.assetId),
  defaultCreation: {
    sceneState: { lampOn: false },
    stickers: [],
  },
};
