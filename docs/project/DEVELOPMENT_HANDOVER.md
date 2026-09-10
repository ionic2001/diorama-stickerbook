# 🌿 3D 디오라마 스티커북(Stickerbook) 개발 인수인계서 및 프로젝트 메모

> **작성일**: 2026-09-10  
> **프로젝트 주소**: `/` (`http://localhost:5173/`)  
> **주요 대상**: 다른 컴퓨터에서 이어서 개발할 개발자 및 AI 에이전트  
> **상태**: 1차 완성 (2개 테마 덱 탑재, 3단계 파이프라인 검증 완료, 빌드 통과)

---

## 1. 프로젝트 요약 & 핵심 가치

본 프로젝트는 **3D 아이소메트릭 룸 일러스트 배경 위에 정밀하게 추출된 1:1 실측 투명 스티커를 자유롭게 배치하여 나만의 공간을 꾸미는 힐링 웹 애플리케이션**입니다.

### 🌟 핵심 원칙 & 사용자 요구사항 반영 내역
1. **3단계 제작 파이프라인 정립**:
   - `[1단계: 전체 마스터 씬 선제작]` ➔ `[2단계: 1:1 실측 투명 스티커 추출]` ➔ `[3단계: 빈 룸 배경 도킹]`
   - 마스터 씬의 투시각도(원근감)를 그대로 유지하므로, 스티커 배치 시 별도의 인위적 CSS 회전(`rotation: 0°`) 없이 공간에 100% 밀착됩니다.
2. **배경 100% 투명화 (Zero White Borders)**:
   - 외곽 하얀 종이 테두리와 지저분한 후광(Halo)을 제거하고, 의자 살/사다리 발판/선반 단/마크라메 줄 사이의 **내부 음각 공간(Negative Space)**을 완벽히 관통 천공.
3. **1:1 원본 실측 크기 부착**:
   - 트레이에서 스티커를 클릭하거나 드롭했을 때, 1단계 마스터 씬 속 사물 크기와 **정확히 1:1 동일한 크기**(`scale: 1.0`)로 자동 부착.
4. **빈 방(Empty Room)에서 시작**:
   - 스티커가 미리 꽉 차있지 않고, 깨끗한 빈 배경에서 시작하여 유저가 직접 채워나가는 경험 제공.
5. **감성적인 Web Audio 재즈 사운드**:
   - 잡음 같던 빗소리를 대체하여, 외부 음원 파일 없이 Web Audio API로 실시간 절차적 합성되는 **잔잔한 재즈 BGM**과 햅틱 팝 사운드 탑재.

---

## 2. 다른 컴퓨터에서 프로젝트 셋업 및 실행 방법

### 2.1 환경 요구사항
- **Node.js**: v18.0.0 이상 (v20+ 권장)
- **패키지 매니저**: npm

### 2.2 설치 및 실행 명령어
```bash
# 1. 의존성 패키지 설치
npm install

# 2. 로컬 개발 서버 실행 (기존 포트 3030 기준)
npm run dev

# 3. 브라우저 접속
# http://localhost:5173/

# 4. TypeScript 및 Vite 빌드 무결성 검증
npm run build
```

> **주요 의존 라이브러리**:
> - `@pdf-lib/upng`: 개발용 스티커 추출 스크립트에서 RGBA8 디코딩/인코딩에 사용됨
> - `lucide-react`: UI 아이콘

---

## 3. 핵심 아키텍처 및 파일 구조 맵

