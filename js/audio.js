export class AudioManager {
    constructor() {
        this.ctx = new (window.AudioContext || window.webkitAudioContext)();
        this.enabled = true;
    }

    resume() {
        if (this.ctx.state === 'suspended') this.ctx.resume();
    }

    playTone(freq, type, duration, vol = 0.1) {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = type;
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
        gain.gain.setValueAtTime(vol, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + duration);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(this.ctx.currentTime + duration);
    }

    playSuccess() {
        this.resume();
        this.playTone(523.25, 'sine', 0.1); // C5
        setTimeout(() => this.playTone(1046.5, 'sine', 0.4), 100); // C6
    }

    playError() {
        this.resume();
        this.playTone(150, 'sawtooth', 0.3);
        setTimeout(() => this.playTone(100, 'sawtooth', 0.3), 150);
    }

    playClick() {
        this.resume();
        this.playTone(800, 'triangle', 0.05, 0.05);
    }

    playWin() {
        this.resume();
        [523, 659, 784, 1046].forEach((f, i) => setTimeout(() => this.playTone(f, 'square', 0.4), i * 150));
    }
}