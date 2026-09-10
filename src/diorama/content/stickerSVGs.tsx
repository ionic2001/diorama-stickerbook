import React from 'react';

interface SvgProps {
  width?: number;
  height?: number;
  className?: string;
  isLit?: boolean;
}

// 공통 화이트 스티커 외곽선 필터
const stickerFilter = (
  <defs>
    <filter id="sticker-shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="rgba(0,0,0,0.18)" />
    </filter>
  </defs>
);

// 1. 카페 원목 원형 테이블
export const TableBistro: React.FC<SvgProps> = ({ width = 130, height = 110 }) => (
  <svg width={width} height={height} viewBox="0 0 130 110" fill="none">
    {stickerFilter}
    <g filter="url(#sticker-shadow)">
      {/* 흰색 스티커 테두리용 외곽 실루엣 */}
      <ellipse cx="65" cy="30" rx="58" ry="18" fill="#fff" stroke="#fff" strokeWidth="6" />
      <path d="M58 35h14v45c0 6-12 12-25 18 10-6 15-12 15-18v-45z" fill="#fff" stroke="#fff" strokeWidth="6" />
      <path d="M68 35h-14v45c0 6 12 12 25 18-10-6-15-12-15-18v-45z" fill="#fff" stroke="#fff" strokeWidth="6" />
      {/* 실제 테이블 상판 & 다리 */}
      <path d="M58 35h14v40c0 4-10 10-24 16 8-4 14-8 14-16v-40z" fill="#3e2723" />
      <path d="M72 35h-14v40c0 4 10 10 24 16-8-4-14-8-14-16v-40z" fill="#4e342e" />
      <path d="M65 72c-15 0-25 6-30 18h60c-5-12-15-18-30-18z" fill="#2d1d19" />
      <ellipse cx="65" cy="30" rx="55" ry="16" fill="#5d4037" stroke="#2d1d19" strokeWidth="2.5" />
      <ellipse cx="65" cy="28" rx="50" ry="13" fill="#6d4c41" />
      <ellipse cx="65" cy="26" rx="42" ry="10" fill="#795548" opacity="0.6" />
    </g>
  </svg>
);

// 2. 빈티지 올리브그린 벨벳 암체어
export const Armchair: React.FC<SvgProps> = ({ width = 130, height = 145 }) => (
  <svg width={width} height={height} viewBox="0 0 130 145" fill="none">
    {stickerFilter}
    <g filter="url(#sticker-shadow)">
      {/* 원목 프레임 & 다리 */}
      <path d="M30 120l-6 18h10l4-18M100 120l6 18h-10l-4-18" stroke="#3e2723" strokeWidth="5" strokeLinecap="round" />
      <path d="M40 122l-2 15h8l1-15M90 122l2 15h-8l-1-15" stroke="#3e2723" strokeWidth="4" strokeLinecap="round" />
      {/* 등받이 외곽 */}
      <path d="M35 35C35 15 50 10 65 10s30 5 30 25c0 20 5 45 5 55H25c0-10 10-35 10-55z" fill="#2e7d32" stroke="#fff" strokeWidth="6" />
      <path d="M35 35C35 15 50 10 65 10s30 5 30 25c0 20 5 45 5 55H25c0-10 10-35 10-55z" fill="#388e3c" stroke="#1b5e20" strokeWidth="3" />
      {/* 퀼팅 버튼 & 스티치 */}
      <circle cx="50" cy="40" r="2.5" fill="#1b5e20" />
      <circle cx="65" cy="35" r="2.5" fill="#1b5e20" />
      <circle cx="80" cy="40" r="2.5" fill="#1b5e20" />
      <circle cx="55" cy="60" r="2.5" fill="#1b5e20" />
      <circle cx="75" cy="60" r="2.5" fill="#1b5e20" />
      {/* 시트 쿠션 */}
      <rect x="22" y="85" width="86" height="32" rx="12" fill="#4caf50" stroke="#1b5e20" strokeWidth="3" />
      {/* 양쪽 팔걸이 */}
      <rect x="14" y="65" width="18" height="40" rx="9" fill="#2e7d32" stroke="#1b5e20" strokeWidth="2.5" />
      <rect x="98" y="65" width="18" height="40" rx="9" fill="#2e7d32" stroke="#1b5e20" strokeWidth="2.5" />
    </g>
  </svg>
);

// 3. 원목 식탁 의자
export const DiningChair: React.FC<SvgProps> = ({ width = 80, height = 135 }) => (
  <svg width={width} height={height} viewBox="0 0 80 135" fill="none">
    {stickerFilter}
    <g filter="url(#sticker-shadow)">
      {/* 등받이 살대 */}
      <path d="M22 25v50M34 22v53M46 22v53M58 25v50" stroke="#4e342e" strokeWidth="4" strokeLinecap="round" />
      <path d="M16 20c15-6 33-6 48 0 4 2 2 10-2 10-14-4-30-4-44 0-4 0-6-8-2-10z" fill="#3e2723" />
      {/* 좌판 */}
      <rect x="14" y="70" width="52" height="15" rx="4" fill="#5d4037" stroke="#2d1d19" strokeWidth="2.5" />
      {/* 4다리 */}
      <path d="M18 85l-4 42h7l4-42M62 85l4 42h-7l-4-42M28 85l-2 38h5l2-38M52 85l2 38h-5l-2-38" stroke="#3e2723" strokeWidth="3.5" strokeLinecap="round" />
      <path d="M16 108h48" stroke="#3e2723" strokeWidth="2.5" />
    </g>
  </svg>
);

