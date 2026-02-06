import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// --- RATE LIMITING SIMPLE ---
const rateLimit = {};
const COOLDOWN_MS = 10 * 1000; // 10 segundos

function limitRequests(req, res, next) {
  const ip = req.ip;

  const now = Date.now();
  const lastRequest = rateLimit[ip] || 0;

  if (now - lastRequest < COOLDOWN_MS) {
    const wait = Math.ceil((COOLDOWN_MS - (now - lastRequest)) / 1000);
    return res.status(429).json({
      error: `Demasiadas solicitudes. Esperá ${wait} segundos.`,
    });
  }

  rateLimit[ip] = now;
  next();
}

// --- ENDPOINT ---
app.post("/generate", limitRequests, async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "Falta el prompt" });
    }

    const result = await client.images.generate({
      model: "gpt-image-1",
      prompt,
      size: "1024x1024",
    });

    const b64 = result.data[0].b64_json;
    const imgURL = `data:image/png;base64,${b64}`;

    res.json({ image: imgURL });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error generando imagen" });
  }
});

app.listen(3001, () => {
  console.log("Servidor IA corriendo en http://localhost:3001");
});
