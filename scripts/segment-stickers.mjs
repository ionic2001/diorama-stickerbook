import fs from 'fs';
import UPNG from '@pdf-lib/upng';

const upng = UPNG.default || UPNG;
const buf = fs.readFileSync('public/assets/diorama/rainy-night-cafe/sticker-sheet.png');
const img = upng.decode(buf);
const width = img.width;
const height = img.height;
const rgba = new Uint8Array(upng.toRGBA8(img)[0]);

// 배경 판별 함수: 베이지/크림색 배경
function isBg(r, g, b) {
  // 베이지 배경: r around 242~252, g around 238~248, b around 226~238
  // R > 238 && G > 234 && B > 222 && (R - B) between 8 and 22
  return r >= 238 && g >= 233 && b >= 220 && (r - b) >= 6 && (r - b) <= 24 && Math.abs(r - g) <= 12;
}

// 텍스트 라벨 영역 (스티커 아래의 영문 텍스트 라벨들은 갈색 텍스트: #4a2e18 등)
// y < 60 은 상단 타이틀 "COZY CAFÉ STICKER COLLECTION"

// 2D 마스크 생성 (1: 전경 스티커 및 외곽선, 0: 배경)
const mask = new Uint8Array(width * height);
for (let y = 0; y < height; y++) {
  // 상단 타이틀 영역 제외
  if (y < 65) continue;
  for (let x = 0; x < width; x++) {
    const idx = (y * width + x) * 4;
    const r = rgba[idx];
    const g = rgba[idx + 1];
    const b = rgba[idx + 2];
    if (!isBg(r, g, b)) {
      mask[y * width + x] = 1;
    }
  }
}

// BFS / Flood fill로 Connected Components 추출
const visited = new Uint8Array(width * height);
const components = [];

for (let y = 65; y < height; y++) {
  for (let x = 0; x < width; x++) {
    const pos = y * width + x;
    if (mask[pos] === 1 && visited[pos] === 0) {
      // 새로운 컴포넌트 발견
      const queue = [pos];
      visited[pos] = 1;
      let minX = x, maxX = x, minY = y, maxY = y;
      let pixelCount = 0;

      while (queue.length > 0) {
        const curr = queue.pop();
        pixelCount++;
        const cy = Math.floor(curr / width);
        const cx = curr % width;

        if (cx < minX) minX = cx;
        if (cx > maxX) maxX = cx;
        if (cy < minY) minY = cy;
        if (cy > maxY) maxY = cy;

        // 4방향 탐색
        const neighbors = [
          curr - 1,
          curr + 1,
          curr - width,
          curr + width,
        ];

        for (const n of neighbors) {
          if (n >= 0 && n < width * height && mask[n] === 1 && visited[n] === 0) {
            visited[n] = 1;
            queue.push(n);
          }
        }
      }

      // 너무 작은 컴포넌트(텍스트의 점이나 노이즈) 제외
      const w = maxX - minX + 1;
      const h = maxY - minY + 1;
      if (pixelCount > 400 && w > 20 && h > 20) {
        components.push({ minX, maxX, minY, maxY, w, h, pixelCount });
      }
    }
  }
}

console.log(`Found ${components.length} major components:`);
components.sort((a, b) => a.minY - b.minY || a.minX - b.minX);
components.forEach((c, idx) => {
  console.log(`[${idx+1}] bbox: (${c.minX}, ${c.minY}) ~ (${c.maxX}, ${c.maxY}) w=${c.w} h=${c.h} px=${c.pixelCount}`);
});
