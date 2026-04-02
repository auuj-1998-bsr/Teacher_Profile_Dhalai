import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { jwtDecode } from "jwt-decode";
import {
  faSchool
} from "@fortawesome/free-solid-svg-icons";
const Header = () => {
  const token = localStorage.getItem("token");
  console.log(token);
  const decoded = jwtDecode(token);
  console.log("heee")
  return (
    <header className="h-16 bg-white/80 backdrop-blur-md border-b border-gray-200 flex items-center justify-between px-6 shadow-sm">

      <div className="flex items-center gap-3">
        <img
          src={`${import.meta.env.VITE_API_URL}/uploads/MOe_logo.png`}
          className="h-10 w-auto object-contain"
          alt="Logo"
        />
        <h1 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
          <FontAwesomeIcon icon={faSchool} className="text-blue-500" />
          School Teacher Management
        </h1>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-600">{decoded.teacher_name}</span>
      </div>
    </header>
  );
};
export default Header;