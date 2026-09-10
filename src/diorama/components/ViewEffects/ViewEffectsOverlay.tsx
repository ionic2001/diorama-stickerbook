import React from 'react';
import { PlacedSticker } from '../../types/manifest';

interface ViewEffectsOverlayProps {
  stickers: PlacedSticker[];
  lampOn: boolean;
  width: number;
  height: number;
}

export const ViewEffectsOverlay: React.FC<ViewEffectsOverlayProps> = ({
  stickers,
  lampOn,
  width,
  height,
}) => {
  const lampSticker = stickers.find((s) => s.assetId === 'light-banker-lamp');
  const coffeeStickers = stickers.filter((s) => s.assetId === 'food-coffee' || s.assetId === 'food-cocoa' || s.assetId === 'food-teapot');
  const candleSticker = stickers.find((s) => s.assetId === 'light-candle');

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 45,
        overflow: 'hidden',
      }}
    >
      {/* 1. 창밖 빗줄기 애니메이션 (Raindrops on Glass) */}
      <svg width={width} height={height} style={{ position: 'absolute', inset: 0 }}>
        <defs>
          <linearGradient id="rainDropGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(255, 255, 255, 0)" />
            <stop offset="60%" stopColor="rgba(255, 255, 255, 0.4)" />
            <stop offset="100%" stopColor="rgba(200, 230, 255, 0.7)" />
          </linearGradient>
          <style>{`
            @keyframes rainFall {
              0% { transform: translateY(-30px); opacity: 0; }
              20% { opacity: 0.8; }
              80% { opacity: 0.8; }
              100% { transform: translateY(120px); opacity: 0; }
            }
            @keyframes steamRise {
              0% { transform: translateY(0) scaleX(0.8); opacity: 0; }
              30% { opacity: 0.5; }
              70% { opacity: 0.3; transform: translateY(-24px) scaleX(1.3) translateX(3px); }
              100% { transform: translateY(-40px) scaleX(1.8) translateX(-3px); opacity: 0; }
            }
            @keyframes candleFlicker {
              0%, 100% { transform: scale(1); opacity: 0.8; }
              25% { transform: scale(1.08, 0.94); opacity: 0.95; }
              50% { transform: scale(0.92, 1.05); opacity: 0.7; }
              75% { transform: scale(1.04, 1.02); opacity: 0.9; }
            }
            @keyframes lampAura {
              0%, 100% { opacity: 0.85; transform: scale(1); }
              50% { opacity: 0.92; transform: scale(1.03); }
            }
          `}</style>
        </defs>

        {/* 창문 영역(대략 x: 580 ~ 960, y: 120 ~ 440)에 내리는 빗줄기들 */}
        <g opacity="0.6">
          <line x1="680" y1="180" x2="676" y2="230" stroke="url(#rainDropGrad)" strokeWidth="1.8" style={{ animation: 'rainFall 1.6s infinite linear' }} />
          <line x1="740" y1="150" x2="736" y2="210" stroke="url(#rainDropGrad)" strokeWidth="1.5" style={{ animation: 'rainFall 2.1s infinite 0.4s linear' }} />
          <line x1="820" y1="210" x2="816" y2="270" stroke="url(#rainDropGrad)" strokeWidth="1.6" style={{ animation: 'rainFall 1.8s infinite 0.9s linear' }} />
          <line x1="890" y1="160" x2="886" y2="220" stroke="url(#rainDropGrad)" strokeWidth="1.4" style={{ animation: 'rainFall 2.4s infinite 0.2s linear' }} />
          <line x1="710" y1="260" x2="706" y2="315" stroke="url(#rainDropGrad)" strokeWidth="1.8" style={{ animation: 'rainFall 1.9s infinite 0.7s linear' }} />
          <line x1="850" y1="280" x2="846" y2="340" stroke="url(#rainDropGrad)" strokeWidth="1.5" style={{ animation: 'rainFall 2.2s infinite 1.2s linear' }} />
          <line x1="780" y1="320" x2="776" y2="380" stroke="url(#rainDropGrad)" strokeWidth="1.7" style={{ animation: 'rainFall 1.7s infinite 0.5s linear' }} />
        </g>
      </svg>

      {/* 2. 뱅커스 램프 온/오프시 호박색 라이트 오라 (Banker Lamp Glow) */}
      {lampSticker && lampOn && (
        <div
          style={{
            position: 'absolute',
            left: `${lampSticker.x}px`,
            top: `${lampSticker.y + 10}px`,
            width: '260px',
            height: '260px',
            transform: 'translate(-50%, -50%)',
            background: 'radial-gradient(circle, rgba(254, 240, 138, 0.45) 0%, rgba(245, 158, 11, 0.22) 40%, rgba(245, 158, 11, 0) 70%)',
            borderRadius: '50%',
            filter: 'blur(10px)',
            animation: 'lampAura 4s infinite ease-in-out',
            mixBlendMode: 'screen',
          }}
        />
      )}

      {/* 3. 캔들 촛불 미세 깜빡임 오라 (Candle Glow) */}
      {candleSticker && (
        <div
          style={{
            position: 'absolute',
            left: `${candleSticker.x}px`,
            top: `${candleSticker.y - 10}px`,
            width: '70px',
            height: '70px',
            transform: 'translate(-50%, -50%)',
            background: 'radial-gradient(circle, rgba(255, 200, 100, 0.6) 0%, rgba(245, 158, 11, 0.25) 45%, rgba(245, 158, 11, 0) 70%)',
            borderRadius: '50%',
            animation: 'candleFlicker 1.8s infinite ease-in-out',
            mixBlendMode: 'screen',
          }}
        />
      )}

      {/* 4. 커피 / 티팟 따뜻한 김 모락모락 (Rising Steam) */}
      {coffeeStickers.map((coffee) => (
        <div
          key={`steam-${coffee.instanceId}`}
          style={{
            position: 'absolute',
            left: `${coffee.x}px`,
            top: `${coffee.y - 18}px`,
            transform: 'translate(-50%, -100%)',
            width: '20px',
            height: '35px',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <svg width="24" height="40" viewBox="0 0 24 40" fill="none">
            <path
              d="M8 35 C6 28, 14 20, 10 12 C7 6, 11 2, 10 0"
              stroke="rgba(255, 255, 255, 0.6)"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
              style={{ animation: 'steamRise 3s infinite ease-out' }}
            />
            <path
              d="M14 36 C16 30, 9 22, 14 14 C17 8, 13 4, 15 0"
              stroke="rgba(255, 255, 255, 0.5)"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
              style={{ animation: 'steamRise 3.4s infinite 1.2s ease-out' }}
            />
          </svg>
        </div>
      ))}
    </div>
  );
};
