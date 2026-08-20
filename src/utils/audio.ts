// Web Audio API Synthesizer for smooth ambient music and sound effects

class AudioManager {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private bgGainNode: GainNode | null = null;
  private isPlayingBg: boolean = false;
  private timerId: number | null = null;

  private initCtx() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (this.bgGainNode && this.ctx) {
      this.bgGainNode.gain.setTargetAtTime(this.isMuted ? 0 : 0.15, this.ctx.currentTime, 0.1);
    }
    return this.isMuted;
  }

  public getMutedState(): boolean {
    return this.isMuted;
  }

  // Soft ambient piano/marimba progression using Web Audio API
  public startAmbientMusic() {
    if (this.isPlayingBg) return;
    this.initCtx();
    if (!this.ctx) return;

    this.isPlayingBg = true;
    this.bgGainNode = this.ctx.createGain();
    this.bgGainNode.gain.setValueAtTime(this.isMuted ? 0 : 0.15, this.ctx.currentTime);
    this.bgGainNode.connect(this.ctx.destination);

    // Soothing pentatonic chord notes (C, D, E, G, A, C, D) frequencies in Hz
    const notes = [261.63, 329.63, 392.00, 440.00, 523.25, 659.25, 783.99, 880.00];
    let noteIndex = 0;

    const playAmbientNote = () => {
      if (!this.isPlayingBg || !this.ctx || !this.bgGainNode) return;

      const freq = notes[noteIndex % notes.length];
      // Random subtle variance for natural feel
      const rootFreq = notes[Math.floor(Math.random() * 4)];

      this.playPluck(freq, 2.5, 0.4);
      if (Math.random() > 0.4) {
        setTimeout(() => this.playPluck(rootFreq * 0.5, 3.5, 0.3), 300);
      }

      noteIndex++;
      const delay = 1800 + Math.random() * 1400;
      this.timerId = window.setTimeout(playAmbientNote, delay);
    };

    playAmbientNote();
  }

  public stopAmbientMusic() {
    this.isPlayingBg = false;
    if (this.timerId) {
      clearTimeout(this.timerId);
      this.timerId = null;
    }
  }

  private playPluck(freq: number, duration: number, volume: number) {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      // Smooth attack and soft decay
      gain.gain.setValueAtTime(0, this.ctx.currentTime);
      gain.gain.linearRampToValueAtTime(volume * 0.12, this.ctx.currentTime + 0.08);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

      osc.connect(gain);
      if (this.bgGainNode) {
        gain.connect(this.bgGainNode);
      } else {
        gain.connect(this.ctx.destination);
      }

      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch {
      // Audio context fallback
    }
  }

  // Interactive Chime for Chapter transitions & Wish lighting
  public playChime() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    const freqs = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    freqs.forEach((freq, idx) => {
      setTimeout(() => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

        gain.gain.setValueAtTime(0.1, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 1.2);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(this.ctx.currentTime + 1.2);
      }, idx * 120);
    });
  }

  // Soft Pop for card flips / reveals
  public playPop() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(400, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(800, this.ctx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.08);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.08);
    } catch {
      // Audio fallback
    }
  }

  // Candle blowing whoosh + happy fanfare chime
  public playCandleBlow() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    // Whoosh noise
    const bufferSize = this.ctx.sampleRate * 0.4;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    const whiteNoise = this.ctx.createBufferSource();
    whiteNoise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(800, this.ctx.currentTime);
    filter.frequency.linearRampToValueAtTime(100, this.ctx.currentTime + 0.4);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.4);

    whiteNoise.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);
    whiteNoise.start();

    // Fanfare chords after 400ms
    setTimeout(() => {
      this.playBirthdayJingle();
    }, 450);
  }

  // Short Happy Birthday chime motif
  public playBirthdayJingle() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    // Happy Birthday first line notes: G4 G4 A4 G4 C5 B4
    const notes = [
      { f: 392.00, d: 0.2 }, { f: 392.00, d: 0.2 },
      { f: 440.00, d: 0.4 }, { f: 392.00, d: 0.4 },
      { f: 523.25, d: 0.4 }, { f: 493.88, d: 0.8 }
    ];

    let t = 0;
    notes.forEach((note) => {
      setTimeout(() => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(note.f, this.ctx.currentTime);

        gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + note.d);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(this.ctx.currentTime + note.d);
      }, t * 1000);
      t += note.d + 0.05;
    });
  }
}

export const audioManager = new AudioManager();
