
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
あなたは優秀な作曲アシスタントです。
以下に歌詞とコード譜を途中まで書いたある曲の断片です。
形式は「歌詞[コード]」の形になっています。
あなたは、最も自然な形でこの後に続くコードだけを予測して補完してください。
形式は「[コード]」の形を厳密に守り、続きの5コード程度を生成してください。
また、4行以上の入力譜面があったときは、コードは大抵の場合循環することを考慮しなさい。

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
