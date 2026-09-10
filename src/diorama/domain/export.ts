import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { Asset, PlacedSticker } from '../types/manifest';
import { STICKER_COMPONENTS } from '../content/stickerSVGs';
import { RAINY_NIGHT_CAFE_ASSETS } from '../content/rainyNightCafeManifest';

export async function exportDioramaToPNG(
  stickers: PlacedSticker[],
  backgroundSrc: string,
  targetWidth = 2048,
  targetHeight = 1536,
  logicalWidth = 1024,
  logicalHeight = 768,
  assets: Asset[] = RAINY_NIGHT_CAFE_ASSETS
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

  const bgScale = Math.max(targetWidth / bgImg.naturalWidth, targetHeight / bgImg.naturalHeight);
  const bgWidth = bgImg.naturalWidth * bgScale;
  const bgHeight = bgImg.naturalHeight * bgScale;
  ctx.drawImage(bgImg, (targetWidth - bgWidth) / 2, (targetHeight - bgHeight) / 2, bgWidth, bgHeight);

  // 2. zIndex 오름차순 정렬 (Canonical Layer Sorting)
  const sortedStickers = [...stickers].sort((a, b) => a.zIndex - b.zIndex);
  const scaleRatio = targetWidth / logicalWidth;

  // 3. 에셋 매핑 맵
  const assetMap = new Map(assets.map((a) => [a.assetId, a]));

  for (const sticker of sortedStickers) {
    const Component = STICKER_COMPONENTS[sticker.assetId];
    const asset = assetMap.get(sticker.assetId);
    if (!asset) throw new Error(`Unknown sticker asset: ${sticker.assetId}`);

    const baseW = asset.dimensions.width;
    const baseH = asset.dimensions.height;

    const stickerImg = new Image();
    stickerImg.crossOrigin = 'anonymous';

    let blobUrlToRevoke: string | null = null;
    if (asset.src) {
      await new Promise<void>((resolve, reject) => {
        stickerImg.onload = () => resolve();
        stickerImg.onerror = () => reject(new Error(`Failed to load sticker: ${asset.assetId}`));
        stickerImg.src = asset.src!;
      });
    } else if (Component) {
      const svgString = renderToStaticMarkup(
        React.createElement(Component, { width: baseW, height: baseH })
      );
      const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
      blobUrlToRevoke = URL.createObjectURL(svgBlob);
      await new Promise<void>((resolve, reject) => {
        stickerImg.onload = () => resolve();
        stickerImg.onerror = () => { URL.revokeObjectURL(blobUrlToRevoke!); reject(new Error(`Failed to load sticker: ${asset.assetId}`)); };
        stickerImg.src = blobUrlToRevoke!;
      });
    } else {
      throw new Error(`Sticker has no image: ${asset.assetId}`);
    }

    ctx.save();
    ctx.scale(scaleRatio, targetHeight / logicalHeight);
    // 타겟 캔버스(2048x1536) 위치 변환
    ctx.translate(sticker.x, sticker.y);
    ctx.rotate((sticker.rotation * Math.PI) / 180);
    ctx.scale(
      (sticker.flipX ? -1 : 1) * sticker.scale,
      sticker.scale
    );

    const fit = Math.min(baseW / stickerImg.naturalWidth, baseH / stickerImg.naturalHeight);
    const drawW = stickerImg.naturalWidth * fit;
    const drawH = stickerImg.naturalHeight * fit;
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
