import { useCart } from "../../context/CartContext";
import Footer from "../../components/main/Footer";
import NavBar from "../../components/NavBar";
import DeleteIcon from "../../components/icons/DeleteIcon";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();
  const { cart, updateQuantity, removeFromCart } = useCart();

  const subtotal = cart
    .reduce((acc, product) => acc + product.price * product.quantity, 0)
    .toFixed(2);

  return (
    <div className="relative bg-fondo">
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
          <div className="flex justify-between items-center mt-4 pt-4">
            <span className="font-semibold">Su Subtotal</span>
            <span className="font-semibold">Subtotal ${subtotal}</span>
          </div>
          <button className="bg-verdeob text-white py-2 px-4 rounded mt-4"
          onClick={() => navigate("/payment")}>
            Confirmar Orden
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Cart;