// 4. 대형 원목 책장
export const Bookshelf: React.FC<SvgProps> = ({ width = 130, height = 175 }) => (
  <svg width={width} height={height} viewBox="0 0 130 175" fill="none">
    {stickerFilter}
    <g filter="url(#sticker-shadow)">
      {/* 책장 외곽 프레임 */}
      <rect x="10" y="10" width="110" height="155" rx="3" fill="#4e342e" stroke="#2d1d19" strokeWidth="4" />
      <rect x="16" y="16" width="98" height="143" fill="#3e2723" />
      {/* 선반 3단 */}
      <line x1="16" y1="60" x2="114" y2="60" stroke="#5d4037" strokeWidth="6" />
      <line x1="16" y1="108" x2="114" y2="108" stroke="#5d4037" strokeWidth="6" />
      {/* 1단 책들 */}
      <rect x="22" y="24" width="12" height="33" fill="#c62828" rx="1" />
      <rect x="35" y="27" width="14" height="30" fill="#1565c0" rx="1" />
      <rect x="50" y="22" width="10" height="35" fill="#2e7d32" rx="1" />
      <rect x="61" y="25" width="16" height="32" fill="#f57f17" rx="1" />
      <rect x="78" y="29" width="11" height="28" fill="#6a1b9a" rx="1" />
      <rect x="90" y="24" width="18" height="33" fill="#00838f" rx="1" />
      {/* 2단 책들 */}
      <rect x="22" y="72" width="16" height="33" fill="#37474f" rx="1" />
      <rect x="39" y="70" width="11" height="35" fill="#d84315" rx="1" />
      <rect x="51" y="74" width="14" height="31" fill="#4527a0" rx="1" />
      <rect x="66" y="68" width="18" height="37" fill="#0277bd" rx="1" />
      <rect x="85" y="73" width="12" height="32" fill="#558b2f" rx="1" />
      <rect x="98" y="76" width="12" height="29" fill="#ad1457" rx="1" />
      {/* 3단 수납 & 책 */}
      <rect x="24" y="120" width="30" height="25" fill="#8d6e63" rx="2" stroke="#2d1d19" />
      <rect x="62" y="118" width="14" height="32" fill="#1565c0" rx="1" />
      <rect x="77" y="122" width="12" height="28" fill="#e65100" rx="1" />
      <rect x="90" y="116" width="16" height="34" fill="#00695c" rx="1" />
    </g>
  </svg>
);

// 5. 원목 코트랙 & 우산걸이
export const CoatRack: React.FC<SvgProps> = ({ width = 65, height = 180 }) => (
  <svg width={width} height={height} viewBox="0 0 65 180" fill="none">
    {stickerFilter}
    <g filter="url(#sticker-shadow)">
      {/* 기둥 */}
      <rect x="29" y="30" width="7" height="135" fill="#4e342e" stroke="#2d1d19" strokeWidth="2" />
      <circle cx="32.5" cy="26" r="6" fill="#3e2723" />
      {/* 상단 옷걸이 갈고리들 */}
      <path d="M32 35C20 30 15 20 18 16c3-4 8 2 14 12M33 35C45 30 50 20 47 16c-3-4-8 2-14 12" stroke="#3e2723" strokeWidth="4" strokeLinecap="round" />
      <path d="M32 45C15 42 12 34 16 30M33 45C50 42 53 34 49 30" stroke="#3e2723" strokeWidth="3.5" strokeLinecap="round" />
      {/* 하단 우산 꽂이 링 & 다리 */}
      <ellipse cx="32.5" cy="115" rx="16" ry="6" stroke="#4e342e" strokeWidth="3" fill="none" />
      {/* 걸려있는 우산 */}
      <path d="M22 90l3 45M22 90c-3-3-5 0-2 4l3 4" stroke="#0277bd" strokeWidth="4" strokeLinecap="round" />
      {/* 삼각 다리 */}
      <path d="M30 160l-16 16h6l10-16M35 160l16 16h-6l-10-16" stroke="#3e2723" strokeWidth="4.5" strokeLinecap="round" />
    </g>
  </svg>
);

// 6. 쿠션 위 웅크려 잠든 치즈 고양이
export const SleepingCat: React.FC<SvgProps> = ({ width = 95, height = 70 }) => (
  <svg width={width} height={height} viewBox="0 0 95 70" fill="none">
    {stickerFilter}
    <g filter="url(#sticker-shadow)">
      {/* 타탄 체크 쿠션 */}
      <rect x="8" y="32" width="78" height="28" rx="10" fill="#b71c1c" stroke="#fff" strokeWidth="4" />
      <rect x="8" y="32" width="78" height="28" rx="10" fill="#c62828" />
      <line x1="8" y1="46" x2="86" y2="46" stroke="#fbc02d" strokeWidth="2.5" />
      <line x1="32" y1="32" x2="32" y2="60" stroke="#fbc02d" strokeWidth="2" />
      <line x1="62" y1="32" x2="62" y2="60" stroke="#fbc02d" strokeWidth="2" />
      {/* 잠든 주황 치즈 고양이 몸체 */}
      <ellipse cx="48" cy="30" rx="30" ry="18" fill="#ff9800" stroke="#e65100" strokeWidth="2.5" />
      {/* 머리 */}
      <circle cx="30" cy="32" r="14" fill="#ffa726" stroke="#e65100" strokeWidth="2.5" />
      {/* 귀 */}
      <polygon points="20,24 23,12 30,20" fill="#ff9800" stroke="#e65100" strokeWidth="2" />
      <polygon points="28,20 36,13 38,24" fill="#ff9800" stroke="#e65100" strokeWidth="2" />
      {/* 줄무늬 */}
      <path d="M42 16c2 4 1 8-1 10M52 16c2 4 1 8-1 10M62 18c2 4 1 7-1 9" stroke="#e65100" strokeWidth="2.5" strokeLinecap="round" />
      {/* 감은 눈 & 코 */}
      <path d="M22 34c2 3 5 3 7 0" stroke="#e65100" strokeWidth="2" fill="none" strokeLinecap="round" />
      <ellipse cx="27" cy="37" rx="1.5" ry="1" fill="#d84315" />
      {/* 꼬리 */}
      <path d="M72 32c8 2 12 8 8 13-3 4-8 1-9-4" stroke="#ff9800" strokeWidth="6" strokeLinecap="round" fill="none" />
      {/* Zzz 숨소리 */}
      <text x="10" y="18" fill="#3949ab" fontSize="12" fontWeight="800" fontFamily="sans-serif">z</text>
      <text x="4" y="10" fill="#3949ab" fontSize="9" fontWeight="800" fontFamily="sans-serif">z</text>
    </g>
  </svg>
);

