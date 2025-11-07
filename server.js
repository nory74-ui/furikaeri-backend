
require('dotenv').config();
const express = require('express');
const { OpenAI } = require('openai');

const app = express();

// Initialize OpenAI client with API key from environment variable
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Define a simple route for '/'
app.get('/', (req, res) => {
  res.send('ふりかえりサポーターのバックエンドが動作しています');
});

// Use process.env.PORT or default to 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});