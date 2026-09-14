const fs = require('node:fs');
const path = require('node:path');
const sharp = require('sharp');
const root = path.resolve(__dirname, '../public/assets/diorama/glasshouse-gardening-v1');
(async () => {
fs.mkdirSync(path.join(root,'service'),{recursive:true});
let total=0,pixels=0;
for(const id of ["soil-bag","seed-box","sunflower-seeds","herb-seeds","wildflower-seeds","hand-rake","gardening-gloves","twine-spool"]) {
const source=path.join(root,'originals',id+'.png');
const meta=await sharp(source).metadata(), stats=await sharp(source).stats();
if(!meta.hasAlpha || stats.channels[3].min!==0) throw new Error(id+': missing transparency');
const target=path.join(root,'service',id+'.png');
await sharp(source).resize({width:384,height:384,fit:'inside',withoutEnlargement:true}).png({compressionLevel:9}).toFile(target);
const m=await sharp(target).metadata(),bytes=fs.statSync(target).size;
total+=bytes;pixels+=m.width*m.height;console.log(id,m.width,m.height,bytes);
}
console.log('TOTAL_BYTES',total,'RGBA_MIB',pixels*4/1048576);
})().catch(e=>{console.error(e);process.exitCode=1});

