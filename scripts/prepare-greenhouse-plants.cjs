const fs = require('node:fs');
const path = require('node:path');
const sharp = require('sharp');
const root = path.resolve(__dirname, '../public/assets/diorama/glasshouse-plants-v1');
const entries = [
  [
    "rubber-plant",
    "고무나무 화분",
    "Potted rubber plant",
    "A small rubber tree with upright woody stems and six thick oval deep-green leaves in a warm cream ceramic pot.",
    16,
    160
  ],
  [
    "boston-fern",
    "보스턴 고사리 화분",
    "Potted Boston fern",
    "A compact Boston fern with arching finely divided green fronds in a squat muted teal ceramic pot.",
    17,
    150
  ],
  [
    "lavender",
    "라벤더 화분",
    "Potted lavender",
    "A lavender bush with slim gray-green leaves and numerous delicate purple flower spikes in a weathered terracotta pot.",
    19,
    125
  ],
  [
    "rosemary",
    "로즈메리 화분",
    "Potted rosemary",
    "A compact upright rosemary bush with fine needle-like sage-green leaves and woody stems in a cream stoneware pot.",
    20,
    120
  ],
  [
    "basil",
    "바질 화분",
    "Potted basil",
    "A lush compact basil plant with broad soft bright-green oval leaves in a small terracotta pot.",
    21,
    110
  ],
  [
    "column-cactus",
    "기둥 선인장 화분",
    "Potted column cactus",
    "A small column cactus with three uneven ribbed upright stems and subtle short spines in a muted blue ceramic pot.",
    25,
    125
  ],
  [
    "round-cactus",
    "둥근 선인장 화분",
    "Potted round cactus",
    "One round ribbed barrel cactus with tiny warm golden spines and a small pink flower at its crown in a low terracotta pot.",
    26,
    100
  ],
  [
    "rosette-succulent",
    "장미형 다육 화분",
    "Potted rosette succulent",
    "One fleshy rosette succulent with layered dusty sage leaves and muted pink tips in a shallow cream ceramic bowl.",
    27,
    100
  ]
];
(async () => {
  fs.mkdirSync(path.join(root, 'service'), {recursive:true});
  let total = 0, pixels = 0;
  for (const [id] of entries) {
    const source = path.join(root, 'originals', id + '.png');
    const meta = await sharp(source).metadata();
    const stats = await sharp(source).stats();
    if (!meta.hasAlpha || stats.channels[3].min !== 0) throw new Error(id + ': missing transparency');
    const target = path.join(root, 'service', id + '.png');
    await sharp(source).resize({width:384,height:384,fit:'inside',withoutEnlargement:true}).png({compressionLevel:9}).toFile(target);
    const m = await sharp(target).metadata();
    const bytes = fs.statSync(target).size;
    total += bytes; pixels += m.width*m.height;
    console.log(id, m.width, m.height, bytes);
  }
  console.log('TOTAL_BYTES',total,'RGBA_MIB',pixels*4/1048576);
})().catch(e=>{console.error(e);process.exitCode=1});

