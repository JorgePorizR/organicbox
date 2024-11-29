import React, { useState } from "react";
import Footer from "../../components/main/Footer";
import NavBar from "../../components/NavBar";
import { Helmet } from "react-helmet";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Aquí podrías agregar la lógica para enviar el mensaje
    setSuccessMessage("Mensaje enviado con éxito. ¡Gracias por contactarnos!");
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <div className="bg-fondo min-h-screen">
      <Helmet>
        <title>Contacto - OrganicBox</title>
        <meta name="description" content="Contáctanos para más información sobre nuestros productos orgánicos." />
      </Helmet>
      <div className="absolute right-20 top-4 shadow-md bg-black bg-opacity-15">
        <NavBar />
      </div>
      <div className="max-w-4xl mx-auto p-5">
        <h1 className="text-3xl font-bold text-verdeob mb-4">Contáctanos</h1>
        <p className="text-lg text-gray-700 mb-4">
          Si tienes preguntas o comentarios, no dudes en contactarnos. Estamos aquí para ayudarte.
        </p>
        <div className="bg-verdeclaro p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-2">Información de Contacto</h2>
          <p className="text-sm">Dirección: Calle Falsa 123, Ciudad Ejemplo</p>
          <p className="text-sm">Teléfono: 123-456-7890</p>
          <p className="text-sm">Email: contacto@organicbox.com</p>
        </div>
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Envíanos un Mensaje</h2>
          <label className="block mb-4">
            Nombre:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="border rounded w-full p-2 mt-2 focus:outline-none focus:ring-2 focus:ring-verdeob"
            />
          </label>
          <label className="block mb-4">
            Correo Electrónico:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="border rounded w-full p-2 mt-2 focus:outline-none focus:ring-2 focus:ring-verdeob"
            />
          </label>
          <label className="block mb-4">
            Mensaje:
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              className="border rounded w-full p-2 mt-2 focus:outline-none focus:ring-2 focus:ring-verdeob"
              rows={4}
            />
          </label>
          <button
            type="submit"
            className="bg-verdeob text-white py-2 px-4 rounded transition duration-300 ease-in-out hover:bg-verdeclaro hover:text-black"
          >
            Enviar Mensaje
          </button>
          {successMessage && <p className="mt-4 text-green-600">{successMessage}</p>}
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;