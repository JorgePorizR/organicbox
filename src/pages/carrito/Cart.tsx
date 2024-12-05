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
import { Card } from "../../models/Card";
import { UserService } from "../../services/UsuarioService";

const Cart = () => {
  //const navigate = useNavigate();
  const { cart, updateQuantity, removeFromCart, clearCart } = useCart();
  const navigation = useNavigate();
  const [suscripcion, setSuscripcion] = useState<Suscripcion>();
  const [cards, setCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>("");
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);

  const userId = sessionStorage.getItem("userId");
  const username = sessionStorage.getItem("username");
  const suscripcionId = sessionStorage.getItem("suscripcion");
  //const empresaId = sessionStorage.getItem("empresa");

  const subtotal = cart
    .reduce((acc, product) => acc + product.price * product.quantity, 0)
    .toFixed(2);

  // URL de la página de donaciones de StreamElements
  const donationPageUrl = "https://streamelements.com/jorgeporizrojas949/tip"; // Reemplaza con tu URL de donación

  useEffect(() => {
    if (userId) {
      console.log("User ID found in sessionStorage:", userId);
      const fetchCards = async () => {
        try {
          const userService = new UserService();
          const data = await userService.getCardsByUser(userId);
          setCards(data);
        } catch (error) {
          console.error("Error fetching cards:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchCards();
    } else {
      console.error("User ID not found in sessionStorage");
      setLoading(false);
    }
    const fetchSuscripcion = () => {
      // Lógica para obtener la suscripción del usuario
      new SuscripcionService()
        .getSuscripcionById(suscripcionId?.toString())
        .then((suscripcion) => {
          console.log("Suscripción del usuario", suscripcion);
          setSuscripcion(suscripcion);
        })
        .catch((error) => {
          console.error("Error al obtener la suscripción", error);
        }) .finally(() => {
          setLoading(false);
        }
      );
    };
    fetchSuscripcion();
  }, [userId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleConfirmOrder = () => {
    if (parseFloat(subtotal) > parseFloat(suscripcion?.monto_total_puntos || "0")) {
      window.alert("Excedes los puntos de tu suscripción para realizar la compra.");
      return;
    }

    if (!selectedPaymentMethod) {
      window.alert("Por favor, selecciona un método de pago.");
      return;
    }

    if (selectedPaymentMethod === "tarjeta" && !selectedCardId) {
      window.alert("Por favor, selecciona una tarjeta.");
      return;
    }

    if (username && userId) {
      const expandedCart = cart.flatMap((product) =>
        Array(product.quantity).fill(product.id)
      );

      let compra: Compra;
      if (selectedPaymentMethod === "tarjeta") {
          compra = {
          usuario: parseInt(userId),
          suscripcion: parseInt(suscripcionId || "0"),
          metodo_pago: parseInt(selectedCardId || "0"),
          productos: expandedCart,
        };
      } else {
        compra = {
          usuario: parseInt(userId),
          suscripcion: parseInt(suscripcionId || "0"),
          productos: expandedCart,
        };
      }

      new CompraService()
        .createCompra(compra)
        .then(() => {
          window.alert("¡Gracias por tu compra! 🛒");
          if (selectedPaymentMethod === "paypal") {
            window.open(donationPageUrl, "_blank");
            navigation("/");
          } else {
            window.location.href = "/";
          }
          sessionStorage.removeItem("suscripcion");
          clearCart();
        })
        .catch((error) => {
          console.error("Error al realizar la compra", error);
        });
    } else {
      window.alert("Por favor, inicia sesión para confirmar tu orden.");
      navigation("/user/login");
    }
  };

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
              <span className="text-sm sm:text-base">
                ${(product.price * product.quantity).toFixed(2)}
              </span>
            </div>
          ))}
          {parseFloat(subtotal) >
            parseFloat(suscripcion?.monto_total_puntos || "0") && suscripcionId && (
            <div className="text-rojo text-sm mt-2">
              No tienes suficientes puntos para realizar la compra.
            </div>
          )}
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
            <span className="font-semibold">
              ${parseFloat(subtotal) + parseFloat(suscripcion?.costo || "0")}
            </span>
          </div>
          {/* Opciones de método de pago */}
          <div className="flex flex-col mt-4">
            <label className="font-semibold mb-2">Método de Pago</label>
            <div className="flex items-center mb-2">
              <input
                type="radio"
                id="tarjeta"
                name="metodoPago"
                value="tarjeta"
                onChange={(e) => {
                  setSelectedPaymentMethod(e.target.value);
                  setSelectedCardId(null);
                }}
                checked={selectedPaymentMethod === "tarjeta"}
              />
              <label htmlFor="tarjeta" className="ml-2">Tarjeta</label>
            </div>
            {selectedPaymentMethod === "tarjeta" && (
              <select
                className="bg-gray-200 p-2 rounded"
                onChange={(e) => setSelectedCardId(e.target.value)}
              >
                <option value="">Selecciona una tarjeta</option>
                {cards.map((card) => (
                  <option key={card.id} value={card.id}>
                    {card.numero_tarjeta.replace(/\d(?=\d{4})/g, "*")}
                  </option>
                ))}
              </select>
            )}
            <div className="flex items-center mt-2">
              <input
                type="radio"
                id="paypal"
                name="metodoPago"
                value="paypal"
                onChange={(e) => {
                  setSelectedPaymentMethod(e.target.value);
                  setSelectedCardId(null);
                }}
                checked={selectedPaymentMethod === "paypal"}
              />
              <label htmlFor="paypal" className="ml-2">PayPal</label>
            </div>
          </div>
          <button
            className={`bg-verdeob text-white py-2 px-4 rounded mt-4 ${
              parseInt(subtotal) <= 0 ? "opacity-50 cursor-not-allowed" : ""
            }`}
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
