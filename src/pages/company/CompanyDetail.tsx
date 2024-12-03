import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Empresa } from "../../models/Empresa";
import NavBar from "../../components/NavBar";
import Footer from "../../components/main/Footer";
import { Helmet } from "react-helmet";
import { TiendaService } from "../../services/TiendaService";
import { SuscripcionService } from "../../services/SuscripcionService";
import { ProductoService } from "../../services/ProductoService";
import { Producto } from "../../models/Producto";
import { Suscripcion } from "../../models/Suscripcion";
import { useCart } from "../../context/CartContext";
import { ToastContainer } from "react-toastify";

const CompanyDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [empresa, setEmpresa] = useState<Empresa | null>(null);
  const [productos, setProductos] = useState<Producto[]>([]);
  const [suscripciones, setSuscripciones] = useState<Suscripcion[]>([]);
  const { addToCart, clearCart } = useCart();

  const suscripcionId = sessionStorage.getItem("suscripcion");
  const empresaId = sessionStorage.getItem("empresa");

  useEffect(() => {
    const fetchData = async () => {
      try {
        new TiendaService()
          .getTiendaById(id)
          .then((response) => {
            setEmpresa(response);
          })
          .catch((error) => {
            console.error("Error fetching data:", error);
          });

        new ProductoService()
          .getProductoListByEmpresa(id)
          .then((response) => {
            setProductos(response);
          })
          .catch((error) => {
            console.error("Error fetching data:", error);
          });

        new SuscripcionService()
          .getSuscripcionListByEmpresa(id)
          .then((response) => {
            setSuscripciones(response);
          })
          .catch((error) => {
            console.error("Error fetching data:", error);
          });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);

  const handleSuscripcion = (suscripcion: Suscripcion) => {
    console.log("Suscripcion seleccionada:", suscripcionId);
    console.log("Suscripción seleccionada:", suscripcion);
    if (empresaId !== id) {
      if (suscripcionId === null) {
        sessionStorage.setItem("suscripcion", suscripcion.id.toString());
        sessionStorage.setItem("empresa", suscripcion.empresa.toString());
        window.alert("Suscripción agregada al carrito");
        window.location.reload();
        return;
      }

      window.alert("Debes seleccionar una suscripcion de la misma empresa");

      const change = window.confirm("¿Deseas cambiar de empresa?");

      if (change) {
        sessionStorage.removeItem("empresa");
        sessionStorage.removeItem("suscripcion");
        clearCart();
        window.location.reload();
      } else {
        return;
      }
      return;
    }
    sessionStorage.setItem("suscripcion", suscripcion.id.toString());
    sessionStorage.setItem("empresa", suscripcion.empresa.toString());
    window.alert("Suscripción agregada al carrito");
    window.location.reload();
  };

  const handleAddToCart = (producto: Producto) => {
    if (!empresaId || !suscripcionId) {
      window.alert("Debes seleccionar una suscripción primero");
      return;
    }

    if (empresaId !== id) {
      window.alert(
        "Debes seleccionar un producto de la misma empresa que tu suscripción"
      );

      const change = window.confirm("¿Deseas cambiar de empresa?");

      if (change) {
        sessionStorage.removeItem("empresa");
        sessionStorage.removeItem("suscripcion");
        clearCart();
        window.location.reload();
      } else {
        return;
      }
      return;
    }

    addToCart({
      ...producto,
      id: producto.id ?? 0,
      name: producto.nombre,
      price: producto.costo_puntos ?? 0,
      quantity: 1,
    });
    //window.location.reload();
  };

  if (!empresa) return <div>Loading...</div>;

  return (
    <div className="relative bg-fondo min-h-screen">
      <Helmet>
        <title>{empresa.nombre} | OrganicBox</title>
        <meta
          name="description"
          content={`${empresa.descripcion} Ubicación: ${empresa.direccion}. Contacto: ${empresa.telefono}.`}
        />
        <meta
          name="keywords"
          content="productos orgánicos, frescos, sostenibilidad, empresa orgánica"
        />
        <meta
          name="author"
          content={`${empresa.propietario_data.user.first_name} ${empresa.propietario_data.user.last_name}`}
        />
        <meta property="og:title" content={`${empresa.nombre} | OrganicBox`} />
        <meta property="og:description" content={empresa.descripcion} />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="http://localhost:5173/company-detail"
        />
        <meta property="og:image" content="/path-to-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${empresa.nombre} | OrganicBox`} />
        <meta name="twitter:description" content={empresa.descripcion} />
        <meta name="twitter:image" content="/path-to-image.jpg" />
      </Helmet>

      <div className="absolute right-20 top-4 shadow-md bg-black bg-opacity-15">
        <NavBar />
      </div>
      <div className="max-w-4xl mx-auto px-5 sm:px-10 md:px-16 py-32">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-verdeob mb-4 text-center md:text-left">
          {empresa.nombre}
        </h1>

        <p className="text-base sm:text-lg md:text-xl text-gray-700 mb-6 text-center md:text-left">
          {empresa.descripcion}
        </p>

        <div className="bg-verdeclaro p-4 md:p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-lg md:text-xl font-semibold mb-2 text-center md:text-left">
            Detalles de la Empresa
          </h2>
          <div className="text-sm md:text-base space-y-2">
            <p>
              <span className="font-semibold">Dirección:</span>{" "}
              {empresa.direccion}
            </p>
            <p>
              <span className="font-semibold">Teléfono:</span>{" "}
              {empresa.telefono}
            </p>
            <p>
              <span className="font-semibold">Fecha de Creación:</span>{" "}
              {new Date(empresa.fecha_creacion).toLocaleDateString()}
            </p>
          </div>
        </div>

        <div className="bg-white p-4 md:p-6 rounded-lg shadow-md">
          <h2 className="text-lg md:text-xl font-semibold mb-2 text-center md:text-left">
            Propietario
          </h2>
          <div className="text-sm md:text-base space-y-2">
            <p>
              <span className="font-semibold">Nombre:</span>{" "}
              {empresa.propietario_data.user.first_name}{" "}
              {empresa.propietario_data.user.last_name}
            </p>
            <p>
              <span className="font-semibold">Email:</span>{" "}
              {empresa.propietario_data.user.email}
            </p>
          </div>
        </div>

        <div className="mb-6 mt-6">
          <h2 className="text-lg md:text-xl font-semibold mb-2 text-center">
            Suscripciones
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {suscripciones.map((suscripcion) => (
              <div
                key={suscripcion.id}
                className="bg-verdeclaro p-4 rounded-lg shadow-md"
              >
                <h3 className="font-semibold">{suscripcion.nombre}</h3>
                <p>
                  {suscripcion.monto_total_puntos !== null
                    ? `Monto Total Puntos: ${suscripcion.monto_total_puntos}`
                    : "Monto no disponible"}
                </p>
                <p>
                  {suscripcion.frecuencia !== null
                    ? `Frecuencia: ${suscripcion.frecuencia}`
                    : "Frecuencia no disponible"}
                </p>
                <p>
                  {suscripcion.costo !== null
                    ? `Costo: ${suscripcion.costo}`
                    : "Costo no disponible"}
                </p>
                <button
                  onClick={() => handleSuscripcion(suscripcion)}
                  className="mt-2 bg-verdeob text-white p-2 rounded-full transition duration-300 ease-in-out hover:bg-white hover:text-black"
                >
                  Suscribirse
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-lg md:text-xl font-semibold mb-2 text-center">
            Productos
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {productos.map((producto) => (
              <div
                key={producto.id}
                className="bg-verdeclaro p-4 rounded-lg shadow-md"
              >
                <h3 className="font-semibold">{producto.nombre}</h3>
                <p>{producto.descripcion}</p>
                <p>
                  {producto.costo_puntos !== null
                    ? `Costo en Puntos: ${producto.costo_puntos}`
                    : "Costo no disponible"}
                </p>
                <button
                  onClick={() => handleAddToCart(producto)}
                  className="mt-2 bg-verdeob text-white p-2 rounded-full transition duration-300 ease-in-out hover:bg-white hover:text-black"
                >
                  Agregar al Carrito
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
      <ToastContainer className="max-w-80 mx-auto" />
    </div>
  );
};

export default CompanyDetail;
