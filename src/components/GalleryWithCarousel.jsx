import { useRef, useState, useEffect } from "react";

const GalleryWithCarousel = () => {
  const images = [
    "/base+respaldo1.jpg",
    "/base+respaldo2.jpg",
    "/base+respaldo3.jpg",
    "/base+respaldo4.jpg",
    "/base+respaldo5.png",
    "/base+respaldo6.png",
    "/base+respaldo7.png",
    "/base+respaldo8.png",
    "/base+respaldo9.png",
    "/base+respaldo10.png",
    "/base+respaldo11.png",
    "/base+respaldo12.png",
    "/base+respaldo13.png",
    "/base+respaldo14.png",
  ];

  const carouselRef = useRef(null);
  const [scrollAmount, setScrollAmount] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [touchStartX, setTouchStartX] = useState(0);
  const [touchEndX, setTouchEndX] = useState(0);

  // Detectar si el usuario está en móvil
  useEffect(() => {
    setIsMobile(window.innerWidth <= 768);
  }, []);

  // Desplazamiento automático (solo en escritorio)
  useEffect(() => {
    if (isMobile) return; // Evita el scroll automático en móviles

    const interval = setInterval(() => {
      if (carouselRef.current) {
        const container = carouselRef.current;
        const scrollWidth = container.scrollWidth;
        const clientWidth = container.clientWidth;

        if (scrollAmount + clientWidth >= scrollWidth) {
          setScrollAmount(0);
        } else {
          setScrollAmount((prev) => prev + 2);
        }

        container.scrollTo({
          left: scrollAmount,
          behavior: "smooth",
        });
      }
    }, 50);

    return () => clearInterval(interval);
  }, [scrollAmount, isMobile]);

  // Función para ir hacia atrás
  const handlePrev = () => {
    if (carouselRef.current) {
      const newScrollAmount = Math.max(
        scrollAmount - carouselRef.current.clientWidth / 2,
        0
      );
      setScrollAmount(newScrollAmount);
      carouselRef.current.scrollTo({
        left: newScrollAmount,
        behavior: "smooth",
      });
    }
  };

  // Función para ir hacia adelante
  const handleNext = () => {
    if (carouselRef.current) {
      const newScrollAmount = Math.min(
        scrollAmount + carouselRef.current.clientWidth / 2,
        carouselRef.current.scrollWidth - carouselRef.current.clientWidth
      );
      setScrollAmount(newScrollAmount);
      carouselRef.current.scrollTo({
        left: newScrollAmount,
        behavior: "smooth",
      });
    }
  };

  // Manejar inicio del toque
  const handleTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX);
  };

  // Manejar movimiento del toque
  const handleTouchMove = (e) => {
    setTouchEndX(e.touches[0].clientX);
  };

  // Manejar fin del toque
  const handleTouchEnd = () => {
    if (!touchStartX || !touchEndX) return;

    const difference = touchStartX - touchEndX;

    if (difference > 50) {
      handleNext(); // Deslizar hacia la izquierda → Siguiente imagen
    } else if (difference < -50) {
      handlePrev(); // Deslizar hacia la derecha → Imagen anterior
    }

    // Reiniciar valores táctiles
    setTouchStartX(0);
    setTouchEndX(0);
  };

  return (
    <section id="gallery" className="gallery">
      <h2>Galería</h2>
      <div className="carousel-container">
        <button className="carousel-button prev" onClick={handlePrev}>
          ‹
        </button>
        <div
          className="carousel"
          ref={carouselRef}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Imagen ${index + 1}`}
              className="carousel-image"
            />
          ))}
        </div>
        <button className="carousel-button next" onClick={handleNext}>
          ›
        </button>
      </div>
    </section>
  );
};

export default GalleryWithCarousel;
