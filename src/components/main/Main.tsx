import repollo from "../../assets/repollo.webp";
import rama from "../../assets/rama.webp";
import zanahoria from "../../assets/zanahoriasmano.webp";
import hoja from "../../assets/vector.webp";

const Main = () => {
  return (
    <main id="main" className="flex py-40 mx-36">
      <div className="z-10 text-center pr-10">
        <div className="w-96 text-left">
          <h2 className="text-xl font-bold mb-4">Sobre Nosotros:</h2>
          <p className="mb-4 text-verdeob text-3xl">
            Creemos Que Una Vida Saludable Comienza Con Una Alimentación
            Consciente
          </p>
          <p className="text-base">
            Nuestro objetivo es conectar a las personas con lo mejor que la
            naturaleza tiene para ofrecer, llevándote productos orgánicos,
            frescos y naturales directamente a tu puerta.
          </p>
        </div>
        <div className="flex justify-between w-[450px] relative">
          <button className="mt-8 bg-verdeob text-white text-sm font-semibold py-3 px-12 rounded-se-full rounded-es-full max-h-max border border-black transition duration-300 ease-in-out hover:bg-verdeclaro hover:text-black">
            VER MÁS
          </button>
          <img
            src={zanahoria}
            alt="Zanahoria cocechada"
            className="w-60 mt-4 z-10"
          />
          <img
            src={hoja}
            alt="hoja"
            className="absolute left-28 bottom-0 w-32 transform scale-x-[-1] -rotate-90"
          />
        </div>
      </div>
      <div className="relative w-full">
        <img
          src={rama}
          alt="Rama decorativa 1"
          className="absolute -left-16 -top-14 w-40 transform scale-x-[-1]"
        />
        <img
          src={rama}
          alt="Rama decorativa 2"
          className="absolute -right-[105px] bottom-44 w-40"
        />
        <img src={repollo} alt="Repollo" className="absolute left-0 w-full" />
      </div>
    </main>
  );
};

export default Main;
