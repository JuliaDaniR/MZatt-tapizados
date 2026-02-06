import OpenAI from "openai";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "Falta el prompt" });
    }

    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const response = await client.images.generate({
      model: "gpt-image-1",
      prompt,
      size: "1024x1024",
    });

    const base64 = response.data[0].b64_json;

    return res.status(200).json({
      image: `data:image/png;base64,${base64}`,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error generando imagen" });
  }
}
