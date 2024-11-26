import { useNavigate } from "react-router-dom";
import Footer from "../../components/main/Footer";
import logo from "../../assets/logo.webp";
import vector from "../../assets/vector.webp";
import { Helmet } from "react-helmet";

function Register() {
  const navigation = useNavigate();

  return (
    <div className="bg-fondo min-h-screen flex flex-col justify-center items-center">
      <Helmet>
        <title>Registro de Usuario - OrganicBox</title>
        <meta
          name="description"
          content="Crea tu cuenta en OrganicBox para acceder a productos orgánicos y sostenibles con opciones personalizadas."
        />
        <meta name="robots" content="index, follow" />
      </Helmet>
      <div className="flex flex-col py-10 items-center w-full max-w-md mx-auto">
        <div className="relative flex justify-center items-center mb-8">
          <img src={logo} alt="Logo" className="mr-2 size-20" />
          <h1 className="text-3xl font-bold mb-2 text-verdeob">OrganIcBox</h1>
          <img
            src={vector}
            alt="Vector"
            className="absolute size-10 left-[162px] -top-[14px]"
          />
        </div>
        <div className="bg-verdeob p-6 rounded-lg shadow-md w-full text-white">
          <h2 className="text-2xl text-center font-semibold mb-4">
            CREA TU CUENTA
          </h2>
          <form className="flex flex-col items-center">
            <label className="block mb-5 w-full">
              NOMBRE:
              <input
                type="text"
                name="name"
                required
                className="border rounded w-full p-2 mt-2 focus:outline-none focus:ring-2 focus:ring-verdeob text-negropaco"
              />
            </label>
            <label className="block mb-5 w-full">
              CORREO:
              <input
                type="email"
                name="email"
                required
                className="border rounded w-full p-2 mt-2 focus:outline-none focus:ring-2 focus:ring-verdeob text-negropaco"
              />
            </label>
            <label className="block mb-5 w-full">
              CONTRASEÑA:
              <input
                type="password"
                name="password"
                required
                className="border rounded w-full p-2 mt-2 focus:outline-none focus:ring-2 focus:ring-verdeob text-negropaco"
              />
            </label>
            <button
              className="bg-verdeob text-white text-sm font-semibold py-2 px-5 rounded-se-full rounded-es-full max-h-max border border-black transition duration-300 ease-in-out hover:bg-verdeclaro hover:text-black w-full"
              type="submit"
            >
              CREAR
            </button>
          </form>
          <p className="mt-4 text-center">
            ¿Ya tienes una cuenta?
            <span
              onClick={() => navigation("/user/login")}
              className="pl-1 font-semibold cursor-pointer"
            >
              Inicia sesión aquí
            </span>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Register;
