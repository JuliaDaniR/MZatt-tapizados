import { useRef, useState, useEffect } from "react";

const GalleryWithCarousel = () => {
  const images = [
    "/producto1.png",
    "/producto2.png",
    "/producto3.png",
    "/producto4.png",
    "/producto5.png",
    "/producto6.png",
    "/producto7.png",
    "/producto8.png",
    "/producto9.png",
    "/producto10.png",
    "/producto11.png",
    "/producto12.jpeg",
    "/producto13.png",
    "/producto14.png",
    "/producto15.png",
    "/producto16.png",
    "/producto17.png",
    "/producto18.png",
    "/producto19.png",
    "/producto20.png",
    "/producto21.png",
    "/producto22.png",
    "/producto23.png",
    "/producto24.png",
    "/producto25.png",
    "/producto26.png",
    "/producto27.png",
    "/producto28.png",
    "/producto29.png",
    "/producto30.png",
    "/producto31.png",
    "/producto32.png",
    "/producto33.png",
    "/producto34.png",
    "/producto35.png",
    "/producto36.png",
    "/producto37.png",
    "/producto38.png",
    "/producto39.png",
    "/producto40.png",
    "/producto41.png",
    "/producto42.png",
    "/producto43.png",
    "/producto44.png",
    "/producto45.png",
    "/producto46.png",
    "/producto47.png",
  ];

  const carouselRef = useRef(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [touchStartX, setTouchStartX] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageWidth, setImageWidth] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Verifica si es móvil
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Obtener el ancho de la imagen para calcular el scroll exacto
  useEffect(() => {
    const updateImageWidth = () => {
      if (carouselRef.current) {
        const firstImage = carouselRef.current.querySelector(".carousel-image");
        if (firstImage) {
          setImageWidth(firstImage.clientWidth);
        }
      }
    };

    updateImageWidth();
    window.addEventListener("resize", updateImageWidth);
    return () => window.removeEventListener("resize", updateImageWidth);
  }, []);

  // Función para mover el carrusel con botones
  const scrollCarousel = (direction) => {
    if (carouselRef.current && imageWidth) {
      let newIndex = currentIndex + direction;

      // Asegurar que no nos pasemos de los límites
      if (newIndex < 0) newIndex = 0;
      if (newIndex >= images.length) newIndex = images.length - 1;

      setCurrentIndex(newIndex);
      const newScrollPosition = newIndex * imageWidth;
      carouselRef.current.scrollTo({
        left: newScrollPosition,
        behavior: "smooth",
      });
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
    <section id="gallery" className="gallery reveal">
      <h2>Galería</h2>
      <div className="carousel-container">
        <button
          className="carousel-button prev"
          onClick={() => scrollCarousel(-1)}
        >
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
              onClick={() => {
                setSelectedImage(image); // Abre el modal
                setCurrentIndex(index); // También actualiza el índice de la imagen seleccionada
              }}
            />
          ))}
        </div>
        <button
          className="carousel-button next"
          onClick={() => scrollCarousel(1)}
        >
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
