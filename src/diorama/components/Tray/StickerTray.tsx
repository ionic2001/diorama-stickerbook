import React, { useState } from 'react';
import { 
  ChevronRight, 
  ChevronLeft, 
  Armchair, 
  Cat, 
  Lamp, 
  Coffee, 
  Flower2, 
  Sparkles 
} from 'lucide-react';
import { Asset, AssetCategory } from '../../types/manifest';
import { RAINY_NIGHT_CAFE_ASSETS } from '../../content/rainyNightCafeManifest';
import { STICKER_COMPONENTS } from '../../content/stickerSVGs';

interface StickerTrayProps {
  isOpen: boolean;
  onToggleOpen: () => void;
  onAddSticker: (assetId: string) => void;
  assets?: Asset[];
}

type TabCategory = 'all' | AssetCategory;

interface CategoryTabItem {
  id: TabCategory;
  label: string;
  icon: React.ReactNode;
}

const CATEGORY_TABS: CategoryTabItem[] = [
  { id: 'all', label: '전체', icon: <Sparkles size={16} /> },
  { id: 'furniture', label: '가구', icon: <Armchair size={16} /> },
  { id: 'cats', label: '고양이', icon: <Cat size={16} /> },
  { id: 'lighting', label: '조명', icon: <Lamp size={16} /> },
  { id: 'food', label: '음료/디저트', icon: <Coffee size={16} /> },
  { id: 'plants', label: '식물', icon: <Flower2 size={16} /> },
  { id: 'decor', label: '소품/장식', icon: <Sparkles size={16} /> },
];

export const StickerTray: React.FC<StickerTrayProps> = ({
  isOpen,
  onToggleOpen,
  onAddSticker,
  assets,
}) => {
  const [activeCategory, setActiveCategory] = useState<TabCategory>('all');
  const assetList = assets || RAINY_NIGHT_CAFE_ASSETS;

  const filteredAssets = assetList.filter((asset: Asset) => {
    if (activeCategory === 'all') return true;
    if (activeCategory === 'decor') {
      return asset.category === 'decor' || asset.category === 'books';
    }
    return asset.category === 'food'
      ? asset.category === 'food'
      : asset.category === activeCategory;
  });

  const handleDragStart = (e: React.DragEvent, assetId: string) => {
    e.dataTransfer.setData('application/diorama-asset-id', assetId);
    e.dataTransfer.effectAllowed = 'copy';
  };

  return (
    <div
      style={{
        position: 'relative',
        height: '100%',
        width: isOpen ? '280px' : '0px',
        transition: 'width 0.28s cubic-bezier(0.16, 1, 0.3, 1)',
        backgroundColor: '#1c1917',
        borderLeft: isOpen ? '1px solid rgba(255, 255, 255, 0.08)' : 'none',
        display: 'flex',
        flexDirection: 'column',
        zIndex: 60,
        flexShrink: 0,
      }}
    >
      {/* 트레이 토글 버튼 (서랍 탭 핸들) */}
      <button
        type="button"
        onClick={onToggleOpen}
        title={isOpen ? '스티커 서랍 닫기' : '스티커 서랍 열기'}
        style={{
          position: 'absolute',
          left: '-32px',
          top: '20px',
          width: '32px',
          height: '42px',
          backgroundColor: '#1c1917',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRight: 'none',
          borderTopLeftRadius: '8px',
          borderBottomLeftRadius: '8px',
          color: '#e5e7eb',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          boxShadow: '-4px 2px 8px rgba(0, 0, 0, 0.35)',
        }}
      >
        {isOpen ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
      </button>

      {isOpen && (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
          {/* 헤더 */}
          <div
            style={{
              padding: '16px 14px 12px',
              borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '14px', fontWeight: 600, color: '#f3f4f6' }}>
                스티커 팔레트
              </span>
              <span style={{ fontSize: '11px', color: '#9ca3af' }}>
                {filteredAssets.length}개
              </span>
            </div>
            <p style={{ margin: '4px 0 0', fontSize: '11px', color: '#78716c' }}>
              클릭하거나 캔버스로 드래그해 배치하세요
            </p>
          </div>

          {/* 카테고리 탭 목록 */}
          <div
            style={{
              display: 'flex',
              overflowX: 'auto',
              padding: '8px 10px',
              gap: '6px',
              borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
              scrollbarWidth: 'none',
            }}
          >
            {CATEGORY_TABS.map((tab) => {
              const isActive = activeCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveCategory(tab.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    padding: '5px 10px',
                    borderRadius: '16px',
                    border: 'none',
                    fontSize: '11px',
                    fontWeight: isActive ? 600 : 400,
                    backgroundColor: isActive ? '#f59e0b' : 'rgba(255, 255, 255, 0.05)',
                    color: isActive ? '#1c1917' : '#d1d5db',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    transition: 'all 0.15s ease',
                  }}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* 스티커 그리드 */}
          <div
            style={{
              flex: 1,
              overflowY: 'auto',
              padding: '12px',
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '10px',
              alignContent: 'start',
            }}
          >
            {filteredAssets.map((asset) => {
              const Component = STICKER_COMPONENTS[asset.assetId];
              if (!asset.src && !Component) return null;

              return (
                <div
                  key={asset.assetId}
                  draggable
                  onDragStart={(e) => handleDragStart(e, asset.assetId)}
                  onClick={() => onAddSticker(asset.assetId)}
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.03)',
                    borderRadius: '10px',
                    border: '1px solid rgba(255, 255, 255, 0.06)',
                    padding: '8px 6px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'grab',
                    transition: 'transform 0.15s ease, background-color 0.15s ease, border-color 0.15s ease',
                    userSelect: 'none',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)';
                    e.currentTarget.style.borderColor = 'rgba(245, 158, 11, 0.4)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.03)';
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.06)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <div
                    style={{
                      height: '60px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '4px',
                    }}
                  >
                    {asset.src ? (
                      <img
                        src={asset.src}
                        alt={asset.name.ko}
                        draggable={false}
                        style={{
                          maxWidth: '85px',
                          maxHeight: '52px',
                          objectFit: 'contain',
                          pointerEvents: 'none',
                          filter: 'none',
                        }}
                      />
                    ) : (
                      Component && (
                        <div style={{ transform: 'scale(0.55)', transformOrigin: 'center center' }}>
                          <Component width={asset.dimensions.width} height={asset.dimensions.height} />
                        </div>
                      )
                    )}
                  </div>
                  <span
                    style={{
                      fontSize: '11px',
                      color: '#d6d3d1',
                      marginTop: '4px',
                      textAlign: 'center',
                      lineHeight: '1.2',
                    }}
                  >
                    {asset.name.ko}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
