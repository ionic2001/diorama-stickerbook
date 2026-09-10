export type Locale = 'ko' | 'en';
export type Page = 'home' | 'themes' | 'how-to' | 'features' | 'about' | 'privacy' | 'terms' | 'ad-settings' | 'studio' | 'not-found';
export const publicPages: Page[] = ['home', 'themes', 'how-to', 'features', 'about', 'privacy', 'terms'];
export const utilityPages: Page[] = ['ad-settings'];
export function pagePath(page: Page, locale: Locale) { return (locale === 'en' ? '/en' : '') + (page === 'home' ? '/' : '/' + page + '/'); }
export function parsePath(path: string): { locale: Locale; page: Page } {
  const parts = path.split('?')[0].split('/').filter(Boolean);
  const locale = parts[0] === 'en' ? 'en' : 'ko';
  if (locale === 'en') parts.shift();
  const name = parts.join('/') || 'home';
  return { locale, page: [...publicPages, ...utilityPages, 'studio'].includes(name as Page) ? name as Page : 'not-found' };
}
export const pageMeta: Record<Locale, Record<Page, [string, string]>> = {
  ko: {
    home: ['온라인 디오라마 스티커북 | 작은 공간, 깊은 취향', '온실과 카페를 투명 스티커로 꾸미는 온라인 디오라마 스티커북. 가입 없이 시작하고 배경음과 함께 나만의 공간을 완성하세요.'],
    themes: ['온실·카페 꾸미기 테마 | Diorama Stickerbook', '햇살 온실과 비 오는 밤의 카페를 만나보세요. 테마별 장면과 스티커를 확인하고 나만의 디오라마를 시작할 수 있습니다.'],
    'how-to': ['스티커북 이용방법 | 이동·회전·음악·PNG 저장 안내', '이미지로 배우는 디오라마 스티커북 사용법. 스티커 배치와 회전, 크기와 레이어 조절, 배경음 재생, 기기 저장과 PNG 내보내기를 안내합니다.'],
    features: ['온라인 공간 꾸미기 기능 | Diorama Stickerbook', '자유로운 스티커 배치, 실행 취소, 배경음, 기기 내 저장과 PNG 내보내기. 디오라마 스티커북의 현재 기능과 준비 중인 난이도를 살펴보세요.'],
    about: ['About Us | 작은 공간을 꾸미는 디지털 취미', 'Diorama Stickerbook이 생각하는 느린 창작과 작은 공간의 즐거움. 섬세한 일러스트, 자유로운 배치, 개인정보 최소화를 지향하는 서비스 이야기.'],
    privacy: ['개인정보 처리 안내 | Diorama Stickerbook', '회원가입 없이 이용하는 Diorama Stickerbook의 기기 저장 데이터, 광고·분석 도구 도입 원칙과 이용자 선택권을 안내합니다.'],
    terms: ['이용약관 | Diorama Stickerbook', 'Diorama Stickerbook 웹 서비스의 이용 조건, 콘텐츠 이용 범위, 책임과 서비스 변경 기준을 안내합니다.'],
    'ad-settings': ['광고 및 개인정보 설정 | Diorama Stickerbook', '현재 광고와 분석 도구의 연결 상태, 기기에 저장되는 항목, 향후 광고 선택권 제공 계획을 확인하세요.'],
    studio: ['꾸미기 작업실 | Diorama Stickerbook', '스티커를 배치하고 나만의 장면을 완성하는 작업실.'],
    'not-found': ['페이지를 찾을 수 없습니다', '홈이나 테마 페이지에서 다시 시작해 주세요.'],
  },
  en: {
    home: ['Online Diorama Stickerbook | Small spaces, personal stories', 'Decorate a greenhouse or café with illustrated stickers. Create without an account, choose gentle background music, and save your scene as a PNG.'],
    themes: ['Greenhouse and Café Themes | Diorama Stickerbook', 'Explore the Sunlit Greenhouse and Rainy Night Café. Choose a scene and arrange your own illustrated diorama.'],
    'how-to': ['How to Use Diorama Stickerbook | Rotate, Play Music, Save PNG', 'An illustrated guide to placing, rotating and resizing stickers, changing layers, playing background music, and saving your diorama on your device.'],
    features: ['Online Room Decorating Features | Diorama Stickerbook', 'Explore sticker editing, undo and redo, background music, local saves and PNG export, plus the detailed object levels we are preparing.'],
    about: ['About Us | A Quiet Digital Decorating Hobby', 'Discover the idea behind Diorama Stickerbook: thoughtful illustrations, creative freedom, small spaces, and a low-friction digital hobby.'],
    privacy: ['Privacy Notice | Diorama Stickerbook', 'Learn what Diorama Stickerbook stores on your device, the current advertising and analytics status, and our data-minimization approach.'],
    terms: ['Terms of Use | Diorama Stickerbook', 'Read the terms for using the Diorama Stickerbook web service, its creative content, downloads, availability and future updates.'],
    'ad-settings': ['Ads & Privacy Settings | Diorama Stickerbook', 'Check the current advertising and analytics status, device-stored preferences, and the controls planned before advertising is activated.'],
    studio: ['Creative Studio | Diorama Stickerbook', 'Arrange stickers and create your own illustrated scene.'],
    'not-found': ['Page not found', 'Return to the home page or explore our themes.'],
  },
};

