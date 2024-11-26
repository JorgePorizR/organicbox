import { ToastContainer } from "react-toastify";
import Footer from "../../components/main/Footer";
import NavBar from "../../components/NavBar";
import { useCart } from "../../context/CartContext";
import { Helmet } from "react-helmet";
import { useEffect, useState } from "react";
import { Producto } from "../../models/Producto";
import { ProductoService } from "../../services/ProductoService";
import repollo from "../../assets/repollo.webp";

function Tienda() {
  const { addToCart } = useCart();
  const [productos, setProductos] = useState<Producto[]>([]);

  useEffect(() => {
    new ProductoService()
      .getProductoList()
      .then((response) => {
        setProductos(response);
      })
      .catch((error) => {
        console.error("Error al obtener la lista de productos:", error);
      });
  }, []);

  return (
    <div className="bg-fondo pt-10">
      <Helmet>
        {/* Título y descripción para SEO */}
        <title>Tienda Online - OrganicBox</title>
        <meta
          name="description"
          content="Descubre productos destacados y más vendidos en OrganicBox. Explora nuestra tienda con artículos orgánicos y sostenibles que se adaptan a tus necesidades."
        />
        <meta name="robots" content="index, follow" />

        {/* Open Graph para redes sociales */}
        <meta property="og:title" content="Tienda Online - OrganicBox" />
        <meta
          property="og:description"
          content="Encuentra productos orgánicos más vendidos y destacados en nuestra tienda en OrganicBox."
        />
        <meta property="og:image" content="/ruta/a/una/imagen-destacada.png" />
        <meta property="og:url" content="http://localhost:3000/tienda" />
        <meta property="og:type" content="website" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Tienda Online - OrganicBox" />
        <meta
          name="twitter:description"
          content="Explora nuestra tienda de productos destacados y orgánicos. OrganicBox, apoyando sostenibilidad."
        />
        <meta name="twitter:image" content="/ruta/a/una/imagen-destacada.png" />
      </Helmet>
      <div className="relative bg-verdeob p-5 sm:p-10 mx-4 md:mx-10 lg:mx-36 rounded-3xl mb-10">
        <div className="absolute right-14 top-4 shadow-md bg-black bg-opacity-15">
          <NavBar />
        </div>
        <h1 className="text-center text-4xl sm:text-5xl font-bold text-negropaco mt-12 mb-10 sm:mb-24">
          Tienda
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {productos.map((producto) => (
            <div
              key={producto.nombre}
              className="bg-verdeclaro py-4 sm:py-6 px-4 sm:px-8 rounded-3xl shadow-md"
            >
              <img
                src={repollo}
                alt={producto.nombre}
                className="w-full h-36 lg:h-40 xl:h-60 object-cover mb-2 bg-negropaco"
              />
              <h2 className="text-base sm:text-lg font-semibold">
                {producto.nombre}
              </h2>
              <p className="text-gray-700 text-sm sm:text-base">
                Empresa: {producto.empresa}
              </p>
              <p className="text-gray-700 text-sm sm:text-base">
                ${producto.costo_puntos ?? 0}
              </p>
              <button
                onClick={() => addToCart({ ...producto, id: producto.id ?? 0, name: producto.nombre, price: producto.costo_puntos ?? 0, quantity: 1 })}
                className="mt-2 bg-verdeob text-white p-2 rounded-full transition duration-300 ease-in-out hover:bg-white hover:text-black"
              >
                Agregar al Carrito
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
      <ToastContainer className="max-w-80 mx-auto" />
    </div>
  );
}

export default Tienda;
