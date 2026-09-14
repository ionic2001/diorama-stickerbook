# 온실 식물 8종 추가 제작 기록

기준: 2026-09-14. 내장 image_gen 사용. 화분 포함 일체형 원칙으로 8개 제작.

기존 11개와 합계 19개. 최소 75개까지 56개가 더 필요하며 실제 75개 실기기 성능 검증은 미완료다.

## 확인 주소

- /glasshouse-plants-review.html: 신규 8개 밝은/어두운 배경 검토
- /studio/?set=glasshouse-botanist&pilot=first11: 누적 19개
- 영어: /en/studio/?set=glasshouse-botanist&pilot=first11

first11 URL과 setId는 기존 작품 호환을 위해 유지한다. 버전만 2로 변경하고 기존 11개 assetId를 보존했다. 신규 자산 ID는 plants-v1- 접두어로 구분한다.

## 파일 및 검증

원본: public/assets/diorama/glasshouse-plants-v1/originals/
서비스용: public/assets/diorama/glasshouse-plants-v1/service/
재현: scripts/prepare-greenhouse-plants.cjs (sharp 필요)

모두 실제 알파 채널 및 투명 픽셀 확인. 긴 변 384px로 축소. 신규 8개 합계 1,733,228바이트, RGBA 픽셀 추정 4.22MiB. 기존 11개 포함 4,394,947바이트, 픽셀 추정 약 13.03MiB. 배경·앱·브라우저 메모리는 별도이며 실기기 측정값은 아니다.

밝은/어두운 브라우저 합성 검수, 전체 빌드 및 정적 검증, 19개 배치와 사용 목록 제외, 실행 취소/다시 실행, 기존 항목 재접속 복원, PNG 다운로드 완료를 확인했다. 기존 버전 저장 데이터 마이그레이션 전수 검사 및 실기기 검수는 별도다.

## 목록과 최종 프롬프트

다음 공통 문장 뒤에 항목별 문장을 붙여 각각 생성했다. 원본 크기와 색상 변형 복제로 수량을 늘리지 않았다.

Use case: stylized-concept. Single production game sticker sprite for a cozy greenhouse diorama. Exactly one complete plant AND pot as ONE indivisible object. Warm hand-painted botanical illustration, soft detailed brush texture, fine dark-brown contours, soft warm upper-left light, elevated three-quarter view. Muted natural greens, terracotta and cream, dimensional storybook style, not flat vector and not photorealistic. Correctly planted in dark soil; pot front rim naturally occludes lower stems; no exposed root ball. Centered fully visible silhouette with transparent margin, readable at thumbnail size. GENUINELY TRANSPARENT RGBA background, alpha zero outside silhouette and between leaves. No white sticker border, halo, glow, floor, shadow outside object, painted checkerboard, lettering, watermark, separate plant, second pot, extra props. Subject: 

- 고무나무 화분 (rubber-plant.png), 기획 번호 16: A small rubber tree with upright woody stems and six thick oval deep-green leaves in a warm cream ceramic pot.
- 보스턴 고사리 화분 (boston-fern.png), 기획 번호 17: A compact Boston fern with arching finely divided green fronds in a squat muted teal ceramic pot.
- 라벤더 화분 (lavender.png), 기획 번호 19: A lavender bush with slim gray-green leaves and numerous delicate purple flower spikes in a weathered terracotta pot.
- 로즈메리 화분 (rosemary.png), 기획 번호 20: A compact upright rosemary bush with fine needle-like sage-green leaves and woody stems in a cream stoneware pot.
- 바질 화분 (basil.png), 기획 번호 21: A lush compact basil plant with broad soft bright-green oval leaves in a small terracotta pot.
- 기둥 선인장 화분 (column-cactus.png), 기획 번호 25: A small column cactus with three uneven ribbed upright stems and subtle short spines in a muted blue ceramic pot.
- 둥근 선인장 화분 (round-cactus.png), 기획 번호 26: One round ribbed barrel cactus with tiny warm golden spines and a small pink flower at its crown in a low terracotta pot.
- 장미형 다육 화분 (rosette-succulent.png), 기획 번호 27: One fleshy rosette succulent with layered dusty sage leaves and muted pink tips in a shallow cream ceramic bowl.

8개 모두 해당 식물 항목을 화분 일체형으로 구체화했다. 기존 빈 화분 항목은 독립 장식물 후보로 남으며 동일 항목을 중복 집계하지 않는다. 최종 구성에서 빈 화분도 통합하면 총수를 다시 계산한다.

