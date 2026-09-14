# 온실 대표 12개 제작 기록

상태: 승인 그림체 기반 개별 자산 제작 완료, 앱 연결 전. 최소 75개 완성 세트 아님.

검토: 개발 서버의 /glasshouse-first12-review.html. 밝은/어두운/세이지 배경 전환 제공.
파일: public/assets/diorama/glasshouse-first12-v1/ (12개 PNG 원본 및 브라우저 검수 스크린샷).

## 제작 항목

1. 빈 식물 선반 — shelf.png
2. 빈 원예 작업대 — workbench.png
3. 테라코타 화분 — terracotta-pot.png
4. 몬스테라 — monstera.png
5. 식물학 책 — botany-book.png
6. 원예 일지 — garden-journal.png
7. 압화 노트 — pressed-flower-notebook.png
8. 손삽 — trowel.png
9. 전지가위 — pruning-shears.png
10. 빈 도구 트레이 — tool-tray.png
11. 금속 물뿌리개 — watering-can.png
12. 낮은 스툴 — stool.png

## 검수 및 다음 단계

- 12개 개별 파일을 브라우저에서 불러오고 밝은/어두운 배경으로 확인했다. 흰색 종이 테두리는 없다.
- 손삽은 한 차례 배경 추출 보정본을 채택했다. 생성 미리보기의 주변 색은 실제 브라우저 알파 합성에서는 보이지 않았다. 가위·트레이는 원 생성본을 유지했다.
- 사용자 확정: 화분+식물은 일체형 스티커 1개로 재제작한다. 앞 테두리 마스크나 복잡한 분리 렌더 방식은 진행하지 않는다. 같은 배치 문제가 있는 다른 조합에도 통합 원칙을 적용한다.
- 화분과 몬스테라를 합친 `potted-monstera-original.png`을 제작했다. 두 이미지는 제작 이력으로 보존하지만 새 시제품에서는 제공하지 않는다. 기존 검토 화면의 두 이미지 겹침은 문제 확인용 기록이다.
- 서비스용 11개 파일은 `public/assets/diorama/glasshouse-first12-v1/service/`에 저장했다. 원본 약 20.8MB에서 약 2.66MB로 줄였고, 디코딩 RGBA 픽셀 추정은 약 72MiB에서 8.81MiB로 줄었다.
- 앱 확인 주소: `/studio/?set=glasshouse-botanist&pilot=first11`. 빈 장면과 11개 목록으로 시작한다. 몬스테라 화분은 하나의 항목이며 배치 후 목록 제외·삭제 복귀를 확인했다.
- 가위는 생성 결과가 약간 열린 형태다. 정지 장식물이며 상호작용이나 애니메이션은 아직 없다.
- 원본 해상도와 전송량은 출시용 최적화 전이다. 다음 Sol 적용 단계에서 크기별 배포 파일·썸네일을 준비하고 원본은 보존한다.
- 측정: 12개 PNG 합계 20,810,279바이트(약 19.85MiB), 디코딩 RGBA 픽셀 추정 72MiB. 모두 알파 채널이 있다. 이 원본을 그대로 75개로 확대 적용하면 기획 예산을 넘으므로 서비스용 축소 파일이 필요하다.
- 기존 앱 자산이나 작품 저장 데이터는 변경하지 않았다. 실제 75개 이상의 실기기 성능 검증은 별도다.

## 생성 방식과 정확한 프롬프트

내장 image_gen 사용. 승인된 디자인 보드를 스타일 참조로 사용했다.

공통 프롬프트:

Use case: stylized-concept. Asset type: single production game sticker sprite. Reference image is approved STYLE REFERENCE ONLY; do not reproduce board or text. Warm cozy hand-painted botanical illustration, fine dark brown contours, subtle wood grain and brush texture, sage and terracotta palette, soft light from upper left. Consistent elevated three-quarter view compatible with approved board. Exactly ONE isolated object fully visible, centered, occupy 85 percent of image, simple clean silhouette. GENUINELY TRANSPARENT RGBA background, clean alpha around every edge and through openings. No white die-cut border, no pale halo, no checkerboard drawn into pixels, no floor, no ground shadow outside object, no text, no props, no collage. Subject: 

