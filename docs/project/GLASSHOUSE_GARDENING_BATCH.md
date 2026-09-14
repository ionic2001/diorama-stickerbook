# 온실 원예 소품 8종 제작 기록

2026-09-14. 기존 19종에 8종 추가, 총 27종. 최소 75종까지 48종 남음.

## 자산과 배치 규칙

원본: public/assets/diorama/glasshouse-gardening-v1/originals/
서비스 PNG: public/assets/diorama/glasshouse-gardening-v1/service/
검토: /glasshouse-gardening-review.html
작업실: /studio/?set=glasshouse-botanist&pilot=first11

장갑 한 쌍은 하나로 계산. 봉투는 독립 배치용이며 상자 안 조립 기능을 약속하지 않음. 기존 저장 ID와 자산 ID 유지, 시제품 버전 3. 정식 출시 세트 아님.

## 최적화와 검증

scripts/prepare-greenhouse-gardening.cjs로 원본에서 긴 변 384px 이하 서비스 PNG 재생성. 8개 모두 alpha=0 영역 확인. 신규 1,323,479바이트, RGBA 단순 추정 3.59MiB. 누적 서비스 이미지 5,718,426바이트, RGBA 약 16.62MiB. 배경·앱·브라우저 오버헤드 제외이며 실제 기기 성능 측정값이 아님.

npm run verify 통과. Chrome 새 세션에서 27개 목록, 사용 시 제외, 재로딩 저장 복원, 모두 배치, 실행 취소/다시 실행, PNG 다운로드 성공 확인. 내보낸 PNG의 픽셀 내용 비교는 이번 검사에 포함하지 않음. 밝고 어두운 배경 검토 스크린샷을 확인했고 흰 테두리/불투명 배경 없음. 실기기 성능 검증은 남음.

## 생성 방식과 정확한 프롬프트

내장 imagegen으로 각 1장씩 생성. 아래 공통 프롬프트 뒤에 각 Subject를 붙임. 원본 파일명은 아래 ID에 .png를 붙인 이름.

Use case: stylized-concept. Asset type: single production sticker for a cozy greenhouse diorama. Exactly one isolated complete object. Match a warm illustrated wooden potting bench and botanical sticker collection: hand-painted brush texture, fine dark-brown outline, dimensional storybook drawing, warm soft upper-left light, elevated three-quarter view, muted earthy palette. Fully visible centered object with padding. Genuinely transparent RGBA background, clean alpha zero outside silhouette and in openings. No white sticker border, halo, glow, cast shadow, floor, checkerboard pixels, lettering, watermark or extra props. Subject: 

### soil-bag — 흙 주머니

계획표 행 41.

One partly open folded kraft-paper potting soil bag with a little dark soil visible inside, a simple green leaf emblem without letters. Entire bag is a single object.

### seed-box — 빈 씨앗 보관 상자

계획표 행 42.

One small low open wooden seed storage box with three empty compartments and no lid, contents, handle or lettering. Warm honey-colored wood.

### sunflower-seeds — 해바라기 씨앗 봉투

계획표 행 43.

One upright closed kraft-paper seed packet with a hand-painted golden sunflower illustration on the front, no lettering. Slim packet, slight three-quarter view, one packet only.

### herb-seeds — 허브 씨앗 봉투

계획표 행 44.

One upright closed cream-paper seed packet with a hand-painted branching rosemary sprig illustration and muted sage border on the front, no lettering. Slim packet, slight three-quarter view, one packet only.

### wildflower-seeds — 야생화 씨앗 봉투

계획표 행 45.

One upright closed muted blush-paper seed packet with a hand-painted small bouquet of daisies and blue wildflowers on the front, no lettering. Slim packet, slight three-quarter view, one packet only.

### hand-rake — 손갈퀴

계획표 행 49.

One small garden hand rake with three curved dark metal prongs attached to a warm wooden handle, lying diagonally viewed slightly from above. One complete tool, no extra prongs or dirt.

### gardening-gloves — 원예 장갑 한 쌍

계획표 행 51.

One pair of soft sage-green gardening gloves with cream linen cuffs, neatly overlapped, five fingers per glove, both gloves form one compact single sticker.

### twine-spool — 황마 끈 뭉치

계획표 행 52.

One small spool of natural tan jute twine with a short curled loose end attached, warm fibrous texture, no scissors, no label.

