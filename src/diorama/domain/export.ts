import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { PlacedSticker } from '../types/manifest';
import { STICKER_COMPONENTS } from '../content/stickerSVGs';
import { RAINY_NIGHT_CAFE_ASSETS } from '../content/rainyNightCafeManifest';

export async function exportDioramaToPNG(
  stickers: PlacedSticker[],
  backgroundSrc: string,
  targetWidth = 2048,
  targetHeight = 1536,
  logicalWidth = 1024,
  _logicalHeight = 768
): Promise<string> {
  const canvas = document.createElement('canvas');
  canvas.width = targetWidth;
  canvas.height = targetHeight;
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    throw new Error('Canvas 2D context could not be created');
  }

  // 1. 배경 이미지 로드 및 렌더링
  const bgImg = new Image();
  bgImg.crossOrigin = 'anonymous';
  await new Promise<void>((resolve, reject) => {
    bgImg.onload = () => resolve();
    bgImg.onerror = () => reject(new Error(`Failed to load background image: ${backgroundSrc}`));
    bgImg.src = backgroundSrc;
  });

  ctx.drawImage(bgImg, 0, 0, targetWidth, targetHeight);

  // 2. zIndex 오름차순 정렬 (Canonical Layer Sorting)
  const sortedStickers = [...stickers].sort((a, b) => a.zIndex - b.zIndex);
  const scaleRatio = targetWidth / logicalWidth; // 2.0

  // 3. 에셋 매핑 맵
  const assetMap = new Map(RAINY_NIGHT_CAFE_ASSETS.map((a) => [a.assetId, a]));

  for (const sticker of sortedStickers) {
    const Component = STICKER_COMPONENTS[sticker.assetId];
    const asset = assetMap.get(sticker.assetId);
    if (!asset) continue;

    const baseW = asset.dimensions.width;
    const baseH = asset.dimensions.height;

    const stickerImg = new Image();
    stickerImg.crossOrigin = 'anonymous';

    let blobUrlToRevoke: string | null = null;
    if (asset.src) {
      await new Promise<void>((resolve) => {
        stickerImg.onload = () => resolve();
        stickerImg.onerror = () => resolve();
        stickerImg.src = asset.src!;
      });
    } else if (Component) {
      const svgString = renderToStaticMarkup(
        React.createElement(Component, { width: baseW, height: baseH })
      );
      const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
      blobUrlToRevoke = URL.createObjectURL(svgBlob);
      await new Promise<void>((resolve) => {
        stickerImg.onload = () => resolve();
        stickerImg.onerror = () => resolve();
        stickerImg.src = blobUrlToRevoke!;
      });
    } else {
      continue;
    }

    ctx.save();
    // 타겟 캔버스(2048x1536) 위치 변환
    ctx.translate(sticker.x * scaleRatio, sticker.y * scaleRatio);
    ctx.rotate((sticker.rotation * Math.PI) / 180);
    ctx.scale(
      (sticker.flipX ? -1 : 1) * sticker.scale,
      sticker.scale
    );

    const drawW = baseW * scaleRatio;
    const drawH = baseH * scaleRatio;
    ctx.drawImage(stickerImg, -drawW / 2, -drawH / 2, drawW, drawH);
    ctx.restore();

    if (blobUrlToRevoke) {
      URL.revokeObjectURL(blobUrlToRevoke);
    }
  }

  return canvas.toDataURL('image/png');
}

export function downloadDataUrl(dataUrl: string, filename = 'cozy-cafe-diorama.png') {
  const link = document.createElement('a');
  link.download = filename;
  link.href = dataUrl;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
