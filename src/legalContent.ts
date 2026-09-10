import type { Article, Locale } from './pageContent';
import legalConfig from './legal.config.json';

type LegalPage = 'privacy' | 'terms';

const operator = legalConfig.operator.trim() || '정식 출시 전 공개 예정';
const contact = legalConfig.contact.trim() || '정식 출시 전 공개 예정';
const operatorEn = legalConfig.operator.trim() || 'To be published before launch';
const contactEn = legalConfig.contact.trim() || 'To be published before launch';

export const legalArticles: Record<Locale, Record<LegalPage, Article>> = {
  ko: {
    privacy: {
      eyebrow: 'PRIVACY NOTICE · 출시 전 검토본', title: '필요한 정보만 다루는\n개인정보 처리 안내',
      intro: '현재 체험 버전은 계정, 결제, 광고 및 방문 분석 기능을 사용하지 않습니다. 작품 진행 상태와 소리 설정은 서버가 아니라 이용 중인 브라우저에 저장됩니다. 광고나 유료 콘텐츠를 도입하기 전에 이 안내를 실제 처리 방식에 맞게 갱신하고 선택 화면을 제공합니다.',
      sections: [
        { title: '1. 현재 수집하는 개인정보', paragraphs: ['현재 서비스는 회원가입을 받지 않으며 이름, 이메일, 전화번호, 생년월일과 같은 식별 정보를 요청하지 않습니다. 꾸미기 기능을 이용하기 위해 계정이나 결제 정보가 필요하지 않습니다.', '실제 인터넷에 배포하면 접속 과정에서 IP 주소, 접속 시각, 브라우저 정보 등이 호스팅 사업자의 보안 로그에 일시적으로 기록될 수 있습니다. 배포 사업자와 보관 기간은 사업자 선정 후 이 문서에 구체적으로 반영합니다.'] },
        { title: '2. 이 기기에 저장되는 항목', paragraphs: ['배치한 스티커의 종류·위치·크기·각도·겹치는 순서, 선택한 테마, 배경음 선택과 음량·음소거 설정은 브라우저 저장 공간에 보관될 수 있습니다. 이 정보는 현재 서비스 서버로 전송하거나 다른 기기와 동기화하지 않습니다.', '같은 브라우저에서 작업을 이어가기 위한 기능이며, 브라우저 데이터 삭제·시크릿 모드·기기 변경 시 사라질 수 있습니다. 완성 작품은 PNG로 내려받아 별도로 보관할 수 있지만 PNG에는 음악이나 애니메이션이 포함되지 않습니다.'] },
        { title: '3. 광고와 방문 분석의 현재 상태', paragraphs: ['현재 빌드에는 Google AdSense, 방문 분석 도구, 맞춤형 광고 쿠키가 연결되어 있지 않습니다. 따라서 지금은 광고 목적의 동의 배너를 표시하거나 광고 프로필을 만들지 않습니다.', '광고나 분석 도구를 활성화하기 전 제공자, 처리 목적, 항목, 보관 기간, 국외 이전 여부와 거부 방법을 이 안내에 추가합니다. 적용 지역에서 동의 관리 플랫폼이 필요한 경우 해당 선택 화면을 먼저 제공하고, 동의 전에는 선택형 도구를 실행하지 않는 방향으로 설계합니다.'] },
        { title: '4. 아동·청소년 이용과 최소 수집', paragraphs: ['현재는 이용자의 나이를 확인하거나 연령 정보를 수집하지 않습니다. 계정과 결제가 없는 기본 꾸미기 기능은 개인정보 입력 없이 사용할 수 있도록 유지합니다.', '향후 계정, 문의 접수 또는 유료 콘텐츠에 개인정보가 필요해지면 필요한 최소 항목만 별도로 고지합니다. 미성년자 또는 만 14세 미만 이용자와 관련된 동의 절차가 필요한 기능은 적용 법령과 출시 지역을 검토한 뒤 기능과 안내를 함께 마련합니다.'] },
        { title: '5. 이용자의 선택과 문의', paragraphs: ['현재 브라우저에 저장된 작품은 작업실의 초기화 기능 또는 브라우저의 사이트 데이터 관리 기능으로 지울 수 있습니다. 광고·분석 기능이 도입되면 푸터의 ‘광고 및 개인정보 설정’에서 선택을 다시 확인하고 변경할 수 있도록 할 예정입니다.', `운영 주체: ${operator} · 개인정보 문의: ${contact}. 이 항목이 ‘공개 예정’으로 표시되는 동안은 출시 전 검토본입니다. 실제 서비스 공개 전에 운영 주체, 연락처, 배포 사업자와 시행일을 확정합니다.`, '검토본 갱신일: 2026년 9월 11일'] },
      ],
    },
    terms: {
      eyebrow: 'TERMS OF USE · 출시 전 검토본', title: '편안하고 안전한 창작을 위한\n서비스 이용약관',
      intro: '이 약관은 Diorama Stickerbook 웹 서비스의 기본 이용 조건을 설명하는 출시 전 검토본입니다. 운영 주체와 문의처, 콘텐츠 라이선스가 확정된 뒤 정식 시행일과 함께 최종 고지합니다.',
      sections: [
        { title: '1. 서비스와 약관의 적용', paragraphs: ['서비스는 온라인에서 일러스트 스티커를 배치하고 장면을 꾸미며 정지 이미지로 저장할 수 있는 창작 도구를 제공합니다. 현재 기본 기능은 계정 없이 무료로 이용할 수 있습니다.', '이 약관은 웹 서비스에 적용됩니다. 향후 앱, 계정 동기화 또는 유료 콘텐츠를 제공할 때에는 필요한 조건을 기능 도입 전에 추가로 안내합니다.'] },
        { title: '2. 작품 저장과 기능 제공', paragraphs: ['작업 진행 상태는 현재 이용 중인 브라우저에 저장되므로 서비스가 서버 백업이나 다른 기기 복원을 보장하지 않습니다. 중요한 완성본은 PNG로 내려받아 보관해 주세요.', '점검, 보안, 성능 개선 또는 불가피한 사유로 기능의 일부를 변경하거나 일시 중단할 수 있습니다. 이용에 중요한 변경은 가능한 범위에서 서비스 화면을 통해 미리 알립니다.'] },
        { title: '3. 콘텐츠와 이용 범위', paragraphs: ['서비스의 이름, 화면, 일러스트, 스티커와 기타 제공 콘텐츠의 권리는 운영 주체 또는 정당한 권리자에게 있습니다. 이용자는 서비스가 제공하는 편집 기능으로 개인적인 장면을 만들고 파일로 저장할 수 있습니다.', '다운로드한 작품의 상업적 이용, 재판매, 스티커 원본의 분리·배포 범위는 정식 콘텐츠 라이선스에서 확정합니다. 그 전까지는 개인적·비상업적 감상과 공유 범위로 이용해 주세요. 타인의 권리 침해, 불법 목적, 서비스 방해를 위한 이용은 허용되지 않습니다.'] },
        { title: '4. 광고와 유료 콘텐츠', paragraphs: ['현재 체험 버전에는 광고와 결제가 연결되어 있지 않습니다. 광고가 도입되면 광고임을 알아볼 수 있게 표시하고 개인정보 관련 선택은 별도 설정 화면에서 안내합니다.', '유료 세트나 구독을 추가할 경우 가격, 제공 내용, 결제·취소·환불 조건과 미성년자 결제 절차를 구매 전에 명확히 고지합니다. 현재 준비 중 표시는 구매 가능 또는 제공 확정을 뜻하지 않습니다.'] },
        { title: '5. 책임, 변경 및 문의', paragraphs: ['서비스는 안정적인 이용을 위해 노력하지만 이용자의 브라우저 데이터 삭제, 기기 장애 또는 지원하지 않는 환경으로 인한 로컬 작업 손실을 복구하지 못할 수 있습니다. 관련 법령상 제한할 수 없는 책임은 이 약관으로 제한하지 않습니다.', `운영 주체: ${operator} · 서비스 문의: ${contact}. 이 항목이 ‘공개 예정’으로 표시되는 동안은 출시 전 검토본이며 정식 약관으로 사용하기 전에 사업자 및 법률 검토가 필요합니다.`, '검토본 갱신일: 2026년 9월 11일'] },
      ],
    },
  },
  en: {
    privacy: {
      eyebrow: 'PRIVACY NOTICE · PRE-LAUNCH DRAFT', title: 'A privacy notice built\naround data minimisation',
      intro: 'This preview uses no account, payment, advertising or audience-analytics service. Your scene progress and sound preferences stay in your browser rather than being uploaded to our server. We will update this notice and add appropriate choices before activating ads or paid content.',
      sections: [
        { title: '1. Personal data collected today', paragraphs: ['The current service does not ask for a name, email address, phone number, date of birth, account or payment details to use the studio.', 'Once the site is publicly hosted, its hosting provider may temporarily process IP addresses, access times and browser information in security logs. The selected provider and retention period must be added here before launch.'] },
        { title: '2. Information stored on this device', paragraphs: ['Sticker type, position, size, rotation and layer order, along with theme and sound preferences, may be stored in browser storage. The current service does not upload or sync this information.', 'Clearing site data, using private browsing or changing devices may remove it. A finished scene can be downloaded as a PNG, but that static image does not contain music or animation.'] },
        { title: '3. Advertising and analytics status', paragraphs: ['Google AdSense, audience analytics and personalised-ad cookies are not connected in this build. We do not currently show an advertising consent banner or create an advertising profile.', 'Before activation, this notice will identify each provider, purpose, data category, retention period, international transfer and opt-out method. Where a consent-management platform is required, choices will be presented before optional tools run.'] },
        { title: '4. Children, teens and minimal collection', paragraphs: ['The current service does not ask for or infer age. We intend to keep the basic, account-free decorating experience available without personal-data entry.', 'If accounts, support requests or purchases later require personal information, we will explain the minimum fields at that point. Features requiring child or parental consent will be designed only after reviewing the applicable law and launch region.'] },
        { title: '5. Your choices and contact', paragraphs: ['You can remove locally stored scenes through the studio reset control or your browser’s site-data controls. If advertising or analytics is introduced, Ads & Privacy Settings will let you revisit applicable choices.', `Operator: ${operatorEn} · Privacy contact: ${contactEn}. If either field says “To be published,” this page remains a pre-launch draft.`, 'Draft updated: 11 September 2026'] },
      ],
    },
    terms: {
      eyebrow: 'TERMS OF USE · PRE-LAUNCH DRAFT', title: 'Terms for a calm and safe\ncreative space',
      intro: 'These draft terms explain the basic conditions for the Diorama Stickerbook web service. They will receive a formal effective date after the operator, contact details and content licence are confirmed.',
      sections: [
        { title: '1. Service and scope', paragraphs: ['The service is an online creative tool for arranging illustrated stickers, decorating scenes and downloading static images. Its current core features are free and require no account.', 'These terms cover the web service. Any future app, account sync or paid-content feature will be accompanied by the additional terms needed before it launches.'] },
        { title: '2. Local saves and availability', paragraphs: ['Work is stored in the current browser, so the service does not promise server backup or restoration on another device. Download important finished scenes as PNG files.', 'Features may be changed or paused for maintenance, security, performance or unavoidable reasons. Material changes will be announced in the service where reasonably possible.'] },
        { title: '3. Content and permitted use', paragraphs: ['Rights in the service name, interface, illustrations, stickers and other supplied content belong to the operator or their respective rights holders. You may use the editing tools to create personal scenes and download them.', 'Commercial use, resale and extraction or redistribution of original sticker assets will be defined in the final content licence. Until then, use is limited to personal, non-commercial viewing and sharing. Illegal, infringing or disruptive use is not permitted.'] },
        { title: '4. Ads and paid content', paragraphs: ['Advertising and payments are not connected in this preview. Ads will be distinguishable from service content, and applicable privacy choices will be explained through a separate settings page before activation.', 'Before paid sets or subscriptions are offered, price, contents, cancellation, refund and minor-purchase rules will be shown before checkout. A “coming soon” label is not a promise that an item can be purchased or will launch.'] },
        { title: '5. Responsibility, updates and contact', paragraphs: ['We aim to keep the service reliable, but local work may not be recoverable after browser-data deletion, device failure or use of an unsupported environment. These terms do not limit liability that cannot lawfully be limited.', `Operator: ${operatorEn} · Service contact: ${contactEn}. If either field says “To be published,” this is a pre-launch draft requiring business and legal review.`, 'Draft updated: 11 September 2026'] },
      ],
    },
  },
};
