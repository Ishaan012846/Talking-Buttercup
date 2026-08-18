// Audio Engine State Machine for Talking Buttercup: Boyfriend Edition (Funny Sound Effects & Memes)

class AudioEngine {
  constructor() {
    this.audioContext = null;
    this.isMuted = false;
    this.pitchMultiplier = 1.45; // High-pitched cartoon voice default
    this.voiceProfile = "high";

    // Extended Sound Effect Library with Funny Meme Audio Synth
    this.soundLibrary = {
      tap_head: ["bonk_boing.mp3", "ouchie.mp3"],
      tap_shirt: ["rubber_duck_squeak.mp3", "whoa_dizzy.mp3"],
      swipe_toss: ["whoosh_slide.mp3", "plush_thud.mp3"],
      idle_click_miss: ["pop_arcade.mp3"],
      slap_cheek: ["slap_cartoony.mp3", "slap_stars.mp3"],
      tummy_giggle: ["giggle_chuckle.mp3", "laugh_hysterical.mp3"],
      toe_tap: ["boing_toe.mp3", "hop_ouch.mp3"],
      purr: ["purr_love.mp3"],
      scream_surprise: ["scream_cartoon.mp3"],
      sad_fail: ["sad_trombone.mp3"],
      yippee_cheer: ["yippee_cheer.mp3"],
      freeze_chatter: ["freeze_chatter.mp3"],
      soot_clean: ["chime_clean.mp3"],
      love_sign: ["fanfare_love.mp3"],
      kiss_blow: ["kiss_muah.mp3"]
    };
  }

