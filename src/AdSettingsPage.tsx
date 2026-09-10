import React from 'react';
import { Check, CircleSlash2, HardDrive, ShieldCheck } from 'lucide-react';
import type { Locale } from './pageContent';

export default function AdSettingsPage({ locale }: { locale: Locale }) {
  const ko = locale === 'ko';
  return <main id="main" className="settings-page">
    <header className="settings-heading">
      <p className="eyebrow">ADS & PRIVACY</p>
      <h1>{ko ? '광고 및 개인정보 설정' : 'Ads & Privacy Settings'}</h1>
      <p>{ko ? '현재 체험 버전은 광고와 방문 분석 도구를 사용하지 않습니다. 지금 저장되는 것은 작업을 이어가기 위한 기기 내 데이터뿐입니다.' : 'This preview does not use advertising or audience analytics. The only current storage is on-device data used to continue your work.'}</p>
      <span className="status-pill"><ShieldCheck size={17}/>{ko ? '광고·분석 비활성' : 'Ads and analytics inactive'}</span>
    </header>
    <section className="settings-card" aria-labelledby="current-storage">
      <div className="settings-icon"><HardDrive/></div><div><h2 id="current-storage">{ko ? '기기 내 기능 저장' : 'On-device functional storage'}</h2><p>{ko ? '스티커 배치, 테마, 배경음 선택, 음량과 음소거 설정을 이 브라우저에 보관합니다. 서버 전송이나 계정 동기화는 하지 않습니다.' : 'Sticker arrangements, theme and sound preferences are kept in this browser. They are not uploaded or synced to an account.'}</p></div><span className="setting-state active"><Check size={15}/>{ko ? '사용 중' : 'Active'}</span>
    </section>
    <section className="settings-card disabled" aria-labelledby="analytics-setting">
      <div className="settings-icon"><CircleSlash2/></div><div><h2 id="analytics-setting">{ko ? '방문 분석' : 'Audience analytics'}</h2><p>{ko ? '아직 연결된 분석 도구가 없습니다. 도입 전에 목적, 제공자, 보관 기간과 거부 방법을 안내합니다.' : 'No analytics provider is connected. Purpose, provider, retention and opt-out information will be shown before activation.'}</p></div><span className="setting-state">{ko ? '연결 전' : 'Not connected'}</span>
    </section>
    <section className="settings-card disabled" aria-labelledby="ads-setting">
      <div className="settings-icon"><CircleSlash2/></div><div><h2 id="ads-setting">{ko ? '맞춤형 광고 및 광고 측정' : 'Personalised ads and measurement'}</h2><p>{ko ? 'Google AdSense를 포함한 광고 도구는 아직 연결하지 않았습니다. 활성화 전 적용 지역에 맞는 동의 화면과 다시 선택할 수 있는 설정을 제공합니다.' : 'No advertising tool, including Google AdSense, is connected. Before activation, applicable consent choices and a way to revisit them will be provided.'}</p></div><span className="setting-state">{ko ? '연결 전' : 'Not connected'}</span>
    </section>
    <aside className="settings-note"><h2>{ko ? '왜 지금 켜고 끄는 스위치가 없나요?' : 'Why are there no switches yet?'}</h2><p>{ko ? '실행되는 광고·분석 도구가 없는 상태에서 의미 없는 동의 선택을 받지 않기 위해서입니다. 실제 도구를 연결할 때 선택 항목을 정확히 구분하고, 이 페이지에서 언제든 다시 변경할 수 있게 합니다.' : 'There is nothing optional to consent to yet. When real providers are connected, choices will match the tools that actually run and remain revisitable from this page.'}</p></aside>
  </main>;
}
