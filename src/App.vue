<template>
  <div class="container">
    <p class="title">Gesturify App</p>
    <p>Please enter the IP address of the backend server:</p>
    <div>
      <input v-model="backendURL" placeholder="e.g., http://192.168.1.100:3000" class="input" />
      <button @click="sendIPAddress" class="send-button">Send</button>
    </div>
    <span v-if="errorMessage" class="error-message">{{ errorMessage }}</span>
    <input v-model="text" placeholder="Enter text to speak" class="input" :disabled="!isBackendURLValid" style="margin-top: 10px;" />
    <select v-model="selectedVoice" class="select" :disabled="!isBackendURLValid">
      <option v-for="voice in voices" :key="voice" :value="voice">{{ voice }}</option>
    </select>
    <button @click="speak" class="button" :disabled="!isBackendURLValid">Speak</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      text: '',
      selectedVoice: null,
      voices: ['voice1', 'voice2', 'voice3'], // Add available voices here
      backendURL: '', // Initialize backendURL to an empty string
      isBackendURLValid: false, // Flag to track if backendURL is valid
      errorMessage: '' // Error message for invalid IP address format
    };
  },
  methods: {
    sendIPAddress() {
      // Validate the IP address format when the user clicks the send button
      this.isBackendURLValid = /^https?:\/\/[\w.-]+(:\d+)?$/.test(this.backendURL);
      this.errorMessage = this.isBackendURLValid ? '' : 'Invalid IP address format';
    },
    async speak() {
      try {
        await fetch(`${this.backendURL}/speak`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            text: this.text,
            voice: this.selectedVoice
          })
        });
      } catch (error) {
        console.error('Error speaking text:', error);
      }
    }
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');

.container {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  font-family: 'Roboto', sans-serif; /* Use Roboto font */
}

.title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
}

.input, .select {
  width: calc(100% - 75px);
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-family: 'Roboto', sans-serif; /* Use Roboto font */
}

.send-button {
  width: 70px;
  margin-left: 5px;
  padding: 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-family: 'Roboto', sans-serif; /* Use Roboto font */
}

.send-button:hover {
  background-color: #0056b3;
}

.button {
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-family: 'Roboto', sans-serif; /* Use Roboto font */
}

.button:hover {
  background-color: #0056b3;
}

.error-message {
  color: #ff0000;
  font-family: 'Roboto', sans-serif; /* Use Roboto font */
}
</style>
