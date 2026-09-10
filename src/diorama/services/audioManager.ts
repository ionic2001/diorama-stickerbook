// Web Audio API 기반 잔잔한 심야 카페 로파이 재즈 BGM 및 인터랙션 사운드 엔진
class AudioManager {
  private ctx: AudioContext | null = null;
  private masterGainNode: GainNode | null = null;
  private jazzMasterGain: GainNode | null = null;
  private isMuted: boolean = false;
  private volume: number = 0.5;
  private isJazzPlaying: boolean = false;

  // 재즈 시퀀서 타이머 및 노드
  private beatTimer: ReturnType<typeof setTimeout> | null = null;
  private currentBar: number = 0;
  private currentBeat: number = 0;

  private initContext() {
    if (!this.ctx) {
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtxClass();
      this.masterGainNode = this.ctx.createGain();
      this.masterGainNode.gain.setValueAtTime(this.volume, this.ctx.currentTime);
      this.masterGainNode.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // 주파수(Hz) 계산 헬퍼 (미디 노트 번호 -> Hz)
  private mtof(midi: number): number {
    return 440 * Math.pow(2, (midi - 69) / 12);
  }

  // 로즈 피아노(Rhodes Piano) 음색 단일 노트 연주
  private playRhodesNote(midi: number, time: number, duration: number, vel = 0.15) {
    if (!this.ctx || !this.jazzMasterGain) return;

    const freq = this.mtof(midi);

    // 기본음 (Warm Sine)
    const osc1 = this.ctx.createOscillator();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(freq, time);

    // 하모닉스 벨 차임 (Triangle 2배음)
    const osc2 = this.ctx.createOscillator();
    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(freq * 2, time);

    // 앰프 엔벨로프
    const gainNode = this.ctx.createGain();
    gainNode.gain.setValueAtTime(0.001, time);
    // 벨 어택
    gainNode.gain.linearRampToValueAtTime(vel, time + 0.015);
    // 풍성한 서스테인 감쇠
    gainNode.gain.exponentialRampToValueAtTime(vel * 0.45, time + 0.35);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, time + duration);

    // 따뜻한 톤을 위한 로우패스 필터 (2200Hz)
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(2400, time);
    filter.Q.setValueAtTime(0.7, time);

    osc1.connect(gainNode);
    osc2.connect(gainNode);
    gainNode.connect(filter);
    filter.connect(this.jazzMasterGain);

    osc1.start(time);
    osc2.start(time);
    osc1.stop(time + duration + 0.05);
    osc2.stop(time + duration + 0.05);
  }

  // 어쿠스틱 콘트라베이스(Upright Bass) 피치카토 연주
  private playBassNote(midi: number, time: number, vel = 0.22) {
    if (!this.ctx || !this.jazzMasterGain) return;

    const freq = this.mtof(midi);
    const osc = this.ctx.createOscillator();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, time);
    // 묵직한 핑거 피치 미세 슬라이드
    osc.frequency.exponentialRampToValueAtTime(freq * 0.98, time + 0.08);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.001, time);
    gain.gain.linearRampToValueAtTime(vel, time + 0.02);
    gain.gain.exponentialRampToValueAtTime(vel * 0.5, time + 0.3);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + 1.2);

    const lowpass = this.ctx.createBiquadFilter();
    lowpass.type = 'lowpass';
    lowpass.frequency.setValueAtTime(320, time);

    osc.connect(gain);
    gain.connect(lowpass);
    lowpass.connect(this.jazzMasterGain);

    osc.start(time);
    osc.stop(time + 1.25);
  }

  // 부드러운 재즈 브러시 심벌(Brushed Jazz Ride) 연주
  private playBrushedCymbal(time: number, isAccent: boolean) {
    if (!this.ctx || !this.jazzMasterGain) return;

    const bufferSize = Math.floor(this.ctx.sampleRate * 0.15);
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = noiseBuffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(6500, time);
    filter.Q.setValueAtTime(1.8, time);

    const gain = this.ctx.createGain();
    const vel = isAccent ? 0.025 : 0.012;
    gain.gain.setValueAtTime(vel, time);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + (isAccent ? 0.14 : 0.07));

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.jazzMasterGain);

    noise.start(time);
  }

  // 잔잔한 4마디 재즈 코드 진행 정의 (Key: F Major / D Minor - Cozy Café Progression)
  // Bar 0: Fmaj9 (F, C, E, G, A)
  // Bar 1: Em7 (E, B, D, G)
  // Bar 2: Dm9 (D, A, C, F, E)
  // Bar 3: Cmaj9 (C, G, B, D, E)
  private playJazzBar(barIndex: number, time: number) {
    const chords = [
      { bass: 41 /* F2 */, chord: [53, 60, 64, 67, 69] /* F3, C4, E4, G4, A4 */ },
      { bass: 40 /* E2 */, chord: [52, 59, 62, 67, 71] /* E3, B3, D4, G4, B4 */ },
      { bass: 38 /* D2 */, chord: [50, 57, 60, 65, 64] /* D3, A3, C4, F4, E4 */ },
      { bass: 36 /* C2 */, chord: [48, 55, 59, 62, 64] /* C3, G3, B3, D4, E4 */ },
    ];

    const current = chords[barIndex % 4];
    // 1. 베이스 (1박)
    this.playBassNote(current.bass, time, 0.2);

    // 2. 피아노 코드 스트럼 (약간의 아르페지오 딜레이로 사람 손 느낌 부여)
    current.chord.forEach((note, idx) => {
      const strumTime = time + idx * 0.028;
      this.playRhodesNote(note, strumTime, 3.8, 0.11 - idx * 0.008);
    });

    // 3. 2박째의 텐션 싱코페이션 아르페지오 (2박과 3박 사이에 부드럽게 한 음 첨가)
    const tensionNote = current.chord[current.chord.length - 1] + 2;
    this.playRhodesNote(tensionNote, time + 1.25, 2.0, 0.06);

    // 4. 3박째 베이스 서포트 (옥타브 또는 5도)
    this.playBassNote(current.bass + 7, time + 1.9, 0.13);

    // 5. 4박째 전환 멜로디 노트
    this.playRhodesNote(current.chord[2], time + 2.8, 1.2, 0.05);
  }

  // 재즈 BGM 재생 시작
  public startJazz() {
    if (this.isJazzPlaying) return;
    this.initContext();
    if (!this.ctx || !this.masterGainNode) return;

    this.jazzMasterGain = this.ctx.createGain();
    this.jazzMasterGain.gain.setValueAtTime(0.7, this.ctx.currentTime);
    this.jazzMasterGain.connect(this.masterGainNode);

    this.isJazzPlaying = true;
    this.currentBar = 0;
    this.currentBeat = 0;

    // 62 BPM 템포 (1박 = 약 960ms, 1마디 4박 = 약 3.84초)
    const beatIntervalMs = 960;

    const scheduleLoop = () => {
      if (!this.isJazzPlaying || !this.ctx) return;

      const now = this.ctx.currentTime;
      const beatInBar = this.currentBeat % 4;

      // 마디의 첫 박(Beat 0)일 때 코드 및 베이스 연주
      if (beatInBar === 0) {
        this.playJazzBar(this.currentBar, now);
        this.currentBar++;
      }

      // 재즈 스윙 리듬 브러시 심벌 연주
      this.playBrushedCymbal(now, beatInBar === 0 || beatInBar === 2);
      // 스윙 바운스 서브비트
      this.playBrushedCymbal(now + 0.62, false);

      this.currentBeat++;
      this.beatTimer = setTimeout(scheduleLoop, beatIntervalMs);
    };

    scheduleLoop();
  }

  public stopJazz() {
    if (this.beatTimer) {
      clearTimeout(this.beatTimer);
      this.beatTimer = null;
    }

    if (this.jazzMasterGain) {
      try {
        this.jazzMasterGain.disconnect();
      } catch {
        // 무시
      }
      this.jazzMasterGain = null;
    }

    this.isJazzPlaying = false;
  }

  // 램프 스위치 클릭 효과음
  public playLampSwitch(turnOn: boolean) {
    this.initContext();
    if (!this.ctx || !this.masterGainNode) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    const now = this.ctx.currentTime;
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(turnOn ? 420 : 260, now);
    osc.frequency.exponentialRampToValueAtTime(turnOn ? 680 : 160, now + 0.05);

    gain.gain.setValueAtTime(0.18, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

    osc.connect(gain);
    gain.connect(this.masterGainNode);

    osc.start(now);
    osc.stop(now + 0.05);
  }

  // 스티커 부착 효과음 (부드러운 종이 탭)
  public playStickerPop() {
    this.initContext();
    if (!this.ctx || !this.masterGainNode) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    const now = this.ctx.currentTime;
    osc.type = 'sine';
    osc.frequency.setValueAtTime(360, now);
    osc.frequency.exponentialRampToValueAtTime(620, now + 0.04);

    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

    osc.connect(gain);
    gain.connect(this.masterGainNode);

    osc.start(now);
    osc.stop(now + 0.04);
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (this.masterGainNode && this.ctx) {
      this.masterGainNode.gain.setValueAtTime(muted ? 0 : this.volume, this.ctx.currentTime);
    }
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }

  public setVolume(val: number) {
    this.volume = Math.max(0, Math.min(1, val));
    if (this.masterGainNode && this.ctx && !this.isMuted) {
      this.masterGainNode.gain.setValueAtTime(this.volume, this.ctx.currentTime);
    }
  }

  public getVolume(): number {
    return this.volume;
  }

  public getIsJazzPlaying(): boolean {
    return this.isJazzPlaying;
  }
}

export const audioManager = new AudioManager();
