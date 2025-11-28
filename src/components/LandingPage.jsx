import React, { useState, useEffect } from "react";
import { FaWhatsapp, FaFacebook } from "react-icons/fa";
import GalleryWithCarousel from "./GalleryWithCarousel";
import { useNavigate } from "react-router-dom";
import MainNavbar from "../components/MainNavbar";
import useScrollReveal from "../hooks/useScrollReveal";

const LandingPage = () => {
  const whatsappPhone = import.meta.env.VITE_WHATSAPP_PHONE;
  const facebookURL = import.meta.env.VITE_FACEBOOK_URL;
  const navigate = useNavigate();
  const phone = whatsappPhone.replace(/\D/g, "");
  useScrollReveal();
  /* ===============================
      PRODUCTO SELECCIONADO
  =============================== */
  const [selectedProduct, setSelectedProduct] = useState({
    code: "",
    title: "",
  });

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("selectedProduct"));
    if (stored?.code) setSelectedProduct(stored);

    // siempre limpiar para que la landing no arrastre productos viejos
    localStorage.removeItem("selectedProduct");
  }, []);

  /* ===============================
      ENVÍO A WHATSAPP
  =============================== */
  const sendToWhatsApp = (event) => {
    event.preventDefault();

    const name = event.target.name.value.trim();
    const email = event.target.email.value.trim();
    const message = event.target.message.value.trim();

    const text = `
    *Solicitud de Presupuesto*
    🧑 *Nombre:* ${name}
    📧 *Email:* ${email}
    💬 *Mensaje:* ${message}
    `;

    const url = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;

    window.open(url, "_blank");

    event.target.reset();
    setSelectedProduct({ code: "", title: "" });
    localStorage.removeItem("selectedProduct");
  };

  /* ===============================
      CARRITO — CONTADOR
  =============================== */
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  /* ===============================
      RENDER
  =============================== */
  return (
    <div className="landing-container">
      {/* 🔷 NAVBAR GLOBAL */}
      <MainNavbar cartCount={cartCount} />

      {/* 🔷 HERO */}
      <header className="hero">
        <div className="hero-overlay">
          <h1 className="hero-title">Diseño y Confort para su hogar</h1>

          <p className="hero-description">
            Respaldos, muebles y tapizados que transforman tu espacio
          </p>

          <button
            className="button hero-button"
            onClick={() =>
              document
                .querySelector("#gallery")
                .scrollIntoView({ behavior: "smooth" })
            }
          >
            Ver Galería de Imágenes
          </button>

          <div className="hero-cta">
            <p>
              ¿No sabes por dónde empezar?{" "}
              <span
                onClick={() =>
                  document
                    .querySelector("#contact")
                    .scrollIntoView({ behavior: "smooth" })
                }
              >
                Contáctanos para asesoramiento.
              </span>
            </p>
          </div>
        </div>
      </header>

      <section id="services" className="section services reveal">
        <div className="services-overlay">
          <h2 className="section-title">Nuestros Productos</h2>

          <div className="services-grid">
            {/* CARD 1 */}
            <div className="product-card-info reveal">
              <img
                src="/producto1.png"
                alt="Respaldos Tapizados"
                className="service-img"
              />
              <h3>Respaldos Tapizados</h3>
              <p>
                Piezas diseñadas para transformar cualquier dormitorio.
                Tapizados premium, capitoné perfecto y estructura reforzada para
                garantizar confort y durabilidad.
              </p>
            </div>

            {/* CARD 2 */}
            <div className="product-card-info reveal">
              <img
                src="/producto2.png"
                alt="Diseños Personalizados"
                className="service-img"
              />
              <h3>Diseños Personalizados</h3>
              <p>
                Fabricamos cada modelo a medida: elegí color, textura, altura,
                ancho y estilo. Convertimos tus ideas en muebles únicos pensados
                especialmente para tu hogar.
              </p>
            </div>
          </div>

          <button
            className="button hero-button"
            onClick={() => navigate("/catalogo")}
          >
            Ver Catálogo
          </button>
        </div>
      </section>

      {/* 🔷 SOBRE NOSOTROS */}
      <section id="about" className="section about reveal">
        <div className="about-container">
          {/* Imagen lateral */}
          <div className="about-image">
            <img
              src="/sobre-nosotros.png"
              alt="Taller y diseño de tapizados"
            />
          </div>

          {/* Texto */}
          <div className="about-text">
            <h2 className="about-title">Sobre Nosotros</h2>

            <p>
              Somos un microemprendimiento familiar especializado en el diseño y
              fabricación de respaldos tapizados, bases, baúles, combos y
              muebles a medida.
            </p>

            <p>
              Cada pieza es elaborada combinando técnicas artesanales con
              procesos modernos, logrando productos resistentes, confortables y
              estéticamente únicos.
            </p>

            <p>
              Creemos en el trabajo personalizado: escuchamos tus ideas,
              proponemos diseños y creamos muebles que acompañen tu hogar por
              muchos años.
            </p>
          </div>
        </div>
      </section>

      {/* 🔷 GALERÍA */}
      <GalleryWithCarousel />

      {/* 🔷 FORMULARIO DE CONTACTO */}
      <section
        id="contact-form"
        className="section contact-form-section reveal"
      >
        <h2 className="section-title">Escribenos</h2>
        <div className="contact-form-container">
          <div className="contact-info">
            <h2>¿Tenés alguna consulta?</h2>
            <p>
              Escribinos para pedir un presupuesto, solicitar información sobre
              nuestros productos o coordinar una visita a taller. Te
              responderemos lo antes posible.
            </p>

            <div className="contact-details">
              <p>
                📞 WhatsApp directo: <strong>{whatsappPhone}</strong>
              </p>
              <p>📍 Zona de entrega: Rosario y alrededores</p>
            </div>
          </div>

          <form className="contact-form" onSubmit={sendToWhatsApp}>
            <input type="text" name="name" placeholder="Tu nombre" required />
            <input
              type="email"
              name="email"
              placeholder="Tu correo electrónico"
              required
            />
            <textarea
              name="message"
              placeholder="Escribe tu consulta..."
              required
            />
            <button type="submit" className="button">
              Enviar a WhatsApp
            </button>
          </form>
        </div>
      </section>

      {/* 🔷 MUESTRARIO DE TELAS */}
      <section id="fabrics" className="section fabrics-section reveal">
        <h2 className="section-title">Muestrario de Telas</h2>
        <p className="fabrics-description">
          Contamos con una amplia variedad de materiales para combinar diseño,
          estilo y durabilidad. Elegí la tela que mejor se adapte a tu gusto y a
          tu espacio.
        </p>

        <div className="fabrics-grid">
          {/* CHENILLE */}
          <div className="fabric-card reveal">
            <img
              src="/chenille-rustico.png"
              alt="Chenille"
              className="fabric-img"
            />
            <h3>Chenille</h3>
            <p>
              Tela suave, cálida y con textura aterciopelada. Ideal para
              respaldos, sillones y muebles de uso cotidiano. Su resistencia la
              convierte en una de las favoritas.
            </p>
          </div>

          {/* PANA */}
          <div className="fabric-card reveal">
            <img src="/pana.png" alt="Pana" className="fabric-img" />
            <h3>Pana</h3>
            <p>
              Elegancia clásica y tacto ultrasuave. Perfecta para quienes buscan
              un acabado sofisticado y un estilo acogedor en dormitorios y
              livings.
            </p>
          </div>

          {/* CUERINA */}
          <div className="fabric-card reveal">
            <img
              src="/cuerina.png"
              alt="Cuerina"
              className="fabric-img"
            />
            <h3>Cuerina</h3>
            <p>
              Moderna, resistente y fácil de limpiar. Ideal para baúles,
              respaldos reforzados y muebles de alto uso. Amplia variedad de
              colores vibrantes y neutros.
            </p>
          </div>
        </div>
      </section>

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
    </div>
  );
};

export default LandingPage;
