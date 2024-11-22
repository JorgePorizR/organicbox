import VisitIcon from "../../components/icons/VisitIcon";
import Footer from "../../components/main/Footer";
import NavBar from "../../components/NavBar";

const negocios = [
  { id: 1, name: "Negocio Local 1", image: "ruta/a/imagen1.png" },
  { id: 2, name: "Negocio Local 2", image: "ruta/a/imagen2.png" },
  { id: 3, name: "Negocio Local 3", image: "ruta/a/imagen3.png" },
  { id: 4, name: "Negocio Local 4", image: "ruta/a/imagen4.png" },
  { id: 5, name: "Negocio Local 5", image: "ruta/a/imagen5.png" },
  { id: 6, name: "Negocio Local 6", image: "ruta/a/imagen6.png" },
];

function NegociosLocals() {
  return (
    <div className="bg-fondo pt-10">
      <div className="relative bg-verdeob p-5 sm:p-10 mx-4 md:mx-10 lg:mx-36 rounded-3xl mb-10">
      <div className="absolute right-14 top-4 shadow-md bg-black bg-opacity-15">
        <NavBar />
      </div>
        <h1 className="text-center text-4xl sm:text-5xl font-bold text-negropaco mt-10 mb-10 sm:mb-24">
          Explora Negocios Locales
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {negocios.map((negocio) => (
            <div
              key={negocio.id}
              className="bg-verdeclaro py-4 sm:py-6 px-4 sm:px-8 rounded-3xl shadow-md"
            >
              <img
                src={negocio.image}
                alt={negocio.name}
                className="w-full h-36 lg:h-40 xl:h-60 object-cover mb-2 bg-negropaco"
              />
              <h2 className="text-base sm:text-lg font-semibold">{negocio.name}</h2>
              <button className="mt-2 bg-verdeob text-white p-2 rounded-full transition duration-300 ease-in-out hover:bg-white hover:text-black" title="visitar">
                <VisitIcon />
              </button>
            </div>
          ))}
        </div>
        <div className="text-center mt-6">
          <button className="mt-8 bg-verdeob text-white text-sm font-semibold py-3 px-8 sm:px-12 rounded-se-full rounded-es-full max-h-max border border-black transition duration-300 ease-in-out hover:bg-verdeclaro hover:text-black">
            VER MÁS
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default NegociosLocals;
