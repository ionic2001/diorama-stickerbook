import React, { useEffect, useState } from 'react';
import { ArrowRight, Check, Globe2, Leaf } from 'lucide-react';
import StickerbookPage from './pages/StickerbookPage';
import AdSettingsPage from './AdSettingsPage';
import AdPlacement from './AdPlacement';

import { articles, pageMeta, pagePath, parsePath, Page, publicPages } from './pageContent';
import { legalArticles } from './legalContent';
type ThemeId = 'glasshouse-botanist' | 'rainy-night-cafe';
type Difficulty = 'beginner' | 'intermediate' | 'advanced';

const copy = {
  ko: {
    nav: ['테마 둘러보기', '이용방법', '특징', 'About Us'],
    eyebrow: '스티커로 만드는 나만의 쉼',
    title: '오늘의 기분을\n작은 공간에.',
    intro: '섬세한 스티커를 고르고, 천천히 배치하며 나만의 장면을 완성해 보세요. 가입 없이 바로 시작할 수 있어요.',
    start: '꾸미기 시작', explore: '테마 둘러보기', themesTitle: '어떤 공간에 머물까요?',
    themesIntro: '오늘은 온실과 카페에서 시작해 보세요. 새 공간과 난이도별 스티커는 준비 중입니다.',
    method: '처음이어도 가볍게', features: '작은 몰입을 위한 기능', about: '우리가 만드는 공간',
  },
  en: {
    nav: ['Explore themes', 'How it works', 'Features', 'About Us'],
    eyebrow: 'A little pause, made with stickers',
    title: 'A small space\nfor today’s mood.',
    intro: 'Choose delicate stickers, arrange them at your pace, and make a scene that feels like yours. No account required.',
    start: 'Start creating', explore: 'Explore themes', themesTitle: 'Where would you like to stay?',
    themesIntro: 'Start with the greenhouse or café. More scenes and difficulty-specific stickers are in preparation.',
    method: 'Easy from the first sticker', features: 'Made for quiet focus', about: 'Why we make small spaces',
  },
};

const sets = [
  { id: 'glasshouse-botanist', theme: 'garden', title: { ko: '햇살 온실', en: 'Sunlit Greenhouse' }, subtitle: { ko: '햇살이 머무는 초록의 공간', en: 'A green room filled with light' }, image: '/assets/diorama/glasshouse-botanist/example-scene.jpg', ready: true },
  { id: 'moonlit-balcony', theme: 'garden', title: { ko: '달빛 발코니', en: 'Moonlit Balcony' }, subtitle: { ko: '도시의 밤, 나만의 휴식', en: 'A private pause above the city' }, image: '/assets/diorama/glasshouse-botanist/bg-glasshouse.jpg', ready: false },
  { id: 'rainy-night-cafe', theme: 'cafe', title: { ko: '비 오는 밤의 카페', en: 'Rainy Night Café' }, subtitle: { ko: '빗소리와 따뜻한 조명의 시간', en: 'Rain, warm light, and slow time' }, image: '/assets/diorama/rainy-night-cafe/example-scene.jpg', ready: true },
  { id: 'weekend-brunch', theme: 'cafe', title: { ko: '주말 브런치', en: 'Weekend Brunch' }, subtitle: { ko: '느긋한 오전의 작은 식탁', en: 'A slow morning table' }, image: '/assets/diorama/rainy-night-cafe/bg-cafe.jpg', ready: false },
  { id: 'journaling-desk', theme: 'room', title: { ko: '다꾸 작업실', en: 'Journaling Studio' }, subtitle: { ko: '좋아하는 것으로 채우는 하루', en: 'A desk filled with favorite things' }, image: '/assets/diorama/glasshouse-botanist/example-scene.jpg', ready: false },
  { id: 'reading-room', theme: 'room', title: { ko: '포근한 독서방', en: 'Cozy Reading Room' }, subtitle: { ko: '조용한 문장과 따뜻한 조명', en: 'Quiet pages and warm light' }, image: '/assets/diorama/rainy-night-cafe/example-scene.jpg', ready: false },
] as const;

