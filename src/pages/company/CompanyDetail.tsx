import React from "react";
import { Empresa } from "../../models/Empresa";
import NavBar from "../../components/NavBar";
import Footer from "../../components/main/Footer";
import { Helmet } from "react-helmet";

// Objeto de ejemplo
const ejemploEmpresa: Empresa = {
  id: 1,
  propietario_data: {
    id: 1,
    user: {
      id: 1,
      username: "ejemploUsuario",
      first_name: "Juan",
      last_name: "Pérez",
      email: "juan.perez@ejemplo.com",
    },
    is_Admin: true,
    has_Empresa: true,
  },
  nombre: "Productos Orgánicos S.A.",
  descripcion: "Nos dedicamos a la venta de productos orgánicos y frescos.",
  direccion: "Calle Falsa 123, Ciudad Ejemplo",
  telefono: "123-456-7890",
  fecha_creacion: new Date("2020-01-01"),
  propietario: 1,
};

const CompanyDetail: React.FC = () => {
  return (
    <div className="relative bg-fondo min-h-screen">
      {/* Helmet para SEO */}
      <Helmet>
        <title>{ejemploEmpresa.nombre} | OrganicBox</title>
        <meta
          name="description"
          content={`${ejemploEmpresa.descripcion} Ubicación: ${ejemploEmpresa.direccion}. Contacto: ${ejemploEmpresa.telefono}.`}
        />
        <meta name="keywords" content="productos orgánicos, frescos, sostenibilidad, empresa orgánica" />
        <meta name="author" content={`${ejemploEmpresa.propietario_data.user.first_name} ${ejemploEmpresa.propietario_data.user.last_name}`} />
        <meta property="og:title" content={`${ejemploEmpresa.nombre} | OrganicBox`} />
        <meta property="og:description" content={ejemploEmpresa.descripcion} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="http://localhost:5173/company-detail" />
        <meta property="og:image" content="/path-to-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${ejemploEmpresa.nombre} | OrganicBox`} />
        <meta name="twitter:description" content={ejemploEmpresa.descripcion} />
        <meta name="twitter:image" content="/path-to-image.jpg" />
      </Helmet>

      <div className="absolute right-20 top-4 shadow-md bg-black bg-opacity-15">
        <NavBar />
      </div>
      <div className="max-w-4xl mx-auto px-5 sm:px-10 md:px-16 py-32">
        {/* Nombre de la empresa */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-verdeob mb-4 text-center md:text-left">
          {ejemploEmpresa.nombre}
        </h1>

        {/* Descripción */}
        <p className="text-base sm:text-lg md:text-xl text-gray-700 mb-6 text-center md:text-left">
          {ejemploEmpresa.descripcion}
        </p>

        {/* Detalles de la empresa */}
        <div className="bg-verdeclaro p-4 md:p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-lg md:text-xl font-semibold mb-2 text-center md:text-left">
            Detalles de la Empresa
          </h2>
          <div className="text-sm md:text-base space-y-2">
            <p><span className="font-semibold">Dirección:</span> {ejemploEmpresa.direccion}</p>
            <p><span className="font-semibold">Teléfono:</span> {ejemploEmpresa.telefono}</p>
            <p>
              <span className="font-semibold">Fecha de Creación:</span>{" "}
              {new Date(ejemploEmpresa.fecha_creacion).toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* Detalles del propietario */}
        <div className="bg-white p-4 md:p-6 rounded-lg shadow-md">
          <h2 className="text-lg md:text-xl font-semibold mb-2 text-center md:text-left">
            Propietario
          </h2>
          <div className="text-sm md:text-base space-y-2">
            <p>
              <span className="font-semibold">Nombre:</span> {ejemploEmpresa.propietario_data.user.first_name}{" "}
              {ejemploEmpresa.propietario_data.user.last_name}
            </p>
            <p>
              <span className="font-semibold">Email:</span> {ejemploEmpresa.propietario_data.user.email}
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CompanyDetail;
