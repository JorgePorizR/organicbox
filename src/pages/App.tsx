import Footer from "../components/main/Footer";
import Header from "../components/main/Header";
import Main from "../components/main/Main";
import { Helmet } from "react-helmet";
const App = () => {
  return (
    <div className="bg-fondo">
      <Helmet>
        {/* Adicion de etiquetas globales, meta tags para SEO, meta tags para redes sociales */}
        {/* Título para los buscadores */}
        <title>OrganicBox - Todo Natural para una Vida Saludable</title>
        
        {/* Descripción breve para motores de búsqueda */}
        <meta
          name="description"
          content="OrganicBox es la mejor plataforma para comprar productos orgánicos. Personaliza tus suscripciones y compra con confianza en un entorno sostenible."
        />

        {/* Palabras clave */}
        <meta
          name="keywords"
          content="productos orgánicos, ecommerce, suscripciones personalizadas, vida saludable, comercio justo"
        />

        {/* Indexación y seguimiento */}
        <meta name="robots" content="index, follow" />

        {/* Open Graph: mejora la visibilidad en redes sociales */}
        <meta property="og:title" content="OrganicBox - Todo Natural para una Vida Saludable" />
        <meta
          property="og:description"
          content="Descubre OrganicBox, la tienda online líder en productos orgánicos y suscripciones personalizadas. Comercio justo y sostenible para todos."
        />
        <meta property="og:image" content="/src/assets/logo.webp" />
        <meta property="og:url" content="http://localhost:5173" />
        <meta property="og:type" content="website" />

        {/* Twitter Cards */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="OrganicBox - Todo Natural para una Vida Saludable" />
        <meta
          name="twitter:description"
          content="Explora OrganicBox, tu mejor opción para comprar productos orgánicos y suscripciones personalizadas."
        />
        <meta name="twitter:image" content="/src/assets/logo.webp" />
      </Helmet>
      <Header />
      <Main />
      <Footer />
    </div>
  );
};

export default App;