각 호출에는 위 공통 문장 뒤에 다음 Subject를 붙였다.

### shelf

One standalone three-tier wooden plant shelf, open back, four legs, no drawers and no bench attached. All shelves empty.

### workbench

One standalone wooden potting workbench, two drawers with round knobs, low back rail and empty lower shelf. No tall shelving attached. All surfaces empty.

### terracotta-pot

One empty terracotta plant pot with thick elliptical rim, visible dark inner cavity. No plant, soil or saucer.

### monstera

One monstera plant with five distinct split green leaves and short converging stems. Tiny compact dark soil plug at base, no sprawling roots. No pot. For layering into a separate pot.

### botany-book

One upright closed forest-green botanical book, gold leaf motif, visible front cover and left spine, no lettering.

### garden-journal

One upright closed terracotta-red gardening journal, cream lily motif, visible front cover and left spine, no lettering.

### pressed-flower-notebook

One upright closed cream notebook, green fern motif, visible front cover and left spine, no lettering.

### trowel

One small hand trowel lying diagonally, metal scoop and warm wooden handle, viewed slightly from above. No dirt.

### pruning-shears

One closed pair of pruning shears, sage-green handles and silver blades, lying diagonally viewed slightly from above.

### tool-tray

One empty low rectangular wooden tool tray with low dividers and an arched carrying handle. No tools, no contents.

### watering-can

One galvanized metal watering can with curved top handle and long spout ending in perforated rose, no flowing water. Output transparent cutout with alpha 0 everywhere outside silhouette. No glow.

### stool

One low wooden stool with circular seat and three sturdy legs. No cushion or objects on top. Output transparent cutout with alpha 0 everywhere outside silhouette. No glow.

손삽 추가 보정 프롬프트:

Use case: background-extraction. Edit target: supplied trowel image. Preserve the entire trowel shape, texture, angle and colors. Remove ALL background, ambient brown glow, haze, ground shadow and external halo. Output genuine transparent PNG alpha zero outside the hard object silhouette, including handle loop openings. No white border, no checkerboard pixels. Single clean cutout.

### 몬스테라 화분 일체형

내장 image_gen으로 분리 자산 합성을 두 차례 시도했으나 실제 알파 대신 체크무늬 배경이 포함되어 폐기했다. 승인된 특징을 문장으로 고정해 새로 생성한 세 번째 결과는 실제 RGBA 알파를 확인하고 채택했다.

최종 프롬프트:

Use case: stylized-concept.
Asset type: single production game sticker sprite.
Primary request: one complete potted monstera plant as a single indivisible object for a cozy greenhouse diorama.
Subject: a warm terracotta flowerpot with a thick elliptical rim, natural dark soil visible inside, and one lush monstera growing naturally from the soil; five to six distinct split leaves on short converging stems; front rim correctly hides lower stems; no visible roots or root ball.
Style/medium: warm hand-painted botanical illustration, detailed soft brush texture, fine dark-brown contour lines, slightly storybook-like but dimensional.
Composition/framing: elevated three-quarter view; exactly one centered object fully visible; pot and plant balanced; object occupies about 82 percent of square canvas; clean silhouette readable at thumbnail size.
Lighting/mood: soft warm light from upper left.
Color palette: natural botanical greens, muted terracotta orange, dark warm brown soil.
Constraints: GENUINELY TRANSPARENT RGBA background with alpha zero outside the silhouette and through leaf openings. No checkerboard drawn into the image, no white or gray background, no white sticker outline, no halo, glow, ground shadow, text, props, second pot, loose roots, watermark or collage.
