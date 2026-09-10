import React from 'react';
import type { Locale } from './pageContent';

export type AdPlacementId = 'home-after-themes' | 'themes-after-selection' | 'guide-after-content';

// No provider is connected yet. Previewing never loads an ad SDK or stores consent.
export default function AdPlacement({ id, locale, preview }: { id: AdPlacementId; locale: Locale; preview: boolean }) {
  if (!preview) return null;
  return <aside className="service-ad" data-placement={id} aria-label={locale === 'ko' ? '광고 배치 미리보기' : 'Ad placement preview'}>
    <small>{locale === 'ko' ? '광고 · ADVERTISEMENT' : 'ADVERTISEMENT'}</small>
    <div className="service-ad-space">{locale === 'ko' ? '광고 영역 예시 · 실제 광고가 아닙니다' : 'Placement preview · Not a live advertisement'}</div>
  </aside>;
}
