import logo from "../../assets/logo.webp";
import vector from "../../assets/vector.webp";
import fondo from "../../assets/fondo.webp";
import NavBar from "../NavBar";

function Header() {
  return (
    <header id="header" className="pb-5 lg:h-screen">
      <div className="relative flex justify-center">
        <img src={fondo} alt="Ensalada fresca" className="shadow-lg" />
        <div className="absolute right-20 shadow-md bg-black bg-opacity-15">
          <NavBar />
        </div>
        <img
          src={logo}
          alt="Logo"
          className="absolute top-16 sm:top-28 lg:top-40 xl:top-52 left-4 sm:left-14 lg:left-24 xl:left-16 w-[14%] mb-4"
        />
        <h1 className="absolute top-20 sm:top-36 lg:top-52 xl:top-64 left-[64px] sm:left-40 lg:left-60 xl:left-64 text-3xl sm:text-5xl lg:text-6xl xl:text-8xl font-bold text-green-500 mb-2 text-verdeob">
          OrganIcBox
        </h1>
        <p className="absolute top-28 sm:top-52 lg:top-72 xl:top-96 left-[70px] sm:left-48 lg:left-64 xl:left-[270px] text-lg sm:text-2xl lg:text-4xl xl:text-6xl text-verdeob mb-6">
          Experiencia Natural
        </p>
        <img
          src={vector}
          alt="Vector"
          className="absolute top-[61px] sm:top-[114px] lg:top-[168px] xl:top-48 left-[141px] sm:left-[284px] lg:left-[394px] xl:left-[508px] w-8 sm:w-12 lg:w-16 xl:w-24"
        />
      </div>
    </header>
  );
}

export default Header;
