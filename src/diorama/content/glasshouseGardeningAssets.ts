import type { Asset } from '../types/manifest';

// Complete placement units; the glove pair counts as one sticker.
export function greenhouseGardeningAssets(setId: string): Asset[] {
  const entries = [
    ["soil-bag","흙 주머니","Soil bag",113.2,115],
    ["seed-box","빈 씨앗 보관 상자","Empty seed storage box",120,80],
    ["sunflower-seeds","해바라기 씨앗 봉투","Sunflower seed packet",40,60],
    ["herb-seeds","허브 씨앗 봉투","Herb seed packet",50,60],
    ["wildflower-seeds","야생화 씨앗 봉투","Wildflower seed packet",40,60],
    ["hand-rake","손갈퀴","Hand rake",100,66.67],
    ["gardening-gloves","원예 장갑 한 쌍","Gardening gloves",108.57,110],
    ["twine-spool","황마 끈 뭉치","Jute twine spool",85,77.7],
  ] as const;
  return entries.map(([id, ko, en, width, height], index) => ({
    setId, assetId: 'gardening-v1-' + id,
    name: {ko, en, ja:en, zh:en, es:en},
    type: 'static', category: 'decor',
    src: '/assets/diorama/glasshouse-gardening-v1/service/' + id + '.png',
    dimensions: {width, height},
    defaultPosition: {x:400+(index%4)*90, y:390+Math.floor(index/4)*100},
    defaultTransform: {scale:1, rotation:0, flipX:false},
    layer: {defaultZIndex:20+index},
  }));
}

