// Voice Repeater & Speech Synthesizer for Talking Tom Mode

class VoiceRepeater {
  constructor() {
    this.recognition = null;
    this.isListening = false;
    this.onStatusChange = null;
    this.onRepeatStart = null;
    this.onRepeatEnd = null;

    this.initRecognition();
  }

  initRecognition() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      this.recognition = new SpeechRecognition();
      this.recognition.continuous = false;
      this.recognition.interimResults = false;
      this.recognition.lang = 'en-US';

      this.recognition.onstart = () => {
        this.isListening = true;
        if (this.onStatusChange) this.onStatusChange('listening');
      };

      this.recognition.onend = () => {
        this.isListening = false;
        if (this.onStatusChange) this.onStatusChange('idle');
      };

      this.recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        if (transcript) {
          this.repeatText(transcript);
        }
      };

      this.recognition.onerror = (err) => {
        console.warn('Speech recognition error:', err);
        this.isListening = false;
        if (this.onStatusChange) this.onStatusChange('idle');
      };
    }
  }

  startListening(onStatusChange, onRepeatStart, onRepeatEnd) {
    this.onStatusChange = onStatusChange;
    this.onRepeatStart = onRepeatStart;
    this.onRepeatEnd = onRepeatEnd;

    if (this.recognition) {
      try {
        this.recognition.start();
      } catch (err) {
        console.warn('Recognition already started or error:', err);
      }
    } else {
      // Fallback if SpeechRecognition not supported in browser
      if (this.onStatusChange) this.onStatusChange('unsupported');
    }
  }

  stopListening() {
    if (this.recognition && this.isListening) {
      this.recognition.stop();
    }
  }

  // Repeat text using SpeechSynthesis pitched UP for Talking Tom Voice!
  repeatText(text, pitch = 1.6, rate = 1.15) {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel(); // Stop current speech if any

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.pitch = pitch; // High pitched cartoon voice
      utterance.rate = rate; // Slightly faster cartoon speed
      utterance.volume = 1.0;

      utterance.onstart = () => {
        if (this.onRepeatStart) this.onRepeatStart(text);
      };

      utterance.onend = () => {
        if (this.onRepeatEnd) this.onRepeatEnd();
      };

      utterance.onerror = () => {
        if (this.onRepeatEnd) this.onRepeatEnd();
      };

      window.speechSynthesis.speak(utterance);
    }
  }
}

export const voiceRepeater = new VoiceRepeater();
