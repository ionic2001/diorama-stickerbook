// User-approved deterministic edit: remove exterior-connected cream pixels only.
const fs = require('node:fs');
const assert = require('node:assert/strict');
const UPNG = require('@pdf-lib/upng').default;
const base = 'public/assets/diorama/glasshouse-workbench-pilot/';
const input = fs.readFileSync(base + 'tools-v2.png');
const decoded = UPNG.decode(input.buffer.slice(input.byteOffset, input.byteOffset + input.byteLength));
const original = new Uint8Array(UPNG.toRGBA8(decoded)[0]);
const pixels = new Uint8Array(original);
const { width, height } = decoded;
const count = width * height;
const seen = new Uint8Array(count);
const queue = new Int32Array(count);
let head = 0, tail = 0, removed = 0;
function visit(i) {
  if (seen[i]) return;
  const p = i * 4;
  const min = Math.min(original[p], original[p + 1], original[p + 2]);
  const max = Math.max(original[p], original[p + 1], original[p + 2]);
  if (original[p + 3] > 32 && !(min >= 170 && max - min <= 80)) return;
  seen[i] = 1;
  queue[tail++] = i;
}
// Start from all transparent pixels, including enclosed negative space.
for (let i = 0; i < count; i++) if (original[i * 4 + 3] <= 32) visit(i);
while (head < tail) {
  const i = queue[head++], x = i % width;
  if (pixels[i * 4 + 3]) { pixels[i * 4 + 3] = 0; removed++; }
  if (x > 0) visit(i - 1);
  if (x + 1 < width) visit(i + 1);
  if (i >= width) visit(i - width);
  if (i + width < count) visit(i + width);
}
assert(removed > 0);
// Bridge the thin dark printed line enclosing the cream paper rim.
const distance = new Uint8Array(count).fill(255);
head = 0; tail = 0;
for (let i = 0; i < count; i++) if (original[i * 4 + 3] <= 32) {
  distance[i] = 0; queue[tail++] = i;
}
while (head < tail) {
  const i = queue[head++], x = i % width, next = distance[i] + 1;
  if (next > 24) continue;
  for (const j of [x > 0 ? i - 1 : -1, x + 1 < width ? i + 1 : -1, i - width, i + width]) {
    if (j < 0 || j >= count || distance[j] <= next) continue;
    distance[j] = next; queue[tail++] = j;
  }
}
for (let i = 0; i < count; i++) {
  const p = i * 4;
  const min = Math.min(original[p], original[p + 1], original[p + 2]);
  const max = Math.max(original[p], original[p + 1], original[p + 2]);
  if (distance[i] <= 24 && min >= 185 && max - min <= 70) {
    if (pixels[p + 3]) removed++;
    pixels[p + 3] = 0; seen[i] = 1;
  }
}
for (let p = 0; p < pixels.length; p += 4) {
  assert.equal(pixels[p], original[p]);
  assert.equal(pixels[p + 1], original[p + 1]);
  assert.equal(pixels[p + 2], original[p + 2]);
  if (!seen[p / 4]) assert.equal(pixels[p + 3], original[p + 3]);
}
const output = UPNG.encode([pixels.buffer], width, height, 0);
fs.writeFileSync(base + 'tools-borderless.png', Buffer.from(output));
const check = UPNG.decode(output);
assert.equal(check.width, width);
assert.equal(check.height, height);
assert.deepEqual(new Uint8Array(UPNG.toRGBA8(check)[0]).filter((_, i) => i % 4 === 3), pixels.filter((_, i) => i % 4 === 3));
console.log(`PASS: ${removed} exterior cream pixels removed; RGB artwork and dimensions ${width}x${height} preserved.`);
const proof = new Uint8Array(pixels);
for (let p = 0; p < proof.length; p += 4) {
  const a = pixels[p + 3] / 255;
  for (let c = 0; c < 3; c++) proof[p + c] = Math.round(pixels[p + c] * a + 90 * (1 - a));
  proof[p + 3] = 255;
}
fs.mkdirSync('combined-pilot-v1/qa', { recursive: true });
fs.writeFileSync('combined-pilot-v1/qa/tray-border-proof.png', Buffer.from(UPNG.encode([proof.buffer], width, height, 0)));
