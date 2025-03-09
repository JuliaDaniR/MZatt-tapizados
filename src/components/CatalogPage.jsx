import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CatalogPage = () => {
  const navigate = useNavigate();
  const [selectedProduct, setSelectedProduct] = useState({ code: "", title: "" });
  const [selectedImage, setSelectedImage] = useState(null);

  const products = [
    {
      image: "/base+respaldo1.jpg",
      title: "Respaldo Elegante",
      description: "Elegante respaldo tapizado",
      price: "$150",
      codigo: "R001",
    },
    {
      image: "/base+respaldo2.jpg",
      title: "Respaldo Comodidad",
      description: "Comodidad en cada detalle",
      price: "$120",
      codigo: "R002",
    },
    {
      image: "/base+respaldo3.jpg",
      title: "Respaldo Moderno",
      description: "Diseño moderno para tu hogar",
      price: "$180",
      codigo: "R003",
    },
    {
      image: "/base+respaldo4.jpg",
      title: "Respaldo Duradero",
      description: "Respaldo tapizado de alta durabilidad",
      price: "$200",
      codigo: "R004",
    },
    {
      image: "/base+respaldo5.png",
      title: "Respaldo de Lujo",
      description: "Respaldo de lujo, ideal para espacios elegantes",
      price: "$220",
      codigo: "R005",
    },
    {
      image: "/base+respaldo6.png",
      title: "Respaldo Ergonómico",
      description: "Diseño ergonómico y cómodo para tu descanso",
      price: "$140",
      codigo: "R006",
    },
    {
      image: "/base+respaldo9.png",
      title: "Respaldo Económico",
      description: "Comodidad y elegancia al mejor precio",
      price: "$130",
      codigo: "R007",
    },
    {
      image: "/base+respaldo10.png",
      title: "Respaldo Moderno",
      description: "Ideal para dormitorios modernos",
      price: "$190",
      codigo: "R008",
    },
    {
      image: "/base+respaldo11.png",
      title: "Respaldo Sofisticado",
      description: "Diseño sofisticado para tu hogar",
      price: "$250",
      codigo: "R009",
    },
    {
      image: "/base+respaldo12.png",
      title: "Respaldo Único",
      description: "Comodidad y diseño único para tu espacio",
      price: "$180",
      codigo: "R010",
    },
    {
      image: "/base+respaldo13.png",
      title: "Respaldo Personalizado",
      description: "Diseños personalizados para cada cliente",
      price: "$210",
      codigo: "R011",
    },
    {
      image: "/base+respaldo14.png",
      title: "Respaldo Personalizado",
      description: "Diseños personalizados para cada cliente",
      price: "$210",
      codigo: "R012",
    },
    {
      image: "/base+respaldo+baul1.png",
      title: "Respaldo con Baúl",
      description: "Combinación perfecta entre respaldo y baúl",
      price: "$230",
      codigo: "RB001",
    },
    {
      image: "/base+respaldo+baul2.jpg",
      title: "Respaldo Funcional",
      description: "Funcionalidad y estilo para tu habitación",
      price: "$170",
      codigo: "RB002",
    },
    {
      image: "/melamina1.jpg",
      title: "Mueble Moderno",
      description: "Mueble de melamina de diseño moderno",
      price: "A consultar",
      codigo: "M001",
    },
    {
      image: "/melamina2.jpg",
      title: "Mueble Funcional",
      description: "Mueble funcional y elegante para tu oficina",
      price: "A consultar",
      codigo: "M002",
    },
    {
      image: "/melamina3.jpg",
      title: "Respaldo y Melamina",
      description: "Respaldo y melamina en una sola pieza",
      price: "A consultar",
      codigo: "M003",
    },
    {
      image: "/melamina4.jpg",
      title: "Mueble Minimalista",
      description: "Mueble resistente con estilo minimalista",
      price: "A consultar",
      codigo: "M004",
    },
    {
      image: "/melamina5.jpg",
      title: "Melamina Contemporánea",
      description: "Melamina de alta calidad para ambientes contemporáneos",
      price: "A consultar",
      codigo: "M005",
    },
    {
      image: "/melamina6.jpg",
      title: "Mueble Elegante",
      description: "Diseños elegantes y funcionales para tu hogar",
      price: "A consultar",
      codigo: "M006",
    },
    {
      image: "/melamina7.jpg",
      title: "Mueble Adaptable",
      description: "Mueble de melamina que se adapta a cualquier espacio",
      price: "A consultar",
      codigo: "M007",
    },
    {
      image: "/melamina8.jpg",
      title: "Melamina Moderna",
      description: "Combinación perfecta de melamina y estilo moderno",
      price: "A consultar",
      codigo: "M008",
    },
    {
      image: "/respaldo+baul2.png",
      title: "Baúl Multifuncional",
      description: "Baúl multifuncional con respaldo elegante",
      price: "$230",
      codigo: "RB003",
    },
    {
      image: "/respaldo+baul4.png",
      title: "Baúl Multifuncional",
      description: "Baúl multifuncional con respaldo elegante",
      price: "$230",
      codigo: "RB004",
    },
    {
      image: "/respaldo1.jpg",
      title: "Respaldo Único",
      description: "Diseño de respaldo único para tu espacio",
      price: "$150",
      codigo: "R013",
    },
    {
      image: "/respaldo2.png",
      title: "Respaldo Premium",
      description: "Respaldo tapizado de calidad premium",
      price: "$170",
      codigo: "R014",
    },
    {
      image: "/respaldo3.png",
      title: "Respaldo Sofisticado",
      description: "Diseño sofisticado y funcional",
      price: "$190",
      codigo: "R015",
    },
    {
      image: "/respaldo6.png",
      title: "Respaldo Contemporáneo",
      description: "Comodidad garantizada con estilo contemporáneo",
      price: "$200",
      codigo: "R016",
    },
    {
      image: "/respaldo7.png",
      title: "Respaldo Ergonómico",
      description: "Respaldo ergonómico con diseño elegante",
      price: "$160",
      codigo: "R017",
    },
    {
      image: "/respaldo9.png",
      title: "Respaldo Cómodo",
      description: "Respaldo para quienes buscan comodidad y diseño",
      price: "$180",
      codigo: "R018",
    },
    {
      image: "/respaldo10.png",
      title: "Respaldo Versátil",
      description: "Diseño versátil y resistente para cualquier espacio",
      price: "$220",
      codigo: "R019",
    },
    {
      image: "/respaldo12.png",
      title: "Respaldo de Lujo",
      description: "Respaldo de lujo con acabados perfectos",
      price: "$240",
      codigo: "R020",
    },
    {
      image: "/respaldo14.png",
      title: "Respaldo Premium",
      description: "Comodidad premium con estilo único",
      price: "$260",
      codigo: "R021",
    },
    {
      image: "/respaldo16.png",
      title: "Respaldo de Lujo",
      description: "Diseño de lujo que mejora tu espacio",
      price: "$250",
      codigo: "R022",
    },
    {
      image: "/respaldo17.png",
      title: "Respaldo Ergonómico",
      description: "Respaldo ergonómico para mayor confort",
      price: "$240",
      codigo: "R023",
    },
    {
      image: "/respaldo18.png",
      title: "Respaldo Ergonómico",
      description: "Respaldo ergonómico para mayor confort",
      price: "$240",
      codigo: "R024",
    },
    {
      image: "/respaldo20.png",
      title: "Respaldo Ergonómico",
      description: "Respaldo ergonómico para mayor confort",
      price: "$240",
      codigo: "R025",
    },
    {
      image: "/silla1.jpg",
      title: "Silla Contemporánea",
      description: "Silla de diseño contemporáneo",
      price: "$100",
      codigo: "S067",
    },
    {
      image: "/silla2.jpg",
      title: "Silla Cómoda",
      description: "Comodidad y estilo en cada silla",
      price: "$120",
      codigo: "S001",
    },
    {
      image: "/baul1.png",
      title: "Baúl Elegante",
      description: "Baúl elegante y funcional",
      price: "$160",
      codigo: "B001",
    },
  ];

  const handleBudgetRequest = (code, title) => {
    setSelectedProduct({ code, title });
    localStorage.setItem("selectedProduct", JSON.stringify({ code, title }));
    console.log("Producto seleccionado:", { code, title });
  
    navigate("/");

    setTimeout(() => {
      const budgetSection = document.getElementById("budget");
      if (budgetSection) {
        budgetSection.scrollIntoView({ behavior: "smooth" });
      }
    }, 100); 
  };
  
  const openImage = (image) => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className="catalog-container">
      <nav className="navbar">
        <img src="/logo.png" alt="MZatt" className="logo" onClick={() => window.location.href = "/"} />
        <h1 className="hero-title">Diseño y Confort para su hogar</h1>
      </nav>

      <header className="catalog-header">
        <h1>Catálogo de Productos</h1>
        <p>Descubre todos nuestros productos con diseños exclusivos y calidad garantizada.</p>
      </header>

      <section className="products-grid">
        {products.map((product, index) => (
          <div className="product-card" key={index}>
            <img 
              src={product.image} 
              alt={`Producto ${product.codigo}`} 
              onClick={() => openImage(product.image)}
              className="clickable-image"
            />
            <h3>{product.title}</h3>
            <p>{product.description}</p>
            <p className="product-code">
              Código: {product.codigo} <span className="price">{product.price}</span>
            </p>
            <button 
              className="button" 
              onClick={() => handleBudgetRequest(product.codigo, product.title)}
            >
              Presupuestar
            </button>
          </div>
        ))}
      </section>

      {selectedImage && (
        <div className="modal" onClick={closeModal}>
          <div className="modal-content">
            <img src={selectedImage} alt="Imagen ampliada" />
          </div>
        </div>
      )}

      <footer className="catalog-footer">
        <button onClick={() => window.history.back()} className="button">Volver</button>
      </footer>
    </div>
  );
};

export default CatalogPage;