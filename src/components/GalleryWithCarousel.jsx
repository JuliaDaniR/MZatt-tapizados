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
      "/base+respaldo+baul1.png",
      "/base+respaldo+baul2.jpg",
      "/melamina1.jpg",
      "/melamina2.jpg",
      "/melamina3.jpg",
      "/melamina4.jpg",
      "/melamina5.jpg",
      "/melamina6.jpg",
      "/melamina7.jpg",
      "/melamina8.jpg",
      "/respaldo+baul1.png",
      "/respaldo+baul2.png",
      "/respaldo+baul3.png",
      "/respaldo+baul4.png",
      "/respaldo1.jpg",
      "/respaldo2.png",
      "/respaldo3.png",
      "/respaldo5.png",
      "/respaldo6.png",
      "/respaldo7.png",
      "/respaldo8.png",
      "/respaldo9.png",
      "/respaldo10.png",
      "/respaldo11.png",
      "/respaldo12.png",
      "/respaldo13.png",
      "/respaldo14.png",
      "/respaldo15.png",
      "/respaldo16.png",
      "/respaldo17.png",
      "/respaldo18.png",
      "/respaldo19.png",
      "/respaldo20.png",
      "/silla1.jpg",
      "/silla2.jpg",
      "/baul1.png",
      "/baul2.png",
  ];

  const carouselRef = useRef(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [touchStartX, setTouchStartX] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null); // Estado para el modal

  // Verifica si es móvil
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Función para mover el carrusel con botones
  const scrollCarousel = (direction) => {
    if (carouselRef.current) {
      const container = carouselRef.current;
      const scrollAmount = container.clientWidth * 0.8; // Se mueve el 80% del ancho visible
      container.scrollBy({ left: direction * scrollAmount, behavior: "smooth" });
    }
  };

  // Manejo del toque en móviles
  const handleTouchStart = (e) => setTouchStartX(e.touches[0].clientX);

  const handleTouchEnd = (e) => {
    if (!touchStartX) return;
    const touchEndX = e.changedTouches[0].clientX;
    const difference = touchStartX - touchEndX;

    if (difference > 50) {
      scrollCarousel(1); // Deslizar a la izquierda → siguiente imagen
    } else if (difference < -50) {
      scrollCarousel(-1); // Deslizar a la derecha → imagen anterior
    }

    setTouchStartX(null);
  };

  return (
    <section id="gallery" className="gallery">
      <h2>Galería</h2>
      <div className="carousel-container">
        <button className="carousel-button prev" onClick={() => scrollCarousel(-1)}>
          ‹
        </button>
        <div
          className="carousel"
          ref={carouselRef}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Imagen ${index + 1}`}
              className="carousel-image clickable-image"
              onClick={() => setSelectedImage(image)} // Abre el modal
            />
          ))}
        </div>
        <button className="carousel-button next" onClick={() => scrollCarousel(1)}>
          ›
        </button>
      </div>

      {/* Modal de Imagen */}
      {selectedImage && (
        <div className="modal" onClick={() => setSelectedImage(null)}>
          <div className="modal-content">
            <img src={selectedImage} alt="Imagen ampliada" />
          </div>
        </div>
      )}
    </section>
  );
};

export default GalleryWithCarousel;