```
diorama-stickerbook/
├── public/assets/diorama/                       # 정적 그래픽 에셋 디렉토리
│   ├── glasshouse-botanist/                     # 🌿 테마 1: 아늑한 온실 정원
│   │   ├── bg-glasshouse.jpg                    # 1200x896 빈 온실 배경
│   │   ├── example-scene.jpg                    # 1200x896 1단계 완성 마스터 씬
│   │   ├── sticker-sheet.jpg                    # 원본 스티커 시트
│   │   └── stickers/                            # 18종 투명 PNG 스티커
│   │       ├── furniture-workbench.png          # 분갈이 작업대 (288x315)
│   │       ├── furniture-plantshelf.png         # 3단 플랜트 선반 (212x298)
│   │       ├── furniture-wicker-armchair.png    # 라탄 암체어 (257x302)
│   │       ├── furniture-crate.png              # 원목 수납 상자 (204x160)
│   │       ├── furniture-stepladder.png         # 온실 사다리 (159x230)
│   │       ├── cat-sleeping-calico.png          # 삼색 고양이 (147x81)
│   │       ├── plant-lemon-tree.png             # 레몬 나무 화분 (225x412)
│   │       ├── plant-tropical-palm.png          # 풍성한 야자 화분 (220x270)
│   │       ├── plant-hanging-macrame-1.png      # 행잉 마크라메 고사리 (136x330)
│   │       ├── plant-hanging-macrame-2.png      # 행잉 마크라메 덩굴 (107x338)
│   │       ├── decor-botanical-posters.png      # 벽걸이 식물도감 세트 (290x150)
│   │       ├── decor-terrarium.png              # 유리 테라리움 (95x137)
│   │       ├── decor-potted-succulents.png      # 토분 다육이 모둠 (186x140)
│   │       ├── tool-trowel.png                  # 원예용 모종삽 (35x136)
│   │       ├── tool-pruners.png                 # 원예용 전정가위 (41x107)
│   │       └── decor-seed-packets.png           # 빈티지 씨앗 봉투 (78x153)
│   │
│   └── rainy-night-cafe/                        # ☕ 테마 2: 비 오는 밤의 카페
│       ├── bg-cafe.jpg                          # 1200x896 빈 카페 배경
│       ├── example-scene.jpg                    # 1200x896 1단계 완성 마스터 씬
│       └── stickers/                            # 29종 투명 PNG 스티커
│
├── src/
│   ├── pages/
│   │   └── StickerbookPage.tsx                  # 🌟 메인 페이지 (테마 상태, 자동저장, 단축키, 조율)
│   │
│   └── diorama/
│       ├── components/
│       │   ├── Canvas/
│       │   │   ├── DioramaCanvas.tsx            # 1024x768 4:3 반응형 뷰포트 캔버스 (스케일러, 드롭)
│       │   │   ├── GuideOverlay.tsx             # 3분할/대칭 보조선 레이어
│       │   │   └── ...
│       │   ├── Sticker/
│       │   │   ├── StickerInstance.tsx          # 개별 스티커 인터랙션 (드래그, 스케일, 회전, 선택)
│       │   │   └── StickerContextToolbar.tsx    # 선택 시 레이어(Z-Index), 반전, 삭제 팝업 툴바
│       │   ├── Toolbar/
│       │   │   └── TopToolbar.tsx               # 상단바 (테마 전환 버튼: [🌿온실 | ☕카페], Undo/Redo, BGM)
│       │   ├── Tray/
│       │   │   └── StickerTray.tsx              # 우측 접이식 스티커 서랍 (카테고리 탭, 드래그/클릭)
│       │   └── ViewEffects/
│       │       └── ViewEffectsOverlay.tsx       # 뷰 모드 특수효과 (카페 빗줄기 등)
│       │
│       ├── content/
│       │   ├── glasshouseBotanistManifest.ts    # 🌿 온실 테마 매니페스트
│       │   ├── rainyNightCafeManifest.ts        # ☕ 카페 테마 매니페스트
│       │   └── stickerSVGs.tsx                  # SVG 폴백 컴포넌트
│       │
│       ├── domain/
│       │   ├── export.ts                        # 2048x1536 고해상도 2K Canvas 무손실 PNG 내보내기
│       │   ├── history.ts                       # Undo / Redo 스택 관리
│       │   └── layers.ts                        # Z-Index 정규화 및 맨앞/맨뒤 정렬
│       │
│       ├── services/
│       │   ├── audioManager.ts                  # Web Audio API 절차적 합성 재즈 피아노 BGM & SFX
│       │   └── autosave.ts                      # localStorage 테마별(setId) 독립 저장/로드
│       │
│       └── types/
│           └── manifest.ts                      # Asset, ContentSet, PlacedSticker 등 타입 정의
│
└── scripts/diorama/                             # 🛠️ 스티커북 제작 파이프라인 스크립트 모음
    └── extract-stickers-pipeline.cjs            # 재사용 가능한 스티커 투명화/정밀 추출 도구
```

