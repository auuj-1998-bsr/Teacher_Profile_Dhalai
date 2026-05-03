import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartLine,faUsers,faUserPlus,faChalkboardUser,faRightFromBracket
} from "@fortawesome/free-solid-svg-icons";

function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const menuClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200
     ${isActive 
       ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-md" 
       : "hover:bg-gray-700 hover:pl-5"
     }`;

  return (
    <aside className="w-64 bg-gray-900 text-gray-300 min-h-screen p-4 shadow-lg">
      <nav>
        <ul className="space-y-2">

          <li>
            <NavLink to="/" className={menuClass}>
              <FontAwesomeIcon icon={faChartLine} />
              Dashboard
            </NavLink>
          </li>

          <li>
            <NavLink to="/profile" className={menuClass}>
              <FontAwesomeIcon icon={faUsers} />
              Teacher Profile
            </NavLink>
          </li>

          <li>
            <NavLink to="/teachers" className={menuClass}>
              <FontAwesomeIcon icon={faUserPlus} />
              Add Teachers
            </NavLink>
          </li>

          <li>
            <NavLink to="/teachersQuiz" className={menuClass}>
              <FontAwesomeIcon icon={faChalkboardUser} />
              Teacher Quiz
            </NavLink>
          </li>
          <li className="pt-4 border-t border-gray-700">
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-4 py-2 rounded-lg w-full text-left hover:bg-red-500 hover:text-white transition"
            >
              <FontAwesomeIcon icon={faRightFromBracket} />
              Logout
            </button>
          </li>

        </ul>
      </nav>
    </aside>
  );
}
export default Sidebar;
