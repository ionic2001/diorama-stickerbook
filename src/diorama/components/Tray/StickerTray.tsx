import React from 'react';
import { Asset } from '../../types/manifest';
import { RAINY_NIGHT_CAFE_ASSETS } from '../../content/rainyNightCafeManifest';
import { STICKER_COMPONENTS } from '../../content/stickerSVGs';
interface Props { isOpen: boolean; onToggleOpen: () => void; onAddSticker: (id: string) => void; assets?: Asset[]; locale?: 'ko'|'en'; }
export function StickerTray({ isOpen, onToggleOpen, onAddSticker, assets, locale = 'ko' }: Props) {
 const availableAssets = assets || RAINY_NIGHT_CAFE_ASSETS;
 return <aside className={'sticker-drawer ' + (isOpen ? 'open' : 'closed')} aria-label={locale === 'ko' ? '스티커 서랍' : 'Sticker drawer'}>
   <button className="drawer-toggle" aria-expanded={isOpen} onClick={onToggleOpen}>{locale === 'ko' ? '스티커' : 'Stickers'} <span>{isOpen ? '−' : '+'}</span></button>
   {isOpen && <div className="drawer-grid">{availableAssets.length === 0 ? <p className="drawer-empty" role="status">{locale === 'ko' ? '모든 스티커를 사용했어요. 작품에서 삭제하면 다시 나타납니다.' : 'You used every sticker. Delete one from the scene to bring it back.'}</p> : availableAssets.map(asset => { const Component = STICKER_COMPONENTS[asset.assetId]; return <button className="sticker-card" key={asset.assetId} onClick={() => onAddSticker(asset.assetId)} draggable onDragStart={e => {e.dataTransfer.setData('application/diorama-asset-id',asset.assetId);e.dataTransfer.effectAllowed='copy';}} aria-label={asset.name[locale]}>
     {asset.src ? <img src={asset.src} alt="" draggable={false}/> : Component ? <Component width={70} height={70}/> : null}<span>{asset.name[locale]}</span>
   </button>; })}</div>}
 </aside>;
}
