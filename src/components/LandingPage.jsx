import React, { useState, useEffect } from "react";
import { FaWhatsapp, FaInstagram, FaBars, FaFacebook } from "react-icons/fa";
import GalleryWithCarousel from "./GalleryWithCarousel";
import { Sun, Moon } from "lucide-react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const whatsappPhone = import.meta.env.VITE_WHATSAPP_PHONE;
  const facebookURL = import.meta.env.VITE_FACEBOOK_URL;
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState({
    code: "",
    image: "",
  });

  useEffect(() => {
    const storedProduct =
      JSON.parse(localStorage.getItem("selectedProduct")) || {};
    console.log("Producto recuperado al cargar:", storedProduct); 
    if (storedProduct.code) {
      setSelectedProduct(storedProduct);
    }
  }, []);

  useEffect(() => {
    // Limpiar el localStorage si se recarga la página
    localStorage.removeItem("selectedProduct");

    // Verificar si hay algún producto almacenado
    const storedProduct =
      JSON.parse(localStorage.getItem("selectedProduct")) || {};
    if (storedProduct.code) {
      setSelectedProduct(storedProduct);
    }
  }, []);

  const sendToWhatsApp = (event) => {
    event.preventDefault();

    const name = event.target.name.value.trim();
    const email = event.target.email.value.trim();
    const message = event.target.message.value.trim();
    const productCode = selectedProduct.code;

    console.log("Datos del formulario:", {
      name,
      email,
      productCode,
      message,
      storedProduct: selectedProduct, 
    });

    if (!productCode) {
      alert(
        "Por favor, visita nuestro catálogo y selecciona un producto antes de solicitar el presupuesto."
      );
      return;
    }

    const whatsappMessage = `
      *Solicitud de Presupuesto*  
      📌 *Nombre:* ${name}  
      📧 *Email:* ${email}  
      🛋️ *Titulo del Producto:* ${selectedProduct.title}
      🔖 *Código del producto:* ${productCode}  
      📝 *Mensaje:* ${message}  
    `;

    const whatsappURL = `https://wa.me/${whatsappPhone}?text=${encodeURIComponent(
      whatsappMessage
    )}`;
    window.open(whatsappURL, "_blank");
    // Limpiar el formulario
    event.target.reset(); 

    // Limpiar selectedProduct del estado y localStorage si es necesario
    setSelectedProduct({ code: "", title: "" });
    localStorage.removeItem("selectedProduct");
  };

  const [isLightMode, setIsLightMode] = useState(
    localStorage.getItem("theme") === "light"
  );

  useEffect(() => {
    const body = document.body;

    if (isLightMode) {
      body.classList.add("light-mode");
      localStorage.setItem("theme", "light");
    } else {
      body.classList.remove("light-mode");
      localStorage.setItem("theme", "dark");
    }
  }, [isLightMode]);

  return (
    <div className="container">
      {/* Navbar */}
      <nav className="navbar">
        <img
          src="/logo.png"
          alt="MZatt"
          className="logo"
          onClick={() => (window.location.href = "/")}
        />
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            flexDirection: "column-reverse",
          }}
        >
          <button
            className="menu-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <FaBars />
          </button>
          <ul className={menuOpen ? "nav-links open" : "nav-links"}>
            <li>
              <a href="#about">Sobre Nosotros</a>
            </li>
            <li>
              <a href="#services">Productos</a>
            </li>
            <li>
              <a href="#gallery">Galería</a>
            </li>
            <li>
              <a onClick={() => navigate("/catalogo")} style={{ cursor: "pointer" }}>Ver Catálogo</a>
            </li>
            <li>
              <a href="#budget">Presupuesto</a>
            </li>
            <li>
              <a href="#contact">Contacto</a>
            </li>
          </ul>
          <button
            id="theme-toggle"
            onClick={() => setIsLightMode(!isLightMode)}
            className="theme-toggle"
            aria-label="Toggle theme"
            style={{ fontSize: "1.5rem", background: "transparent" }}
          >
            {isLightMode ? <Moon size={24} /> : <Sun size={24} />}
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="hero">
        <div className="hero-overlay">
          <h1 className="hero-title">Diseño y Confort para su hogar</h1>
          <p className="hero-description">
            Respaldos, muebles y tapizados que transforman tu hogar
          </p>
          <button
            className="button hero-button"
            href="#gallery"
            onClick={() =>
              document
                .querySelector("#gallery")
                .scrollIntoView({ behavior: "smooth" })
            }
          >
            Ver Galeria de Imagenes
          </button>
          <div className="hero-cta">
            <p>
              ¿No sabes por dónde empezar?{" "}
              <span
                onClick={() =>
                  document
                    .querySelector(".budget-form")
                    .scrollIntoView({ behavior: "smooth" })
                }
              >
                Contáctanos para asesoramiento personalizado.
              </span>
            </p>
          </div>
        </div>
      </header>

      {/* Sobre Nosotros */}
      <section id="about" className="about">
        <h2>Sobre Nosotros</h2>
        <p>
          Somos un microemprendimiento familiar dedicado al diseño y fabricación
          de respaldos tapizados, bases, baúles, combos completos, y racks en
          melamina. Nos especializamos en crear productos a medida, garantizando
          calidad excepcional, diseños únicos y funcionalidad para cada espacio.
          Nuestro proceso de fabricación combina técnicas tradicionales y
          modernas para asegurar acabados duraderos y sofisticados. En MZatt,
          entendemos que cada cliente es único, por eso ofrecemos soluciones
          personalizadas que se adaptan a las necesidades y estilo de vida de
          cada uno. Además, nos preocupamos por el medio ambiente, utilizando
          materiales responsables siempre que es posible.
        </p>
      </section>

      {/* Sección de Productos con Fondo */}
      <section id="services" className="services">
        <div className="services-overlay">
          <h2>Nuestros Productos</h2>
          <div className="services-grid">
            <div className="card">
              <h3>Respaldos Tapizados</h3>
              <p>
                Elegancia y confort en cada diseño. Nuestros respaldos tapizados
                están diseñados con materiales de alta calidad y diferentes
                estilos para adaptarse a cualquier espacio. Ideales para
                transformar tu dormitorio en un ambiente acogedor.
              </p>
            </div>
            <div className="card">
              <h3>Muebles en Melamina</h3>
              <p>
                Diseños modernos y funcionales con acabados de primera calidad.
                Fabricamos racks, repisas, mesas y más, brindando soluciones
                prácticas y estéticas para tu hogar u oficina. Cada pieza es
                cuidadosamente elaborada para ofrecer durabilidad y estilo.
              </p>
            </div>
            <div className="card">
              <h3>Diseños Personalizados</h3>
              <p>
                Creamos muebles a medida según tus necesidades y preferencias.
                Podemos adaptar cada pieza con colores, texturas y dimensiones
                específicas para garantizar que encaje perfectamente en tu
                espacio.
              </p>
            </div>
          </div>
          <button
            className="button hero-button"
            style={{ marginTop: "2rem" }}
            onClick={() => navigate("/catalogo")}
          >
            Ver Catálogo
          </button>
        </div>
      </section>

      {/* Galería de Imágenes */}
      <GalleryWithCarousel />

      {/* Formulario de Presupuesto */}
      <section className="budget-form" id="budget">
        <form onSubmit={sendToWhatsApp}>
          <h2>Solicita tu Presupuesto</h2>
          <input type="text" name="name" placeholder="Tu nombre" required />
          <input
            type="email"
            name="email"
            placeholder="Tu correo electrónico"
            required
          />
          <input
            type="text"
            name="productCode"
            placeholder="Código del producto"
            value={selectedProduct.code || ""}
            readOnly
          />
          <textarea
            name="message"
            placeholder="Describe lo que necesitas"
            required
          ></textarea>
          <button type="submit" className="button">
            Enviar a WhatsApp
          </button>
        </form>
      </section>

      {/* Contacto */}
      <section id="contact" className="contact">
        <h2>¡Contáctanos!</h2>
        <div className="social-icons">
          <a
            href={`https://wa.me/${whatsappPhone}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaWhatsapp style={{ color: "#25D366" }} />
          </a>
          <a href={facebookURL} target="_blank" rel="noopener noreferrer">
            <FaFacebook style={{ color: "#1877F2" }} />
          </a>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
