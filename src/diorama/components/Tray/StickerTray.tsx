import React, { useState } from 'react';
import { Asset } from '../../types/manifest';
import { RAINY_NIGHT_CAFE_ASSETS } from '../../content/rainyNightCafeManifest';
import { STICKER_COMPONENTS } from '../../content/stickerSVGs';
interface Props { isOpen: boolean; onToggleOpen: () => void; onAddSticker: (id: string) => void; assets?: Asset[]; locale?: 'ko'|'en'; }
const categories = [
 ['all','전체','All'],['furniture','가구','Furniture'],['plants','식물','Plants'],
 ['food','음료·음식','Food'],['cats','고양이','Cats'],['lighting','조명','Lights'],['decor','소품','Decor'],
];
export function StickerTray({ isOpen, onToggleOpen, onAddSticker, assets, locale = 'ko' }: Props) {
 const [category,setCategory] = useState('all');
 const filtered = (assets || RAINY_NIGHT_CAFE_ASSETS).filter(a => category === 'all' || a.category === category || category === 'decor' && a.category === 'books');
 return <aside className={'sticker-drawer ' + (isOpen ? 'open' : 'closed')} aria-label={locale === 'ko' ? '스티커 서랍' : 'Sticker drawer'}>
   <button className="drawer-toggle" aria-expanded={isOpen} onClick={onToggleOpen}>{locale === 'ko' ? '스티커' : 'Stickers'} <span>{isOpen ? '−' : '+'}</span></button>
   {isOpen && <><div className="drawer-categories">{categories.map(([id,ko,en]) => <button key={id} aria-pressed={category === id} className={category === id ? 'active' : ''} onClick={() => setCategory(id)}>{locale === 'ko' ? ko : en}</button>)}</div>
   <div className="drawer-grid">{filtered.map(asset => { const Component = STICKER_COMPONENTS[asset.assetId]; return <button className="sticker-card" key={asset.assetId} onClick={() => onAddSticker(asset.assetId)} draggable onDragStart={e => {e.dataTransfer.setData('application/diorama-asset-id',asset.assetId);e.dataTransfer.effectAllowed='copy';}} aria-label={asset.name[locale]}>
     {asset.src ? <img src={asset.src} alt="" draggable={false}/> : Component ? <Component width={70} height={70}/> : null}<span>{asset.name[locale]}</span>
   </button>; })}</div></>}
 </aside>;
}