// 7. 호기심 많은 검은 고양이
export const BlackCat: React.FC<SvgProps> = ({ width = 65, height = 90 }) => (
  <svg width={width} height={height} viewBox="0 0 65 90" fill="none">
    {stickerFilter}
    <g filter="url(#sticker-shadow)">
      {/* 검은 고양이 몸 */}
      <ellipse cx="32" cy="58" rx="18" ry="24" fill="#212121" stroke="#fff" strokeWidth="4" />
      <ellipse cx="32" cy="58" rx="18" ry="24" fill="#263238" />
      {/* 머리 */}
      <circle cx="32" cy="32" r="16" fill="#263238" />
      {/* 뾰족 귀 */}
      <polygon points="18,26 20,8 30,20" fill="#212121" />
      <polygon points="34,20 44,8 46,26" fill="#212121" />
      <polygon points="21,24 22,12 28,20" fill="#ef9a9a" />
      <polygon points="36,20 42,12 43,24" fill="#ef9a9a" />
      {/* 노란 눈망울 */}
      <ellipse cx="26" cy="32" rx="4" ry="5" fill="#ffeb3b" />
      <ellipse cx="38" cy="32" rx="4" ry="5" fill="#ffeb3b" />
      <ellipse cx="26" cy="32" rx="1.5" ry="4" fill="#212121" />
      <ellipse cx="38" cy="32" rx="1.5" ry="4" fill="#212121" />
      {/* 꼬리 */}
      <path d="M45 70c12-3 15-18 8-25" stroke="#263238" strokeWidth="5" strokeLinecap="round" fill="none" />
    </g>
  </svg>
);

// 8. 빈티지 그린 뱅커스 스탠드 램프 (인터랙티브 On/Off 가능)
export const BankerLamp: React.FC<SvgProps> = ({ width = 75, height = 90, isLit = true }) => (
  <svg width={width} height={height} viewBox="0 0 75 90" fill="none">
    {stickerFilter}
    <g filter="url(#sticker-shadow)">
      {/* 램프 켜짐 시 은은한 방사형 빛 */}
      {isLit && (
        <path d="M12 40L0 90h75L63 40z" fill="url(#lamp-light-gradient)" opacity="0.45" />
      )}
      <defs>
        <linearGradient id="lamp-light-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#fff59d" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#fff59d" stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* 황동 받침 & 목 */}
      <ellipse cx="37.5" cy="80" rx="18" ry="6" fill="#c5a059" stroke="#795548" strokeWidth="2" />
      <ellipse cx="37.5" cy="78" rx="14" ry="4" fill="#e0bb6b" />
      <path d="M37 78V52c0-8-5-12-8-14" stroke="#c5a059" strokeWidth="5" strokeLinecap="round" />
      <path d="M37 52c0-8 5-12 8-14" stroke="#c5a059" strokeWidth="5" strokeLinecap="round" />
      {/* 그린 에메랄드 갓 */}
      <path d="M14 42c0-10 10-18 23.5-18S61 32 61 42H14z" fill={isLit ? "#2e7d32" : "#1b5e20"} stroke="#1b5e20" strokeWidth="2.5" />
      <ellipse cx="37.5" cy="42" rx="23.5" ry="4" fill={isLit ? "#a5d6a7" : "#388e3c"} />
      {/* 스위치 체인 줄 */}
      <circle cx="48" cy="48" r="2" fill="#e0bb6b" />
      <line x1="48" y1="42" x2="48" y2="48" stroke="#e0bb6b" strokeWidth="1.5" />
    </g>
  </svg>
);

