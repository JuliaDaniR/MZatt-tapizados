// /api/generate-image.js
import OpenAI from "openai";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  try {
    const { prompt } = req.body;

   const client = new OpenAI({
      apiKey: process.env.VITE_OPENAI_API_KEY,
    });

    const result = await client.images.generate({
      model: "gpt-image-1",
      prompt,
      size: "512x512"
    });

    const b64 = result.data[0].b64_json;

    res.status(200).json({ image: b64 });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error generando imagen" });
  }
}
