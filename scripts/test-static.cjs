const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const pages = ['', 'themes/', 'how-to/', 'features/', 'about/', 'privacy/', 'terms/'];
const titles = new Set();
for (const lang of ['ko', 'en']) {
 for (const page of pages) {
  const route = (lang === 'en' ? 'en/' : '') + page;
  const html = fs.readFileSync(path.join('dist', route, 'index.html'), 'utf8');
  assert(html.includes('<html lang="' + lang + '">'));
  assert.equal((html.match(/<h1(?:\s|>)/g) || []).length, 1, route);
  const title = html.match(/<title>(.*?)<\/title>/s)?.[1];
  assert(title && !titles.has(title), 'Unique page title: ' + route); titles.add(title);
  assert(html.match(/<meta name="description" content="[^"]{30,}"/));
  assert(html.includes('href="' + (lang === 'en' ? '/en/' : '/') + 'how-to/"'));
  if (['how-to/', 'features/', 'about/', 'privacy/', 'terms/'].includes(page)) {
   assert((html.match(/class="article-text"/g) || []).length >= 5);
   assert((html.match(/<p>/g) || []).length >= 10);
  }
  for (const [, image] of html.matchAll(/<img[^>]*src="([^"]+)"/g)) {
   assert(image.startsWith('/') && fs.existsSync(path.join('dist', image)), 'Image exists: ' + image);
  }
 }
}
for (const route of ['ad-settings/', 'en/ad-settings/']) {
 const html = fs.readFileSync(path.join('dist',route,'index.html'),'utf8');
 assert(html.includes('noindex, follow'));
 assert(html.includes('settings-card'));
}
for (const route of ['studio/', 'en/studio/', '404/']) {
 const html = fs.readFileSync(path.join('dist',route,'index.html'),'utf8');
 assert(html.includes('noindex, follow'));
}
assert(fs.existsSync('dist/404.html'));
console.log('PASS 14 indexable HTML pages include unique titles, localized headings, crawlable links and real images; ad settings/studio/404 are noindex.');
