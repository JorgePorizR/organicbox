import logo from "../../assets/logo.webp";
import vector from "../../assets/vector.webp";
import FacebookIcon from "../icons/FacebookIcon";
import InstagramIcon from "../icons/Instagram";
import WhatsAppIcon from "../icons/WhatsAppIcon";
import rama from "../../assets/rama.webp";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigation = useNavigate();

  return (
    <footer id="footer" className="relative lg:mt-24 sm:pt-3 lg:pt-10 pb-5 lg:pb-16 mx-4 md:mx-5 xl:mx-28 border-t-2">
      <div className="flex flex-col md:flex-row justify-between items-center mt-10">
        <div className="flex flex-col w-full md:w-1/3 z-10 mb-6 md:mb-0">
          <a href="/" className="text-verdeob text-base lg:text-lg xl:text-xl">Sitemap</a>
          <div className="flex flex-col md:flex-row md:px-2 sm:space-x-3 lg:space-x-4 xl:space-x-8 mt-8 text-sm lg:text-base xl:text-lg">
            <a onClick={() => navigation("/")} className="cursor-pointer">
              Inicio
            </a>
            <a href="#" className="">
              Sobre Nosotros
            </a>
            <a href="#" className="">
              Tienda
            </a>
            <a href="#" className="">
              Recetas
            </a>
          </div>
        </div>
        <div className="w-full md:w-1/3 border-x-0 md:border-x-2 mb-6 md:mb-0">
          <div className="relative flex justify-center items-center">
            <img src={logo} alt="Logo" className="mr-2 size-10 lg:size-20" />
            <h1 className="text-xl lg:text-3xl font-bold mb-2 text-verdeob">OrganIcBox</h1>
            <img
              src={vector}
              alt="Vector"
              className="absolute size-5 lg:size-10 left-[141px] lg:left-[198px] xl:left-[238px] -top-[14px] hidden md:block"
            />
          </div>
          <div className="flex justify-center mt-7 lg:mt-14">
            <a href="#" className="mx-3">
              <FacebookIcon className="size-5 lg:size-6" />
            </a>
            <a href="#" className="mx-3">
              <WhatsAppIcon className="size-5 lg:size-6" />
            </a>
            <a href="#" className="mx-3">
              <InstagramIcon className="size-5 lg:size-6" />
            </a>
          </div>
        </div>
        <div className="flex flex-col w-full md:w-1/3 sm:pl-10 xl:pl-20">
          <span className="text-verdeob text-base lg:text-2xl xl:text-4xl text-center xl:text-left">
            Todo Natural Para Una Vida Más Saludable
          </span>
          <div className="flex items-center justify-between mt-6 gap-3 border-b-2 sm:text-base">
            <input
              type="email"
              placeholder="Ingresa tu email"
              className="px-0 py-1 bg-transparent focus:outline-none w-full"
            />
            <button className="text-black font-semibold">
              Suscribete
            </button>
          </div>
        </div>
      </div>
      <img
        src={rama}
        alt="Rama"
        className="absolute -left-16 -top-10 transform rotate-[-30deg] scale-y-[-1] z-0 hidden md:block size-32 lg:size-40 xl:size-52"
      />
    </footer>
  );
};

export default Footer;
