import React, { useEffect, useState } from "react";
import { UserService } from "../../services/UsuarioService";
import { Card } from "../../models/Card";
import Footer from "../main/Footer";
import NavBar from "../NavBar";
import PaymentGateway from "../PaymentGateway";
import CardAddIcon from "../icons/CardAddIcon";
import CloseIcon from "../icons/CloseIcon";

const CardsPage: React.FC = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const userId = sessionStorage.getItem("userId");

  useEffect(() => {
    const fetchCards = async () => {
      if (userId) {
        console.log("User ID found in sessionStorage:", userId);
        try {
          const userService = new UserService();
          const data = await userService.getCardsByUser(userId);
          setCards(data);
        } catch (error) {
          console.error("Error fetching cards:", error);
        } finally {
          setLoading(false);
        }
      } else {
        console.error("User ID not found in sessionStorage");
        setLoading(false);
      }
    };

    fetchCards();
  }, [userId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="absolute right-14 top-4 shadow-md bg-black bg-opacity-15">
        <NavBar />
      </div>
      <div className="max-w-4xl mx-auto px-5 sm:px-10 md:px-16 py-32">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-verdeob mb-4 text-center">
          Mis Tarjetas de Crédito
        </h1>
        <button
          onClick={() => setShowPopup(true)}
          className="mb-4 bg-verdeob text-white p-2 rounded-lg hover:bg-verdeclaro transition duration-300"
          title="Agregar Tarjeta"
        >
          <CardAddIcon />
        </button>
        {cards.length === 0 ? (
          <p>No hay tarjetas de crédito disponibles.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {cards.map((card) => (
              <div
                key={card.id}
                className="bg-verdeclaro p-4 rounded-lg shadow-md"
              >
                <h2 className="font-semibold">
                  Nombre del Titular: {card.nombre_titular}
                </h2>
                <p>
                  <strong>Número de Tarjeta:</strong>{" "}
                  {card.numero_tarjeta.replace(/\d(?=\d{4})/g, "*")}
                </p>
                <p>
                  <strong>Fecha de Expiración:</strong> {card.fecha_expiracion}
                </p>
                <p>
                  <strong>CVV:</strong> {card.cvv.replace(/./g, "*")}
                </p>
                <p>
                  <strong>Tipo:</strong> {card.es_visa ? "Visa" : "Otro"}
                </p>
                <p>
                  <strong>Creado en:</strong>{" "}
                  {new Date(card.creado_en).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />

      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-5 rounded-lg shadow-lg">
            <h2 className="text-lg font-bold mb-4 ml-4">Agregar Tarjeta</h2>
            <PaymentGateway />
            <button
              onClick={() => setShowPopup(false)}
              className="mt-4 bg-verdeob text-white p-2 rounded-lg hover:bg-red-400 transition duration-300 ml-3"
            >
              <CloseIcon />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CardsPage;
