import repollo from "../../assets/repollo.webp";
import rama from "../../assets/rama.webp";
import zanahoria from "../../assets/zanahoriasmano.webp";
import hoja from "../../assets/vector.webp";

const About = () => {
  return (
    <div className="flex flex-col lg:flex-row py-10 md:py-16 xl:py-40 mx-5 md:mx-10 xl:mx-36">
      {/* Texto y contenido izquierdo */}
      <div className="z-10 text-center lg:text-left lg:pr-5 xl:pr-10">
        <div className="w-full md:w-80 lg:w-64 xl:w-96 text-center lg:text-left mx-auto lg:mx-0">
          <h2 className="text-base md:text-lg xl:text-xl font-bold mb-4">
            Sobre Nosotros:
          </h2>
          <p className="mb-4 text-verdeob text-xl md:text-2xl xl:text-3xl">
            Creemos Que Una Vida Saludable Comienza Con Una Alimentación
            Consciente
          </p>
          <p className="text-xs md:text-sm xl:text-base">
            Nuestro objetivo es conectar a las personas con lo mejor que la
            naturaleza tiene para ofrecer, llevándote productos orgánicos,
            frescos y naturales directamente a tu puerta.
          </p>
        </div>
        <div className="flex justify-center lg:justify-between lg:w-[350px] xl:w-[450px] relative mt-6">
          <button className="bg-verdeob text-white text-sm font-semibold py-1.5 md:py-2 xl:py-3 px-6 md:px-8 xl:px-12 rounded-se-full rounded-es-full max-h-max border border-black transition duration-300 ease-in-out hover:bg-verdeclaro hover:text-black">
            VER MÁS
          </button>
          <img
            src={zanahoria}
            alt="Zanahoria cocechada"
            className="absolute hidden lg:static lg:block w-24 md:w-28 lg:w-48 xl:w-60 mt-4 z-10"
          />
          <img
            src={hoja}
            alt="hoja"
            className="absolute hidden lg:block left-28 md:left-20 lg:left-16 bottom-0 w-12 md:w-14 lg:w-28 xl:w-32 transform scale-x-[-1] -rotate-90"
          />
        </div>
      </div>

      {/* Imágenes y contenido derecho */}
      <div className="relative w-full mt-10 lg:mt-0">
        <img
          src={rama}
          alt="Rama decorativa 1"
          className="absolute -left-1 md:-left-5 lg:-left-16 -top-16 md:-top-64 lg:-top-14 w-20 md:w-28 xl:w-40 transform scale-x-[-1]"
        />
        <img
          src={rama}
          alt="Rama decorativa 2"
          className="absolute -right-[8px] md:-right-[25px] lg:-right-[30px] xl:-right-[105px] -bottom-8 md:bottom-36 lg:bottom-56 w-20 md:w-28 xl:w-40"
        />
        <img
          src={repollo}
          alt="Repollo"
          className="absolute left-0 hidden lg:block lg:w-[90%] xl:w-full"
        />
      </div>
    </div>
  );
};

export default About;
