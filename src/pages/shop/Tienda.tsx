import { ToastContainer } from "react-toastify";
import Footer from "../../components/main/Footer";
import NavBar from "../../components/NavBar";
import { useCart } from "../../context/CartContext";

const products = [
  { id: 1, name: "Producto 1", price: 20.0, image: "ruta/a/imagen1.png" },
  { id: 2, name: "Producto 2", price: 15.0, image: "ruta/a/imagen2.png" },
  { id: 3, name: "Producto 3", price: 30.0, image: "ruta/a/imagen3.png" },
  { id: 4, name: "Producto 4", price: 25.0, image: "ruta/a/imagen4.png" },
  { id: 5, name: "Producto 5", price: 10.0, image: "ruta/a/imagen5.png" },
  { id: 6, name: "Producto 6", price: 18.0, image: "ruta/a/imagen6.png" },
];

function Tienda() {
  const { addToCart } = useCart();

  return (
    <div className="bg-fondo pt-10">
      <div className="relative bg-verdeob p-5 sm:p-10 mx-4 md:mx-10 lg:mx-36 rounded-3xl mb-10">
        <div className="absolute right-14 top-4 shadow-md bg-black bg-opacity-15">
          <NavBar />
        </div>
        <h1 className="text-center text-4xl sm:text-5xl font-bold text-negropaco mt-12 mb-10 sm:mb-24">
          Tienda
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-verdeclaro py-4 sm:py-6 px-4 sm:px-8 rounded-3xl shadow-md"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-36 lg:h-40 xl:h-60 object-cover mb-2 bg-negropaco"
              />
              <h2 className="text-base sm:text-lg font-semibold">
                {product.name}
              </h2>
              <p className="text-gray-700 text-sm sm:text-base">
                ${product.price.toFixed(2)}
              </p>
              <button
                onClick={() => addToCart({ ...product, quantity: 1 })}
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
