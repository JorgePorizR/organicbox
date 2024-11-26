import { createBrowserRouter } from "react-router-dom";
import App from "../pages/App";
import Cart from "../pages/carrito/Cart";
import Tienda from "../pages/shop/Tienda";
import NegociosLocals from "../pages/shop/NegociosLocals";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import PaymentPage from "../pages/PaymentPage";
import CompanyDetail from "../pages/company/CompanyDetail";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/cart",
    element: <Cart />
  },
  {
    path: "/tienda",
    element: <Tienda />
  },
  {
    path: "/negocios/locales",
    element: <NegociosLocals />
  },
  {
    path: "/user/login",
    element: <Login />
  },
  {
    path: "/user/register",
    element: <Register />
  },
  {
    path: "/payment",
    element: <PaymentPage />
  },
  {
    path: "/company/detail",
    element: <CompanyDetail />
  },
  {
    path: "*",
    element: <h1 className="text-white text-center text-4xl pt-6 font-bold">404 Not Found</h1>,
  }
]);
