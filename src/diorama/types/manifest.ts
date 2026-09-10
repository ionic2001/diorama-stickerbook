export type AssetCategory =
  | 'furniture'
  | 'cats'
  | 'lighting'
  | 'food'
  | 'plants'
  | 'decor'
  | 'books';

export interface Asset {
  setId: string;
  assetId: string;
  name: Record<'ko' | 'en' | 'ja' | 'zh' | 'es', string>;
  type: 'static' | 'interactive' | 'effect';
  category: AssetCategory;
  src?: string;
  defaultTransform: {
    scale: number;
    rotation: number;
    flipX: boolean;
  };
  defaultPosition?: {
    x: number;
    y: number;
  };
  dimensions: {
    width: number;
    height: number;
  };
  layer: {
    defaultZIndex: number;
  };
  placementGuide?: {
    enabled: boolean;
    suggestedZones?: Array<{ x: number; y: number; radius: number }>;
  };
}

export interface ContentSet {
  setId: string;
  version: number;
  title: Record<'ko' | 'en' | 'ja' | 'zh' | 'es', string>;
  description: Record<'ko' | 'en' | 'ja' | 'zh' | 'es', string>;
  canvas: {
    width: number; // 1024
    height: number; // 768
    aspectRatio: '4:3';
  };
  backgroundAssetId: string;
  backgroundSrc: string;
  exampleSceneSrc: string;
  assetIds: string[];
  assets: Asset[];
  defaultCreation: {
    stickers: PlacedSticker[];
    sceneState: {
      lampOn: boolean;
    };
  };
  published: boolean;
}

export interface PlacedSticker {
  instanceId: string;
  assetId: string;
  x: number; // 1024 기준 논리 좌표
  y: number; // 768 기준 논리 좌표
  scale: number;
  rotation: number;
  flipX: boolean;
  zIndex: number;
  locked: boolean;
  state?: {
    interactiveActive?: boolean;
    customColor?: string;
  };
}

export interface Creation {
  schemaVersion: number;
  creationId: string;
  setId: string;
  setVersion: number;
  canvasWidth: number;
  canvasHeight: number;
  name: string;
  stickers: PlacedSticker[];
  sceneState: {
    lampOn: boolean;
  };
  updatedAt: string;
}