---

## 4. 1:1 스케일 및 좌표 매핑 수학 공식

캔버스의 해상도는 **1024 × 768 (4:3)** 이며, 마스터 씬 원본 이미지는 **1200 × 896(약 4:3)** 입니다. 두 비율이 정확히 같지 않으므로 X축과 Y축을 별도로 환산합니다.

### 📐 환산 공식
```typescript
const scaleX = 1024 / 1200; // 약 0.85333
const scaleY = 768 / 896;   // 약 0.85714

// 마스터 씬의 사물 크기가 (sceneW, sceneH) 일 때:
const canvasW = Math.round(sceneW * scaleX);
const canvasH = Math.round(sceneH * scaleY);

// 마스터 씬의 사물 중심 좌표가 (sceneCenterX, sceneCenterY) 일 때:
const defaultX = Math.round(sceneCenterX * scaleX);
const defaultY = Math.round(sceneCenterY * scaleY);
```
- 매니페스트 파일(`glasshouseBotanistManifest.ts`)의 `dimensions`에 이 계산된 `canvasW`, `canvasH`를 입력하고,
- `defaultTransform: { scale: 1.0, rotation: 0, flipX: false }` 로 설정합니다.
- 이렇게 하면 사용자가 스티커를 꺼낼 때 매니페스트에 기록한 기준 크기와 위치로 배치됩니다.

---

## 5. 신규 테마 덱 추가 방법 (Next Theme Workflow)

새로운 테마(예: 3번째 테마)를 추가할 때는 다음 절차를 따릅니다.

1. **Step 1: 마스터 씬 생성**:
   - 1200×896 크기로 완성된 방 일러스트 제작 (`example-scene.jpg`)
2. **Step 2: 스티커 시트 및 투명 추출**:
   - 사물들을 배열한 스티커 시트 생성 (`sticker-sheet.jpg`)
   - `scripts/diorama/extract-stickers-pipeline.cjs`를 사용해 Flood-fill 및 Negative Space를 관통 천공하여 `stickers/*.png`로 저장.
3. **Step 3: 빈 방(Empty Room) 배경 제작**:
   - 가구가 없는 빈 방 일러스트 제작 (`bg-<theme>.jpg`)
4. **Step 4: 매니페스트 작성**:
   - `src/diorama/content/<theme>Manifest.ts` 생성 후 실측 크기와 위치 기재.
   - `defaultCreation: { stickers: [] }` (빈 상태로 시작).
5. **Step 5: TopToolbar 및 StickerbookPage 등록**:
   - `TopToolbar.tsx`에 테마 탭 버튼 추가.
   - `StickerbookPage.tsx`의 `handleSelectTheme`에 신규 테마 매니페스트 연결.

---

## 6. 다른 컴퓨터 이전 시 체크리스트

- [ ] `public/assets/diorama/` 내의 이미지 파일들(`example-scene.jpg`, `bg-*.jpg`, `stickers/*.png`)이 누락 없이 모두 복사되었는가?
- [ ] `npm install` 후 `npm run build`를 실행했을 때 TypeScript 에러 없이 정상 통과하는가?
- [ ] `npm run dev` 실행 후 브라우저에서 `http://localhost:5173/` 접속 시 정상 작동하는가?
- [ ] 상단 툴바에서 `[🌿 온실 정원]`과 `[☕ 밤의 카페]` 간 전환이 매끄러운가?
- [ ] 첫 화면 클릭 시 재즈 피아노 BGM이 정상 재생되는가?

---

이 문서는 저장소 루트에 보존되어 있으며, 새 컴퓨터 환경에서 즉시 참고하여 개발을 이어갈 수 있습니다.
