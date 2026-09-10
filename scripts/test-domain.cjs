const assert = require('node:assert/strict');
const fs = require('node:fs');
const ts = require('typescript');

function load(path) {
  const moduleExports = {};
  const output = ts.transpileModule(fs.readFileSync(path, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
  }).outputText;
  new Function('exports', output)(moduleExports);
  return moduleExports;
}

const layers = load('src/diorama/domain/layers.ts');
const history = load('src/diorama/domain/history.ts');
const stickers = [
  { instanceId: 'a', zIndex: 30 },
  { instanceId: 'b', zIndex: 10 },
  { instanceId: 'c', zIndex: 20 },
];

assert.deepEqual(layers.normalizeZIndexes(stickers).map((item) => [item.instanceId, item.zIndex]), [
  ['b', 10], ['c', 20], ['a', 30],
]);
assert.equal(layers.bringToFront(stickers, 'b').at(-1).instanceId, 'b');
assert.equal(layers.sendToBack(stickers, 'a')[0].instanceId, 'a');

const initial = history.createHistory(stickers);
const changed = [{ ...stickers[0], zIndex: 40 }, stickers[1], stickers[2]];
const recorded = history.recordAction(initial, changed);
const undone = history.undo(recorded);
assert(undone);
assert.deepEqual(undone.stickers, stickers);
const redone = history.redo(undone.newHistory);
assert(redone);
assert.deepEqual(redone.stickers, changed);

console.log('PASS: layer ordering and undo/redo history.');
