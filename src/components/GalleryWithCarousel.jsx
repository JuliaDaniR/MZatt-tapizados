import { useRef, useState, useEffect } from "react";

const GalleryWithCarousel = () => {
  const images = [
    "../../public/producto1.png",
    "../../public/producto2.png",
    "../../public/producto3.png",
    "../../public/producto4.png",
    "../../public/producto5.png",
    "../../public/producto6.png",
    "../../public/producto7.png",
    "../../public/producto8.png",
    "../../public/producto9.png",
    "../../public/producto10.png",
    "../../public/producto11.png",
    "../../public/producto12.jpeg",
    "../../public/producto13.png",
    "../../public/producto14.png",
    "../../public/producto15.png",
    "../../public/producto16.png",
    "../../public/producto17.png",
    "../../public/producto18.png",
    "../../public/producto19.png",
    "../../public/producto20.png",
    "../../public/producto21.png",
    "../../public/producto22.png",
    "../../public/producto23.png",
    "../../public/producto24.png",
    "../../public/producto25.png",
    "../../public/producto26.png",
    "../../public/producto27.png",
    "../../public/producto28.png",
    "../../public/producto29.png",
    "../../public/producto30.png",
    "../../public/producto31.png",
    "../../public/producto32.png",
    "../../public/producto33.png",
    "../../public/producto34.png",
    "../../public/producto35.png",
    "../../public/producto36.png",
    "../../public/producto37.png",
    "../../public/producto38.png",
    "../../public/producto39.png",
    "../../public/producto40.png",
    "../../public/producto41.png",
    "../../public/producto42.png",
    "../../public/producto43.png",
    "../../public/producto44.png",
    "../../public/producto45.png",
    "../../public/producto46.png",
    "../../public/producto47.png",
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
