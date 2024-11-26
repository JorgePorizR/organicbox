import About from "../other/About";
import Carousel from "../other/Carousel";

import imgcarousel1 from "../../assets/carousel/imgcarrusel1.webp";
import imgcarousel2 from "../../assets/carousel/imgcarrusel2.webp";
import imgcarousel3 from "../../assets/carousel/imgcarrusel3.webp";
import imgcarousel4 from "../../assets/carousel/imgcarrusel4.webp";
import imgcarousel5 from "../../assets/carousel/imgcarrusel5.webp";
import imgcarousel6 from "../../assets/carousel/imgcarrusel6.webp";
import imgcarousel7 from "../../assets/carousel/imgcarrusel7.webp";
import imgcarousel8 from "../../assets/carousel/imgcarrusel8.webp";

const Main: React.FC = () => {
  const images = [
    imgcarousel1,
    imgcarousel2,
    imgcarousel3,
    imgcarousel4,
    imgcarousel5,
    imgcarousel6,
    imgcarousel7,
    imgcarousel8,
  ];

  return (
    <main id="main">
      <About />
      <Carousel images={images} />
    </main>
  );
};

export default Main;