// 9. 유리병 촛불 (촛불 루프 효과 연동)
export const GlassCandle: React.FC<SvgProps> = ({ width = 50, height = 65, isLit = true }) => (
  <svg width={width} height={height} viewBox="0 0 50 65" fill="none">
    {stickerFilter}
    <g filter="url(#sticker-shadow)">
      {/* 유리 컵 */}
      <rect x="10" y="24" width="30" height="36" rx="4" fill="rgba(255,255,255,0.3)" stroke="#fff" strokeWidth="3" />
      <rect x="10" y="24" width="30" height="36" rx="4" fill="rgba(255,243,224,0.4)" stroke="#ffb74d" strokeWidth="1.5" />
      {/* 양초 파라핀 */}
      <rect x="13" y="34" width="24" height="23" rx="2" fill="#ffe0b2" />
      {/* 심지 */}
      <line x1="25" y1="34" x2="25" y2="26" stroke="#424242" strokeWidth="2" />
      {/* 불꽃 */}
      {isLit && (
        <g className="candle-flame-anim">
          <ellipse cx="25" cy="18" rx="8" ry="12" fill="url(#candle-glow)" opacity="0.4" />
          <path d="M25 10c-3 5-5 9-3 12a4 4 0 006 0c2-3 0-7-3-12z" fill="#ff9800" />
          <path d="M25 15c-1.5 3-2 5-1 7a2 2 0 002 0c1-2 0-4-1-7z" fill="#fff9c4" />
        </g>
      )}
      <defs>
        <radialGradient id="candle-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fff59d" />
          <stop offset="100%" stopColor="#ffb74d" stopOpacity="0" />
        </radialGradient>
      </defs>
    </g>
  </svg>
);

// 10. 라떼아트 커피 머그 (커피 김 루프 연동)
export const CoffeeCup: React.FC<SvgProps> = ({ width = 75, height = 65 }) => (
  <svg width={width} height={height} viewBox="0 0 75 65" fill="none">
    {stickerFilter}
    <g filter="url(#sticker-shadow)">
      {/* 커피 김 애니메이션 라인 */}
      <path d="M30 14c-2-4 2-8 0-12M38 12c-2-4 2-8 0-12M46 14c-2-4 2-8 0-12" stroke="#fff" strokeWidth="2" strokeLinecap="round" opacity="0.65" />
      {/* 받침 접시 */}
      <ellipse cx="38" cy="52" rx="30" ry="8" fill="#e0e0e0" stroke="#fff" strokeWidth="4" />
      <ellipse cx="38" cy="52" rx="30" ry="8" fill="#f5f5f5" stroke="#bdbdbd" strokeWidth="1.5" />
      {/* 손잡이 */}
      <path d="M54 30c8 0 12 5 12 11s-6 10-12 10" stroke="#fff" strokeWidth="6" fill="none" />
      <path d="M54 30c8 0 12 5 12 11s-6 10-12 10" stroke="#e0e0e0" strokeWidth="4" fill="none" />
      {/* 머그 잔 */}
      <path d="M20 25h36v18c0 8-7 14-18 14s-18-6-18-14V25z" fill="#fafafa" stroke="#bdbdbd" strokeWidth="2" />
      <ellipse cx="38" cy="25" rx="18" ry="6" fill="#4e342e" />
      {/* 라떼아트 하트 */}
      <path d="M38 27c-4-4-8-1-6 2 2 3 6 4 6 4s4-1 6-4c2-3-2-6-6-2z" fill="#fff8e1" />
    </g>
  </svg>
);

// 11. 유리 티팟과 찻잔
export const Teapot: React.FC<SvgProps> = ({ width = 85, height = 65 }) => (
  <svg width={width} height={height} viewBox="0 0 85 65" fill="none">
    {stickerFilter}
    <g filter="url(#sticker-shadow)">
      {/* 손잡이 */}
      <path d="M20 30c-12 0-16 10-10 20 4 6 10 6 12 3" stroke="#90a4ae" strokeWidth="4" fill="none" strokeLinecap="round" />
      {/* 주전자 몸통 (유리 속 허브티) */}
      <circle cx="38" cy="38" r="22" fill="rgba(255,255,255,0.4)" stroke="#fff" strokeWidth="5" />
      <circle cx="38" cy="38" r="22" fill="#ffb74d" opacity="0.6" stroke="#b0bec5" strokeWidth="2" />
      {/* 찻잎 */}
      <circle cx="35" cy="45" r="2" fill="#558b2f" />
      <circle cx="42" cy="48" r="2.5" fill="#33691e" />
      <circle cx="32" cy="40" r="1.8" fill="#558b2f" />
      {/* 뚜껑 */}
      <ellipse cx="38" cy="18" rx="10" ry="4" fill="#cfd8dc" stroke="#90a4ae" strokeWidth="1.5" />
      <circle cx="38" cy="14" r="3" fill="#90a4ae" />
      {/* 주구 (주둥이) */}
      <path d="M56 34c6-4 14-4 16-12-3 8-7 12-14 16" stroke="#b0bec5" strokeWidth="4" strokeLinecap="round" fill="none" />
      {/* 작은 찻잔 */}
      <ellipse cx="68" cy="54" rx="10" ry="3" fill="#cfd8dc" />
      <path d="M62 45h12v7c0 3-2 5-6 5s-6-2-6-5v-7z" fill="#ffe0b2" stroke="#b0bec5" strokeWidth="1.5" />
    </g>
  </svg>
);

// 12. 블루베리 치즈케이크
export const Cheesecake: React.FC<SvgProps> = ({ width = 75, height = 55 }) => (
  <svg width={width} height={height} viewBox="0 0 75 55" fill="none">
    {stickerFilter}
    <g filter="url(#sticker-shadow)">
      {/* 디저트 접시 */}
      <ellipse cx="37.5" cy="45" rx="34" ry="8" fill="#e0e0e0" stroke="#fff" strokeWidth="4" />
      <ellipse cx="37.5" cy="45" rx="34" ry="8" fill="#f5f5f5" stroke="#bdbdbd" strokeWidth="1.5" />
      {/* 케이크 쿠키 크러스트 바닥 */}
      <polygon points="18,39 56,33 58,41 18,44" fill="#8d6e63" />
      {/* 치즈 바디 */}
      <polygon points="18,39 56,33 54,23 18,28" fill="#fff9c4" stroke="#fff" strokeWidth="1" />
      <polygon points="18,28 54,23 38,16 12,20" fill="#fffde7" />
      {/* 블루베리 토핑 & 잼 */}
      <path d="M16 26c8-3 20-4 28-6 2 2 0 4-4 5-8 2-16 3-24 1z" fill="#4a148c" />
      <circle cx="22" cy="22" r="3" fill="#311b92" />
      <circle cx="28" cy="21" r="3.5" fill="#4527a0" />
      <circle cx="34" cy="20" r="3" fill="#311b92" />
      <circle cx="25" cy="24" r="2.5" fill="#4a148c" />
    </g>
  </svg>
);

