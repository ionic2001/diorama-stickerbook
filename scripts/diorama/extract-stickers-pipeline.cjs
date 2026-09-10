/**
 * 🌿 Diorama Sticker Extraction Pipeline (3단계 파이프라인의 2단계 도구)
 * 
 * 기능:
 * 1. 바운딩 박스 기반 스티커 시트 영역 크롭
 * 2. 8방향 Flood-fill 외곽 배경 투명화 (윤곽선 자동 감지)
 * 3. 내부 음각 공간(Negative Space) 관통 천공 (의자 살, 사다리 발판 사이 등)
 * 4. 가장자리 디프린징(Defringing) & 안티앨리어싱 보정 (하얀 후광/테두리 박멸)
 * 5. 연결 요소 필터링(Connected Components)으로 인접 사물 침범 픽셀 제거
 * 6. 타이트 오토 크롭 및 무손실 PNG 저장
 * 
 * 실행:
 * node scripts/diorama/extract-stickers-pipeline.cjs <sheetPath> <outDir> <configJsonPath>
 */

const fs = require('fs');
const path = require('path');
const upng = require('@pdf-lib/upng').default;

function getLuminance(r, g, b) {
  return 0.299 * r + 0.587 * g + 0.114 * b;
}

function isBackgroundWhite(r, g, b, threshold = 205) {
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  return (r > threshold && g > threshold && b > threshold && (max - min) < 30);
}

function extractSticker(sheetRgba, SW, SH, assetId, def, outDir) {
  const bbox = def.bbox;
  const w = bbox.maxX - bbox.minX + 1;
  const h = bbox.maxY - bbox.minY + 1;
  const rgba = new Uint8Array(w * h * 4);

  // 1. 바운딩 박스 복사
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const sx = Math.min(Math.max(bbox.minX + x, 0), SW - 1);
      const sy = Math.min(Math.max(bbox.minY + y, 0), SH - 1);
      const srcIdx = (sy * SW + sx) * 4;
      const dstIdx = (y * w + x) * 4;
      rgba[dstIdx] = sheetRgba[srcIdx];
      rgba[dstIdx + 1] = sheetRgba[srcIdx + 1];
      rgba[dstIdx + 2] = sheetRgba[srcIdx + 2];
      rgba[dstIdx + 3] = 255;
    }
  }

  // 2. 외곽 4개 경계에서 8방향 Flood-Fill (윤곽선 lum < 145에서 멈춤)
  const visited = new Uint8Array(w * h);
  const queue = [];

  for (let x = 0; x < w; x++) {
    queue.push(x, 0); queue.push(x, h - 1);
    visited[x] = 1; visited[(h - 1) * w + x] = 1;
  }
  for (let y = 1; y < h - 1; y++) {
    queue.push(0, y); queue.push(w - 1, y);
    visited[y * w] = 1; visited[y * w + (w - 1)] = 1;
  }

  let head = 0;
  while (head < queue.length) {
    const cx = queue[head++];
    const cy = queue[head++];
    const idx = (cy * w + cx) * 4;
    const lum = getLuminance(rgba[idx], rgba[idx + 1], rgba[idx + 2]);

    if (lum < 145) continue;

    rgba[idx + 3] = 0;

    for (const [dx, dy] of [[1,0], [-1,0], [0,1], [0,-1], [1,1], [-1,-1], [1,-1], [-1,1]]) {
      const nx = cx + dx, ny = cy + dy;
      if (nx >= 0 && nx < w && ny >= 0 && ny < h) {
        const nIdx = ny * w + nx;
        if (!visited[nIdx]) {
          visited[nIdx] = 1;
          queue.push(nx, ny);
        }
      }
    }
  }

  // 3. 내부 음각 공간(Negative Space) 관통 천공
  if (def.cleanInnerHoles) {
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const idx = (y * w + x) * 4;
        if (rgba[idx + 3] > 0 && isBackgroundWhite(rgba[idx], rgba[idx + 1], rgba[idx + 2])) {
          rgba[idx + 3] = 0;
        }
      }
    }
  }

  // 4. 가장자리 디프린징(Defringing) 및 스무딩
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const idx = (y * w + x) * 4;
      if (rgba[idx + 3] > 0) {
        let hasTrans = false;
        for (const [dx, dy] of [[1,0], [-1,0], [0,1], [0,-1]]) {
          const nx = x + dx, ny = y + dy;
          if (nx >= 0 && nx < w && ny >= 0 && ny < h && rgba[(ny * w + nx) * 4 + 3] === 0) {
            hasTrans = true; break;
          }
        }
        if (hasTrans) {
          const r = rgba[idx], g = rgba[idx+1], b = rgba[idx+2];
          const lum = getLuminance(r, g, b);
          if (lum > 175) {
            rgba[idx + 3] = 0; // 흰색 잔여물 박멸
          } else if (lum > 115) {
            rgba[idx] = Math.round(r * 0.45);
            rgba[idx + 1] = Math.round(g * 0.45);
            rgba[idx + 2] = Math.round(b * 0.45);
            rgba[idx + 3] = 190; // 안티앨리어싱 먹선화
          }
        }
      }
    }
  }

  // 5. 연결 컴포넌트 분석으로 주변 침범 픽셀 박멸
  const compVisited = new Uint8Array(w * h);
  const components = [];
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const idx = y * w + x;
      if (rgba[idx * 4 + 3] > 0 && !compVisited[idx]) {
        const comp = [];
        const cQueue = [x, y];
        compVisited[idx] = 1;
        let cHead = 0;
        while (cHead < cQueue.length) {
          const qx = cQueue[cHead++];
          const qy = cQueue[cHead++];
          comp.push(qy * w + qx);
          for (const [dx, dy] of [[1,0], [-1,0], [0,1], [0,-1]]) {
            const nx = qx + dx, ny = qy + dy;
            if (nx >= 0 && nx < w && ny >= 0 && ny < h) {
              const nIdx = ny * w + nx;
              if (rgba[nIdx * 4 + 3] > 0 && !compVisited[nIdx]) {
                compVisited[nIdx] = 1;
                cQueue.push(nx, ny);
              }
            }
          }
        }
        components.push(comp);
      }
    }
  }

  components.sort((a, b) => b.length - a.length);
  const numToKeep = def.keepComponents || 1;
  const keepSet = new Set();
  for (let i = 0; i < Math.min(numToKeep, components.length); i++) {
    for (const p of components[i]) keepSet.add(p);
  }
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      if (!keepSet.has(y * w + x)) rgba[(y * w + x) * 4 + 3] = 0;
    }
  }

  // 6. 타이트 크롭
  let minX = w, minY = h, maxX = 0, maxY = 0;
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      if (rgba[(y * w + x) * 4 + 3] > 0) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }

  if (maxX >= minX && maxY >= minY) {
    const cropW = maxX - minX + 1;
    const cropH = maxY - minY + 1;
    const cropRgba = new Uint8Array(cropW * cropH * 4);
    for (let y = 0; y < cropH; y++) {
      for (let x = 0; x < cropW; x++) {
        const s = ((minY + y) * w + (minX + x)) * 4;
        const d = (y * cropW + x) * 4;
        for (let c = 0; c < 4; c++) cropRgba[d + c] = rgba[s + c];
      }
    }
    const outPng = Buffer.from(upng.encode([cropRgba.buffer], cropW, cropH, 0));
    fs.writeFileSync(path.join(outDir, `${assetId}.png`), outPng);
    console.log(`[Extracted] ${assetId}.png: ${cropW}x${cropH}`);
    return { width: cropW, height: cropH };
  }
  return null;
}

module.exports = { extractSticker };
