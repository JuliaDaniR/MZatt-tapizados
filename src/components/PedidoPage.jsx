import React, { useEffect, useState } from "react";
import { FaTrash, FaWhatsapp } from "react-icons/fa";
import MainNavbar from "../components/MainNavbar";
import { useNavigate } from "react-router-dom";

const PedidoPage = () => {
  const navigate = useNavigate();
  const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_PHONE;

  const [cart, setCart] = useState([]);

  /* =============================
      Cargar carrito
  ============================== */
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(stored);
  }, []);

  const saveCart = (newCart) => {
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  /* =============================
      Cantidades
  ============================== */
  const increaseQty = (codigo, size) => {
    saveCart(
      cart.map((i) =>
        i.codigo === codigo && i.size === size
          ? { ...i, quantity: i.quantity + 1 }
          : i
      )
    );
  };

  const decreaseQty = (codigo, size) => {
    saveCart(
      cart
        .map((i) =>
          i.codigo === codigo && i.size === size
            ? { ...i, quantity: Math.max(1, i.quantity - 1) }
            : i
        )
        .filter((x) => x.quantity > 0)
    );
  };

  const removeItem = (codigo, size) => {
    saveCart(cart.filter((i) => !(i.codigo === codigo && i.size === size)));
  };

  /* =============================
      WhatsApp
  ============================== */
  const sendWhatsApp = () => {
    if (!cart.length) return;

    let msg = "🛒 *Pedido de productos*\n\n";

    cart.forEach((item) => {
      msg += `• *${item.title}*\n`;
      msg += `  Código: ${item.codigo}\n`;
      if (item.sizeLabel)
        msg += `  Tamaño/Medida: ${item.sizeLabel}\n`;
      msg += `  Cantidad: ${item.quantity}\n`;
      msg += `  Subtotal: $${item.price * item.quantity}\n\n`;
    });

    msg += `💰 *TOTAL:* $${total}`;

    const phone = WHATSAPP_NUMBER.replace(/\D/g, ""); // limpia símbolos

    const url = `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;

    window.open(url, "_blank");
  };

  /* =============================
      Total general
  ============================== */
  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="pedido-container">
      <MainNavbar />

      <h1 className="pedido-title">Mi Pedido</h1>
      <p className="pedido-subtitle">
        Revisá tu pedido, ajustá cantidades y enviá directamente a WhatsApp para
        recibir tu presupuesto.
      </p>

      {/* CARRITO VACÍO */}
      {!cart.length && (
        <div className="pedido-empty">
          <p>No hay productos agregados.</p>
          <button className="button" onClick={() => navigate("/catalogo")}>
            Ver Catálogo
          </button>
        </div>
      )}

      {/* CARRITO LLENO */}
      {cart.length > 0 && (
        <>
          <div className="pedido-list">
            {cart.map((item) => (
              <div className="pedido-item" key={`${item.codigo}-${item.size}`}>
                <img src={item.image} className="pedido-img" />

                <div className="pedido-info">
                  <h3>{item.title}</h3>
                  <p>Código: {item.codigo}</p>

                  {item.sizeLabel && (
                    <p>Tamaño/Medida: {item.sizeLabel}</p>
                  )}

                  <p>Precio unitario: ${item.price}</p>

                  <p>Subtotal: ${item.price * item.quantity}</p>

                  <div className="pedido-qty">
                    <button onClick={() => decreaseQty(item.codigo, item.size)}>
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button onClick={() => increaseQty(item.codigo, item.size)}>
                      +
                    </button>
                  </div>
                </div>

                <button
                  className="remove-btn"
                  onClick={() => removeItem(item.codigo, item.size)}
                >
                  <FaTrash />
                </button>
              </div>
            ))}
          </div>

          {/* Total */}
          <div className="pedido-total">
            <h2>Total del Pedido: ${total}</h2>
          </div>

          {/* WhatsApp */}
          <button className="button whatsapp" onClick={sendWhatsApp}>
            <FaWhatsapp /> Enviar Pedido
          </button>
        </>
      )}
    </div>
  );
};

export default PedidoPage;
