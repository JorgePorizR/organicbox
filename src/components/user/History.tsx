import React, { useEffect, useState } from "react";
import { Historial } from "../../models/Historial";
import { UserService } from "../../services/UsuarioService";
import NavBar from "../NavBar";
import Footer from "../main/Footer";

const History: React.FC = () => {
  const [historial, setHistorial] = useState<Historial[]>([]);
  const [loading, setLoading] = useState(true);
  const userId = sessionStorage.getItem("userId");

  useEffect(() => {
    const fetchHistorial = async () => {
      if (userId) {
        try {
          const userService = new UserService();
          const data = await userService.getHistorialByUser(userId);
          setHistorial(data);
        } catch (error) {
          console.error("Error fetching historial:", error);
        } finally {
          setLoading(false);
        }
      } else {
        console.error("User ID not found in sessionStorage");
        setLoading(false);
      }
    };

    fetchHistorial();
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
          Historial de Compras
        </h1>
        {historial.length === 0 ? (
          <p>No hay historial de compras disponible.</p>
        ) : (
          <ul className="space-y-4">
            {historial.map((item) => (
              <li
                key={item.id}
                className="bg-verdeclaro p-4 rounded-lg shadow-md"
              >
                <h2 className="font-semibold">Compra ID: {item.id}</h2>
                <p>
                  <strong>Costo Total:</strong> {item.costo_total}
                </p>
                <p>
                  <strong>Fecha de Compra:</strong>{" "}
                  {new Date(item.fecha_compra).toLocaleDateString()}
                </p>
                <p>
                  <strong>Confirmada:</strong> {item.confirmada ? "Sí" : "No"}
                </p>
                <h3 className="font-semibold">Productos:</h3>
                <ul>
                  {item.productos_data.map((producto) => (
                    <li key={producto.id}>
                      {producto.nombre} - {producto.descripcion} (Costo:{" "}
                      {producto.costo_puntos} puntos)
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default History;
