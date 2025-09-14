// Sound utility functions for payment and order sounds
export class SoundManager {
  constructor() {
    this.sounds = {};
    this.isEnabled = true;
    this.volume = 0.7;
  }

  // Load sound files
  loadSound(name, path) {
    try {
      const audio = new Audio(path);
      audio.preload = 'auto';
      audio.volume = this.volume;
      this.sounds[name] = audio;
    } catch (error) {
      console.warn(`Failed to load sound: ${name}`, error);
    }
  }

  // Play a specific sound
  async playSound(name) {
    if (!this.isEnabled || !this.sounds[name]) {
      return;
    }

    try {
      const audio = this.sounds[name];
      audio.currentTime = 0; // Reset to beginning
      await audio.play();
    } catch (error) {
      console.warn(`Failed to play sound: ${name}`, error);
    }
  }

  // Create enhanced payment success sound programmatically
  createPaymentSuccessSound() {
    try {
      // Create AudioContext for generating sound
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      
      const playChord = (frequencies, duration, delay = 0) => {
        return new Promise((resolve) => {
          setTimeout(() => {
            const oscillators = [];
            const gainNodes = [];
            
            frequencies.forEach((frequency, index) => {
              const oscillator = audioContext.createOscillator();
              const gainNode = audioContext.createGain();
              
              oscillator.connect(gainNode);
              gainNode.connect(audioContext.destination);
              
              oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
              oscillator.type = index === 0 ? 'sine' : 'triangle'; // Mix sine and triangle waves
              
              // Enhanced envelope with better curve
              const baseVolume = this.volume * (0.15 - index * 0.03); // Decreasing volume for harmony
              gainNode.gain.setValueAtTime(0, audioContext.currentTime);
              gainNode.gain.linearRampToValueAtTime(baseVolume, audioContext.currentTime + 0.02);
              gainNode.gain.exponentialRampToValueAtTime(baseVolume * 0.7, audioContext.currentTime + duration * 0.3);
              gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + duration);
              
              oscillator.start(audioContext.currentTime);
              oscillator.stop(audioContext.currentTime + duration);
              
              oscillators.push(oscillator);
              gainNodes.push(gainNode);
            });
            
            setTimeout(resolve, duration * 1000);
          }, delay);
        });
      };

      // Enhanced payment success sound sequence - Apple Pay inspired
      return async () => {
        if (!this.isEnabled) return;
        
        try {
          // Uplifting chord progression with perfect timing
          await playChord([440.00, 554.37], 0.2, 0);         // A4 + C#5 (major third) - warm start
          await playChord([554.37, 659.25], 0.25, 120);      // C#5 + E5 (minor third) - building
          await playChord([659.25, 880.00], 0.3, 220);       // E5 + A5 (perfect fourth) - triumphant finish
        } catch (error) {
          console.warn('Failed to play payment success sound:', error);
        }
      };
    } catch (error) {
      console.warn('Web Audio API not supported, falling back to silent mode');
      return () => {}; // Return empty function as fallback
    }
  }

  // Enable/disable sounds
  setEnabled(enabled) {
    this.isEnabled = enabled;
  }

  // Set volume (0.0 to 1.0)
  setVolume(volume) {
    this.volume = Math.max(0, Math.min(1, volume));
    Object.values(this.sounds).forEach(audio => {
      audio.volume = this.volume;
    });
  }
}

// Create global sound manager instance
export const soundManager = new SoundManager();

// Initialize payment success sound
export const playPaymentSuccessSound = soundManager.createPaymentSuccessSound();

// Convenience function for order completion
export const playOrderSuccessSound = async () => {
  await playPaymentSuccessSound();
};
