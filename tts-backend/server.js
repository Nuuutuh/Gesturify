const express = require('express');
const bodyParser = require('body-parser');
const { exec } = require('child_process');

const app = express();
const PORT = 3000; // Update with your preferred port number

app.use(bodyParser.json());

// Route to change eSpeak voice
app.post('/change-voice', (req, res) => {
  const { voice } = req.body;
  // Execute command to change eSpeak voice
  exec(`espeak --voices | grep ${voice} | awk '{print $2}' | xargs -I {} espeak --path=. -v {} "Voice changed."`, (error, stdout, stderr) => {
    if (error) {
      console.error('Error changing voice:', error);
      res.status(500).send('Error changing voice');
      return;
    }
    console.log('Voice changed to:', voice);
    res.send('Voice changed successfully');
  });
});

// Route to speak text using eSpeak
app.post('/speak', (req, res) => {
  const { text, voice } = req.body;
  // Execute command to speak text with the selected voice
  exec(`espeak --path=. -v ${voice} "${text}"`, (error, stdout, stderr) => {
    if (error) {
      console.error('Error speaking text:', error);
      res.status(500).send('Error speaking text');
      return;
    }
    console.log('Text spoken:', text);
    res.send('Text spoken successfully');
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
