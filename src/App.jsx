import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import CatalogPage from "./components/CatalogPage";
import "../src/styles.css";
import { useEffect } from "react";

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
      </Routes>
    </Router>
  );
};

export default App;
