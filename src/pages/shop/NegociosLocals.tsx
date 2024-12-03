import { useNavigate } from "react-router-dom";
import VisitIcon from "../../components/icons/VisitIcon";
import Footer from "../../components/main/Footer";
import NavBar from "../../components/NavBar";
import { Helmet } from "react-helmet";
import { Tienda } from "../../models/Tienda";
import { useEffect, useState } from "react";
import { TiendaService } from "../../services/TiendaService";
import repollo from "../../assets/repollo.webp";

function NegociosLocals() {
  const navigate = useNavigate();
  const [tiendas, setTiendas] = useState<Tienda[]>([]);

  useEffect(() => {
    new TiendaService()
      .getTiendaList()
      .then((response) => {
        setTiendas(response);
      })
      .catch((error) => {
        console.error("Error al obtener la lista de tiendas:", error);
      });
  }, []);

  return (
    <div className="bg-fondo pt-10">
      <Helmet>
        {/* Título y descripción específicos */}
        <title>Negocios Locales - OrganicBox</title>
        <meta
          name="description"
          content="Explora los negocios locales inscritos en OrganicBox. Encuentra productos orgánicos y sostenibles de comerciantes locales cerca de ti."
        />
        <meta name="robots" content="index, follow" />

        {/* Open Graph para redes sociales */}
        <meta property="og:title" content="Negocios Locales - OrganicBox" />
        <meta
          property="og:description"
          content="Descubre negocios locales con productos orgánicos y sostenibles en OrganicBox."
        />
        <meta property="og:image" content="/ruta/a/una/imagen-destacada.png" />
        <meta property="og:url" content="http://localhost:3000/negocios" />
        <meta property="og:type" content="website" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Negocios Locales - OrganicBox" />
        <meta
          name="twitter:description"
          content="Apoya negocios locales con productos orgánicos en OrganicBox."
        />
        <meta name="twitter:image" content="/ruta/a/una/imagen-destacada.png" />
      </Helmet>

      <div className="relative bg-verdeob p-5 sm:p-10 mx-4 md:mx-10 lg:mx-36 rounded-3xl mb-10">
        <div className="absolute right-14 top-4 shadow-md bg-black bg-opacity-15">
          <NavBar />
        </div>
        <h1 className="text-center text-4xl sm:text-5xl font-bold text-negropaco mt-10 mb-10 sm:mb-24">
          Explora Negocios Locales
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {tiendas.length > 0 ? (
            tiendas.map((tienda) => (
              <div
                key={tienda.nombre}
                className="bg-verdeclaro py-4 sm:py-6 px-4 sm:px-8 rounded-3xl shadow-md"
              >
                <img
                  src={repollo}
                  alt={tienda.nombre}
                  className="w-full h-36 lg:h-40 xl:h-60 object-cover mb-2 bg-negropaco"
                />
                <h2 className="text-base sm:text-lg font-semibold">{tienda.nombre}</h2>
                <p className="text-sm sm:text-base">{tienda.descripcion}</p>
                <button
                  className="mt-2 bg-verdeob text-white p-2 rounded-full transition duration-300 ease-in-out hover:bg-white hover:text-black"
                  title="visitar"
                  onClick={() => navigate(`/company/detail/${tienda.id}`)}
                >
                  <VisitIcon />
                </button>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-600">Cargando negocios locales...</p>
          )}
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
