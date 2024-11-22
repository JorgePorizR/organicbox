import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MenuIcon from "./icons/MenuIcon";
import CloseIcon from "./icons/CloseIcon";
import UserIcon from "./icons/UserIcon";

function NavBar() {
  const navigation = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="relative">
      {/* Desktop Menu */}
      <div className="hidden md:flex p-2 xl:p-4 text-white font-semibold text-sm lg:text-base xl:text-xl space-x-6 lg:space-x-12 xl:space-x-24">
        <a onClick={() => navigation("/")} className="hover:text-verdeob cursor-pointer">
          Inicio
        </a>
        <a
          onClick={() => navigation("/negocios/locales")}
          className="hover:text-verdeob cursor-pointer"
        >
          Negocios Locales
        </a>
        <a onClick={() => navigation("/tienda")} className="hover:text-verdeob cursor-pointer">
          Tienda
        </a>
        <a onClick={() => navigation("/cart")} className="hover:text-verdeob cursor-pointer">
          Cart
        </a>
        <a onClick={() => navigation("/user/login")} className="hover:text-verdeob cursor-pointer">
          <UserIcon className="size-10 p-2 bg-negropaco rounded-full hover:bg-white"/>
        </a>
      </div>

      {/* Mobile Menu */}
      <div className="md:hidden flex items-center">
        <button
          className="text-white hover:text-verdeob focus:outline-none"
          onClick={toggleMenu}
        >
          {isOpen ? <CloseIcon className="size-8"/> : <MenuIcon className="size-8"/>}
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
            <a
              onClick={() => {
                navigation("/user/login");
                setIsOpen(false);
              }}
              className="block text-white hover:text-black py-2 cursor-pointer transition duration-300"
            >
              Usuario
            </a>
          </div>
        )}
      </div>
    </nav>
  );
}

export default NavBar;
