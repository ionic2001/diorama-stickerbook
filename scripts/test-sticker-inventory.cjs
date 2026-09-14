const { chromium } = require('playwright');
const assert = require('node:assert/strict');
const base = process.env.TEST_BASE_URL || 'http://127.0.0.1:5174';

(async () => {
  const browser = await chromium.launch({ headless: true, channel: process.env.TEST_BROWSER || 'chrome' });
  try {
    const context = await browser.newContext({ viewport: { width: 1280, height: 850 } });
    const page = await context.newPage();
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));

    await page.goto(base + '/themes/');
    assert.equal(await page.locator('.level-list').count(), 0);
    assert.match(await page.locator('.selection-panel').innerText(), /출시 세트 75개 이상/);

    await page.goto(base + '/studio/?set=glasshouse-botanist');
    await page.evaluate(() => localStorage.removeItem('qk-diorama-saved-glasshouse-botanist'));
    await page.reload();
    await page.waitForSelector('.drawer-grid button');
    assert.equal(await page.locator('.drawer-categories').count(), 0);
    assert.equal(await page.getByRole('button', { name: '가구', exact: true }).count(), 0);
    const initialCount = await page.locator('.drawer-grid button').count();
    assert(initialCount > 0);
    const first = page.locator('.drawer-grid button').first();
    const name = await first.getAttribute('aria-label');
    await first.click();
    assert.equal(await page.locator('.drawer-grid button[aria-label="' + name + '"]').count(), 0);
    assert.equal(await page.getByRole('button', { name: '복제', exact: true }).count(), 0);

    await page.getByRole('button', { name: '실행 취소', exact: true }).click();
    assert.equal(await page.locator('.drawer-grid button[aria-label="' + name + '"]').count(), 1);
    await page.getByRole('button', { name: '다시 실행', exact: true }).click();
    assert.equal(await page.locator('.drawer-grid button[aria-label="' + name + '"]').count(), 0);

    await page.waitForTimeout(750);
    await page.reload();
    assert.equal(await page.locator('.drawer-grid button[aria-label="' + name + '"]').count(), 0);
    await page.locator('[data-sticker-id]').first().click();
    await page.getByRole('button', { name: '삭제', exact: true }).click();
    assert.equal(await page.locator('.drawer-grid button[aria-label="' + name + '"]').count(), 1);

    await page.goto(base + '/studio/?set=glasshouse-botanist&pilot=combined');
    await page.evaluate(() => localStorage.removeItem('qk-diorama-saved-glasshouse-combined-intermediate-pilot-v1'));
    await page.reload();
    await page.getByText('모든 스티커를 사용했어요. 작품에서 삭제하면 다시 나타납니다.', { exact: true }).waitFor();
    assert.equal(await page.locator('[data-sticker-id]').count(), 9);

    await page.goto(base + '/en/studio/?set=glasshouse-botanist&pilot=combined');
    await page.getByText('You used every sticker. Delete one from the scene to bring it back.', { exact: true }).waitFor();
    assert.deepEqual(errors, []);
    console.log('PASS: no difficulty or category selectors; used sticker hides, undo/delete restores, redo/reload hides, duplicate removed, empty states localized');
  } finally {
    await browser.close();
  }
})().catch(error => { console.error(error); process.exitCode = 1; });
