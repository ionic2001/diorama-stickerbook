import { createServer } from 'vite';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';

const configured = process.env.SITE_URL?.trim();
const origin = configured ? new URL(configured).origin : null;
if (origin && !/^https?:\/\//.test(origin)) throw new Error('SITE_URL must be an HTTP(S) origin');
const legalConfig = JSON.parse(await readFile('src/legal.config.json', 'utf8'));
if (origin && (!legalConfig.operator?.trim() || !legalConfig.contact?.trim())) {
  throw new Error('Production build blocked: complete operator and contact in src/legal.config.json before using SITE_URL.');
}
const server = await createServer({ server: { middlewareMode: true }, appType: 'custom' });
const escape = value => value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
try {
  const { render, pagePath, pageMeta, publicPages, utilityPages } = await server.ssrLoadModule('/src/prerender.tsx');
  const template = await readFile('dist/index.html', 'utf8');
  const urls = [];
  for (const locale of ['ko', 'en']) {
    for (const page of [...publicPages, ...utilityPages, 'studio', 'not-found']) {
      const route = page === 'not-found' ? (locale === 'en' ? '/en/404/' : '/404/') : pagePath(page, locale);
      const [title, description] = pageMeta[locale][page];
      const indexable = publicPages.includes(page);
      const image = (origin || '') + '/assets/diorama/glasshouse-botanist/example-scene.jpg';
      const metadata = [
        '<title>' + escape(title) + '</title>',
        '<meta name="description" content="' + escape(description) + '">',
        '<meta name="robots" content="' + (indexable && origin ? 'index, follow' : 'noindex, follow') + '">',
        '<meta property="og:type" content="website">',
        '<meta property="og:title" content="' + escape(title) + '">',
        '<meta property="og:description" content="' + escape(description) + '">',
        '<meta property="og:image" content="' + escape(image) + '">',
        '<meta property="og:locale" content="' + (locale === 'ko' ? 'ko_KR' : 'en_US') + '">',
        '<meta name="twitter:card" content="summary_large_image">',
      ];
      if (origin && indexable) {
        metadata.push('<link rel="canonical" href="' + origin + route + '">');
        for (const alternate of ['ko', 'en']) metadata.push('<link rel="alternate" hreflang="' + alternate + '" href="' + origin + pagePath(page, alternate) + '">');
        metadata.push('<link rel="alternate" hreflang="x-default" href="' + origin + pagePath(page, 'ko') + '">');
        metadata.push('<meta property="og:url" content="' + origin + route + '">');
        metadata.push('<script type="application/ld+json">' + JSON.stringify({
          '@context': 'https://schema.org', '@type': 'WebPage', name: title, description,
          url: origin + route, inLanguage: locale, isPartOf: { '@type': 'WebSite', name: 'Diorama Stickerbook', url: origin + '/' },
        }).replaceAll('<', '\\u003c') + '</script>');
        urls.push(origin + route);
      }
      const html = template.replace(/<html lang="[^"]*">/, '<html lang="' + locale + '">')
        .replace(/<title>[\s\S]*?<\/title>/g, '')
        .replace(/<meta (?:name="(?:description|robots|twitter:card)"|property="og:[^"]+")[^>]*>/g, '')
        .replace('</head>', metadata.join('\n') + '\n</head>')
        .replace('<div id="root"></div>', '<div id="root">' + render(route) + '</div>');
      const folder = path.join('dist', route);
      await mkdir(folder, { recursive: true });
      await writeFile(path.join(folder, 'index.html'), html);
      if (page === 'not-found' && locale === 'ko') await writeFile('dist/404.html', html);
    }
  }
  if (origin) {
    await writeFile('dist/sitemap.xml', '<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' + urls.map(url => '<url><loc>' + escape(url) + '</loc></url>').join('') + '</urlset>');
    await writeFile('dist/robots.txt', 'User-agent: *\nAllow: /\nSitemap: ' + origin + '/sitemap.xml\n');
  } else {
    await writeFile('dist/robots.txt', 'User-agent: *\nAllow: /\n');
    console.log('Preview build: noindex. Set SITE_URL to the real deployment origin to emit canonical, hreflang and sitemap.');
  }
  console.log(`Prerendered ${publicPages.length * 2} public pages, ${utilityPages.length * 2} utility pages, 2 studio entry pages and 2 not-found pages.`);
} finally { await server.close(); }