// 13. 버터 크루아상
export const Croissant: React.FC<SvgProps> = ({ width = 65, height = 45 }) => (
  <svg width={width} height={height} viewBox="0 0 65 45" fill="none">
    {stickerFilter}
    <g filter="url(#sticker-shadow)">
      <path d="M12 30C8 26 8 18 15 15c8-3 15 2 17 5 3-4 12-7 19-3 6 4 7 12 2 17-6 5-14 2-20-1-6 3-17 4-21-3z" fill="#ffa726" stroke="#fff" strokeWidth="4" />
      <path d="M12 30C8 26 8 18 15 15c8-3 15 2 17 5 3-4 12-7 19-3 6 4 7 12 2 17-6 5-14 2-20-1-6 3-17 4-21-3z" fill="#ffb74d" stroke="#e65100" strokeWidth="2" />
      {/* 크루아상 결 주름 */}
      <path d="M22 17c3 5 4 10 2 15M32 20c2 4 2 9 0 13M42 19c-1 4-2 9-5 13" stroke="#e65100" strokeWidth="2.5" strokeLinecap="round" />
    </g>
  </svg>
);

// 14. 몬스테라 화분
export const MonsteraPlant: React.FC<SvgProps> = ({ width = 85, height = 110 }) => (
  <svg width={width} height={height} viewBox="0 0 85 110" fill="none">
    {stickerFilter}
    <g filter="url(#sticker-shadow)">
      {/* 테라코타 토분 화분 */}
      <polygon points="28,75 57,75 53,104 32,104" fill="#d84315" stroke="#fff" strokeWidth="4" />
      <polygon points="28,75 57,75 53,104 32,104" fill="#e64a19" stroke="#bf360c" strokeWidth="2" />
      <rect x="25" y="70" width="35" height="7" rx="2" fill="#ff5722" stroke="#bf360c" strokeWidth="2" />
      {/* 줄기 & 몬스테라 잎들 */}
      <path d="M42 70V35M42 55C32 48 24 40 22 30M42 50C52 42 62 36 65 24" stroke="#2e7d32" strokeWidth="3" strokeLinecap="round" />
      {/* 잎 1 (중앙) */}
      <path d="M42 10C35 20 30 32 42 42c12-10 7-22 0-32z" fill="#43a047" stroke="#1b5e20" strokeWidth="2" />
      {/* 잎 2 (좌측 찢잎) */}
      <path d="M12 25c5-10 18-8 20 4-4 2-10 0-12 5 4 0 8 2 6 6-5 1-10-3-14-15z" fill="#388e3c" stroke="#1b5e20" strokeWidth="2" />
      {/* 잎 3 (우측 찢잎) */}
      <path d="M72 18c-5-10-18-8-20 4 4 2 10 0 12 5-4 0-8 2-6 6 5 1 10-3 14-15z" fill="#4caf50" stroke="#1b5e20" strokeWidth="2" />
    </g>
  </svg>
);

// 15. 턴테이블 LP 레코드 플레이어
export const Turntable: React.FC<SvgProps> = ({ width = 85, height = 70 }) => (
  <svg width={width} height={height} viewBox="0 0 85 70" fill="none">
    {stickerFilter}
    <g filter="url(#sticker-shadow)">
      {/* 우드 바디 베이스 */}
      <rect x="10" y="20" width="65" height="42" rx="4" fill="#4e342e" stroke="#fff" strokeWidth="4" />
      <rect x="10" y="20" width="65" height="42" rx="4" fill="#5d4037" stroke="#2d1d19" strokeWidth="2" />
      {/* 플래터 및 LP 판 */}
      <circle cx="38" cy="40" r="18" fill="#212121" stroke="#424242" strokeWidth="2" />
      <circle cx="38" cy="40" r="14" fill="#111" />
      <circle cx="38" cy="40" r="6" fill="#e53935" />
      <circle cx="38" cy="40" r="1.5" fill="#fff" />
      {/* 톤암 (바늘대) */}
      <line x1="62" y1="28" x2="52" y2="44" stroke="#cfd8dc" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="62" cy="28" r="4" fill="#78909c" />
      <rect x="49" y="43" width="4" height="6" fill="#ffd54f" />
      {/* 노브 볼륨 */}
      <circle cx="64" cy="54" r="3" fill="#e0e0e0" />
    </g>
  </svg>
);

