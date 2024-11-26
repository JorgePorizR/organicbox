import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/main/Footer";
import logo from "../../assets/logo.webp";
import vector from "../../assets/vector.webp";
import { useState } from "react";
import { UserService } from "../../services/UsuarioService";

function Login() {
  const [username, setUsername] = useState(""); // Estado para el username
  const [password, setPassword] = useState(""); // Estado para la contraseña
  const [error, setError] = useState<string | null>(null); // Para manejar errores
  const navigation = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Evita el comportamiento predeterminado del formulario
    setError(null);

    const userService = new UserService();
    try {
      const response = await userService.userLogin(username, password);
      console.log("Login exitoso:", response);
      navigation("/");
    } catch (err) {
      console.error("Error al iniciar sesión:", err);
      setError("Usuario o contraseña incorrectos.");
    }
  };

  return (
    <div className="bg-fondo min-h-screen flex flex-col justify-center items-center">
      <Helmet>
        <title>Iniciar Sesión - OrganicBox</title>
        <meta
          name="description"
          content="Accede a tu cuenta de OrganicBox para gestionar tus pedidos y más."
        />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="flex flex-col py-10 items-center w-full max-w-md mx-auto">
        <div className="relative flex justify-center items-center mb-8">
          <img src={logo} alt="Logo" className="mr-2 size-20" loading="lazy" />
          <h1 className="text-3xl font-bold mb-2 text-verdeob">OrganicBox</h1>
          <img
            src={vector}
            alt="Vector"
            className="absolute size-10 left-[162px] -top-[14px]"
            loading="lazy"
          />
        </div>
        <div className="bg-verdeob p-6 rounded-lg shadow-md w-full text-white">
          <h2 className="text-2xl text-center font-semibold mb-4">INICIAR SESIÓN</h2>
          <form onSubmit={handleSubmit} className="flex flex-col items-center">
            <label className="block mb-7 w-full">
              NOMBRE DE USUARIO:
              <input
                type="text"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="border rounded w-full p-2 mt-2 focus:outline-none focus:ring-2 focus:ring-verdeob text-negropaco"
              />
            </label>
            <label className="block mb-5 w-full">
              CONTRASEÑA:
              <input
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="border rounded w-full p-2 mt-2 focus:outline-none focus:ring-2 focus:ring-verdeob text-negropaco"
              />
            </label>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <button
              className="bg-verdeob text-white text-sm font-semibold py-2 px-5 rounded-se-full rounded-es-full max-h-max border border-black transition duration-300 ease-in-out hover:bg-verdeclaro hover:text-black"
              type="submit"
            >
              ENTRAR
            </button>
          </form>
          <p className="mt-4 text-center">
            ¿No tienes una cuenta?
            <span
              onClick={() => navigation("/user/register")}
              className="pl-1 font-semibold cursor-pointer"
            >
              Crea una aquí
            </span>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Login;
