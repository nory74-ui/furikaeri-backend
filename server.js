require('dotenv').config();
const express = require('express');
const OpenAI = require('openai');

const app = express();
const port = process.env.PORT || 3000;

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.get('/', (req, res) => {
  res.send('ふりかえりサポーターのバックエンドが動作しています');
});

app.get('/test-openai', async (req, res) => {
  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [{ role: 'user', content: 'こんにちは' }],
    });
    res.json(completion);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
