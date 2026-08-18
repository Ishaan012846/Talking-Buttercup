// Real Web Audio Pitch-Shifted Voice Mimic Engine (Talking Tom Style)
// Records exact audio from microphone and plays back pitched UP in high cartoon voice!

class VoiceMimicEngine {
  constructor() {
    this.audioContext = null;
    this.mediaStream = null;
    this.mediaRecorder = null;
    this.audioChunks = [];
    this.isRecording = false;
    this.isPlaying = false;
    this.pitchMultiplier = 1.5; // High cartoon voice pitch-shift

    this.onStateChange = null;
    this.onVolumePeak = null; // For mouth lip-sync
    this.silenceTimer = null;
    this.analyser = null;
    this.animFrameId = null;
  }

  async init() {
    if (!this.audioContext) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.audioContext = new AudioCtx();
      }
    }
    if (this.audioContext && this.audioContext.state === "suspended") {
      await this.audioContext.resume();
    }
  }

  setPitch(pitch) {
    this.pitchMultiplier = pitch;
  }

  // Start listening & auto-recording user voice
  async startVoiceMimic(onStateChange, onVolumePeak) {
    this.onStateChange = onStateChange;
    this.onVolumePeak = onVolumePeak;
    await this.init();

    try {
      this.mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const source = this.audioContext.createMediaStreamSource(this.mediaStream);
      this.analyser = this.audioContext.createAnalyser();
      this.analyser.fftSize = 256;
      source.connect(this.analyser);

      this.mediaRecorder = new MediaRecorder(this.mediaStream);
      this.audioChunks = [];

      this.mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          this.audioChunks.push(e.data);
        }
      };

      this.mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(this.audioChunks, { type: 'audio/webm' });
        if (audioBlob.size > 500) {
          await this.playPitchShiftedAudio(audioBlob);
        } else {
          if (this.onStateChange) this.onStateChange('idle');
        }
      };

      this.mediaRecorder.start(100);
      this.isRecording = true;
      if (this.onStateChange) this.onStateChange('listening');

      // Monitor silence to auto-stop when user finishes speaking
      this.monitorSilence();
    } catch (err) {
      console.warn("Microphone access error:", err);
      if (this.onStateChange) this.onStateChange('error');
    }
  }

  stopVoiceMimic() {
    this.isRecording = false;
    if (this.animFrameId) cancelAnimationFrame(this.animFrameId);
    if (this.mediaRecorder && this.mediaRecorder.state !== 'inactive') {
      this.mediaRecorder.stop();
    }
    if (this.mediaStream) {
      this.mediaStream.getTracks().forEach((track) => track.stop());
    }
  }

  // Detect voice volume to auto-stop recording when user stops talking
  monitorSilence() {
    if (!this.analyser || !this.isRecording) return;

    const dataArray = new Uint8Array(this.analyser.frequencyBinCount);
    let lastVoiceTime = Date.now();
    let hasSpoken = false;

    const checkVolume = () => {
      if (!this.isRecording) return;
      this.analyser.getByteFrequencyData(dataArray);

      let sum = 0;
      for (let i = 0; i < dataArray.length; i++) {
        sum += dataArray[i];
      }
      const average = sum / dataArray.length;
      const normalizedVol = average / 255;

      if (this.onVolumePeak) this.onVolumePeak(normalizedVol);

      if (normalizedVol > 0.05) {
        lastVoiceTime = Date.now();
        hasSpoken = true;
      }

      // If user spoke and then stayed silent for 1.2 seconds, stop recording & mimic!
      if (hasSpoken && Date.now() - lastVoiceTime > 1200) {
        this.stopVoiceMimic();
        return;
      }

      // Max recording duration safety timeout (8s)
      if (hasSpoken && Date.now() - lastVoiceTime > 8000) {
        this.stopVoiceMimic();
        return;
      }

      this.animFrameId = requestAnimationFrame(checkVolume);
    };

    this.animFrameId = requestAnimationFrame(checkVolume);
  }

  // Playback recorded audio pitch-shifted UP in squeaky cartoon voice!
  async playPitchShiftedAudio(audioBlob) {
    if (!this.audioContext) return;
    try {
      const arrayBuffer = await audioBlob.arrayBuffer();
      const decodedBuffer = await this.audioContext.decodeAudioData(arrayBuffer);

      const source = this.audioContext.createBufferSource();
      source.buffer = decodedBuffer;

      // Pitch shift via playbackRate
      source.playbackRate.value = this.pitchMultiplier;

      // Analyser for lipsync during playback
      const playAnalyser = this.audioContext.createAnalyser();
      playAnalyser.fftSize = 256;

      source.connect(playAnalyser);
      playAnalyser.connect(this.audioContext.destination);

      if (this.onStateChange) this.onStateChange('mimicking');
      this.isPlaying = true;

      // Lip-sync loop during pitch-shifted playback
      const dataArray = new Uint8Array(playAnalyser.frequencyBinCount);
      const lipSyncLoop = () => {
        if (!this.isPlaying) return;
        playAnalyser.getByteFrequencyData(dataArray);
        let sum = 0;
        for (let i = 0; i < dataArray.length; i++) sum += dataArray[i];
        const avg = sum / dataArray.length / 255;
        if (this.onVolumePeak) this.onVolumePeak(avg);
        this.animFrameId = requestAnimationFrame(lipSyncLoop);
      };
      this.animFrameId = requestAnimationFrame(lipSyncLoop);

      source.onended = () => {
        this.isPlaying = false;
        if (this.animFrameId) cancelAnimationFrame(this.animFrameId);
        if (this.onVolumePeak) this.onVolumePeak(0);
        if (this.onStateChange) this.onStateChange('idle');
      };

      source.start(0);
    } catch (err) {
      console.warn("Error decoding/playing voice mimic:", err);
      if (this.onStateChange) this.onStateChange('idle');
    }
  }
}

export const voiceMimicEngine = new VoiceMimicEngine();