  init() {
    if (!this.audioContext) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.audioContext = new AudioCtx();
      }
    }
    if (this.audioContext && this.audioContext.state === "suspended") {
      this.audioContext.resume();
    }
  }

  setMuted(muted) {
    this.isMuted = muted;
  }

  setVoiceProfile(profile) {
    this.voiceProfile = profile;
    if (profile === "high") this.pitchMultiplier = 1.55;
    else if (profile === "deep") this.pitchMultiplier = 0.8;
    else this.pitchMultiplier = 1.15;
  }

  getRandomAsset(actionKey) {
    const arr = this.soundLibrary[actionKey];
    if (!arr || arr.length === 0) return null;
    const randomIndex = Math.floor(Math.random() * arr.length);
    return { filename: arr[randomIndex], index: randomIndex };
  }

  playSound(actionKey, customParams = {}) {
    if (this.isMuted) return null;
    this.init();

    const selectedAsset = this.getRandomAsset(actionKey);
    const filename = selectedAsset ? selectedAsset.filename : actionKey;

    try {
      if (actionKey === "tap_head") {
        this.playBonkBoing();
      } else if (actionKey === "tap_shirt") {
        this.playRubberDuckSqueak(selectedAsset.index);
      } else if (actionKey === "swipe_toss") {
        this.playWhooshAndThud(selectedAsset.index);
      } else if (actionKey === "idle_click_miss") {
        this.playArcadePop();
      } else if (actionKey === "slap_cheek") {
        this.playSlapSound();
      } else if (actionKey === "tummy_giggle") {
        this.playHystericalLaugh();
      } else if (actionKey === "toe_tap") {
        this.playToeHopSound();
      } else if (actionKey === "purr") {
        this.playPurrSound();
      } else if (actionKey === "scream_surprise") {
        this.playCartoonScream();
      } else if (actionKey === "sad_fail") {
        this.playSadTrombone();
      } else if (actionKey === "yippee_cheer") {
        this.playYippeeCheer();
      } else if (actionKey === "soot_clean") {
        this.playSparkleChime();
      } else if (actionKey === "love_sign") {
        this.playLoveFanfare();
      } else if (actionKey === "kiss_blow") {
        this.playKissMuah();
      }
    } catch (err) {
      console.warn("Audio synthesis note:", err);
    }

    return filename;
  }

  // 1. High Cartoon Scream "AAAAHHHH!"
  playCartoonScream() {
    if (!this.audioContext) return;
    const now = this.audioContext.currentTime;
    const osc = this.audioContext.createOscillator();
    const gain = this.audioContext.createGain();

    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(600 * this.pitchMultiplier, now);
    osc.frequency.linearRampToValueAtTime(1100 * this.pitchMultiplier, now + 0.15);
    osc.frequency.linearRampToValueAtTime(800 * this.pitchMultiplier, now + 0.35);

    gain.gain.setValueAtTime(0.4, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.38);

    osc.connect(gain);
    gain.connect(this.audioContext.destination);
    osc.start(now);
    osc.stop(now + 0.4);
  }

  // 2. Cartoon Bonk / Rubber Boing Sound
  playBonkBoing() {
    if (!this.audioContext) return;
    const now = this.audioContext.currentTime;
    const osc = this.audioContext.createOscillator();
    const gain = this.audioContext.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(220, now);
    osc.frequency.exponentialRampToValueAtTime(950, now + 0.12);
    osc.frequency.exponentialRampToValueAtTime(400, now + 0.25);

    gain.gain.setValueAtTime(0.45, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);

    osc.connect(gain);
    gain.connect(this.audioContext.destination);
    osc.start(now);
    osc.stop(now + 0.3);
  }

  // 3. Hysterical Laugh "BWAHAHA!"
  playHystericalLaugh() {
    if (!this.audioContext) return;
    const now = this.audioContext.currentTime;
    [0, 0.07, 0.14, 0.21, 0.28, 0.35].forEach((offset, idx) => {
      const osc = this.audioContext.createOscillator();
      const gain = this.audioContext.createGain();
      osc.type = "triangle";
      const pitch = (700 + (idx % 2 === 0 ? 150 : -80)) * this.pitchMultiplier;
      osc.frequency.setValueAtTime(pitch, now + offset);
      osc.frequency.exponentialRampToValueAtTime(pitch * 1.2, now + offset + 0.05);

      gain.gain.setValueAtTime(0.35, now + offset);
      gain.gain.exponentialRampToValueAtTime(0.001, now + offset + 0.06);

      osc.connect(gain);
      gain.connect(this.audioContext.destination);
      osc.start(now + offset);
      osc.stop(now + offset + 0.07);
    });
  }

  // 4. Sad Trombone Fail Meme "Wah Wah Wahhh"
  playSadTrombone() {
    if (!this.audioContext) return;
    const now = this.audioContext.currentTime;
    const notes = [300, 280, 260, 220];
    notes.forEach((freq, idx) => {
      const osc = this.audioContext.createOscillator();
      const gain = this.audioContext.createGain();
      const startTime = now + idx * 0.18;

      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(freq, startTime);
      if (idx === 3) {
        osc.frequency.linearRampToValueAtTime(160, startTime + 0.4);
      }

      gain.gain.setValueAtTime(0.25, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + (idx === 3 ? 0.45 : 0.16));

      osc.connect(gain);
      gain.connect(this.audioContext.destination);
      osc.start(startTime);
      osc.stop(startTime + (idx === 3 ? 0.48 : 0.18));
    });
  }

  // 5. Yippee Cheer Fanfare
  playYippeeCheer() {
    if (!this.audioContext) return;
    const now = this.audioContext.currentTime;
    [523.25, 659.25, 783.99, 1046.5].forEach((freq, idx) => {
      const osc = this.audioContext.createOscillator();
      const gain = this.audioContext.createGain();
      const startTime = now + idx * 0.07;

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, startTime);

      gain.gain.setValueAtTime(0.3, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.25);

      osc.connect(gain);
      gain.connect(this.audioContext.destination);
      osc.start(startTime);
      osc.stop(startTime + 0.28);
    });
  }

  // Squeak, Slap, Purr, Pops
  playRubberDuckSqueak(variantIndex = 0) {
    if (!this.audioContext) return;
    const now = this.audioContext.currentTime;
    const osc = this.audioContext.createOscillator();
    const gain = this.audioContext.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(800, now);
    osc.frequency.exponentialRampToValueAtTime(1650, now + 0.06);
    osc.frequency.exponentialRampToValueAtTime(1200, now + 0.14);

    gain.gain.setValueAtTime(0.35, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.16);

    osc.connect(gain);
    gain.connect(this.audioContext.destination);
    osc.start(now);
    osc.stop(now + 0.18);
  }

  playWhooshAndThud(variantIndex = 0) {
    if (!this.audioContext) return;
    const now = this.audioContext.currentTime;
    const osc = this.audioContext.createOscillator();
    const gain = this.audioContext.createGain();
    osc.type = variantIndex === 0 ? "sine" : "triangle";

    if (variantIndex === 0) {
      osc.frequency.setValueAtTime(180, now);
      osc.frequency.exponentialRampToValueAtTime(800, now + 0.15);
      osc.frequency.exponentialRampToValueAtTime(120, now + 0.4);
      gain.gain.setValueAtTime(0.01, now);
      gain.gain.linearRampToValueAtTime(0.35, now + 0.15);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.42);
    } else {
      osc.frequency.setValueAtTime(160, now);
      osc.frequency.exponentialRampToValueAtTime(40, now + 0.2);
      gain.gain.setValueAtTime(0.5, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
    }

    osc.connect(gain);
    gain.connect(this.audioContext.destination);
    osc.start(now);
    osc.stop(now + 0.45);
  }

  playSlapSound() {
    if (!this.audioContext) return;
    const now = this.audioContext.currentTime;
    const osc = this.audioContext.createOscillator();
    const gain = this.audioContext.createGain();

    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(340, now);
    osc.frequency.exponentialRampToValueAtTime(90, now + 0.08);

    gain.gain.setValueAtTime(0.5, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);

    osc.connect(gain);
    gain.connect(this.audioContext.destination);
    osc.start(now);
    osc.stop(now + 0.11);
  }

  playToeHopSound() {
    if (!this.audioContext) return;
    const now = this.audioContext.currentTime;
    const osc = this.audioContext.createOscillator();
    const gain = this.audioContext.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(300, now);
    osc.frequency.exponentialRampToValueAtTime(950, now + 0.12);

    gain.gain.setValueAtTime(0.4, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);

    osc.connect(gain);
    gain.connect(this.audioContext.destination);
    osc.start(now);
    osc.stop(now + 0.15);
  }

  playPurrSound() {
    if (!this.audioContext) return;
    const now = this.audioContext.currentTime;
    const osc = this.audioContext.createOscillator();
    const gain = this.audioContext.createGain();

    osc.type = "triangle";
    osc.frequency.setValueAtTime(95, now);
    osc.frequency.linearRampToValueAtTime(115, now + 0.2);
    osc.frequency.linearRampToValueAtTime(95, now + 0.4);

    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);

    osc.connect(gain);
    gain.connect(this.audioContext.destination);
    osc.start(now);
    osc.stop(now + 0.48);
  }

  playArcadePop() {
    if (!this.audioContext) return;
    const now = this.audioContext.currentTime;
    const osc = this.audioContext.createOscillator();
    const gain = this.audioContext.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(400, now);
    osc.frequency.exponentialRampToValueAtTime(1200, now + 0.04);

    gain.gain.setValueAtTime(0.25, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

    osc.connect(gain);
    gain.connect(this.audioContext.destination);
    osc.start(now);
    osc.stop(now + 0.06);
  }

  playSparkleChime() {
    if (!this.audioContext) return;
    const now = this.audioContext.currentTime;
    const notes = [1046.5, 1318.5, 1567.98, 2093.0];
    const note = notes[Math.floor(Math.random() * notes.length)];

    const osc = this.audioContext.createOscillator();
    const gain = this.audioContext.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(note, now);

    gain.gain.setValueAtTime(0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);

    osc.connect(gain);
    gain.connect(this.audioContext.destination);
    osc.start(now);
    osc.stop(now + 0.16);
  }

  playLoveFanfare() {
    if (!this.audioContext) return;
    const now = this.audioContext.currentTime;
    const freqs = [523.25, 659.25, 783.99, 1046.5];

    freqs.forEach((freq, idx) => {
      const osc = this.audioContext.createOscillator();
      const gain = this.audioContext.createGain();
      const startTime = now + idx * 0.08;

      osc.type = "triangle";
      osc.frequency.setValueAtTime(freq, startTime);

      gain.gain.setValueAtTime(0.2, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.35);

      osc.connect(gain);
      gain.connect(this.audioContext.destination);

      osc.start(startTime);
      osc.stop(startTime + 0.38);
    });
  }

  playKissMuah() {
    if (!this.audioContext) return;
    const now = this.audioContext.currentTime;
    const osc = this.audioContext.createOscillator();
    const gain = this.audioContext.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(700, now);
    osc.frequency.exponentialRampToValueAtTime(1400, now + 0.08);
    osc.frequency.exponentialRampToValueAtTime(600, now + 0.18);

    gain.gain.setValueAtTime(0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);

    osc.connect(gain);
    gain.connect(this.audioContext.destination);

    osc.start(now);
    osc.stop(now + 0.22);
  }
}

export const audioEngine = new AudioEngine();
