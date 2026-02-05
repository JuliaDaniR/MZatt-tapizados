import { useState } from "react";

export default function Personalizador() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);

  const generar = async () => {
    setLoading(true);
    setImage(null);

    const resp = await fetch("/api/generate-image", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt })
    });

    const data = await resp.json();
    setImage(data.image);
    setLoading(false);
  };

  return (
    <section className="personalizador">
      <h2>Personalizar Tapizado</h2>

      <textarea
        placeholder="Describe el diseño..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />

      <button onClick={generar} disabled={loading}>
        {loading ? "Generando..." : "Generar Imagen"}
      </button>

      {image && (
        <img
          src={`data:image/png;base64,${image}`}
          alt="IA result"
          className="resultado-img"
        />
      )}
    </section>
  );
}
