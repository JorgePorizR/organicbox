import { useCart } from "../../context/CartContext";
import Footer from "../../components/main/Footer";
import NavBar from "../../components/NavBar";
import DeleteIcon from "../../components/icons/DeleteIcon";
//import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import { CompraService } from "../../services/CompraService";
import { Compra } from "../../models/Compra";
import { SuscripcionService } from "../../services/SuscripcionService";
import { useEffect, useState } from "react";
import { Suscripcion } from "../../models/Suscripcion";

const Cart = () => {
  //const navigate = useNavigate();
  const { cart, updateQuantity, removeFromCart } = useCart();
  const navigation = useNavigate();
  const [suscripcion, setSuscripcion] = useState<Suscripcion>();

  const userId = sessionStorage.getItem("userId");
  const username = sessionStorage.getItem("username");
  const suscripcionId = sessionStorage.getItem("suscripcion");
  const empresaId = sessionStorage.getItem("empresa");

  const subtotal = cart
    .reduce((acc, product) => acc + product.price * product.quantity, 0)
    .toFixed(2);

  // URL de la página de donaciones de StreamElements
  const donationPageUrl = "https://streamelements.com/jorgeporizrojas949/tip"; // Reemplaza con tu URL de donación

  useEffect(() => {
    fetchSuscripcion();
  }, []);

  const fetchSuscripcion = () => {
    // Lógica para obtener la suscripción del usuario
    new SuscripcionService().getSuscripcionById(suscripcionId?.toString())
      .then((suscripcion) => {
        console.log("Suscripción del usuario", suscripcion);
        setSuscripcion(suscripcion);
      })
      .catch((error) => {
        console.error("Error al obtener la suscripción", error);
      });
  }

  const handleConfirmOrder = () => {
    console.log("Usuario ID", userId);
    console.log("Username", username);
    console.log("ID de suscripción", suscripcionId);
    console.log("ID de empresa", empresaId);
    console.log("Productos en el carrito", cart);

    if (parseFloat(subtotal) > parseFloat(suscripcion?.monto_total_puntos || "0")) {
      window.alert("Excedes los puntos de tu suscripción para realizar la compra.");
      return;
    }

    if (username && userId) {

      const expandedCart = cart.flatMap((product) =>
        Array(product.quantity).fill(product.id)
      );

      const compra: Compra = {
        usuario: parseInt(userId),
        suscripcion: parseInt(suscripcionId ? suscripcionId : "0"),
        productos: expandedCart
      };

      new CompraService().createCompra(compra)
        .then(() => {
          window.alert("¡Gracias por tu compra! 🛒");
          window.open(donationPageUrl, "_blank");
          navigation("/");
        })
        .catch((error) => {
          console.error("Error al realizar la compra", error);
        });
    } else {
      window.alert("Por favor, inicia sesión para confirmar tu orden.");
      navigation("/user/login");
    }
  }

  return (
    <div className="relative bg-fondo">
      <Helmet>
        <title>Carrito de Compras - OrganicBox</title>
        <meta
          name="description"
          content="Revisa tu carrito de compras en OrganicBox. Gestiona tus productos y finaliza tu compra fácilmente."
        />
        <meta name="robots" content="index, follow" />
      </Helmet>
      <div className="absolute right-20 top-4 shadow-md bg-black bg-opacity-15">
        <NavBar />
      </div>
      <div className="flex flex-col items-center py-10 sm:py-24">
        <div className="flex flex-col p-4 mt-10 bg-verdeclaro rounded-lg shadow-md mx-auto max-w-md w-full">
          <h2 className="text-2xl font-bold mb-4 text-center">CARRITO</h2>
          {cart.map((product) => (
            <div
              key={product.id}
              className="flex justify-between items-center py-2 border-b"
            >
              <span className="text-sm sm:text-base">{product.name}</span>
              <div className="flex items-center">
                <button
                  onClick={() =>
                    updateQuantity(
                      product.id,
                      Math.max(1, product.quantity - 1)
                    )
                  }
                  className="bg-gray-300 text-black px-2 rounded"
                >
                  -
                </button>
                <span className="mx-2">{product.quantity}</span>
                <button
                  onClick={() =>
                    updateQuantity(product.id, product.quantity + 1)
                  }
                  className="bg-gray-300 text-black px-2 rounded"
                >
                  +
                </button>
                <button
                  onClick={() => removeFromCart(product.id)}
                  className="bg-red-500 text-white px-2 rounded ml-4"
                >
                  <DeleteIcon className="text-black" />
                </button>
              </div>
              <span className="text-sm sm:text-base">${(product.price * product.quantity).toFixed(2)}</span>
            </div>
          ))}
          {
            parseFloat(subtotal) > parseFloat(suscripcion?.monto_total_puntos || "0") && (
              <div className="text-rojo text-sm mt-2">
                No tienes suficientes puntos para realizar la compra.
              </div>
            )
          }
          <div className="flex justify-between items-center mt-2 pt-2">
            <span className="font-semibold">Subtotal</span>
            <span className="font-semibold">${subtotal}</span>
          </div>
          <div className="flex justify-between items-center mt-2 pt-2">
            <span className="font-semibold">Suscripcion</span>
            <span className="font-semibold">${suscripcion?.costo}</span>
          </div>
          <div className="flex justify-between items-center mt-2 pt-2">
            <span className="font-semibold">Total</span>
            <span className="font-semibold">${parseFloat(subtotal) + parseFloat(suscripcion?.costo || "0")}</span>
          </div>
          <button 
            className={`bg-verdeob text-white py-2 px-4 rounded mt-4 ${parseInt(subtotal) <= 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={handleConfirmOrder} // Abrir en una nueva pestaña
            disabled={parseFloat(subtotal) <= 0} // Deshabilitar el botón si el subtotal es 0 o menor o si supera el monto total de puntos
          >
            Confirmar Orden
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
