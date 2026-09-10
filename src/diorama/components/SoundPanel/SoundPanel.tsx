import React, { useState } from 'react';
import { Check, Music2, Pause, Play, Volume2, VolumeX, X } from 'lucide-react';
import { MusicTrackId } from '../../services/audioManager';

const tracks: Array<{ id: MusicTrackId; ko: string; en: string; moodKo: string; moodEn: string; badge?: string }> = [
  { id: 'window-afternoon', ko: '창가의 오후', en: 'Afternoon Window', moodKo: '비 오는 창가, 차 한 잔의 시간', moodEn: 'Rainy windows and a warm cup', badge: '추천' },
  { id: 'greenhouse-morning', ko: '온실의 아침', en: 'Greenhouse Morning', moodKo: '햇살이 머무는 초록의 공간', moodEn: 'Morning light among the leaves' },
  { id: 'cozy-night', ko: '포근한 밤', en: 'Cozy Night', moodKo: '조용히, 나만의 밤', moodEn: 'A quiet night of your own', badge: 'NEW' },
];

interface SoundPanelProps {
  open: boolean;
  locale: 'ko' | 'en';
  muted: boolean;
  playing: boolean;
  volume: number;
  selectedTrack: MusicTrackId | null;
  error: string;
  themeId: string;
  onPlayTrack: (track: MusicTrackId) => void;
  onClose: () => void;
  onToggleMute: () => void;
  onTogglePlaying: () => void;
  onChangeVolume: (value: number) => void;
  onSelectTrack: (track: MusicTrackId | null) => void;
}

export function SoundPanel({ open, locale, muted, playing, volume, selectedTrack, onClose, onToggleMute, onTogglePlaying, onChangeVolume, onSelectTrack, onPlayTrack, themeId, error }: SoundPanelProps) {
  const [tab, setTab] = useState('recommended');
  const recommended = themeId === 'glasshouse-botanist' ? 'greenhouse-morning' : 'window-afternoon';
  const visibleTracks = tab === 'all' ? tracks : tracks.filter(track => track.id === recommended);
  if (!open) return null;
  const selected = tracks.find((track) => track.id === selectedTrack);
  return <aside className="sound-panel" aria-label={locale === 'ko' ? '소리 설정' : 'Sound settings'}>
    <div className="sound-panel-head"><div><p className="eyebrow">SOUND</p><h2>{locale === 'ko' ? '소리' : 'Sound'}</h2></div><button className="icon-button" onClick={onClose} aria-label={locale === 'ko' ? '닫기' : 'Close'}><X /></button></div>
    <button className={`master-sound ${muted ? 'muted' : ''}`} onClick={onToggleMute}>{muted ? <VolumeX /> : <Volume2 />}<span><b>{locale === 'ko' ? '전체 음소거' : 'Mute all sound'}</b><small>{locale === 'ko' ? (muted ? '모든 소리가 꺼져 있습니다.' : '모든 서비스 소리를 한 번에 끕니다.') : (muted ? 'All sound is off.' : 'Turn off every sound at once.')}</small></span><i aria-hidden="true" /></button>
    <div className="sound-tabs"><button onClick={() => setTab('recommended')} className={tab === 'recommended' ? 'active' : ''} aria-pressed={tab === 'recommended'}>{locale === 'ko' ? '이 장면 추천' : 'For this scene'}</button><button onClick={() => setTab('all')} className={tab === 'all' ? 'active' : ''} aria-pressed={tab === 'all'}>{locale === 'ko' ? '전체 음원' : 'All sounds'}</button></div>
    <div className="track-list">{visibleTracks.map(track => <div className={selectedTrack === track.id ? 'track-item selected' : 'track-item'} key={track.id}>
      <button className="track-select" aria-label={(locale === 'ko' ? track.ko : track.en) + (locale === 'ko' ? ' 선택' : ' select')} onClick={() => onSelectTrack(track.id)}>
        <span className="track-cover"><Music2 /></span><span className="track-copy"><b>{locale === 'ko' ? track.ko : track.en}</b><small>{locale === 'ko' ? track.moodKo : track.moodEn}</small></span>{selectedTrack === track.id && <Check size={16} />}
      </button>
      <button className="preview-button" aria-label={(locale === 'ko' ? track.ko : track.en) + (locale === 'ko' ? ' 재생' : ' play')} onClick={() => onPlayTrack(track.id)}><Play size={16} /></button>
    </div>)}</div>
    {error && <p role="alert">{error}</p>}
    <p className="device-note">{locale === 'ko' ? '▶ 재생을 누르면 소리가 켜집니다. 음악은 작업실에서 들을 수 있으며 PNG에는 포함되지 않습니다.' : 'Press Play to enable sound. Music plays in the studio and is not included in PNG images.'}</p>
    <button className={`no-music ${selectedTrack === null ? 'selected' : ''}`} onClick={() => onSelectTrack(null)}><VolumeX />{locale === 'ko' ? '배경음악 없음' : 'No background music'}{selectedTrack === null && <Check />}</button>
    {selected && <div className="now-playing"><div><span className="track-cover"><Music2 /></span><span><b>{locale === 'ko' ? selected.ko : selected.en}</b><small>{locale === 'ko' ? (playing && !muted ? '재생 중' : '일시 정지') : (playing && !muted ? 'Playing' : 'Paused')}</small></span></div><button onClick={onTogglePlaying} aria-label={playing && !muted ? 'Pause' : 'Play'}>{playing && !muted ? <Pause /> : <Play />}</button></div>}
    <label className="volume-row"><Volume2 /><span>{locale === 'ko' ? '배경음악' : 'Music'}</span><input type="range" min="0" max="1" step="0.05" value={volume} onChange={(event) => onChangeVolume(Number(event.target.value))} /><em>{Math.round(volume * 100)}%</em></label>
    <p className="device-note">{locale === 'ko' ? '선택과 음량은 이 기기에 저장됩니다. 처음 방문과 재방문 모두 자동 재생하지 않습니다.' : 'Your choice and volume stay on this device. Sound never auto-plays.'}</p>
  </aside>;
}
