import type { Asset } from '../types/manifest';

// Each plant includes its pot and counts as one sticker.
export function greenhousePlantAssets(setId: string): Asset[] {
  const entries = [
    ['rubber-plant', '고무나무 화분', 'Potted rubber plant', 133.33, 160],
    ['boston-fern', '보스턴 고사리 화분', 'Potted Boston fern', 150, 150],
    ['lavender', '라벤더 화분', 'Potted lavender', 104.17, 125],
    ['rosemary', '로즈메리 화분', 'Potted rosemary', 112.5, 120],
    ['basil', '바질 화분', 'Potted basil', 104.84, 110],
    ['column-cactus', '기둥 선인장 화분', 'Potted column cactus', 117.19, 125],
    ['round-cactus', '둥근 선인장 화분', 'Potted round cactus', 100, 100],
    ['rosette-succulent', '장미형 다육 화분', 'Potted rosette succulent', 100, 100],
  ] as const;
  return entries.map(([id, ko, en, width, height], index) => ({
    setId, assetId: 'plants-v1-' + id,
    name: {ko, en, ja:en, zh:en, es:en},
    type: 'static', category: 'plants',
    src: '/assets/diorama/glasshouse-plants-v1/service/' + id + '.png',
    dimensions: {width, height},
    defaultPosition: {x: 400 + (index % 4) * 90, y: 390 + Math.floor(index / 4) * 100},
    defaultTransform: {scale:1, rotation:0, flipX:false},
    layer: {defaultZIndex: 12 + index},
  }));
}

