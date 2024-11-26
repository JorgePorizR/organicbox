import React, { useState } from "react";
import { Helmet } from "react-helmet";
import Footer from "../../components/main/Footer";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.webp";
import vector from "../../assets/vector.webp";

import { Usuario } from "../../models/Usuario";
import { UserService } from "../../services/UsuarioService";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    first_name: "",
    last_name: "",
  });

  // Estado para manejar errores o mensajes de éxito
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const crearUsuario = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const usuario: Usuario = {
      username: formData.username,
      email: formData.email,
      password: formData.password,
      first_name: formData.first_name,
      last_name: formData.last_name,
      is_Admin: false,
      has_Empresa: false,
    };

    try {
      const userService = new UserService();
      const response = await userService.userCreate(usuario);
      if (response) {
        setMessage("Usuario creado con éxito.");
        setTimeout(() => navigate("/user/login"), 2000); // Redirige al login después de 2s
      } else {
        setMessage("Error al crear el usuario. Intenta de nuevo.");
      } // Redirige al login después de 2s
    } catch (error) {
      setMessage("Error al crear el usuario. Intenta de nuevo.");
      console.error(error);
    }
  };

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
          <h2 className="text-2xl text-center font-semibold mb-4">
            CREA TU CUENTA
          </h2>
          <form className="flex flex-col items-center" onSubmit={crearUsuario}>
            <label className="block mb-5 w-full">
              USUARIO:
              <input
                type="text"
                name="username"
                required
                value={formData.username}
                onChange={handleChange}
                className="border rounded w-full p-2 mt-2 focus:outline-none focus:ring-2 focus:ring-verdeob text-negropaco"
              />
            </label>
            <label className="block mb-5 w-full">
              NOMBRE:
              <input
                type="text"
                name="first_name"
                required
                value={formData.first_name}
                onChange={handleChange}
                className="border rounded w-full p-2 mt-2 focus:outline-none focus:ring-2 focus:ring-verdeob text-negropaco"
              />
            </label>
            <label className="block mb-5 w-full">
              APELLIDO:
              <input
                type="text"
                name="last_name"
                required
                value={formData.last_name}
                onChange={handleChange}
                className="border rounded w-full p-2 mt-2 focus:outline-none focus:ring-2 focus:ring-verdeob text-negropaco"
              />
            </label>
            <label className="block mb-5 w-full">
              CORREO:
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="border rounded w-full p-2 mt-2 focus:outline-none focus:ring-2 focus:ring-verdeob text-negropaco"
              />
            </label>
            <label className="block mb-5 w-full">
              CONTRASEÑA:
              <input
                type="password"
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
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
          {message && (
            <p className="mt-4 text-center font-semibold">{message}</p>
          )}
          <p className="mt-4 text-center">
            ¿Ya tienes una cuenta?
            <span
              onClick={() => navigate("/user/login")}
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
