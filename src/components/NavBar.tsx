import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MenuIcon from "./icons/MenuIcon";
import CloseIcon from "./icons/CloseIcon";
import UserIcon from "./icons/UserIcon";
import CartIcon from "./icons/CartIcon";
import CardIcon from "./icons/CardIcon";
import LogoutIcon from "./icons/LogoutIcon";
import HistoryIcon from "./icons/HistoryIcon";

function NavBar() {
  const navigation = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const userId = sessionStorage.getItem("userId");
  const username = sessionStorage.getItem("username");

  const [isLogged, setIsLogged] = useState(false);

  const handleClickUser = () => setIsLogged(!isLogged);


  return (
    <nav className="relative">
      {/* Desktop Menu */}
      <div className="hidden md:flex p-2 xl:p-4 text-white font-semibold text-sm lg:text-base xl:text-xl space-x-6 lg:space-x-12 xl:space-x-24">
        <a
          onClick={() => navigation("/")}
          className="hover:text-verdeob cursor-pointer"
        >
          Inicio
        </a>
        <a
          onClick={() => navigation("/negocios/locales")}
          className="hover:text-verdeob cursor-pointer"
        >
          Negocios Locales
        </a>
        <a
          onClick={() => navigation("/tienda")}
          className="hover:text-verdeob cursor-pointer"
        >
          Tienda
        </a>
        <a
          onClick={() => navigation("/cart")}
          className="hover:text-verdeob cursor-pointer flex gap-x-2"
        >
          <CartIcon /> Cart
        </a>
        {userId && username ? (
          <div className="relative">
            <button
              className="hover:text-verdeob cursor-pointer flex gap-1"
              onClick={handleClickUser}
            >
              <UserIcon className="size-6" /> {username}
            </button>
            {isLogged && (
              <div className="absolute left-4 bg-verdeob text-white rounded-lg shadow-lg mt-2">
                <a
                  onClick={() => navigation("/user/historial")}
                  className="block px-4 py-2 hover:bg-white hover:text-verdeob"
                  title="Historial"
                >
                  <HistoryIcon />
                </a>
                <a
                  onClick={() => navigation("/user/tarjetas")}
                  className="block px-4 py-2 hover:bg-white hover:text-verdeob"
                  title="Metodos de Pago"
                >
                  <CardIcon />
                </a>
                <a
                  onClick={() => {
                    sessionStorage.removeItem("userId");
                    sessionStorage.removeItem("username");
                    window.location.reload();
                  }}
                  title="Cerrar Sesión"
                  className="block px-4 py-2 hover:bg-white hover:text-verdeob"
                >
                  <LogoutIcon />
                </a>
              </div>
            )}
          </div>
        ) : (
          <a
            onClick={() => navigation("/user/login")}
            className="hover:text-verdeob cursor-pointer"
          >
            <UserIcon className="size-6" />
          </a>
        )}
      </div>

      {/* Mobile Menu */}
      <div className="md:hidden flex items-center">
        <button
          className="text-white hover:text-verdeob focus:outline-none"
          onClick={toggleMenu}
        >
          {isOpen ? (
            <CloseIcon className="size-8" />
          ) : (
            <MenuIcon className="size-8" />
          )}
        </button>

        {isOpen && (
          <div className="absolute top-10 left-0 bg-verdeob bg-opacity-90 max-w-max px-4 text-center py-4 z-50 rounded-lg shadow-lg">
            <a
              onClick={() => {
                navigation("/");
                setIsOpen(false);
              }}
              className="block text-white hover:text-black py-2 cursor-pointer transition duration-300"
            >
              Inicio
            </a>
            <a
              onClick={() => {
                navigation("/negocios/locales");
                setIsOpen(false);
              }}
              className="block text-white hover:text-black py-2 cursor-pointer transition duration-300"
            >
              Negocios Locales
            </a>
            <a
              onClick={() => {
                navigation("/tienda");
                setIsOpen(false);
              }}
              className="block text-white hover:text-black py-2 cursor-pointer transition duration-300"
            >
              Tienda
            </a>
            <a
              onClick={() => {
                navigation("/cart");
                setIsOpen(false);
              }}
              className="block text-white hover:text-black py-2 cursor-pointer transition duration-300"
            >
              Cart
            </a>
            {userId && username ? (
              <div className="relative">
                <button
                  className="block text-white hover:text-black py-2 cursor-pointer transition duration-300"
                  onClick={handleClickUser}
                >
                  {username}
                </button>
                {isLogged && (
                  <div className="absolute bg-verdeob text-white rounded-lg shadow-lg mt-2">
                    <a
                      onClick={() => {
                        navigation("/user/historial");
                        setIsOpen(false);
                      }}
                      className="block px-4 py-2 hover:bg-white hover:text-verdeob"
                    >
                      Historial
                    </a>
                    <a
                      onClick={() => navigation("/user/tarjetas")}
                      className="block px-4 py-2 hover:bg-white hover:text-verdeob"
                    >
                      Tarjetas
                    </a>
                    <a
                      onClick={() => {
                        sessionStorage.removeItem("userId");
                        sessionStorage.removeItem("username");
                        navigation("/user/login");
                      }}
                      className="block px-4 py-2 hover:bg-white hover:text-verdeob"
                    >
                      Logout
                    </a>
                  </div>
                )}
              </div>
            ) : (
              <a
                onClick={() => {
                  navigation("/user/login");
                  setIsOpen(false);
                }}
                className="block text-white hover:text-black py-2 cursor-pointer transition duration-300"
              >
                Iniciar Sesión
              </a>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}

export default NavBar;