// 16. 어쿠스틱 통기타
export const AcousticGuitar: React.FC<SvgProps> = ({ width = 60, height = 135 }) => (
  <svg width={width} height={height} viewBox="0 0 60 135" fill="none">
    {stickerFilter}
    <g filter="url(#sticker-shadow)">
      {/* 기타 스탠드 삼각대 */}
      <path d="M15 125l15-25 15 25M30 100v28" stroke="#424242" strokeWidth="3" strokeLinecap="round" />
      {/* 넥 & 헤드 */}
      <rect x="27" y="10" width="6" height="55" fill="#5d4037" stroke="#2d1d19" strokeWidth="1" />
      <rect x="25" y="6" width="10" height="12" rx="2" fill="#3e2723" />
      {/* 바디 (8자 형태) */}
      <path d="M22 62c-8 0-14 6-14 14 0 6 4 10 7 12-6 4-10 11-10 19 0 13 11 22 25 22s25-9 25-22c0-8-4-15-10-19 3-2 7-6 7-12 0-8-6-14-14-14h-16z" fill="#ffb74d" stroke="#fff" strokeWidth="4" />
      <path d="M22 62c-8 0-14 6-14 14 0 6 4 10 7 12-6 4-10 11-10 19 0 13 11 22 25 22s25-9 25-22c0-8-4-15-10-19 3-2 7-6 7-12 0-8-6-14-14-14h-16z" fill="#ffa726" stroke="#b26a00" strokeWidth="2.5" />
      {/* 사운드홀 */}
      <circle cx="30" cy="86" r="6.5" fill="#3e2723" stroke="#ffe0b2" strokeWidth="1.5" />
      {/* 브릿지 */}
      <rect x="24" y="106" width="12" height="4" rx="1" fill="#3e2723" />
    </g>
  </svg>
);

// 17. 앤틱 고서적 책 더미
export const AntiqueBooks: React.FC<SvgProps> = ({ width = 70, height = 60 }) => (
  <svg width={width} height={height} viewBox="0 0 70 60" fill="none">
    {stickerFilter}
    <g filter="url(#sticker-shadow)">
      {/* 1층 큰 책 (네이비) */}
      <rect x="10" y="42" width="50" height="14" rx="2" fill="#1a237e" stroke="#fff" strokeWidth="4" />
      <rect x="10" y="42" width="50" height="14" rx="2" fill="#283593" stroke="#1a237e" strokeWidth="1.5" />
      <line x1="16" y1="42" x2="16" y2="56" stroke="#ffd54f" strokeWidth="2" />
      {/* 2층 책 (와인레드) */}
      <rect x="14" y="29" width="44" height="13" rx="2" fill="#880e4f" stroke="#fff" strokeWidth="4" />
      <rect x="14" y="29" width="44" height="13" rx="2" fill="#ad1457" stroke="#880e4f" strokeWidth="1.5" />
      <line x1="20" y1="29" x2="20" y2="42" stroke="#ffd54f" strokeWidth="2" />
      {/* 3층 책 (올리브그린) */}
      <rect x="18" y="18" width="38" height="11" rx="2" fill="#1b5e20" stroke="#fff" strokeWidth="4" />
      <rect x="18" y="18" width="38" height="11" rx="2" fill="#2e7d32" stroke="#1b5e20" strokeWidth="1.5" />
      {/* 책갈피 리본 */}
      <path d="M50 22v14l-3-3-3 3V22" fill="#d32f2f" />
    </g>
  </svg>
);

// 18. 펼쳐진 가죽 다이어리와 깃털/만년필 & 안경
export const DiaryWithGlasses: React.FC<SvgProps> = ({ width = 85, height = 65 }) => (
  <svg width={width} height={height} viewBox="0 0 85 65" fill="none">
    {stickerFilter}
    <g filter="url(#sticker-shadow)">
      {/* 가죽 커버 */}
      <rect x="10" y="16" width="65" height="42" rx="4" fill="#4e342e" stroke="#fff" strokeWidth="4" />
      <rect x="10" y="16" width="65" height="42" rx="4" fill="#5d4037" stroke="#3e2723" strokeWidth="1.5" />
      {/* 펼쳐진 속지 */}
      <path d="M14 20h26v34H14zM45 20h26v34H45z" fill="#fffde7" stroke="#d7ccc8" strokeWidth="1" />
      <line x1="18" y1="26" x2="36" y2="26" stroke="#b0bec5" strokeWidth="1.5" />
      <line x1="18" y1="32" x2="36" y2="32" stroke="#b0bec5" strokeWidth="1.5" />
      <line x1="18" y1="38" x2="36" y2="38" stroke="#b0bec5" strokeWidth="1.5" />
      <line x1="49" y1="26" x2="67" y2="26" stroke="#b0bec5" strokeWidth="1.5" />
      <line x1="49" y1="32" x2="67" y2="32" stroke="#b0bec5" strokeWidth="1.5" />
      {/* 동그란 앤틱 안경 */}
      <circle cx="34" cy="46" r="6" stroke="#c5a059" strokeWidth="1.8" fill="rgba(255,255,255,0.4)" />
      <circle cx="50" cy="46" r="6" stroke="#c5a059" strokeWidth="1.8" fill="rgba(255,255,255,0.4)" />
      <path d="M40 46h4" stroke="#c5a059" strokeWidth="1.8" />
      {/* 황동 만년필 */}
      <line x1="22" y1="52" x2="36" y2="22" stroke="#c5a059" strokeWidth="3" strokeLinecap="round" />
      <polygon points="36,22 38,18 39,22" fill="#212121" />
    </g>
  </svg>
);

