import { useState } from "react";
import Cards, { Focused } from "react-credit-cards-2";

import NavBar from "./NavBar";
import Footer from "./main/Footer";
// react credit cards styles
//import 'react-credit-cards-2/dist/es/styles-compiled.css';

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

  return (
    <div className="relative bg-fondo">
      <div className="absolute right-20 top-4 shadow-md bg-black bg-opacity-15">
        <NavBar />
      </div>
      <div className="h-screen grid place-content-center bg-indigo-300 p-4">
        <Cards
          number={state.number}
          name={state.name}
          expiry={state.expiry}
          cvc={state.cvc}
          focused={state.focus as Focused | undefined}
        />
        <form className="mt-5 grid grid-cols-1 gap-4">
          <input
            type="number"
            name="number"
            className="col-span-2 rounded border-2 border-gray-300 p-2 shadow focus:outline-none focus:ring-2 focus:ring-verdeob"
            placeholder="Número de Tarjeta"
            value={state.number}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            maxLength={16} // Limitar a 16 dígitos
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
            pattern="\d{2}/\d{2}" // Format MM/YY
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
            min="100" // Minimum 3 digits for CVC
            max="999" // Maximum 3 digits for CVC
            required
          />
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default PaymentGateway;
