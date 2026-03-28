import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSchool
} from "@fortawesome/free-solid-svg-icons";
const Header = () => {

  return (
    <header className="h-17 bg-white-400 text-black flex items-center justify-between px-6 pr-100">
      <img src={`${import.meta.env.VITE_API_URL}/uploads/MOe_logo.png`} className="h-16 w-40" alt="" />
      <h1 className="text-3xl font-semibold pl-10 ">
        <FontAwesomeIcon icon={faSchool} />
        School Teacher Managment
      </h1>
    </header>
  );
};

export default Header;