import React from "react";

interface CarouselProps {
  images: string[];
}

const Carousel: React.FC<CarouselProps> = ({ images }) => {
  return (
    <div className="overflow-hidden w-full h-36 md:h-48 xl:h-56 flex items-center my-10 md:my-12 xl:my-16">
      {/* Contenedor animado */}
      <div className="flex animate-scroll">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Image ${index + 1}`}
            className="w-20 h-20 md:w-32 md:h-32 xl:w-40 xl:h-40 object-cover mx-3"
          />
        ))}
        {/* Duplicamos las imágenes para el efecto de bucle infinito */}
        {images.map((image, index) => (
          <img
            key={`${index}-duplicate`}
            src={image}
            alt={`Image ${index + 1}`}
            className="w-20 h-20 md:w-32 md:h-32 xl:w-40 xl:h-40 object-cover mx-3"
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