const levels: Array<{ id: Difficulty; ko: string; en: string; count: string; detailKo: string; detailEn: string }> = [
  { id: 'beginner', ko: '초급', en: 'Beginner', count: '≤ 25', detailKo: '완성형 오브젝트', detailEn: 'Grouped objects' },
  { id: 'intermediate', ko: '중급', en: 'Intermediate', count: '≤ 50', detailKo: '부분별로 구성', detailEn: 'Sectioned objects' },
  { id: 'advanced', ko: '고급', en: 'Advanced', count: '≤ 100', detailKo: '일부 소품까지 개별', detailEn: 'Fine individual pieces' },
];

export default function ServiceApp({ initialPath }: { initialPath?: string }) {
  const path = initialPath || (typeof window !== 'undefined' ? window.location.pathname : '/');
  const { locale, page } = parsePath(path);
  const [selectedSet, setSelectedSet] = useState<ThemeId>('glasshouse-botanist');
  const [difficulty, setDifficulty] = useState<Difficulty>('beginner');
  const [adPreview, setAdPreview] = useState(false);
  useEffect(() => {
    setAdPreview(new URLSearchParams(window.location.search).get('ad-preview') === '1');
  }, []);
  const t = copy[locale];
  const previewQuery = adPreview ? '?ad-preview=1' : '';
  const href = (target: Page) => pagePath(target, locale) + (['home','themes','how-to'].includes(target) ? previewQuery : '');
  const ko = locale === 'ko';
  useEffect(() => {
    document.documentElement.lang = locale;
    document.title = pageMeta[locale][page][0];
    document.querySelector('meta[name="description"]')?.setAttribute('content', pageMeta[locale][page][1]);
    // Preserve the prerendered preview noindex policy after hydration.
    if (!publicPages.includes(page) || adPreview) document.querySelector('meta[name="robots"]')?.setAttribute('content', 'noindex, follow');
  }, [page, locale, adPreview]);

  if (page === 'studio') {
    if (typeof window === 'undefined') return <main><h1>{pageMeta[locale].studio[0]}</h1></main>;
    const query = new URLSearchParams(window.location.search);
    const theme = query.get('set') === 'rainy-night-cafe' ? 'rainy-night-cafe' : 'glasshouse-botanist';
    const shelfPilot = theme === 'glasshouse-botanist' && query.get('pilot') === 'shelf';
    const workbenchPilot = theme === 'glasshouse-botanist' && query.get('pilot') === 'workbench';
    const combinedPilot = theme === 'glasshouse-botanist' && query.get('pilot') === 'combined';
    return <StickerbookPage initialThemeId={theme} locale={locale} shelfPilot={shelfPilot} workbenchPilot={workbenchPilot} combinedPilot={combinedPilot} difficulty={shelfPilot || workbenchPilot || combinedPilot ? 'intermediate' : 'beginner'} onExit={() => window.location.assign(href('themes'))} />;
  }

  const article = page === 'how-to' || page === 'features' || page === 'about' ? articles[locale][page] : page === 'privacy' || page === 'terms' ? legalArticles[locale][page] : null;
  return <div className="service-shell">
    <a href="#main" className="skip-link">{ko ? '본문으로 건너뛰기' : 'Skip to content'}</a>
    <header className="site-header">
      <a className="brand" href={href('home')} aria-label="Diorama Stickerbook home"><Leaf size={26} /><span>Diorama Stickerbook</span></a>
      <nav aria-label={ko ? '주 메뉴' : 'Main navigation'}>
        {(['themes','how-to','features','about'] as Page[]).map((target, i) => <a key={target} href={href(target)} aria-current={page === target ? 'page' : undefined}>{t.nav[i]}</a>)}
      </nav>
      <a className="locale-button" href={pagePath(page, ko ? 'en' : 'ko') + previewQuery} hrefLang={ko ? 'en' : 'ko'}><Globe2 size={16} />{ko ? 'EN' : '한국어'}</a>
    </header>
    {adPreview && <div className="ad-preview-notice"><span>{ko ? '광고 배치 미리보기 · 샘플 영역만 표시합니다.' : 'Ad layout preview · Sample placements only.'}</span><a href={pagePath(page, locale)}>{ko ? '미리보기 종료' : 'Exit preview'}</a></div>}
    {page === 'home' ? <main id="main">
      <section className="hero">
        <div className="hero-copy"><p className="eyebrow">{t.eyebrow}</p><h1>{t.title}</h1><p>{t.intro}</p>
          <div className="hero-actions"><a className="primary-button" href={href('themes')}>{t.start}<ArrowRight size={17}/></a><a className="text-button" href={href('how-to')}>{ko ? '이미지로 배우는 이용방법' : 'Illustrated how-to guide'}</a></div>
          <p className="soft-note">{ko ? '가입 없이 시작 · 작품은 이 기기에 저장' : 'No account needed · Saved on this device'}</p>
        </div>
        <div className="hero-art"><img src="/assets/diorama/glasshouse-botanist/example-scene.jpg" alt={ko ? '가구와 식물로 꾸민 햇살 온실 디오라마' : 'An illustrated greenhouse with furniture and plants'} loading="eager" /><span>{ko ? '작은 공간, 깊은 취향' : 'A small space, a personal story'}</span></div>
      </section>
      <section className="theme-preview" aria-label={ko ? '이용 가능한 테마' : 'Available themes'}>
        {sets.filter(set => set.ready).map(set => <a key={set.id} href={href('themes')}><img src={set.image} alt="" loading="lazy"/><span><b>{set.title[locale]}</b><small>{set.subtitle[locale]}</small></span><ArrowRight size={16}/></a>)}
        <a href={href('features')}><img src="/assets/diorama/rainy-night-cafe/bg-cafe.jpg" alt="" loading="lazy"/><span><b>{ko ? '작은 몰입을 위한 기능' : 'Made for quiet focus'}</b><small>{ko ? '편집부터 배경음까지' : 'From editing to background music'}</small></span><ArrowRight size={16}/></a>
      </section>
      <AdPlacement id="home-after-themes" locale={locale} preview={adPreview}/>
      <section className="home-links"><a href={href('how-to')}><b>{ko ? '처음이라면, 한 장씩' : 'Start with one sticker'}</b><p>{ko ? '이미지 안내로 회전·크기 조절·저장까지 익혀보세요.' : 'Learn to place, rotate, resize and save with our illustrated guide.'}</p><span>{t.nav[1]} →</span></a><a href={href('about')}><b>{ko ? '우리가 만드는 작은 쉼' : 'Why we make small spaces'}</b><p>{ko ? '자유로운 창작과 나만의 리듬을 생각합니다.' : 'A little space for creative freedom and your own pace.'}</p><span>About Us →</span></a></section>
    </main> : article ? <main id="main" className="editorial-page">
      <nav className="breadcrumbs" aria-label={ko ? '현재 위치' : 'Breadcrumb'}><a href={href('home')}>{ko ? '홈' : 'Home'}</a><span>/</span><span>{page === 'privacy' ? (ko ? '개인정보 처리 안내' : 'Privacy Notice') : page === 'terms' ? (ko ? '이용약관' : 'Terms of Use') : t.nav[page === 'how-to' ? 1 : page === 'features' ? 2 : 3]}</span></nav>
      <header className="article-heading"><p className="eyebrow">{article.eyebrow}</p><h1>{article.title}</h1><p>{article.intro}</p></header>
      <nav className="article-index" aria-label={ko ? '목차' : 'On this page'}>{article.sections.map((section,i) => <a key={i} href={'#section-' + i}>{section.title}</a>)}</nav>
      <article>{article.sections.map((section,i) => <section className="article-section" id={'section-' + i} key={i}>
        <div className="article-text"><h2>{section.title}</h2>{section.paragraphs.map((paragraph,j) => <p key={j}>{paragraph}</p>)}</div>
        {section.image && <figure><a href={section.image} target="_blank" rel="noreferrer" aria-label={ko ? '설명 이미지 크게 보기' : 'View full size image'}><img src={section.image} alt={section.alt} loading={i === 0 ? 'eager' : 'lazy'} width={section.image.includes('example-scene') ? 1200 : section.image.endsWith('/export.png') ? 2048 : 1280} height={section.image.includes('example-scene') ? 896 : section.image.endsWith('/export.png') ? 1536 : 850}/></a>{section.caption && <figcaption>{section.caption}</figcaption>}</figure>}
      </section>)}</article>
      {page === 'how-to' && <AdPlacement id="guide-after-content" locale={locale} preview={adPreview}/>}
      {!['privacy','terms'].includes(page) && <aside className="article-cta"><h2>{ko ? '이제, 내 공간을 만들어볼까요?' : 'Ready to create your space?'}</h2><a className="primary-button" href={href('themes')}>{t.start}<ArrowRight size={17}/></a><div><a href={href('how-to')}>{t.nav[1]}</a><a href={href('features')}>{t.nav[2]}</a><a href={href('about')}>About Us</a></div></aside>}
    </main> : page === 'ad-settings' ? <AdSettingsPage locale={locale}/> : page === 'themes' ? <main id="main" className="explore-page">
      <div className="page-heading"><p className="eyebrow">THEME & SET</p><h1>{t.themesTitle}</h1><p>{t.themesIntro}</p></div>
      <div className="set-layout"><section className="set-grid">{sets.map(set => <button key={set.id} className={'set-card ' + (selectedSet === set.id ? 'selected' : '')} disabled={!set.ready} onClick={() => setSelectedSet(set.id as ThemeId)}>
        <img src={set.image} alt="" /><span className="set-card-copy"><b>{set.title[locale]}</b><small>{set.subtitle[locale]}</small>{!set.ready && <em>{ko ? '준비 중 · 참고 이미지' : 'Coming soon · Reference image'}</em>}</span>{selectedSet === set.id && <Check className="selected-check" size={18}/>}
      </button>)}</section>
      <aside className="selection-panel"><img src={sets.find(set => set.id === selectedSet)?.image} alt=""/><p className="eyebrow">SELECTED SET</p><h2>{sets.find(set => set.id === selectedSet)?.title[locale]}</h2>
        <p>{ko ? '난이도별 구성은 준비 중입니다.' : 'Difficulty variants are in preparation.'}</p>
        <div className="level-list">{levels.map(level => <button key={level.id} disabled={level.id !== 'beginner'} className={difficulty === level.id ? 'active' : ''} onClick={() => setDifficulty(level.id)}><span><b>{ko ? level.ko : level.en}{level.id !== 'beginner' && (ko ? ' · 준비 중' : ' · Soon')}</b><small>{ko ? level.detailKo : level.detailEn}</small></span><em>{level.count}</em></button>)}</div>
        <p className="performance-note">{ko ? '현재는 기존 스티커 구성으로 체험합니다. 단계별 수량과 분해 기능은 출시 전 성능 검증 후 확정합니다.' : 'Try the current sticker collection. Level limits and object splitting will be finalized after testing.'}</p>
        <a className="primary-button full" href={href('studio') + '?set=' + selectedSet}>{ko ? '이 세트로 시작' : 'Start this set'}<ArrowRight size={17}/></a>
        <a className="panel-help" href={href('how-to')}>{ko ? '처음이라면 이용방법 보기 →' : 'Read the illustrated guide →'}</a>
      </aside></div>
      <AdPlacement id="themes-after-selection" locale={locale} preview={adPreview}/>
    </main> : <main id="main" className="editorial-page"><h1>{pageMeta[locale]['not-found'][0]}</h1><a href={href('home')}>{ko ? '홈으로 돌아가기' : 'Return home'}</a></main>}
    <footer className="site-footer"><a className="footer-brand" href={href('home')}>Diorama Stickerbook</a><div className="footer-links"><span>{(['themes','how-to','features','about'] as Page[]).map((target,i) => <a key={target} href={href(target)}>{t.nav[i]}</a>)}</span><span className="legal-links"><a href={href('privacy')}>{ko ? '개인정보 처리 안내' : 'Privacy'}</a><a href={href('terms')}>{ko ? '이용약관' : 'Terms'}</a><a href={href('ad-settings')}>{ko ? '광고 및 개인정보 설정' : 'Ads & Privacy'}</a></span></div><small>© 2026 Diorama Stickerbook</small></footer>
  </div>;
}
