import { ContentSet, Asset } from '../types/manifest';

export const GLASSHOUSE_BOTANIST_ASSETS: Asset[] = [
  {
    setId: 'glasshouse-botanist',
    assetId: 'furniture-workbench',
    name: {
      ko: '원목 가드닝 분갈이 작업대',
      en: 'Gardening Potting Workbench',
      ja: 'ガーデニング作業台',
      zh: '园艺种植工作台',
      es: 'Mesa de trabajo de jardinería',
    },
    type: 'static',
    category: 'furniture',
    src: '/assets/diorama/glasshouse-botanist/stickers/furniture-workbench.png?v=1',
    defaultTransform: {
      scale: 1,
      rotation: 0,
      flipX: false,
    },
    defaultPosition: {
      x: 181,
      y: 592,
    },
    dimensions: {
      width: 363,
      height: 397,
    },
    layer: {
      defaultZIndex: 26,
    },
  },
  {
    setId: 'glasshouse-botanist',
    assetId: 'plant-lemon-tree',
    name: {
      ko: '노란 열매 레몬 나무 화분',
      en: 'Potted Lemon Tree',
      ja: 'レモンの木の鉢植え',
      zh: '盆栽柠檬树',
      es: 'Limonero en maceta',
    },
    type: 'static',
    category: 'plants',
    src: '/assets/diorama/glasshouse-botanist/stickers/plant-lemon-tree.png?v=1',
    defaultTransform: {
      scale: 1,
      rotation: 0,
      flipX: false,
    },
    defaultPosition: {
      x: 363,
      y: 489,
    },
    dimensions: {
      width: 197,
      height: 360,
    },
    layer: {
      defaultZIndex: 24,
    },
  },
  {
    setId: 'glasshouse-botanist',
    assetId: 'furniture-plantshelf',
    name: {
      ko: '3단 테라리움 플랜트 원목 선반',
      en: 'Tiered Plant & Terrarium Shelf',
      ja: '多段観葉植物シェルフ',
      zh: '多层植物微景观木架',
      es: 'Estantería de plantas y terrarios',
    },
    type: 'static',
    category: 'furniture',
    src: '/assets/diorama/glasshouse-botanist/stickers/furniture-plantshelf.png?v=1',
    defaultTransform: {
      scale: 1,
      rotation: 0,
      flipX: false,
    },
    defaultPosition: {
      x: 567,
      y: 474,
    },
    dimensions: {
      width: 204,
      height: 287,
    },
    layer: {
      defaultZIndex: 20,
    },
  },
  {
    setId: 'glasshouse-botanist',
    assetId: 'furniture-stepladder',
    name: {
      ko: '온실 빈티지 원목 사다리',
      en: 'Greenhouse Wooden Stepladder',
      ja: '温室の木製脚立',
      zh: '温室复古木梯',
      es: 'Escalera de madera de invernadero',
    },
    type: 'static',
    category: 'furniture',
    src: '/assets/diorama/glasshouse-botanist/stickers/furniture-stepladder.png?v=1',
    defaultTransform: {
      scale: 1,
      rotation: 0,
      flipX: false,
    },
    defaultPosition: {
      x: 717,
      y: 480,
    },
    dimensions: {
      width: 101,
      height: 146,
    },
    layer: {
      defaultZIndex: 16,
    },
  },
  {
    setId: 'glasshouse-botanist',
    assetId: 'plant-tropical-palm',
    name: {
      ko: '풍성한 온실 야자 화분',
      en: 'Lush Potted Greenhouse Palm',
      ja: '豊かなヤシの鉢植え',
      zh: '茂盛的盆栽棕榈',
      es: 'Palmera exuberante en maceta',
    },
    type: 'static',
    category: 'plants',
    src: '/assets/diorama/glasshouse-botanist/stickers/plant-tropical-palm.png?v=1',
    defaultTransform: {
      scale: 1,
      rotation: 0,
      flipX: false,
    },
    defaultPosition: {
      x: 811,
      y: 418,
    },
    dimensions: {
      width: 136,
      height: 167,
    },
    layer: {
      defaultZIndex: 18,
    },
  },
  {
    setId: 'glasshouse-botanist',
    assetId: 'furniture-wicker-armchair',
    name: {
      ko: '아늑한 라탄 위커 암체어',
      en: 'Cozy Wicker Armchair',
      ja: 'ラタンのアームチェア',
      zh: '舒适藤编扶手椅',
      es: 'Sillón de mimbre acogedor',
    },
    type: 'static',
    category: 'furniture',
    src: '/assets/diorama/glasshouse-botanist/stickers/furniture-wicker-armchair.png?v=1',
    defaultTransform: {
      scale: 1,
      rotation: 0,
      flipX: false,
    },
    defaultPosition: {
      x: 768,
      y: 626,
    },
    dimensions: {
      width: 242,
      height: 284,
    },
    layer: {
      defaultZIndex: 34,
    },
  },
  {
    setId: 'glasshouse-botanist',
    assetId: 'furniture-crate',
    name: {
      ko: '빈티지 원목 수납 상자',
      en: 'Vintage Wooden Storage Crate',
      ja: 'ヴィンテージ木箱',
      zh: '复古木制储物箱',
      es: 'Caja de madera vintage',
    },
    type: 'static',
    category: 'furniture',
    src: '/assets/diorama/glasshouse-botanist/stickers/furniture-crate.png?v=1',
    defaultTransform: {
      scale: 1,
      rotation: 0,
      flipX: false,
    },
    defaultPosition: {
      x: 917,
      y: 680,
    },
    dimensions: {
      width: 205,
      height: 161,
    },
    layer: {
      defaultZIndex: 36,
    },
  },
  {
    setId: 'glasshouse-botanist',
    assetId: 'cat-sleeping-calico',
    name: {
      ko: '상자 위 낮잠 자는 삼색 고양이',
      en: 'Sleeping Calico Cat on Crate',
      ja: '木箱の上で眠る三毛猫',
      zh: '在木箱上熟睡的三花猫',
      es: 'Gato calicó durmiendo sobre la caja',
    },
    type: 'interactive',
    category: 'cats',
    src: '/assets/diorama/glasshouse-botanist/stickers/cat-sleeping-calico.png?v=1',
    defaultTransform: {
      scale: 1,
      rotation: 0,
      flipX: false,
    },
    defaultPosition: {
      x: 911,
      y: 614,
    },
    dimensions: {
      width: 141,
      height: 78,
    },
    layer: {
      defaultZIndex: 40,
    },
  },
  {
    setId: 'glasshouse-botanist',
    assetId: 'plant-hanging-macrame-1',
    name: {
      ko: '행잉 마크라메 고사리 플랜터',
      en: 'Hanging Macramé Fern Planter',
      ja: 'ハンギングマクラメシダ植物',
      zh: '悬挂式编织蕨类盆栽',
      es: 'Macetero colgante de macramé con helecho',
    },
    type: 'static',
    category: 'plants',
    src: '/assets/diorama/glasshouse-botanist/stickers/plant-hanging-macrame-1.png?v=1',
    defaultTransform: {
      scale: 1,
      rotation: 0,
      flipX: false,
    },
    defaultPosition: {
      x: 900,
      y: 167,
    },
    dimensions: {
      width: 131,
      height: 317,
    },
    layer: {
      defaultZIndex: 14,
    },
  },
  {
    setId: 'glasshouse-botanist',
    assetId: 'plant-hanging-macrame-2',
    name: {
      ko: '행잉 마크라메 덩굴 플랜터',
      en: 'Hanging Macramé Trailing Ivy',
      ja: 'ハンギングマクラメつる植物',
      zh: '悬挂式编织常春藤盆栽',
      es: 'Macetero colgante de macramé con hiedra',
    },
    type: 'static',
    category: 'plants',
    src: '/assets/diorama/glasshouse-botanist/stickers/plant-hanging-macrame-2.png?v=1',
    defaultTransform: {
      scale: 1,
      rotation: 0,
      flipX: false,
    },
    defaultPosition: {
      x: 798,
      y: 178,
    },
    dimensions: {
      width: 91,
      height: 287,
    },
    layer: {
      defaultZIndex: 12,
    },
  },
  {
    setId: 'glasshouse-botanist',
    assetId: 'decor-botanical-posters',
    name: {
      ko: '벽걸이 빈티지 보태니컬 식물도감 세트',
      en: 'Wall Hanging Botanical Prints Set',
      ja: '植物標本アートポスターセット',
      zh: '墙上植物图鉴插画海报组',
      es: 'Set de láminas botánicas para pared',
    },
    type: 'static',
    category: 'decor',
    src: '/assets/diorama/glasshouse-botanist/stickers/decor-botanical-posters.png?v=1',
    defaultTransform: {
      scale: 1,
      rotation: 0,
      flipX: false,
    },
    defaultPosition: {
      x: 122,
      y: 330,
    },
    dimensions: {
      width: 201,
      height: 104,
    },
    layer: {
      defaultZIndex: 10,
    },
  },
  {
    setId: 'glasshouse-botanist',
    assetId: 'decor-terrarium',
    name: {
      ko: '기하학 유리 온실 다육 테라리움',
      en: 'Geometric Prism Glass Terrarium',
      ja: 'プリズムガラステラリウム',
      zh: '多面体玻璃多肉微景观',
      es: 'Terrario geométrico de vidrio',
    },
    type: 'static',
    category: 'decor',
    src: '/assets/diorama/glasshouse-botanist/stickers/decor-terrarium.png?v=1',
    defaultTransform: {
      scale: 1,
      rotation: 0,
      flipX: false,
    },
    defaultPosition: {
      x: 580,
      y: 634,
    },
    dimensions: {
      width: 71,
      height: 103,
    },
    layer: {
      defaultZIndex: 32,
    },
  },
  {
    setId: 'glasshouse-botanist',
    assetId: 'decor-potted-succulents',
    name: {
      ko: '클래식 테라코타 토분 다육이 모둠',
      en: 'Terracotta Potted Succulents Cluster',
      ja: '素焼き鉢の多肉植物セット',
      zh: '红陶多肉盆栽组合',
      es: 'Conjunto de suculentas en macetas de barro',
    },
    type: 'static',
    category: 'plants',
    src: '/assets/diorama/glasshouse-botanist/stickers/decor-potted-succulents.png?v=1',
    defaultTransform: {
      scale: 1,
      rotation: 0,
      flipX: false,
    },
    defaultPosition: {
      x: 461,
      y: 686,
    },
    dimensions: {
      width: 154,
      height: 116,
    },
    layer: {
      defaultZIndex: 42,
    },
  },
  {
    setId: 'glasshouse-botanist',
    assetId: 'tool-trowel',
    name: {
      ko: '우드 핸들 원예용 모종삽',
      en: 'Wooden Handle Gardening Trowel',
      ja: '木製ハンドルの園芸スコップ',
      zh: '木柄园艺小铲',
      es: 'Paleta de jardinería con mango de madera',
    },
    type: 'static',
    category: 'decor',
    src: '/assets/diorama/glasshouse-botanist/stickers/tool-trowel.png?v=1',
    defaultTransform: {
      scale: 1,
      rotation: 0,
      flipX: false,
    },
    defaultPosition: {
      x: 235,
      y: 549,
    },
    dimensions: {
      width: 22,
      height: 85,
    },
    layer: {
      defaultZIndex: 29,
    },
  },
  {
    setId: 'glasshouse-botanist',
    assetId: 'tool-pruners',
    name: {
      ko: '전문가용 원예 전정가위',
      en: 'Garden Pruning Shears',
      ja: '剪定ばさみ',
      zh: '专业园艺修枝剪',
      es: 'Tijeras de podar de jardinería',
    },
    type: 'static',
    category: 'decor',
    src: '/assets/diorama/glasshouse-botanist/stickers/tool-pruners.png?v=1',
    defaultTransform: {
      scale: 1,
      rotation: 0,
      flipX: false,
    },
    defaultPosition: {
      x: 273,
      y: 549,
    },
    dimensions: {
      width: 26,
      height: 68,
    },
    layer: {
      defaultZIndex: 28,
    },
  },
  {
    setId: 'glasshouse-botanist',
    assetId: 'decor-seed-packets',
    name: {
      ko: '빈티지 식물 씨앗 봉투 모음',
      en: 'Vintage Botanical Seed Packets',
      ja: 'ヴィンテージ種袋セット',
      zh: '复古植物种子袋合辑',
      es: 'Sobres de semillas botánicas vintage',
    },
    type: 'static',
    category: 'decor',
    src: '/assets/diorama/glasshouse-botanist/stickers/decor-seed-packets.png?v=1',
    defaultTransform: {
      scale: 1,
      rotation: 0,
      flipX: false,
    },
    defaultPosition: {
      x: 115,
      y: 506,
    },
    dimensions: {
      width: 42,
      height: 82,
    },
    layer: {
      defaultZIndex: 30,
    },
  },
];

