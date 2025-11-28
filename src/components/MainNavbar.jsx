import { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";
import { FaBars } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const MainNavbar = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  /* Leer carrito */
  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const totalQty = cart.reduce((sum, item) => sum + item.quantity, 0);
    setCartCount(totalQty);
  }, []);

  /* Tema */
  const toggleTheme = () => {
    document.documentElement.classList.toggle("light-mode");
  };

  return (
    <nav className={`top-nav ${menuOpen ? "open" : ""}`}>
      {/* NIVEL SUPERIOR */}
      <div className="nav-top">
        <img
          src="/logo.png"
          alt="MZatt"
          className="logo"
          onClick={() => navigate("/")}
        />

        <div className="right-actions">
          {/* Tema */}
          <button className="theme-toggle" onClick={toggleTheme}>
            {document.body.classList.contains("light-mode")
              ? <Moon size={22} />
              : <Sun size={22} />}
          </button>

          {/* Carrito */}
          <div className="cart-icon" onClick={() => navigate("/pedido")}>
            🛒
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </div>

          {/* Hamburguesa */}
          <button
            className="menu-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <FaBars />
          </button>
        </div>
      </div>

      {/* NIVEL INFERIOR */}
      <div className="nav-bottom">
        <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
          <li><a href="/#about">Sobre Nosotros</a></li>
          <li><a href="/#services">Productos</a></li>
          <li><a href="/#gallery">Galería</a></li>
          <li onClick={() => navigate("/catalogo")}>Catálogo</li>
          <li onClick={() => navigate("/pedido")}>Mi Pedido</li>
          <li><a href="/#contact-form">Contacto</a></li>
          <li><a href="/#fabrics">Telas</a></li>
        </ul>
      </div>
    </nav>
  );
};

export default MainNavbar;
