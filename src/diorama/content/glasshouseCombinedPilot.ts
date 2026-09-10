import { GLASSHOUSE_BOTANIST_MANIFEST } from './glasshouseBotanistManifest';
import { GLASSHOUSE_SHELF_PILOT } from './glasshouseShelfPilot';
import { GLASSHOUSE_WORKBENCH_PILOT } from './glasshouseWorkbenchPilot';
import type { Asset, ContentSet } from '../types/manifest';

// Reuse approved artwork without changing either standalone pilot or its saves.
const setId = 'glasshouse-combined-intermediate-pilot-v1';
const groups = [
  { manifest: GLASSHOUSE_SHELF_PILOT, originX: 512, originY: 450, x: 290, y: 450, scale: 1 },
  { manifest: GLASSHOUSE_WORKBENCH_PILOT, originX: 440, originY: 450, x: 665, y: 480, scale: 0.85 },
];
const assets: Asset[] = groups.flatMap(group => group.manifest.assets.map(asset => ({
  ...asset, setId,
  dimensions: { ...asset.dimensions },
  defaultPosition: {
    x: group.x + (asset.defaultPosition!.x - group.originX) * group.scale,
    y: group.y + (asset.defaultPosition!.y - group.originY) * group.scale,
  },
  defaultTransform: { ...asset.defaultTransform, scale: group.scale },
}))).map((asset, index) => ({ ...asset, layer: { ...asset.layer, defaultZIndex: index + 1 } }));

export const GLASSHOUSE_COMBINED_PILOT: ContentSet = {
  ...GLASSHOUSE_BOTANIST_MANIFEST, setId, version: 1, published: false,
  title: {
    ko: '온실 공방 · 중급 통합 시제품 9종',
    en: 'Greenhouse workshop · 9-piece pilot',
    ja: 'Greenhouse workshop pilot', zh: 'Greenhouse workshop pilot', es: 'Greenhouse workshop pilot',
  },
  assets, assetIds: assets.map(asset => asset.assetId),
  defaultCreation: {
    sceneState: { lampOn: false },
    stickers: assets.map((asset, index) => ({
      instanceId: `combined-default-${index}`, assetId: asset.assetId,
      x: asset.defaultPosition!.x, y: asset.defaultPosition!.y,
      scale: asset.defaultTransform!.scale, rotation: 0, flipX: false,
      zIndex: index, locked: false,
    })),
  },
};
