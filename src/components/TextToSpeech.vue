<!-- TextToSpeech.vue -->
<template>
  <div class="text-to-speech">
    <input type="text" v-model="text" placeholder="Enter text to speak" class="text-input">
    <select v-model="selectedVoice" class="voice-select">
      <option v-for="voice in voices" :value="voice.name" :key="voice.name">{{ voice.name }}</option>
    </select>
    <button @click="speak" class="speak-button">Speak</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      text: '',
      selectedVoice: '',
      voices: [],
    };
  },
  mounted() {
    this.getVoices();
  },
  methods: {
    getVoices() {
      this.voices = speechSynthesis.getVoices();
      speechSynthesis.onvoiceschanged = () => {
        this.voices = speechSynthesis.getVoices();
      };
    },
    speak() {
      const utterance = new SpeechSynthesisUtterance(this.text);
      const selectedVoice = this.voices.find(voice => voice.name === this.selectedVoice);
      if (selectedVoice) {
        utterance.voice = selectedVoice;
      }
      speechSynthesis.speak(utterance);
    }
  }
};
</script>

<style scoped>
.text-to-speech {
  max-width: 300px;
  margin: 0 auto;
}

.text-input {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.voice-select {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.speak-button {
  width: 100%;
  padding: 10px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.speak-button:hover {
  background-color: #45a049;
}
</style>
