"use client";
import { useState } from "react";

const coloresPorTela = {
  chenille: [
    "crudo",
    "arena",
    "teja",
    "mostaza",
    "petroleo",
    "gris",
    "rosa",
    "oliva",
    "azul",
  ],
  cuerina: [
    "hueso",
    "suela",
    "marron",
    "naranja",
    "amarillo",
    "rojo",
    "fucsia",
    "violeta",
    "negro",
  ],
  pana: [
    "crema",
    "marron",
    "amarillo",
    "teal",
    "naranja",
    "rojo",
    "rosa",
    "violeta",
    "azul",
    "negro",
  ],
  lino: ["crudo", "arena", "gris", "beige"],
  algodon: ["blanco", "gris", "negro"],
};

const estilos = [
  { value: "capitone_profundo", label: "Capitoné profundo" },
  { value: "capitone_modular", label: "Capitoné modular (Cube)" },
  { value: "soft_lines", label: "Soft Lines" },
  { value: "soft_cloud", label: "Soft Cloud" },
  { value: "soft_cubic", label: "Soft Cubic" },
  { value: "cloud_bubbles", label: "Cloud Bubbles" },
  { value: "canelon", label: "Canelón" },
  { value: "panelado_soft", label: "Panelado Soft" },
  { value: "wingback", label: "Wingback (con orejeras)" },
  { value: "imperial", label: "Imperial (curvo + tachas)" },
  { value: "chesterfield", label: "Chesterfield" },
  { value: "liso", label: "Liso clásico" },
];

const combos = [
  { value: "solo_respaldo", label: "Solo respaldo" },
  { value: "respaldo_base", label: "Respaldo + base" },
  { value: "respaldo_baul", label: "Respaldo + baúl" },
  { value: "combo_completo", label: "Respaldo + base + baúl" }
];

export default function PersonalizadorForm({ onGenerate }) {
  const [form, setForm] = useState({
    ancho: 160,
    alto: 120,
    estilo: "capitone_profundo",
    tela: "pana",
    color: "crema",
    botones: "0",
    tachas: "none",
    combo: "solo_respaldo",
    detalles: "",
  });

  const [loading, setLoading] = useState(false);
  const [cooldown, setCooldown] = useState(0);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (cooldown > 0) return;

    setLoading(true);
    await onGenerate(form);
    setLoading(false);

    setTimeout(() => {
      const imgSection = document.querySelector(".generada");
      if (imgSection) {
        imgSection.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }, 300);

    setCooldown(10);
    const interval = setInterval(() => {
      setCooldown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const coloresDisponibles = coloresPorTela[form.tela];
  const estiloConBotones = ["capitone_profundo", "chesterfield"].includes(
    form.estilo,
  );
  const estiloConTachas = ["wingback", "imperial"].includes(form.estilo);

  return (
    <form onSubmit={handleSubmit} className="formulario">
      <h2>Personaliza tu Respaldo</h2>

      <div className="form-grid">
        <label>
          Ancho (cm)
          <input
            type="number"
            name="ancho"
            value={form.ancho}
            onChange={handleChange}
          />
        </label>

        <label>
          Alto (cm)
          <input
            type="number"
            name="alto"
            value={form.alto}
            onChange={handleChange}
          />
        </label>

        <label>
          Estilo
          <select name="estilo" value={form.estilo} onChange={handleChange}>
            {estilos.map((e) => (
              <option key={e.value} value={e.value}>
                {e.label}
              </option>
            ))}
          </select>
        </label>

        <label>
          Tela
          <select name="tela" value={form.tela} onChange={handleChange}>
            <option value="pana">Pana Premium</option>
            <option value="chenille">Chenille Rústico</option>
            <option value="cuerina">Cuerina</option>
            <option value="lino">Lino</option>
            <option value="algodon">Algodón</option>
          </select>
        </label>

        <label>
          Color
          <select name="color" value={form.color} onChange={handleChange}>
            {coloresDisponibles.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </label>

        {estiloConBotones && (
          <label>
            Líneas de botones
            <select name="botones" value={form.botones} onChange={handleChange}>
              <option value="0">Sin botones</option>
              <option value="1">1 línea</option>
              <option value="2">2 líneas</option>
              <option value="3">3 líneas</option>
              <option value="4">4 líneas</option>
            </select>
          </label>
        )}

        {estiloConTachas && (
          <label>
            Tachas
            <select name="tachas" value={form.tachas} onChange={handleChange}>
              <option value="none">Sin tachas</option>
              <option value="marco">Marco</option>
              <option value="full">Full contorno</option>
            </select>
          </label>
        )}

        <label className="full">
          Combo
          <select name="combo" value={form.combo} onChange={handleChange}>
            {combos.map((c) => (
              <option key={c.value} value={c.value}>
                {c.label}
              </option>
            ))}
          </select>
        </label>

        <label className="full">
          Detalles extra
          <textarea
            name="detalles"
            value={form.detalles}
            onChange={handleChange}
          />
        </label>
      </div>

      <button type="submit" disabled={loading || cooldown > 0}>
        {loading
          ? "Generando..."
          : cooldown > 0
            ? `Esperá ${cooldown}s`
            : "Generar Imagen"}
      </button>

      {loading && <div className="loading-spinner"></div>}
    </form>
  );
}