export const GLASSHOUSE_BOTANIST_MANIFEST: ContentSet = {
  setId: 'glasshouse-botanist',
  version: 1,
  title: {
    ko: '아늑한 온실 정원',
    en: 'Glasshouse Botanist',
    ja: '温かな温室ガーデン',
    zh: '温馨温室植物园',
    es: 'Invernadero Botánico Acogedor',
  },
  description: {
    ko: '따스한 오후 햇살이 비쳐 드는 유리 온실 정원에서 식물과 가구를 배치하는 힐링 디오라마입니다.',
    en: 'A soothing diorama of a sunlit glasshouse garden where you arrange plants, botanical tools, and cozy furniture.',
    ja: '午後の陽だまりが差し込むガラス温室で植物や家具を配置する癒しのジオラマ。',
    zh: '在午后阳光洒入的温室花园中自由摆放植物与家具的治愈系模型。',
    es: 'Un relajante diorama de invernadero bañado por el sol de la tarde.',
  },
  canvas: {
    width: 1024,
    height: 768,
    aspectRatio: '4:3',
  },
  backgroundAssetId: 'bg-glasshouse',
  backgroundSrc: '/assets/diorama/glasshouse-botanist/bg-glasshouse.jpg',
  exampleSceneSrc: '/assets/diorama/glasshouse-botanist/example-scene.jpg',
  assetIds: GLASSHOUSE_BOTANIST_ASSETS.map((a) => a.assetId),
  assets: GLASSHOUSE_BOTANIST_ASSETS,
  defaultCreation: {
    stickers: [],
    sceneState: {
      lampOn: false,
    },
  },
  published: true,
};
