
// pages/api/predict.js
import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "API key not set" });
  }

  const { current_text } = req.body;

  const prompt = `
あなたは優秀な作詞作曲アシスタントです。
以下の歌詞とコード譜の続きを、最も自然な形で予測して補完してください。
形式は「[コード]歌詞」の形を厳密に守り、続きの1フレーズ程度を生成してください。

入力された譜面:
---
${current_text}
---
予測される続き:`;

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return res.status(200).json({ predicted_text: text.trim() });
  } catch (error) {
    console.error("Gemini API Error:", error);
    return res.status(500).json({ error: error.message });
  }
}
