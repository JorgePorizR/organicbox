import { useState } from "react";
import Cards, { Focused } from "react-credit-cards-2";
import { AddCard } from "../models/AddCard";
import { UserService } from "../services/UsuarioService";

const PaymentGateway = () => {
  const [state, setState] = useState({
    number: "",
    name: "",
    expiry: "",
    cvc: "",
    focus: "",
  });

  const handleInputChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evt.target;

    // Validación para el número de tarjeta
    if (name === "number" && (value.length > 16)) {
      return; // Limitar a 16 dígitos y no permitir negativos o 'e'
    }

    // Validación para CVC
    if (name === "cvc" && (value.length > 3)) {
      return; // Limitar a 3 dígitos y no permitir negativos o 'e'
    }

    setState((prev) => ({ ...prev, [name]: value }));
  };

  const handleInputFocus = (evt: React.FocusEvent<HTMLInputElement>) => {
    setState((prev) => ({ ...prev, focus: evt.target.name }));
  };

  const handleSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    const userId = sessionStorage.getItem("userId");
    const cardData: AddCard = {
      nombre_titular: state.name,
      numero_tarjeta: state.number,
      fecha_expiracion: state.expiry,
      cvv: state.cvc,
      es_visa: state.number.startsWith("4"),
    };

    console.log("Usuario ID:", userId);
    console.log("Datos de la tarjeta:", cardData);

    if (userId) {
      const userService = new UserService();
      try {
        await userService.addCardByUser(userId, cardData);
        alert("Tarjeta agregada exitosamente.");
        setState({
          number: "",
          name: "",
          expiry: "",
          cvc: "",
          focus: "",
        });
        window.location.reload();
      } catch (error) {
        console.error("Error al agregar la tarjeta:", error);
        alert("Error al agregar la tarjeta. Inténtalo de nuevo.");
      }
    } else {
      alert("No se encontró el ID de usuario.");
    }
  };

  return (
    <div className="">
      <div className="grid place-content-center bg-indigo-300 p-4">
        <Cards
          number={state.number}
          name={state.name}
          expiry={state.expiry}
          cvc={state.cvc}
          focused={state.focus as Focused | undefined}
        />
        <form className="mt-5 grid grid-cols-1 gap-4" onSubmit={handleSubmit}>
          <input
            type="number"
            name="number"
            className="col-span-2 rounded border-2 border-gray-300 p-2 shadow focus:outline-none focus:ring-2 focus:ring-verdeob"
            placeholder="Número de Tarjeta"
            value={state.number}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            maxLength={16}
            required
          />
          <input
            type="text"
            name="name"
            className="col-span-2 rounded border-2 border-gray-300 p-2 shadow focus:outline-none focus:ring-2 focus:ring-verdeob"
            placeholder="Nombre Completo"
            value={state.name}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            autoComplete="off"
            required
          />
          <input
            type="text"
            name="expiry"
            className="col-span-1 rounded border-2 border-gray-300 p-2 shadow focus:outline-none focus:ring-2 focus:ring-verdeob"
            placeholder="MM/AA"
            value={state.expiry}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            autoComplete="off"
            pattern="\d{2}/\d{2}"
            required
          />
          <input
            type="number"
            name="cvc"
            className="col-span-1 rounded border-2 border-gray-300 p-2 shadow focus:outline-none focus:ring-2 focus:ring-verdeob"
            placeholder="CVC"
            value={state.cvc}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            autoComplete="off"
            min="100"
            max="999"
            required
          />
          <button
            type="submit"
            className="bg-verdeob text-white p-2 rounded-lg hover:bg-verdeclaro transition duration-300"
          >
            Agregar
          </button>
        </form>
      </div>
    </div>
  );
};

export default PaymentGateway;