export interface ArticleSection { title: string; paragraphs: string[]; image?: string; alt?: string; caption?: string; }
export interface Article { eyebrow: string; title: string; intro: string; sections: ArticleSection[]; }
const guide = '/assets/guide/';
export const articles: Record<Locale, Record<'how-to' | 'features' | 'about', Article>> = {
  ko: {
    'how-to': {
      eyebrow: 'HOW TO CREATE', title: '처음 한 장부터,\n나만의 공간이 되기까지.',
      intro: '온실의 빈 바닥에 화분 하나를 놓는 것부터 시작해 보세요. 아래 이미지를 따라 공간을 고르고, 스티커를 움직이고, 음악을 들으며 완성한 장면을 간직할 수 있습니다.',
      sections: [
        { title: '01. 머물고 싶은 공간 고르기', image: guide + 'themes.png', alt: '햇살 온실과 비 오는 밤의 카페를 고르는 테마 페이지', caption: '사용 가능한 세트를 선택한 뒤 ‘이 세트로 시작’을 누릅니다.', paragraphs: ['테마 페이지에서 햇살 온실 또는 비 오는 밤의 카페를 선택하세요. 오른쪽 선택 영역에서 장면을 확인한 뒤 작업실을 열 수 있습니다. 휴대폰에서는 세트 목록 아래에 선택 영역이 나타납니다.', '현재 두 세트를 이용할 수 있으며 나머지는 준비 중입니다. 초급·중급·고급의 오브젝트 분해 구성은 제작 중이므로 지금은 기존 스티커 구성을 체험하게 됩니다.'] },
        { title: '02. 스티커를 놓고 움직이기', image: guide + 'studio.png', alt: '온실에 스티커를 배치한 작업실과 오른쪽 스티커 서랍', caption: '서랍에서 스티커를 누르면 장면에 추가됩니다. 배치한 스티커를 끌어 옮겨보세요.', paragraphs: ['스티커 서랍의 가구·식물·소품 카테고리에서 원하는 것을 고르세요. 클릭하거나 탭하면 장면에 추가됩니다. PC에서는 서랍에서 장면으로 드래그해 놓을 수도 있습니다.', '추가한 스티커를 누른 채 움직이면 위치가 바뀝니다. 같은 스티커를 여러 번 추가할 수 있으니 큰 가구부터 배치하고 작은 소품을 채워보세요. 휴대폰에서는 장면 아래 서랍을 이용합니다.'] },
        { title: '03. 회전·크기·겹치는 순서 조절하기', image: guide + 'rotate.png', alt: '작업실 아래에 고정된 회전 버튼, 각도, 크기 슬라이더와 레이어 도구', caption: '선택 도구는 장면 밖에 고정되어 스티커가 가장자리에 있어도 접근할 수 있습니다.', paragraphs: ['스티커를 선택하면 아래에 편집 도구가 나타납니다. −15°와 +15° 버튼으로 방향을 바꾸고 크기 슬라이더로 확대·축소하세요. 현재 각도를 보면서 같은 방향으로 정렬할 수 있습니다.', '앞으로·뒤로 또는 맨 앞·맨 뒤를 이용하면 화분을 책장 앞에 두는 것처럼 겹치는 순서를 바꿀 수 있습니다. 좌우 반전, 복제, 삭제도 이 도구에서 사용할 수 있습니다. 위치가 마음에 들면 잠가 두고, 다시 수정하려면 잠금을 해제하세요.', '실수했다면 상단의 실행 취소를 누르세요. PC에서는 Ctrl/Cmd+Z, 다시 실행은 Ctrl/Cmd+Shift+Z를 사용할 수 있습니다. 초기화는 현재 세트의 배치를 비우므로 확인 후 진행하세요.'] },
        { title: '04. 배경음 고르고 재생하기', image: guide + 'sound.png', alt: '배경음 목록의 재생 버튼과 전체 음소거, 음량 조절 화면', caption: '곡 선택과 재생은 다른 동작입니다. ▶ 버튼을 눌러 음악을 시작하세요.', paragraphs: ['처음 작업실에 들어오면 음악은 자동으로 나오지 않습니다. 상단 소리 버튼을 열고 추천 목록이나 전체 음원에서 곡을 선택한 뒤 ▶ 재생을 누르세요. 현재 제공하는 음악은 브라우저에서 합성하는 세 가지 분위기의 배경음입니다.', '재생 버튼은 소리를 켜는 명시적인 동작입니다. 일시정지로 음악을 멈추거나 전체 음소거로 서비스 소리를 끌 수 있습니다. 배경음악 없음을 선택하면 곡 선택을 해제합니다. 음량을 조절하는 것만으로는 재생이 시작되지 않습니다.', '소리가 들리지 않으면 ▶ 재생 상태와 음량, 브라우저 탭·기기의 음소거를 확인하세요. 다른 탭이나 앱으로 이동하면 음악이 정지하며 돌아왔을 때 다시 재생할 수 있습니다.'] },
        { title: '05. 작품 저장과 PNG의 차이 이해하기', image: guide + 'export.png', alt: '온실 배경과 배치한 스티커가 함께 포함된 PNG 저장 결과', caption: 'PNG 저장 결과 예시. 배경과 스티커가 하나의 정지 이미지로 합쳐집니다.', paragraphs: ['작업 중인 배치는 같은 브라우저의 기기에 자동 저장됩니다. 같은 기기·브라우저·사이트 주소에서 다시 열면 이어서 꾸밀 수 있습니다. 브라우저 데이터를 지우거나 다른 기기로 이동하면 이 저장을 이용할 수 없으므로 완성 이미지를 내려받아 보관하세요.', '상단 PNG 저장은 배경과 배치한 스티커를 2048×1536 크기의 정지 이미지로 내보냅니다. 내려받은 파일은 브라우저의 다운로드 위치에서 확인할 수 있습니다. 스티커를 놓지 않은 빈 장면은 배경만 저장됩니다.', 'PNG에는 배경음악과 애니메이션이 포함되지 않습니다. 음악은 작업실에서만 재생되며 소리가 포함된 영상 내보내기는 아직 제공하지 않습니다. PNG를 다시 열어 개별 스티커를 편집할 수도 없습니다.'] },
        { title: '자주 궁금한 점', paragraphs: ['가입이 필요한가요? 현재 꾸미기와 PNG 저장에는 계정이 필요하지 않습니다. 작품은 기본적으로 사용자 기기의 브라우저에 보관됩니다.', '감상 모드는 무엇인가요? 편집 도구를 숨기고 장면을 보는 모드입니다. 카페의 일부 스티커는 김이나 빛 등의 시각 효과를 보여줍니다. PNG로 저장하면 움직임은 포함되지 않습니다.', '모든 난이도의 스티커가 다른가요? 단계별 분해 자산은 준비 중입니다. 현재 이용 가능한 세트와 향후 추가될 구성은 테마 및 특징 페이지에서 구분해 안내합니다.'] },
      ],
    },
    features: {
      eyebrow: 'MADE FOR YOUR PACE', title: '한 번의 배치가 만드는\n작은 분위기의 차이.',
      intro: 'Diorama Stickerbook은 그림을 처음부터 그리지 않아도 공간을 표현할 수 있는 온라인 꾸미기 도구입니다. 같은 방과 같은 스티커로 시작해도 배치와 여백에 따라 다른 장면이 만들어집니다.',
      sections: [
        { title: '섬세한 일러스트로 꾸미는 온실과 카페', image: '/assets/diorama/glasshouse-botanist/example-scene.jpg', alt: '다양한 식물과 가구로 꾸민 온실 완성 예시', paragraphs: ['나무 바닥의 결, 창문으로 들어오는 빛, 화분의 잎처럼 작은 요소가 공간의 표정을 만듭니다. 투명 배경의 스티커를 장면에 겹쳐 놓아 종이 스티커북처럼 자유롭게 꾸밀 수 있습니다.', '현재 온실과 비 오는 카페를 이용할 수 있습니다. 완성 예시는 정답이 아니라 출발점입니다. 가구를 적게 두어 여백을 즐기거나 식물과 소품으로 풍성하게 채워보세요.'] },
        { title: '이동부터 회전, 레이어까지 손에 익는 편집', image: guide + 'rotate.png', alt: '회전·크기·레이어를 조절하는 스티커 편집 도구', paragraphs: ['스티커를 움직이고 크기를 바꾸고 15도씩 회전할 수 있습니다. 좌우 반전과 복제로 반복되는 장식을 만들고, 레이어 순서를 바꿔 앞뒤 관계를 표현하세요.', '실행 취소와 다시 실행은 여러 배치를 시험하기 쉽게 해줍니다. 잠금 기능은 완성한 가구의 위치를 고정할 때 유용합니다. 편집 도구는 장면과 분리된 화면 안에 표시됩니다.'] },
        { title: '듣고 싶을 때만 켜는 배경음', image: guide + 'sound.png', alt: '장면 추천 배경음과 전체 음원 선택 패널', paragraphs: ['작업실에는 창가의 오후, 온실의 아침, 포근한 밤의 합성 배경음이 준비되어 있습니다. 장면 추천을 따르거나 전체 목록에서 직접 선택할 수 있습니다.', '첫 방문과 재방문에는 자동으로 음악을 재생하지 않습니다. 직접 재생하고, 음량을 조절하고, 언제든 전체 음소거할 수 있습니다. 음악 선택과 음량은 기기에 보관됩니다. 환경음과 스티커 효과음의 별도 채널 설정은 추가로 준비할 기능입니다.'] },
        { title: '가입 없이 시작하고 기기에 간직하기', paragraphs: ['기본 꾸미기 경험에 회원가입을 요구하지 않습니다. 배치한 스티커와 소리 설정은 현재 브라우저에 저장됩니다. 아직 계정 동기화나 다른 기기로 자동 이전하는 기능은 제공하지 않습니다.', 'PNG 내보내기로 정지 이미지를 보관할 수 있습니다. 브라우저 저장은 브라우저 데이터 삭제의 영향을 받으므로 오래 간직할 완성 장면은 파일로 내려받아 두세요.'] },
        { title: '준비 중: 하나의 책장을 더 세밀하게', paragraphs: ['난이도는 단순히 스티커 수를 늘리는 방향보다 하나의 오브젝트를 더 세밀하게 꾸미는 방향으로 준비하고 있습니다. 초급은 책과 책장이 함께 있는 완성형, 중급은 책장의 단별 구성, 고급은 일부 책과 장식을 개별로 배치하는 방식입니다.', '출시 목표 상한은 초급 25개, 중급 50개, 고급 100개이며 실제 기기 성능을 확인한 뒤 확정합니다. 지금 제공되는 두 세트에는 단계별 분해 자산이 아직 적용되지 않았습니다.'] },
        { title: '웹에서 시작해 더 많은 공간으로', paragraphs: ['우선 PC와 모바일 브라우저에서 꾸미는 경험을 다듬고 있습니다. 3개 테마에 각각 2개 세트를 제공하는 구성을 목표로 하며, 새 공간과 소품은 제작이 끝나는 대로 추가할 계획입니다.', '앱과 유료 콘텐츠는 이후 단계입니다. 현재 화면에 표시된 준비 중 콘텐츠가 이미 출시되었다는 뜻은 아니며, 이용 가능한 항목은 테마 페이지에서 확인할 수 있습니다.'] },
      ],
    },
    about: {
      eyebrow: 'OUR LITTLE WORLD', title: '좋아하는 것들을 모으면,\n나다운 공간이 됩니다.',
      intro: 'Diorama Stickerbook은 작은 디지털 공간을 꾸미는 시간을 만드는 서비스입니다. 창가에 의자를 놓고, 책 옆에 머그컵을 두고, 남겨 둔 여백을 바라보는 순간에서 출발했습니다.',
      sections: [
        { title: '작은 선택이 쌓이는 취미', image: '/assets/diorama/rainy-night-cafe/example-scene.jpg', alt: '따뜻한 조명과 창가 가구가 있는 비 오는 밤의 카페 디오라마', paragraphs: ['취미를 시작할 때 늘 큰 준비가 필요한 것은 아닙니다. 마음에 드는 스티커 하나를 골라 놓는 일도 충분한 시작이 될 수 있습니다. 우리는 드로잉 경험이나 복잡한 도구 없이도 장면을 만드는 즐거움을 느낄 수 있기를 바랍니다.', '공간 꾸미기에는 하나의 정답이 없습니다. 식물로 가득한 방을 좋아할 수도 있고, 의자 하나와 넓은 빈 바닥을 좋아할 수도 있습니다. 같은 테마를 서로 다른 취향으로 완성할 수 있도록 자유로운 배치와 편집을 중심에 두었습니다.'] },
        { title: '속도보다 나의 리듬을 생각합니다', paragraphs: ['우리가 만들고 싶은 경험은 빨리 채워야 하는 숙제가 아니라 잠시 머물 수 있는 화면입니다. 스티커를 옮겼다가 되돌리고, 빛과 가구의 관계를 살피고, 음악을 켜거나 조용히 작업할 수 있습니다.', '하루 사이의 짧은 쉬는 시간에도 접근하기 쉽도록 웹에서 시작했습니다. 장면을 완성하는 시간이나 배치의 양으로 결과를 평가하지 않습니다. 오늘의 기분에 어울리는 작은 공간이 된다면 그것으로 충분합니다.'] },
        { title: '그림의 깊이는 살리고, 조작은 분명하게', paragraphs: ['섬세한 일러스트가 가진 선과 질감, 공간의 원근감을 중요하게 생각합니다. 온실의 식물과 비 오는 카페의 가구를 하나씩 고르며 장면의 관계를 만들어보세요.', '화면은 작품이 중심이 되도록 다듬고 있습니다. 회전과 크기 조절은 찾기 쉬운 위치에 두고, 음악은 직접 켰을 때만 들리게 합니다. 기능을 늘릴 때도 지금 무엇을 선택했고 어떤 결과가 생기는지 알 수 있는 경험을 지향합니다.'] },
        { title: '적게 요청하고, 선택을 존중하기', paragraphs: ['현재 기본 서비스는 가입 없이 이용할 수 있으며 작품과 설정은 사용자 기기의 브라우저에 보관합니다. 기기 저장의 편리함과 함께 데이터 삭제 시 사라질 수 있다는 한계도 분명히 안내합니다.', '앞으로 광고 기반 운영과 추가 콘텐츠 구매를 단계적으로 검토하고 있습니다. 구매 기능을 도입할 때 필요한 정보를 그 시점에 요청하는 방향을 계획하며, 현재 기본 꾸미기를 위해 결제나 계정을 요구하지 않습니다.'] },
        { title: '함께 자라날 작은 공간들', paragraphs: ['지금은 햇살 온실과 비 오는 밤의 카페를 중심으로 경험을 다듬고 있습니다. 다음 공간에서는 더 다양한 취향과 더 세밀한 스티커 구성을 만날 수 있도록 준비하고 있습니다.', '처음이라면 이용방법의 이미지 안내를 따라 시작해 보세요. 기능과 준비 중인 사항은 특징 페이지에서, 실제로 이용할 수 있는 공간은 테마 페이지에서 확인할 수 있습니다.'] },
      ],
    },
  },
  en: {
    'how-to': {
      eyebrow: 'HOW TO CREATE', title: 'From a first sticker\nto a space of your own.',
      intro: 'Start with one plant on an empty greenhouse floor. This illustrated guide takes you through choosing a scene, arranging stickers, listening to music and saving your work. Screenshots show the Korean interface.',
      sections: [
        { title: '01. Choose a space', image: guide + 'themes.png', alt: 'Theme selection with greenhouse and café sets', caption: 'Select an available set, then choose Start this set.', paragraphs: ['Open Themes and choose the Sunlit Greenhouse or Rainy Night Café. The selection panel appears beside the cards on desktop and below them on mobile.', 'Two sets are currently available. Other sets and the object-splitting difficulty variants are in preparation; the current studio uses the existing sticker collection.'] },
        { title: '02. Place and move stickers', image: guide + 'studio.png', alt: 'Greenhouse studio with placed stickers and a sticker drawer', caption: 'Tap a sticker in the drawer to add it, then drag it in the scene.', paragraphs: ['Browse furniture, plants and smaller objects in the drawer. Click or tap to add a sticker. On desktop, you can also drag it from the drawer into the scene.', 'Hold a placed sticker and move it to a new position. Try arranging large furniture first, then filling smaller spaces with plants and accessories. On mobile, the drawer sits below the scene.'] },
        { title: '03. Rotate, resize and change layers', image: guide + 'rotate.png', alt: 'Fixed rotation buttons, angle display, size slider and layer controls', caption: 'The controls stay outside the artwork, including when stickers approach its edges.', paragraphs: ['Select a sticker to show the editing controls below the artwork. Use −15° or +15° to rotate it and the size slider to resize it. The angle readout helps you align objects.', 'Move a sticker forward or backward, flip it, duplicate it or delete it. Lock a finished placement to prevent accidental movement and unlock it to edit again.', 'Undo and redo let you experiment. On desktop, use Ctrl/Cmd+Z and Ctrl/Cmd+Shift+Z. Reset clears the current set after confirmation.'] },
        { title: '04. Choose music and press Play', image: guide + 'sound.png', alt: 'Sound panel with separate track selection and play buttons', caption: 'Choosing a track is different from playing it. Press the triangle to start.', paragraphs: ['Music never starts automatically when you enter. Open Sound, browse the recommended or full list, and press Play. The three current background tracks are synthesized in the browser.', 'Play explicitly enables sound. Pause stops the music; Mute all stops service sound. No background music clears your track selection. Changing volume alone never starts playback.', 'If you hear nothing, check the playing state, volume, browser tab mute and device sound. Music pauses when you leave the tab or app; press Play again when you return.'] },
        { title: '05. Understand local saves and PNG export', image: guide + 'export.png', alt: 'Exported PNG containing the greenhouse background and placed stickers', caption: 'The exported PNG combines the background and stickers into a still image.', paragraphs: ['Your editable arrangement is saved in this browser on this device. Return with the same browser and site address to continue. Clearing browser data or switching devices does not preserve that local save.', 'PNG Save exports a 2048×1536 still image. Find it in your browser’s download location. An empty scene exports only its background.', 'PNG cannot contain background music or animation. Music plays in the studio; video export with sound is not currently available. A PNG also cannot be reopened as individual editable stickers.'] },
        { title: 'Common questions', paragraphs: ['Do I need an account? No account is required for the current studio and PNG export. Your editable work is stored locally.', 'What is viewing mode? It hides editing controls. Some café stickers show visual effects such as steam or light. A PNG does not preserve movement.', 'Do the difficulty levels have different pieces? Those variants are still being prepared. Themes and Features distinguish available content from future plans.'] },
      ],
    },
    features: {
      eyebrow: 'MADE FOR YOUR PACE', title: 'Small arrangements,\ndifferent atmospheres.',
      intro: 'Diorama Stickerbook is an online decorating tool that lets you create a scene without drawing it from scratch. The same room can tell a different story through placement and empty space.',
      sections: [
        { title: 'Detailed illustrated rooms', image: '/assets/diorama/glasshouse-botanist/example-scene.jpg', alt: 'An example greenhouse filled with plants and furniture', paragraphs: ['Wood grain, window light and plant leaves bring a room to life. Transparent stickers sit over an illustrated background, with the freedom of a paper stickerbook.', 'The greenhouse and rainy café are available now. Example scenes are starting points, not answers to copy. Leave the floor open or fill it with your favorite objects.'] },
        { title: 'Editing that encourages experiments', image: guide + 'rotate.png', alt: 'Sticker rotation and layer controls', paragraphs: ['Move and resize stickers, rotate in 15-degree steps, flip or duplicate them, and change which ones appear in front. Fixed controls remain reachable outside the artwork.', 'Undo and redo make it easy to compare arrangements. Lock a finished object while you work on the rest of your scene.'] },
        { title: 'Sound on your terms', image: guide + 'sound.png', alt: 'Background music selection panel', paragraphs: ['Choose Afternoon Window, Greenhouse Morning or Cozy Night from the browser-synthesized music collection. Use a scene recommendation or browse all tracks.', 'Music never auto-plays on first or repeat visits. Start it yourself, adjust volume or mute all sound. Your selection stays on the device. Separate ambient and effect-channel settings are planned additions.'] },
        { title: 'No account needed to start', paragraphs: ['The current studio stores arrangements and sound preferences in this browser. Account synchronization and automatic transfer between devices are not available.', 'Export a PNG to keep a still image. Local browser storage can be removed when browser data is cleared, so download scenes you want to keep.'] },
        { title: 'In preparation: more detailed objects', paragraphs: ['Our planned levels split objects into meaningful parts. A beginner bookshelf includes its books; an intermediate version separates shelf sections; an advanced version lets you place some individual books and decorations.', 'The proposed limits are 25, 50 and 100 stickers, subject to device testing. These split-object collections are not yet applied to the two current sets.'] },
        { title: 'Starting on the web', paragraphs: ['We are refining the desktop and mobile browser experience before expanding to apps. The content plan includes three themes with two sets each.', 'Additional sets and paid content will follow in later stages. The Themes page marks which scenes are available and which are still in preparation.'] },
      ],
    },
    about: {
      eyebrow: 'OUR LITTLE WORLD', title: 'Collect what you love.\nMake a space that feels like you.',
      intro: 'Diorama Stickerbook is a digital decorating hobby built around small choices: a chair by a window, a mug beside a book, a little room left empty.',
      sections: [
        { title: 'A hobby made of small decisions', image: '/assets/diorama/rainy-night-cafe/example-scene.jpg', alt: 'Rainy café diorama with warm lights and window-side furniture', paragraphs: ['Starting a creative hobby does not always need a large setup. Choosing one sticker can be enough. We want scene-making to be approachable without drawing experience or complex tools.', 'There is no single right arrangement. A room full of plants and a room with one chair can both feel complete. Our editor gives you the freedom to find your own version.'] },
        { title: 'Room for your own pace', paragraphs: ['We are making a place to spend a little time, rather than a task to fill as quickly as possible. Move something, undo it, notice the light, listen to music or work quietly.', 'We started on the web to make that small creative break easy to reach. The time you spend or the number of objects you place does not determine the value of the scene.'] },
        { title: 'Illustrated depth, clear controls', paragraphs: ['Fine lines, textures and perspective give the greenhouse and café their character. Each plant or piece of furniture changes how the scene feels.', 'We aim to keep the artwork central while making controls easy to find. Rotation and resizing should be reachable, and music should play when you choose it.'] },
        { title: 'Ask for less, respect the choice', paragraphs: ['The current basic service does not require an account. Work and settings stay in your browser. We also explain the limits of local storage, including what happens when browser data is cleared.', 'Advertising and optional content purchases are part of later operating plans. We intend to request purchase-related information when it is needed. The current basic studio requires neither payment nor registration.'] },
        { title: 'More small spaces to come', paragraphs: ['For now, we are refining the Sunlit Greenhouse and Rainy Night Café. More settings and detailed sticker collections are in preparation.', 'Start with the illustrated How to guide, explore current and planned Features, or visit Themes to see the spaces you can use today.'] },
      ],
    },
  },
};
