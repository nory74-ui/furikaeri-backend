const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const OpenAI = require('openai');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.post('/advice', async (req, res) => {
  const { reflection } = req.body;
  const prompt = `以下は中学生の授業のふりかえりです。直接的な答えを出すのではなく、生徒が授業で感じたことを思い起こし、どういった場面でなぜそう感じたのかを振り返るよう促すアドバイスを日本語で返してください。\n\nふりかえり：${reflection}\n\nアドバイス：`;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "あなたは中学生のふりかえりを深める教育アドバイザーです。" },
        { role: "user", content: prompt }
      ],
      temperature: 0.7
    });

    res.json({ advice: completion.choices[0].message.content.trim() });
  } catch (error) {
    console.error(error);
    res.status(500).send("APIエラー");
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
