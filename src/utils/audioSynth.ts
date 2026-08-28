/**
 * Romantic Melody Synthesizer using Web Audio API
 * Generates soft acoustic piano/chime notes and celebration melodies without external assets
 */

class RomanticAudioPlayer {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private loopIntervalId: number | null = null;
  private currentMode: 'romantic' | 'birthday' = 'romantic';
  private masterGain: GainNode | null = null;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.2, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Play a soft bell/chime note with rich harmonic resonance
  private playNote(freq: number, startTime: number, duration: number = 1.2, volume: number = 0.3) {
    if (!this.ctx || !this.masterGain) return;

    const osc = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const noteGain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, startTime);

    // Warm sub-harmonic
    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(freq * 0.5, startTime);

    noteGain.gain.setValueAtTime(0.001, startTime);
    noteGain.gain.exponentialRampToValueAtTime(volume, startTime + 0.05);
    noteGain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

    osc.connect(noteGain);
    osc2.connect(noteGain);
    noteGain.connect(this.masterGain);

    osc.start(startTime);
    osc2.start(startTime);
    osc.stop(startTime + duration);
    osc2.stop(startTime + duration);
  }

  // Romantic acoustic chord progression (Cmaj7 -> Am7 -> Fmaj7 -> G7sus)
  private playRomanticPattern() {
    if (!this.ctx || !this.isPlaying) return;

    const now = this.ctx.currentTime;
    const tempo = 0.35; // seconds per step

    // Note frequencies in Hz
    const C4 = 261.63, E4 = 329.63, G4 = 392.00, B4 = 493.88, D5 = 587.33, E5 = 659.25, G5 = 783.99;
    const A3 = 220.00, C5 = 523.25;
    const F3 = 174.61, A4 = 440.00;
    const G3 = 196.00;

    // Pattern 1: Cmaj7 arpeggio
    this.playNote(C4, now + 0 * tempo, 2.0, 0.25);
    this.playNote(E4, now + 1 * tempo, 1.8, 0.2);
    this.playNote(G4, now + 2 * tempo, 1.8, 0.22);
    this.playNote(B4, now + 3 * tempo, 2.2, 0.28);
    this.playNote(D5, now + 4 * tempo, 2.0, 0.25);
    this.playNote(E5, now + 5 * tempo, 2.5, 0.3);

    // Pattern 2: Am7 arpeggio
    const t2 = now + 7 * tempo;
    this.playNote(A3, t2 + 0 * tempo, 2.0, 0.25);
    this.playNote(C4, t2 + 1 * tempo, 1.8, 0.2);
    this.playNote(E4, t2 + 2 * tempo, 1.8, 0.22);
    this.playNote(G4, t2 + 3 * tempo, 2.0, 0.25);
    this.playNote(C5, t2 + 4 * tempo, 2.2, 0.28);
    this.playNote(E5, t2 + 5 * tempo, 2.5, 0.3);

    // Pattern 3: Fmaj7 arpeggio
    const t3 = now + 14 * tempo;
    this.playNote(F3, t3 + 0 * tempo, 2.0, 0.25);
    this.playNote(A4, t3 + 1 * tempo, 1.8, 0.2);
    this.playNote(C5, t3 + 2 * tempo, 1.8, 0.22);
    this.playNote(E5, t3 + 3 * tempo, 2.2, 0.28);
    this.playNote(G5, t3 + 4 * tempo, 2.5, 0.32);

    // Pattern 4: G chord resolution
    const t4 = now + 20 * tempo;
    this.playNote(G3, t4 + 0 * tempo, 2.0, 0.25);
    this.playNote(D5, t4 + 1 * tempo, 1.8, 0.22);
    this.playNote(G4, t4 + 2 * tempo, 1.8, 0.22);
    this.playNote(B4, t4 + 3 * tempo, 2.5, 0.28);
    this.playNote(C5, t4 + 4.5 * tempo, 3.0, 0.35);
  }

  // Happy Birthday melody in soft acoustic bells
  private playBirthdayPattern() {
    if (!this.ctx || !this.isPlaying) return;

    const now = this.ctx.currentTime;
    const t = 0.38;

    const G4 = 392.00, A4 = 440.00, B4 = 493.88, C5 = 523.25, D5 = 587.33, E5 = 659.25, F5 = 698.46, G5 = 783.99;

    // Happy Birthday to you
    this.playNote(G4, now + 0 * t, 0.4, 0.3);
    this.playNote(G4, now + 0.6 * t, 0.4, 0.3);
    this.playNote(A4, now + 1.2 * t, 0.8, 0.35);
    this.playNote(G4, now + 2.2 * t, 0.8, 0.35);
    this.playNote(C5, now + 3.2 * t, 0.9, 0.38);
    this.playNote(B4, now + 4.2 * t, 1.6, 0.35);

    // Happy Birthday to you
    const m2 = now + 6.2 * t;
    this.playNote(G4, m2 + 0 * t, 0.4, 0.3);
    this.playNote(G4, m2 + 0.6 * t, 0.4, 0.3);
    this.playNote(A4, m2 + 1.2 * t, 0.8, 0.35);
    this.playNote(G4, m2 + 2.2 * t, 0.8, 0.35);
    this.playNote(D5, m2 + 3.2 * t, 0.9, 0.38);
    this.playNote(C5, m2 + 4.2 * t, 1.6, 0.35);

    // Happy Birthday dear my love
    const m3 = now + 12.4 * t;
    this.playNote(G4, m3 + 0 * t, 0.4, 0.3);
    this.playNote(G4, m3 + 0.6 * t, 0.4, 0.3);
    this.playNote(G5, m3 + 1.2 * t, 1.0, 0.4);
    this.playNote(E5, m3 + 2.2 * t, 0.9, 0.35);
    this.playNote(C5, m3 + 3.2 * t, 0.9, 0.35);
    this.playNote(B4, m3 + 4.2 * t, 0.9, 0.35);
    this.playNote(A4, m3 + 5.2 * t, 1.6, 0.35);

    // Happy Birthday to you!
    const m4 = now + 19.5 * t;
    this.playNote(F5, m4 + 0 * t, 0.4, 0.32);
    this.playNote(F5, m4 + 0.6 * t, 0.4, 0.32);
    this.playNote(E5, m4 + 1.2 * t, 0.9, 0.36);
    this.playNote(C5, m4 + 2.2 * t, 0.9, 0.36);
    this.playNote(D5, m4 + 3.2 * t, 1.0, 0.38);
    this.playNote(C5, m4 + 4.4 * t, 2.5, 0.42);
  }

  public playCelebrationChime() {
    this.initContext();
    if (!this.ctx || !this.masterGain) return;
    const now = this.ctx.currentTime;
    const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51];
    notes.forEach((freq, idx) => {
      this.playNote(freq, now + idx * 0.08, 1.8, 0.3);
    });
  }

  public playCandleBlowSound() {
    this.initContext();
    if (!this.ctx || !this.masterGain) return;
    // Gentle whoosh + magical chime
    const bufferSize = this.ctx.sampleRate * 0.4;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.3));
    }
    const whiteNoise = this.ctx.createBufferSource();
    whiteNoise.buffer = buffer;
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(800, this.ctx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(120, this.ctx.currentTime + 0.4);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.01, this.ctx.currentTime + 0.4);

    whiteNoise.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);
    whiteNoise.start();

    // After blow, play magical chime
    setTimeout(() => {
      this.playCelebrationChime();
    }, 300);
  }

  public start(mode: 'romantic' | 'birthday' = 'romantic') {
    this.initContext();
    this.stop();
    this.isPlaying = true;
    this.currentMode = mode;

    const playLoop = () => {
      if (!this.isPlaying) return;
      if (this.currentMode === 'romantic') {
        this.playRomanticPattern();
      } else {
        this.playBirthdayPattern();
      }
    };

    playLoop();
    const intervalMs = mode === 'romantic' ? 9500 : 10500;
    this.loopIntervalId = window.setInterval(playLoop, intervalMs);
  }

  public stop() {
    this.isPlaying = false;
    if (this.loopIntervalId !== null) {
      window.clearInterval(this.loopIntervalId);
      this.loopIntervalId = null;
    }
  }

  public setMode(mode: 'romantic' | 'birthday') {
    this.currentMode = mode;
    if (this.isPlaying) {
      this.start(mode);
    }
  }

  public setVolume(vol: number) {
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(Math.max(0, Math.min(1, vol)), this.ctx.currentTime);
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }
}

export const romanticAudio = new RomanticAudioPlayer();
