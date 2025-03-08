import React from "react";

const CatalogPage = () => {
  const products = [
    {
      image: "/base+respaldo1.jpg",
      description: "Elegante respaldo tapizado",
      price: "$150",
    },
    {
      image: "/base+respaldo2.jpg",
      description: "Comodidad en cada detalle",
      price: "$120",
    },
    {
      image: "/base+respaldo3.jpg",
      description: "Diseño moderno para tu hogar",
      price: "$180",
    },
    {
      image: "/base+respaldo4.jpg",
      description: "Respaldo tapizado de alta durabilidad",
      price: "$200",
    },
    {
      image: "/base+respaldo5.png",
      description: "Respaldo de lujo, ideal para espacios elegantes",
      price: "$220",
    },
    {
      image: "/base+respaldo6.png",
      description: "Diseño ergonómico y cómodo para tu descanso",
      price: "$140",
    },
    {
      image: "/base+respaldo9.png",
      description: "Comodidad y elegancia al mejor precio",
      price: "$130",
    },
    {
      image: "/base+respaldo10.png",
      description: "Ideal para dormitorios modernos",
      price: "$190",
    },
    {
      image: "/base+respaldo11.png",
      description: "Diseño sofisticado para tu hogar",
      price: "$250",
    },
    {
      image: "/base+respaldo12.png",
      description: "Comodidad y diseño único para tu espacio",
      price: "$180",
    },
    {
      image: "/base+respaldo13.png",
      description: "Diseños personalizados para cada cliente",
      price: "$210",
    },
    {
      image: "/base+respaldo14.png",
      description: "Diseños personalizados para cada cliente",
      price: "$210",
    },
    {
      image: "/base+respaldo+baul1.png",
      description: "Combinación perfecta entre respaldo y baúl",
      price: "$230",
    },
    {
      image: "/base+respaldo+baul2.jpg",
      description: "Funcionalidad y estilo para tu habitación",
      price: "$170",
    },
    {
      image: "/melamina1.jpg",
      description: "Mueble de melamina de diseño moderno",
      price: "A consultar",
    },
    {
      image: "/melamina2.jpg",
      description: "Mueble funcional y elegante para tu oficina",
      price: "A consultar",
    },
    {
      image: "/melamina3.jpg",
      description: "Respaldo y melamina en una sola pieza",
      price: "A consultar",
    },
    {
      image: "/melamina4.jpg",
      description: "Mueble resistente con estilo minimalista",
      price: "A consultar",
    },
    {
      image: "/melamina5.jpg",
      description: "Melamina de alta calidad para ambientes contemporáneos",
      price: "A consultar",
    },
    {
      image: "/melamina6.jpg",
      description: "Diseños elegantes y funcionales para tu hogar",
      price: "A consultar",
    },
    {
      image: "/melamina7.jpg",
      description: "Mueble de melamina que se adapta a cualquier espacio",
      price: "A consultar",
    },
    {
      image: "/melamina8.jpg",
      description: "Combinación perfecta de melamina y estilo moderno",
      price: "A consultar",
    },
    {
      image: "/respaldo+baul2.png",
      description: "Baúl multifuncional con respaldo elegante",
      price: "$230",
    },
    {
      image: "/respaldo+baul4.png",
      description: "Baúl multifuncional con respaldo elegante",
      price: "$230",
    },
    {
      image: "/respaldo1.jpg",
      description: "Diseño de respaldo único para tu espacio",
      price: "$150",
    },
    {
      image: "/respaldo2.png",
      description: "Respaldo tapizado de calidad premium",
      price: "$170",
    },
    {
      image: "/respaldo3.png",
      description: "Diseño sofisticado y funcional",
      price: "$190",
    },
    {
      image: "/respaldo6.png",
      description: "Comodidad garantizada con estilo contemporáneo",
      price: "$200",
    },
    {
      image: "/respaldo7.png",
      description: "Respaldo ergonómico con diseño elegante",
      price: "$160",
    },
    {
      image: "/respaldo9.png",
      description: "Respaldo para quienes buscan comodidad y diseño",
      price: "$180",
    },
    {
      image: "/respaldo10.png",
      description: "Diseño versátil y resistente para cualquier espacio",
      price: "$220",
    },
    {
      image: "/respaldo12.png",
      description: "Respaldo de lujo con acabados perfectos",
      price: "$240",
    },
    {
      image: "/respaldo14.png",
      description: "Comodidad premium con estilo único",
      price: "$260",
    },
    {
      image: "/respaldo16.png",
      description: "Diseño de lujo que mejora tu espacio",
      price: "$250",
    },
    {
      image: "/respaldo17.png",
      description: "Respaldo ergonómico para mayor confort",
      price: "$240",
    },
    {
      image: "/respaldo18.png",
      description: "Respaldo ergonómico para mayor confort",
      price: "$240",
    },
    {
      image: "/respaldo20.png",
      description: "Respaldo ergonómico para mayor confort",
      price: "$240",
    },
    {
      image: "/silla1.jpg",
      description: "Silla de diseño contemporáneo",
      price: "$100",
    },
    {
      image: "/silla2.jpg",
      description: "Comodidad y estilo en cada silla",
      price: "$120",
    },
    {
      image: "/baul1.png",
      description: "Baúl elegante y funcional",
      price: "$160",
    },
  ];

  return (
    <div className="catalog-container">
      {/* Navbar */}
      <nav className="navbar">
        <img src="/logo.png" alt="MZatt" className="logo"  onClick={() => window.location.href = "/"} />
        <h1 className="hero-title" style={{ fontSize: "1.8rem", fontFamily: "Montserrat, sans-serif", fontWeight: 600, textShadow: "#FFFCA8 2px 2px 0px, #9C9C9C 4px 4px 0px" }}>
          Diseño y Confort para su hogar
        </h1>
      </nav>
      <header className="catalog-header">
        <h1>Catálogo de Productos</h1>
        <p>
          Descubre todos nuestros productos con diseños exclusivos y calidad
          garantizada.
        </p>
      </header>

      <section className="products-grid">
        {products.map((product, index) => (
          <div className="product-card" key={index}>
            <img src={product.image} alt={`Producto ${index + 1}`} />
            <h3>{product.description}</h3>
            <p>{product.description}</p>
            <p className="price">{product.price}</p>
          </div>
        ))}
      </section>

      <footer className="catalog-footer">
        <button onClick={() => window.history.back()} className="button">
          Volver
        </button>
      </footer>
    </div>
  );
};

export default CatalogPage;
