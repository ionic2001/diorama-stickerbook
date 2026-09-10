import React from 'react';

interface GuideOverlayProps {
  width: number;
  height: number;
}

export const GuideOverlay: React.FC<GuideOverlayProps> = ({ width, height }) => {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 50,
        overflow: 'hidden',
      }}
    >
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{ width: '100%', height: '100%' }}>
        {/* 삼분할 수직 그리드 */}
        <line x1={width / 3} y1={0} x2={width / 3} y2={height} stroke="rgba(245, 158, 11, 0.2)" strokeDasharray="6 6" strokeWidth={1} />
        <line x1={(width * 2) / 3} y1={0} x2={(width * 2) / 3} y2={height} stroke="rgba(245, 158, 11, 0.2)" strokeDasharray="6 6" strokeWidth={1} />

        {/* 삼분할 수평 그리드 */}
        <line x1={0} y1={height / 3} x2={width} y2={height / 3} stroke="rgba(245, 158, 11, 0.2)" strokeDasharray="6 6" strokeWidth={1} />
        <line x1={0} y1={(height * 2) / 3} x2={width} y2={(height * 2) / 3} stroke="rgba(245, 158, 11, 0.2)" strokeDasharray="6 6" strokeWidth={1} />

        {/* 중앙 정렬 십자선 (Center Crosshair) */}
        <line x1={width / 2 - 16} y1={height / 2} x2={width / 2 + 16} y2={height / 2} stroke="rgba(56, 189, 248, 0.4)" strokeWidth={1.5} />
        <line x1={width / 2} y1={height / 2 - 16} x2={width / 2} y2={height / 2 + 16} stroke="rgba(56, 189, 248, 0.4)" strokeWidth={1.5} />
        <circle cx={width / 2} cy={height / 2} r={4} fill="none" stroke="rgba(56, 189, 248, 0.4)" strokeWidth={1.5} />

        {/* 바닥 소실 수평 가이드선 (Floor Horizon guideline) */}
        <line x1={0} y1={500} x2={width} y2={500} stroke="rgba(217, 119, 6, 0.25)" strokeDasharray="4 4" strokeWidth={1} />
        <text x={16} y={492} fill="rgba(217, 119, 6, 0.5)" fontSize="11" fontFamily="sans-serif">
          Floor Horizon
        </text>
      </svg>
    </div>
  );
};
