import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartLine,
  faUsers,
  faUserPlus,
  faChalkboardUser,
  faRightFromBracket
} from "@fortawesome/free-solid-svg-icons";

function Sidebar() {
  const navigate = useNavigate();
  //Logout function 
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  }
  const menuClass = ({ isActive }) =>
    `px-3 py-2 rounded flex items-center gap-2 cursor-pointer 
     ${isActive ? "bg-red-500 text-white" : "hover:bg-gray-700"}`;

  return (
    <aside className="w-64 bg-gray-800 text-gray-200 min-h-screen p-4 ">
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
          <li>
            <button onClick={handleLogout} className="px-3 py-2 rounded flex items-center gap-2 cursor-pointer hover:bg-gray-700 w-full text-left">
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