// 19. 클래식 로마숫자 원형 벽시계
export const WallClock: React.FC<SvgProps> = ({ width = 65, height = 65 }) => (
  <svg width={width} height={height} viewBox="0 0 65 65" fill="none">
    {stickerFilter}
    <g filter="url(#sticker-shadow)">
      <circle cx="32.5" cy="32.5" r="28" fill="#4e342e" stroke="#fff" strokeWidth="4" />
      <circle cx="32.5" cy="32.5" r="28" fill="#5d4037" stroke="#2d1d19" strokeWidth="2" />
      <circle cx="32.5" cy="32.5" r="22" fill="#fffde7" stroke="#3e2723" strokeWidth="1.5" />
      {/* 12, 3, 6, 9 표식 */}
      <text x="30" y="20" fontSize="7" fontWeight="bold" fill="#3e2723" fontFamily="serif">XII</text>
      <text x="47" y="35" fontSize="7" fontWeight="bold" fill="#3e2723" fontFamily="serif">III</text>
      <text x="31" y="50" fontSize="7" fontWeight="bold" fill="#3e2723" fontFamily="serif">VI</text>
      <text x="14" y="35" fontSize="7" fontWeight="bold" fill="#3e2723" fontFamily="serif">IX</text>
      {/* 시침, 분침 (심야 10시 10분) */}
      <line x1="32.5" y1="32.5" x2="24" y2="22" stroke="#212121" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="32.5" y1="32.5" x2="44" y2="25" stroke="#212121" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="32.5" cy="32.5" r="2" fill="#c5a059" />
    </g>
  </svg>
);

// 20. 레트로 시티팝 액자 (비행기 & 하늘)
export const RetroPoster: React.FC<SvgProps> = ({ width = 60, height = 80 }) => (
  <svg width={width} height={height} viewBox="0 0 60 80" fill="none">
    {stickerFilter}
    <g filter="url(#sticker-shadow)">
      {/* 원목 액자 프레임 */}
      <rect x="6" y="6" width="48" height="68" rx="2" fill="#3e2723" stroke="#fff" strokeWidth="4" />
      <rect x="6" y="6" width="48" height="68" rx="2" fill="#4e342e" stroke="#2d1d19" strokeWidth="2" />
      {/* 시티팝 아트웍 (푸른 하늘, 핑크 석양, 비행기) */}
      <rect x="11" y="11" width="38" height="58" fill="url(#poster-sky)" />
      <polygon points="11,55 49,48 49,69 11,69" fill="#004d40" />
      {/* 비행기 실루엣 */}
      <path d="M22 35l14-6 6 2-10 6 8 2-2 3-8-1-6 4z" fill="#fff" />
      <defs>
        <linearGradient id="poster-sky" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#0288d1" />
          <stop offset="60%" stopColor="#81d4fa" />
          <stop offset="100%" stopColor="#f48fb1" />
        </linearGradient>
      </defs>
    </g>
  </svg>
);

// 21. 페르시안 빈티지 러그
export const VintageRug: React.FC<SvgProps> = ({ width = 140, height = 70 }) => (
  <svg width={width} height={height} viewBox="0 0 140 70" fill="none">
    {stickerFilter}
    <g filter="url(#sticker-shadow)">
      <ellipse cx="70" cy="35" rx="66" ry="30" fill="#fff" stroke="#fff" strokeWidth="4" />
      <ellipse cx="70" cy="35" rx="64" ry="28" fill="#8d2b2b" stroke="#d4af37" strokeWidth="2.5" />
      <ellipse cx="70" cy="35" rx="52" ry="22" fill="#2d4059" stroke="#ea5455" strokeWidth="1.5" strokeDasharray="4 2" />
      <ellipse cx="70" cy="35" rx="35" ry="14" fill="#c05c46" />
      <polygon points="70,24 78,35 70,46 62,35" fill="#f6d186" />
      {/* 러그 태슬 프린지 */}
      <line x1="6" y1="35" x2="2" y2="35" stroke="#f6d186" strokeWidth="3" strokeLinecap="round" />
      <line x1="134" y1="35" x2="138" y2="35" stroke="#f6d186" strokeWidth="3" strokeLinecap="round" />
    </g>
  </svg>
);

// 22. 포근한 격자무늬 쿠션
export const CozyCushion: React.FC<SvgProps> = ({ width = 50, height = 50 }) => (
  <svg width={width} height={height} viewBox="0 0 50 50" fill="none">
    {stickerFilter}
    <g filter="url(#sticker-shadow)">
      <rect x="7" y="7" width="36" height="36" rx="10" transform="rotate(12 25 25)" fill="#fff" stroke="#fff" strokeWidth="4" />
      <rect x="7" y="7" width="36" height="36" rx="10" transform="rotate(12 25 25)" fill="#d97736" stroke="#a04f1a" strokeWidth="2" />
      {/* 격자 체크 무늬 */}
      <line x1="15" y1="6" x2="15" y2="44" stroke="#fff8e7" strokeWidth="2" opacity="0.6" transform="rotate(12 25 25)" />
      <line x1="35" y1="6" x2="35" y2="44" stroke="#fff8e7" strokeWidth="2" opacity="0.6" transform="rotate(12 25 25)" />
      <line x1="6" y1="15" x2="44" y2="15" stroke="#fff8e7" strokeWidth="2" opacity="0.6" transform="rotate(12 25 25)" />
      <line x1="6" y1="35" x2="44" y2="35" stroke="#fff8e7" strokeWidth="2" opacity="0.6" transform="rotate(12 25 25)" />
      {/* 중앙 단추 */}
      <circle cx="25" cy="25" r="3" fill="#6d3b14" />
    </g>
  </svg>
);

