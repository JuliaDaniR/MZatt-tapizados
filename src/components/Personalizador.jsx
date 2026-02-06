import PersonalizadorForm from "../components/PersonalizadorForm";
import { useState, useEffect } from "react";
import { FaWhatsapp, FaFacebook } from "react-icons/fa";
import MainNavbar from "./MainNavbar";

export default function Personalizador() {
  const whatsappPhone = import.meta.env.VITE_WHATSAPP_PHONE;
  const facebookURL = import.meta.env.VITE_FACEBOOK_URL;
  const phone = whatsappPhone.replace(/\D/g, "");

  const [image, setImage] = useState(null);
  const [precio, setPrecio] = useState(null);

  const generarPrompt = (f) => {
    return `
Fotografía ultra realista estilo catálogo premium de muebles.

Instrucción clave:
- Mostrar una flecha horizontal sobre el respaldo indicando claramente: "${f.ancho} cm" de ANCHO.
- No mostrar medidas de altura.

Producto principal:
- Respaldo de cama estilo ${f.estilo.replace(/_/g, " ")}.
- Medidas reales: ${f.ancho} cm de ancho x ${f.alto} cm de alto.
- Tela: ${f.tela}, textura visible.
- Color: ${f.color}.

${
  ["capitone_profundo", "chesterfield"].includes(f.estilo)
    ? `- Líneas de botones: ${f.botones}.`
    : ""
}

${
  ["wingback", "imperial"].includes(f.estilo)
    ? `- Tachas metálicas: ${f.tachas}.`
    : ""
}

${f.combo === "solo_respaldo" ? "- Solo respaldo." : ""}
${f.combo === "respaldo_base" ? "- Incluye base tapizada a juego." : ""}
${f.combo === "respaldo_baul" ? "- Incluye baúl tapizado al pie de cama." : ""}
${f.combo === "combo_completo" ? "- Incluye base + baúl a juego." : ""}
${f.combo === "cama_completa" ? "- Cama completa con laterales y pie de cama tapizados." : ""}

Detalles adicionales: ${f.detalles || "ninguno"}.

Ambientación del dormitorio:
- Estilo moderno, cálido y elegante.
- Ropa de cama neutra.
- Mesas de luz minimalistas.
- Lámparas cálidas.
- Pared en tonos suaves.
- Decoración sutil.
- Piso de madera clara o cemento alisado.
- Iluminación suave tipo estudio fotográfico.

Requisitos visuales:
- Vista frontal centrada.
- El respaldo debe ser el protagonista.
- Composición limpia y profesional.
- Calidad tipo catálogo premium.
  `;
  };

  const calcularPrecio = (f) => {
    let base = f.ancho * f.alto * 0.15;

    if (f.botones === "pocos") base += 3000;
    if (f.botones === "muchos") base += 5000;

    if (f.tachitas === "borde") base += 4500;
    if (f.tachitas === "full") base += 8000;

    const telaMultipliers = {
      pana: 1.1,
      chenille: 1.15,
      cuero: 1.2,
      lino: 1.05,
      algodon: 1.0,
    };
    base *= telaMultipliers[f.tela];

    return Math.round(base);
  };

  const handleGenerate = async (formData) => {
    const prompt = generarPrompt(formData);
    const finalPrice = calcularPrecio(formData);

    const res = await fetch("http://localhost:3001/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });

    const data = await res.json();

    setImage(data.image);
    setPrecio(finalPrice);
  };

  /* ===============================
       CARRITO — CONTADOR
   =============================== */
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || [],
  );

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      <MainNavbar cartCount={cartCount} />

      <div className="personalizador-intro">
        <h1>Personalizador de Respaldos</h1>
        <p>
          Diseñá tu respaldo a medida eligiendo estilo, tela, color y detalles
          reales de fábrica. Podés generar hasta <strong>4 imágenes</strong>{" "}
          para visualizar tus combinaciones antes de encargar tu diseño final.
        </p>
        <p className="personalizador-warning">
          ⚠️ Para proteger nuestros recursos, cada usuario dispone de 4
          consultas gratuitas por día.
        </p>
      </div>

      <div className="personalizador-container">
        <div className="personalizador-form">
          <PersonalizadorForm onGenerate={handleGenerate} />
        </div>

        <div className="personalizador-preview">
          {image && (
            <div className="generada">
              <img src={image} alt="Generado" />
            </div>
          )}
          {precio && <p className="precio">Precio estimado: ${precio}</p>}
        </div>
      </div>

      {/* Footer */}
      <footer className="footer-card">
        <div className="footer-box">
          <h3 className="footer-title">MZatt Muebles</h3>
          <p className="footer-desc">
            Diseño, confort y calidad en respaldos, muebles y diseños
            personalizados.
          </p>

          <div className="footer-social">
            <a
              href={`https://wa.me/${phone}`}
              target="_blank"
              className="footer-icon whatsapp"
            >
              <FaWhatsapp />
            </a>
            <a
              href={facebookURL}
              target="_blank"
              className="footer-icon facebook"
            >
              <FaFacebook />
            </a>
          </div>
        </div>

        <p className="footer-copy">
          © {new Date().getFullYear()} MZatt — Desarrollo por{" "}
          <strong>Altiora Tech</strong>. Impulsando ideas, creando experiencias.
        </p>
      </footer>
    </>
  );
}
