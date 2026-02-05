import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import CatalogPage from "./components/CatalogPage";
import "../src/styles/base.css";
import "../src/styles/catalogo.css";
import "../src/styles/landing.css";
import "../src/styles/pedido.css";
import "../src/styles/navbar.css";
import "../src/styles/personalizador.css";
import Personalizador from "./components/Personalizador";
import { useEffect } from "react";
import PedidoPage from "./components/PedidoPage";

const App = () => {
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "dark";
    document.body.classList.toggle("light-mode", savedTheme === "light");
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/catalogo" element={<CatalogPage />} />
        <Route path="/pedido" element={<PedidoPage />} />
        <Route path="/personalizador" element={<Personalizador />} />
      </Routes>
    </Router>
  );
};

export default App;
