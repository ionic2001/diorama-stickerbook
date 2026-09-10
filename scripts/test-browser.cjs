const { chromium } = require('playwright');
const assert = require('node:assert/strict');
const fs = require('node:fs/promises');
const path = require('node:path');
const base = process.env.TEST_BASE_URL || 'http://127.0.0.1:5174';

(async () => {
 const browser = await chromium.launch({ headless: true, channel: process.env.TEST_BROWSER || 'chrome' });
 const context = await browser.newContext({ viewport: { width:1280, height:850 }, acceptDownloads:true });
 await context.addInitScript(() => {
   const Native = window.AudioContext;
   window.__audioContexts = []; window.__audioGains = [];
   window.AudioContext = class extends Native {
     constructor(...args) { super(...args); window.__audioContexts.push(this); }
     createGain() { const gain = super.createGain(); window.__audioGains.push(gain); return gain; }
   };
 });
 const page = await context.newPage();
 const errors = [];
 page.on('pageerror', e => errors.push(e.message));
 const guide = path.resolve('public/assets/guide');
 await fs.mkdir(guide, {recursive:true});
 const waitImages = () => page.evaluate(async () => { await Promise.all([...document.images].map(img => { img.loading='eager'; return img.decode().catch(() => {}); })); });
 try {
   await page.goto(base + '/themes/');
   await waitImages();
   await page.screenshot({path:path.join(guide,'themes.png')});
   await page.getByRole('link', {name:'이 세트로 시작'}).click();
   await page.waitForSelector('.drawer-grid button');
   await page.locator('.drawer-grid button').nth(0).click();
   await page.locator('.drawer-grid button').nth(1).click();
   await page.locator('.drawer-grid button').nth(2).click();
   await waitImages();
   await page.screenshot({path:path.join(guide,'studio.png')});
   const rotate = page.getByRole('button',{name:'오른쪽으로 15도 회전'});
   await rotate.click();
   assert.equal(await page.locator('output[aria-label="현재 회전 각도"]').innerText(),'15°');
   await page.getByRole('button',{name:'실행 취소',exact:true}).click();
   assert.equal(await page.locator('output[aria-label="현재 회전 각도"]').innerText(),'0°');
   await page.getByRole('button',{name:'다시 실행',exact:true}).click();
   assert.equal(await page.locator('output[aria-label="현재 회전 각도"]').innerText(),'15°');
   await page.screenshot({path:path.join(guide,'rotate.png')});
   console.log('PASS rotation, undo and redo');

   await page.getByRole('button',{name:'소리 설정',exact:true}).click();
   const before = await page.evaluate(async () => { return {playing:false,context:window.__audioContexts.length>0}; });
   assert.equal(before.playing,false); assert.equal(before.context,false);
   await page.getByRole('button',{name:'온실의 아침 재생',exact:true}).click();
   await page.waitForFunction(() => window.__audioContexts.length>0 && window.__audioContexts[0].state==='running');
   const signal = await page.evaluate(async () => {
     const a={ctx:window.__audioContexts[0],masterGainNode:window.__audioGains[0]};
     const analyser=a.ctx.createAnalyser(); analyser.fftSize=2048; a.masterGainNode.connect(analyser);
     await new Promise(r=>setTimeout(r,500));
     const samples=new Float32Array(analyser.fftSize);analyser.getFloatTimeDomainData(samples);a.masterGainNode.disconnect(analyser);
     return {state:a.ctx.state,energy:samples.reduce((n,x)=>n+x*x,0),muted:a.masterGainNode.gain.value===0};
   });
   assert.equal(signal.state,'running'); assert.equal(signal.muted,false); assert(signal.energy>0.00001);
   await page.getByRole('button',{name:'전체 음원',exact:true}).click();
   await page.getByRole('button',{name:'포근한 밤 재생',exact:true}).click();
   await page.waitForFunction(() => localStorage.getItem('diorama:music-track')==='cozy-night');
   await page.screenshot({path:path.join(guide,'sound.png')});
   await page.locator('.master-sound').click();
   const mutedEnergy = await page.evaluate(async () => {
     const analyser=window.__audioContexts[0].createAnalyser(); analyser.fftSize=2048;
     window.__audioGains[0].connect(analyser);await new Promise(r=>setTimeout(r,250));
     const samples=new Float32Array(2048);analyser.getFloatTimeDomainData(samples);
     window.__audioGains[0].disconnect(analyser);return samples.reduce((n,x)=>n+x*x,0);
   });
   assert(mutedEnergy<0.000001);
   await page.getByRole('button',{name:'닫기',exact:true}).click();
   console.log('PASS music requires Play; generated audio signal, track switching and mute');

   for (const set of ['glasshouse-botanist','rainy-night-cafe']) {
     if (set==='rainy-night-cafe') {
       await page.goto(base+'/studio/?set='+set);
       await page.locator('.drawer-grid button').first().click();
       await waitImages();
     }
     const downloadPromise=page.waitForEvent('download');
     await page.getByRole('button',{name:'PNG 저장',exact:true}).click();
     const download=await downloadPromise;
     const target=path.join(guide,set==='glasshouse-botanist'?'export.png':'export-cafe.png');
     await download.saveAs(target);
     const data='data:image/png;base64,'+(await fs.readFile(target)).toString('base64');
     const comparison=await page.evaluate(async ({data,set})=>{
       const load=src=>new Promise((resolve,reject)=>{const im=new Image();im.onload=()=>resolve(im);im.onerror=()=>reject(new Error('Image load failed: '+src.slice(0,150)));im.src=src;});
       const exported=await load(data);
       const bg=await load(set==='glasshouse-botanist'?'/assets/diorama/glasshouse-botanist/bg-glasshouse.jpg':'/assets/diorama/rainy-night-cafe/bg-cafe.jpg');
       const canvas=document.createElement('canvas');canvas.width=2048;canvas.height=1536;
       const c=canvas.getContext('2d',{willReadFrequently:true});c.drawImage(exported,0,0);
       const a=c.getImageData(0,0,2048,1536).data;
       const s=Math.max(2048/bg.width,1536/bg.height);c.drawImage(bg,(2048-bg.width*s)/2,(1536-bg.height*s)/2,bg.width*s,bg.height*s);
       const b=c.getImageData(0,0,2048,1536).data;let differences=0;
       for(let i=0;i<a.length;i+=16)if(Math.abs(a[i]-b[i])+Math.abs(a[i+1]-b[i+1])+Math.abs(a[i+2]-b[i+2])>30) differences++;
       return {width:exported.width,height:exported.height,differences};
     },{data,set});
     assert.equal(comparison.width,2048);assert.equal(comparison.height,1536);assert(comparison.differences>500,JSON.stringify(comparison));
     console.log('PASS '+set+' PNG contains stickers ('+comparison.differences+' differing samples)');
   }
   const missingAsset=await page.evaluate(async()=>{
     const {exportDioramaToPNG}=await import('/src/diorama/domain/export.ts');
     try {await exportDioramaToPNG([{assetId:'nonexistent',zIndex:1}],'/assets/diorama/glasshouse-botanist/bg-glasshouse.jpg',2048,1536,1024,768,[]);return false;}catch{return true;}
   });
   assert(missingAsset);
   await page.reload(); await page.waitForSelector('.studio-shell');
   assert.equal(await page.evaluate(() => window.__audioContexts.length),0);
   console.log('PASS missing export asset fails explicitly; reload never starts music');

   const legacySave = await page.evaluate(()=>localStorage.getItem('qk-diorama-saved-glasshouse-botanist'));
   await page.goto(base+'/studio/?set=glasshouse-botanist&pilot=shelf');
   await page.waitForSelector('[data-sticker-id="pilot-default-3"]');
   assert.equal(await page.locator('[data-sticker-id]').count(),4);
   await page.locator('[data-sticker-id="pilot-default-3"]').click();
   await page.getByRole('button',{name:'오른쪽으로 15도 회전'}).click();
   await page.waitForTimeout(800);
   const pilotSaved = await page.evaluate(()=>JSON.parse(localStorage.getItem('qk-diorama-saved-glasshouse-shelf-intermediate-pilot-v1')));
   assert.equal(pilotSaved.stickers.find(s=>s.instanceId==='pilot-default-3').rotation,15);
   assert.equal(await page.evaluate(()=>localStorage.getItem('qk-diorama-saved-glasshouse-botanist')),legacySave);
   await page.reload();await page.waitForSelector('[data-sticker-id="pilot-default-3"]');
   assert.match(await page.locator('[data-sticker-id="pilot-default-3"]').getAttribute('style'),/rotate\(15deg\)/);
   const pilotDownload = page.waitForEvent('download');
   await page.getByRole('button',{name:/PNG/}).click();
   const pilotFile = await pilotDownload;
   assert.match(pilotFile.suggestedFilename(),/glasshouse-shelf-intermediate-pilot-v1/);
   assert.equal(await pilotFile.failure(),null);
   console.log('PASS shelf pilot: four parts, rotation, reload, separate legacy save and PNG download');
   const mobile=await context.newPage();await mobile.setViewportSize({width:390,height:844});
   await mobile.goto(base+'/studio/?set=glasshouse-botanist');
   await mobile.locator('.drawer-grid button').first().click();
   const mobileRotate=mobile.getByRole('button',{name:'오른쪽으로 15도 회전'});
   await mobileRotate.click();
   const box=await mobileRotate.boundingBox();
   assert(box && box.x>=0 && box.y>=0 && box.x+box.width<=390 && box.y+box.height<=844);
   await mobile.screenshot({path:path.join(guide,'mobile-studio.png')});
   for (const route of ['/how-to/','/features/','/about/','/privacy/','/terms/','/ad-settings/','/en/how-to/','/en/features/','/en/about/','/en/privacy/','/en/terms/','/en/ad-settings/']) {
     await page.goto(base+route); await waitImages(); assert.equal(await page.locator('h1').count(),1,route);
     await mobile.goto(base+route);await mobile.waitForSelector('main h1');
     assert.equal(await mobile.locator('main h1').count(),1);
     if (!route.includes('ad-settings')) assert(await mobile.locator('.article-text p').count()>=10);
     assert(await mobile.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
     assert.equal(await mobile.locator('html').getAttribute('lang'),route.startsWith('/en/')?'en':'ko');
     await mobile.reload(); await mobile.waitForSelector('main h1');
   }
   await page.goto(base+'/ad-settings/'); assert.match(await page.locator('main').innerText(),/광고·분석 비활성/);
   await mobile.goto(base+'/how-to/');await mobile.screenshot({path:path.join(guide,'mobile-guide.png'),fullPage:true});
   await page.goto(base+'/how-to/');await waitImages();await page.screenshot({path:path.join(guide,'guide-page.png')});
   assert.deepEqual(errors,[]);
   console.log('PASS mobile rotation and twelve localized deep links; no browser exceptions');
 } catch (error) {
   console.log(await page.evaluate(() => ({url:location.href, sound:document.querySelector('.sound-panel')?.innerText, contexts:window.__audioContexts?.map(c=>c.state), gains:window.__audioGains?.slice(0,3).map(g=>g.gain.value)})).catch(()=>({})));
   throw error;
 } finally { await browser.close(); }
})().catch(e=>{console.error(e);process.exitCode=1;});
