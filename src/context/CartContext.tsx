import { createContext, useContext, useState, ReactNode } from "react";
import { toast } from "react-toastify";

interface Product {
  id: number;
  name: string;
  price: number;
  image?: string;
  quantity: number;
}

interface CartContextProps {
  cart: Product[];
  addToCart: (product: Product) => void;
  updateQuantity: (id: number, quantity: number) => void;
  removeFromCart: (id: number) => void;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<Product[]>([]);

  const notify = (type: string) => {
    if (type === "exist") {
      toast.info("Producto ya agregado a carrito", {
        className: "toast-mobile",
        autoClose: 1000,
      });
      return;
    }
    toast.success("Producto agregado al carrito", {
      className: "toast-mobile",
      autoClose: 1500,
    });
    return;
  }

  const addToCart = (product: Omit<Product, "quantity">) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);
      if (existingProduct) {
        notify("exist");
        //alert("Producto ya agregado a la lista de carrito");
        return prevCart;
      } else {
        notify("add");
        //alert("Producto agregado al carrito");
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const updateQuantity = (id: number, quantity: number) => {
    setCart((prevCart) => {
      return prevCart.map((item) =>
        item.id === id ? { ...item, quantity } : item
      );
    });
  };

  const removeFromCart = (id: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, updateQuantity, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
