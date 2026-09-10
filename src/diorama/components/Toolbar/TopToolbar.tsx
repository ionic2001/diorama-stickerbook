import React from 'react';
import { Undo2, Redo2, Eye, PenTool, Grid, VolumeX, Download, RotateCcw, Music } from 'lucide-react';

interface TopToolbarProps {
 title: string; currentThemeId?: string; onSelectTheme?: (id: string) => void;
 locale?: 'ko' | 'en';
 isViewMode: boolean; isGuideEnabled: boolean; canUndo: boolean; canRedo: boolean;
 isMuted: boolean; volume: number; isExporting: boolean;
 onToggleViewMode: () => void; onToggleGuide: () => void; onUndo: () => void; onRedo: () => void;
 onResetScene: () => void; onToggleMute: () => void; onOpenSound: () => void;
 onChangeVolume: (value: number) => void; onExportPNG: () => void;
}
export function TopToolbar(p: TopToolbarProps) {
 const ko = p.locale !== 'en';
 return <header className="studio-toolbar">
   <strong>{p.title}</strong>
   <div className="studio-mode">
     <button onClick={p.onToggleViewMode} aria-pressed={p.isViewMode}>{p.isViewMode ? <PenTool size={17}/> : <Eye size={17}/>}<span>{ko ? p.isViewMode ? '편집 모드' : '감상 모드' : p.isViewMode ? 'Edit' : 'View'}</span></button>
     <button onClick={p.onToggleGuide} aria-pressed={p.isGuideEnabled} title={ko ? '배치 가이드' : 'Placement guide'} aria-label={ko ? '배치 가이드' : 'Placement guide'}><Grid size={17}/></button>
   </div>
   <div className="studio-actions">
     <button onClick={p.onUndo} disabled={!p.canUndo} aria-label={ko ? '실행 취소' : 'Undo'} title={ko ? '실행 취소' : 'Undo'}><Undo2 size={18}/></button>
     <button onClick={p.onRedo} disabled={!p.canRedo} aria-label={ko ? '다시 실행' : 'Redo'} title={ko ? '다시 실행' : 'Redo'}><Redo2 size={18}/></button>
     <button onClick={p.onResetScene} aria-label={ko ? '초기화' : 'Reset'} title={ko ? '초기화' : 'Reset'}><RotateCcw size={18}/></button>
     <button onClick={p.onOpenSound} aria-label={ko ? '소리 설정' : 'Sound settings'}><Music size={18}/><span>{ko ? '소리' : 'Sound'}</span></button>
     <button onClick={p.onToggleMute} aria-pressed={p.isMuted} aria-label={ko ? p.isMuted ? '전체 음소거 해제' : '전체 음소거' : p.isMuted ? 'Unmute all' : 'Mute all'}><VolumeX size={18}/></button>
     <button className="export-button" onClick={p.onExportPNG} disabled={p.isExporting} title={ko ? '배경과 스티커를 정지 이미지로 저장합니다. 음악은 포함되지 않습니다.' : 'Save background and stickers as a still image without music.'}><Download size={17}/>{p.isExporting ? (ko ? '저장 중…' : 'Saving…') : (ko ? 'PNG 저장' : 'Save PNG')}</button>
   </div>
 </header>;
}