// 23. 황동 우산꽂이와 클래식 우산
export const UmbrellaStand: React.FC<SvgProps> = ({ width = 45, height = 90 }) => (
  <svg width={width} height={height} viewBox="0 0 45 90" fill="none">
    {stickerFilter}
    <g filter="url(#sticker-shadow)">
      <rect x="10" y="45" width="25" height="40" rx="3" fill="#fff" stroke="#fff" strokeWidth="5" />
      {/* 우산 손잡이 & 살 */}
      <path d="M18 12c-4 0-7 4-7 8 0 3 2 5 5 5s4-2 4-5l2 32" stroke="#fff" strokeWidth="5" fill="none" strokeLinecap="round" />
      <path d="M18 12c-4 0-7 4-7 8 0 3 2 5 5 5s4-2 4-5l2 32" stroke="#5d4037" strokeWidth="3" fill="none" strokeLinecap="round" />
      {/* 접힌 녹색 우산 천 */}
      <path d="M17 35l6 20h-8z" fill="#1b5e20" stroke="#fff" strokeWidth="3" />
      <path d="M17 35l6 20h-8z" fill="#2e7d32" />
      {/* 황동 원통 스탠드 */}
      <rect x="10" y="45" width="25" height="40" rx="3" fill="#c5a059" stroke="#8d6e35" strokeWidth="2" />
      <ellipse cx="22.5" cy="45" rx="12.5" ry="3" fill="#d4af37" stroke="#8d6e35" strokeWidth="1.5" />
      <ellipse cx="22.5" cy="85" rx="12.5" ry="3" fill="#8d6e35" />
      <line x1="14" y1="52" x2="31" y2="52" stroke="#8d6e35" strokeWidth="1.5" />
      <line x1="14" y1="78" x2="31" y2="78" stroke="#8d6e35" strokeWidth="1.5" />
    </g>
  </svg>
);

// 24. 마시멜로 핫초코 머그
export const HotCocoa: React.FC<SvgProps> = ({ width = 50, height = 45 }) => (
  <svg width={width} height={height} viewBox="0 0 50 45" fill="none">
    {stickerFilter}
    <g filter="url(#sticker-shadow)">
      <rect x="8" y="12" width="26" height="26" rx="6" fill="#fff" stroke="#fff" strokeWidth="5" />
      <path d="M34 16h6c3 0 5 2 5 5s-2 5-5 5h-6" stroke="#fff" strokeWidth="5" fill="none" />
      {/* 빨간색 머그잔 */}
      <rect x="8" y="12" width="26" height="26" rx="6" fill="#c62828" stroke="#8e0000" strokeWidth="1.5" />
      <path d="M34 16h6c3 0 5 2 5 5s-2 5-5 5h-6" stroke="#c62828" strokeWidth="3" fill="none" />
      {/* 핫초코 & 마시멜로 */}
      <ellipse cx="21" cy="14" rx="11" ry="3" fill="#3e2723" />
      <circle cx="17" cy="13" r="2.5" fill="#fffde7" />
      <circle cx="23" cy="14" r="2.5" fill="#fffde7" />
      <circle cx="20" cy="16" r="2" fill="#fffde7" />
    </g>
  </svg>
);

// 25. 테라코타 화분의 작은 다육이
export const PottedSucculent: React.FC<SvgProps> = ({ width = 45, height = 55 }) => (
  <svg width={width} height={height} viewBox="0 0 45 55" fill="none">
    {stickerFilter}
    <g filter="url(#sticker-shadow)">
      <polygon points="12,28 33,28 30,50 15,50" fill="#fff" stroke="#fff" strokeWidth="5" />
      {/* 다육 식물 잎 */}
      <circle cx="22.5" cy="20" r="10" fill="#fff" stroke="#fff" strokeWidth="4" />
      <ellipse cx="22.5" cy="16" rx="5" ry="9" fill="#43a047" stroke="#2e7d32" strokeWidth="1.5" />
      <ellipse cx="16" cy="21" rx="8" ry="5" fill="#66bb6a" stroke="#2e7d32" strokeWidth="1.5" />
      <ellipse cx="29" cy="21" rx="8" ry="5" fill="#66bb6a" stroke="#2e7d32" strokeWidth="1.5" />
      <circle cx="22.5" cy="21" r="4" fill="#a5d6a7" />
      {/* 테라코타 토분 */}
      <polygon points="12,28 33,28 30,50 15,50" fill="#d87d4a" stroke="#a04f1a" strokeWidth="2" />
      <rect x="10" y="25" width="25" height="5" rx="1.5" fill="#e28c5a" stroke="#a04f1a" strokeWidth="1.5" />
    </g>
  </svg>
);

// 스티커 에셋 ID와 SVG 컴포넌트 매핑 레지스트리
export const STICKER_COMPONENTS: Record<string, React.FC<SvgProps>> = {
  'furniture-table': TableBistro,
  'furniture-armchair': Armchair,
  'furniture-chair-1': DiningChair,
  'furniture-bookshelf': Bookshelf,
  'furniture-coatrack': CoatRack,
  'cat-sleeping': SleepingCat,
  'cat-black': BlackCat,
  'light-banker-lamp': BankerLamp,
  'light-candle': GlassCandle,
  'food-coffee': CoffeeCup,
  'food-teapot': Teapot,
  'food-cheesecake': Cheesecake,
  'food-croissant': Croissant,
  'food-cocoa': HotCocoa,
  'plant-monstera': MonsteraPlant,
  'plant-succulent': PottedSucculent,
  'music-turntable': Turntable,
  'music-guitar': AcousticGuitar,
  'book-stack': AntiqueBooks,
  'book-diary': DiaryWithGlasses,
  'decor-clock': WallClock,
  'decor-poster': RetroPoster,
  'decor-rug': VintageRug,
  'decor-cushion': CozyCushion,
  'decor-umbrella': UmbrellaStand,
};
