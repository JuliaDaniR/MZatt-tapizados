import { useState } from "react";
import MainNavbar from "./MainNavbar";
import { products } from "../data/products";

const CatalogPage = () => {
  const [modalImage, setModalImage] = useState(null);
  const [toast, setToast] = useState("");
  const [selectedSizes, setSelectedSizes] = useState({});

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2000);
  };

  /* ===========================
      CAMBIO DE TAMAÑO/MEDIDA
  ============================ */
  const handleSizeChange = (codigo, size) => {
    setSelectedSizes({
      ...selectedSizes,
      [codigo]: size,
    });
  };

  /* ===========================
      ORDENAR POR TIPO
  ============================ */
  const sortedProducts = [...products].sort((a, b) =>
    a.tipo.localeCompare(b.tipo)
  );

  /* ===========================
      AGREGAR AL CARRITO
  ============================ */
  const addToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    let price = product.price;
    let size = null;
    let sizeLabel = null;

    // Productos con tamaños o medidas
    if (product.tipo === "por_tamano" || product.tipo === "por_medida") {
      size = selectedSizes[product.codigo];

      if (!size) {
        showToast("Elegí una opción antes 🛏️");
        return;
      }

      price = product.precios[size];
      sizeLabel = size.replace(/_/g, " ");

      // Si el precio es personalizado
      if (price === "consultar") {
        price = "consultar";
      }
    }

    const existing = cart.find(
      (p) =>
        p.codigo === product.codigo &&
        (product.tipo !== "por_tamano" && product.tipo !== "por_medida"
          ? true
          : p.size === size)
    );

    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({
        codigo: product.codigo,
        title: product.title,
        price,
        size,
        sizeLabel,
        quantity: 1,
        image: product.mainImage,
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    showToast("Producto agregado 🛒");
  };

  /* ===========================
      RENDER
  ============================ */
  return (
    <div className="catalog-container">
      <MainNavbar />

      {toast && <div className="toast">{toast}</div>}

      <header className="catalog-header">
        <h1>Catálogo de Productos</h1>
        <p>Elegí tus modelos favoritos y agregalos al pedido.</p>
      </header>

      <section className="products-grid">
        {sortedProducts.map((product) => {
          const [selectedImage, setSelectedImage] = useState(product.mainImage);

          return (
            <div className="product-card" key={product.codigo}>
              {/* Imagen principal */}
              <img
                src={selectedImage}
                className="main-product-image"
                onClick={() => setModalImage(selectedImage)}
                alt={product.title}
              />

              {/* Miniaturas */}
              <div className="thumbnail-row">
                {[product.mainImage, ...product.images].map((thumb, idx) => (
                  <img
                    key={idx}
                    src={thumb}
                    className={`thumbnail ${
                      thumb === selectedImage ? "active" : ""
                    }`}
                    onClick={() => setSelectedImage(thumb)}
                    alt={product.title}
                  />
                ))}
              </div>

              {/* Datos del producto */}
              <h3>{product.title}</h3>
              <p>{product.description}</p>
              <p className="product-code">Código: {product.codigo}</p>

              {/* SELECTOR POR TAMAÑO */}
              {product.tipo === "por_tamano" && (
                <select
                  value={selectedSizes[product.codigo] || ""}
                  onChange={(e) =>
                    handleSizeChange(product.codigo, e.target.value)
                  }
                >
                  <option value="">Elegí un tamaño</option>
                  <option value="1_plaza">
                    1 Plaza – ${product.precios["1_plaza"]}
                  </option>
                  <option value="2_plazas">
                    2 Plazas – ${product.precios["2_plazas"]}
                  </option>
                  <option value="2_plazas_y_media">
                    2 Plazas y Media – ${product.precios["2_plazas_y_media"]}
                  </option>
                  <option value="king_size">
                    King Size – ${product.precios["king_size"]}
                  </option>
                </select>
              )}

              {/* SELECTOR POR MEDIDA (mostradores, muebles especiales) */}
              {product.tipo === "por_medida" && (
                <select
                  value={selectedSizes[product.codigo] || ""}
                  onChange={(e) =>
                    handleSizeChange(product.codigo, e.target.value)
                  }
                >
                  <option value="">Elegí una medida</option>

                  {Object.entries(product.precios).map(([key, value]) => (
                    <option key={key} value={key}>
                      {key.replace(/_/g, " ")} –{" "}
                      {value === "consultar" ? "Consultar" : `$${value}`}
                    </option>
                  ))}
                </select>
              )}
              {/* SELECTOR PARA SETS (living exterior, combos, conjuntos) */}
              {product.tipo === "set" && (
                <select
                  value={selectedSizes[product.codigo] || ""}
                  onChange={(e) =>
                    handleSizeChange(product.codigo, e.target.value)
                  }
                >
                  <option value="">Elegí una opción</option>

                  {Object.entries(product.precios).map(([key, value]) => (
                    <option key={key} value={key}>
                      {key.replace(/_/g, " ")} –{" "}
                      {value === "consultar" ? "Consultar" : `$${value}`}
                    </option>
                  ))}
                </select>
              )}
              {product.tipo === "precio_unico" && (
                <p className="price">Precio: ${product.precios.unico}</p>
              )}

              {/* BOTÓN */}
              <button className="button" onClick={() => addToCart(product)}>
                Agregar al Pedido 🛒
              </button>
            </div>
          );
        })}
      </section>

      {/* MODAL */}
      {modalImage && (
        <div className="modal" onClick={() => setModalImage(null)}>
          <div className="modal-content">
            <img src={modalImage} alt="Ampliada" />
          </div>
        </div>
      )}
    </div>
  );
};

export default CatalogPage;
