import React from 'react';
import { 
  Undo2, 
  Redo2, 
  Eye, 
  PenTool, 
  Grid, 
  VolumeX, 
  Download, 
  RotateCcw,
  Sparkles,
  Music
} from 'lucide-react';

interface TopToolbarProps {
  title: string;
  currentThemeId?: string;
  onSelectTheme?: (themeId: string) => void;
  isViewMode: boolean;
  isGuideEnabled: boolean;
  canUndo: boolean;
  canRedo: boolean;
  isMuted: boolean;
  volume: number;
  isExporting: boolean;
  onToggleViewMode: () => void;
  onToggleGuide: () => void;
  onUndo: () => void;
  onRedo: () => void;
  onResetScene: () => void;
  onToggleMute: () => void;
  onChangeVolume: (vol: number) => void;
  onExportPNG: () => void;
}

export const TopToolbar: React.FC<TopToolbarProps> = ({
  title,
  currentThemeId,
  onSelectTheme,
  isViewMode,
  isGuideEnabled,
  canUndo,
  canRedo,
  isMuted,
  volume,
  isExporting,
  onToggleViewMode,
  onToggleGuide,
  onUndo,
  onRedo,
  onResetScene,
  onToggleMute,
  onChangeVolume,
  onExportPNG,
}) => {
  return (
    <header
      style={{
        height: '54px',
        backgroundColor: '#141210',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 16px',
        zIndex: 100,
        flexShrink: 0,
        userSelect: 'none',
      }}
    >
      {/* 1. 좌측: 타이틀 & 테마 셀렉터 */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '15px', fontWeight: 600, color: '#f3f4f6' }}>
            {title}
          </span>
          <span
            style={{
              fontSize: '11px',
              backgroundColor: 'rgba(245, 158, 11, 0.15)',
              color: '#fbbf24',
              padding: '2px 8px',
              borderRadius: '12px',
              border: '1px solid rgba(245, 158, 11, 0.3)',
              display: 'flex',
              alignItems: 'center',
              gap: '3px',
            }}
          >
            <Sparkles size={11} />
            Diorama
          </span>
        </div>

        {onSelectTheme && (
          <div
            style={{
              display: 'flex',
              backgroundColor: 'rgba(255, 255, 255, 0.06)',
              borderRadius: '16px',
              padding: '2px',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              marginLeft: '4px',
            }}
          >
            <button
              type="button"
              onClick={() => onSelectTheme('glasshouse-botanist')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                padding: '4px 10px',
                borderRadius: '14px',
                border: 'none',
                fontSize: '12px',
                fontWeight: currentThemeId === 'glasshouse-botanist' ? 600 : 400,
                backgroundColor: currentThemeId === 'glasshouse-botanist' ? '#059669' : 'transparent',
                color: currentThemeId === 'glasshouse-botanist' ? '#ffffff' : '#9ca3af',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
            >
              🌿 온실 정원
            </button>
            <button
              type="button"
              onClick={() => onSelectTheme('rainy-night-cafe')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                padding: '4px 10px',
                borderRadius: '14px',
                border: 'none',
                fontSize: '12px',
                fontWeight: currentThemeId === 'rainy-night-cafe' ? 600 : 400,
                backgroundColor: currentThemeId === 'rainy-night-cafe' ? '#d97706' : 'transparent',
                color: currentThemeId === 'rainy-night-cafe' ? '#ffffff' : '#9ca3af',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
            >
              ☕ 밤의 카페
            </button>
          </div>
        )}
      </div>

      {/* 2. 중앙: 모드 전환 & 가이드라인 토글 */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        {/* 에디트 / 뷰 모드 토글 */}
        <div
          style={{
            display: 'flex',
            backgroundColor: 'rgba(255, 255, 255, 0.06)',
            borderRadius: '20px',
            padding: '3px',
            border: '1px solid rgba(255, 255, 255, 0.08)',
          }}
        >
          <button
            type="button"
            onClick={onToggleViewMode}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
              padding: '5px 12px',
              borderRadius: '16px',
              border: 'none',
              fontSize: '12px',
              fontWeight: !isViewMode ? 600 : 400,
              backgroundColor: !isViewMode ? '#f59e0b' : 'transparent',
              color: !isViewMode ? '#1c1917' : '#9ca3af',
              cursor: 'pointer',
              transition: 'all 0.15s ease',
            }}
          >
            <PenTool size={13} />
            편집 모드
          </button>
          <button
            type="button"
            onClick={onToggleViewMode}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
              padding: '5px 12px',
              borderRadius: '16px',
              border: 'none',
              fontSize: '12px',
              fontWeight: isViewMode ? 600 : 400,
              backgroundColor: isViewMode ? '#38bdf8' : 'transparent',
              color: isViewMode ? '#0c4a6e' : '#9ca3af',
              cursor: 'pointer',
              transition: 'all 0.15s ease',
            }}
          >
            <Eye size={13} />
            감상 모드
          </button>
        </div>

        {/* 가이드라인 토글 (편집 모드에서만 표시) */}
        {!isViewMode && (
          <button
            type="button"
            onClick={onToggleGuide}
            title={isGuideEnabled ? '가이드라인 끄기' : '가이드라인 켜기'}
            style={{
              ...iconButtonStyle,
              backgroundColor: isGuideEnabled ? 'rgba(56, 189, 248, 0.15)' : 'transparent',
              color: isGuideEnabled ? '#38bdf8' : '#9ca3af',
              border: isGuideEnabled ? '1px solid rgba(56, 189, 248, 0.3)' : '1px solid transparent',
              borderRadius: '16px',
              padding: '5px 10px',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              fontSize: '12px',
            }}
          >
            <Grid size={14} />
            <span>가이드</span>
          </button>
        )}
      </div>

      {/* 3. 우측: 실행취소/다시실행, 사운드, 익스포트 */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
        {/* 실행취소 & 다시실행 (편집 모드) */}
        {!isViewMode && (
          <>
            <button
              type="button"
              onClick={onUndo}
              disabled={!canUndo}
              title="실행 취소 (Undo)"
              style={actionBtnStyle(!canUndo)}
            >
              <Undo2 size={16} />
            </button>
            <button
              type="button"
              onClick={onRedo}
              disabled={!canRedo}
              title="다시 실행 (Redo)"
              style={actionBtnStyle(!canRedo)}
            >
              <Redo2 size={16} />
            </button>
            <button
              type="button"
              onClick={onResetScene}
              title="처음 배치로 초기화"
              style={actionBtnStyle(false)}
            >
              <RotateCcw size={16} />
            </button>
            <div style={{ width: '1px', height: '18px', backgroundColor: 'rgba(255, 255, 255, 0.1)', margin: '0 4px' }} />
          </>
        )}

        {/* 잔잔한 재즈 BGM 오디오 컨트롤 */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <button
            type="button"
            onClick={onToggleMute}
            title={isMuted ? '재즈 음악 켜기' : '재즈 음악 끄기'}
            style={{
              ...actionBtnStyle(false),
              color: !isMuted ? '#f59e0b' : '#78716c',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              padding: '4px 8px',
              borderRadius: '14px',
              backgroundColor: !isMuted ? 'rgba(245, 158, 11, 0.12)' : 'transparent',
              border: !isMuted ? '1px solid rgba(245, 158, 11, 0.3)' : '1px solid transparent',
            }}
          >
            {isMuted ? <VolumeX size={15} /> : <Music size={15} />}
            <span style={{ fontSize: '11px', color: !isMuted ? '#fbbf24' : '#78716c' }}>
              재즈 BGM
            </span>
          </button>
          {!isMuted && (
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={volume}
              onChange={(e) => onChangeVolume(parseFloat(e.target.value))}
              title="재즈 음악 볼륨"
              style={{
                width: '60px',
                accentColor: '#f59e0b',
                cursor: 'pointer',
              }}
            />
          )}
        </div>

        <div style={{ width: '1px', height: '18px', backgroundColor: 'rgba(255, 255, 255, 0.1)', margin: '0 4px' }} />

        {/* 고해상도 2048x1536 PNG 저장 버튼 */}
        <button
          type="button"
          onClick={onExportPNG}
          disabled={isExporting}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            backgroundColor: '#f59e0b',
            color: '#1c1917',
            border: 'none',
            borderRadius: '16px',
            padding: '6px 14px',
            fontSize: '12px',
            fontWeight: 600,
            cursor: isExporting ? 'wait' : 'pointer',
            boxShadow: '0 2px 8px rgba(245, 158, 11, 0.3)',
            transition: 'all 0.15s ease',
          }}
        >
          <Download size={14} />
          {isExporting ? '저장 중...' : '이미지 저장'}
        </button>
      </div>
    </header>
  );
};

const iconButtonStyle: React.CSSProperties = {
  background: 'none',
  border: 'none',
  color: '#d1d5db',
  padding: '6px',
  borderRadius: '8px',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const actionBtnStyle = (disabled: boolean): React.CSSProperties => ({
  background: 'none',
  border: 'none',
  color: disabled ? 'rgba(255, 255, 255, 0.2)' : '#d1d5db',
  padding: '6px',
  borderRadius: '8px',
  cursor: disabled ? 'not-allowed' : 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'all 0.15s ease',
});
