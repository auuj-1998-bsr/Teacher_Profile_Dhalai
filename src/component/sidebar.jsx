import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartLine,
  faUsers,
  faFilePdf
} from "@fortawesome/free-solid-svg-icons";

function Sidebar() {
  const menuClass = ({ isActive }) =>
    `px-3 py-2 rounded flex items-center gap-2 cursor-pointer 
     ${isActive ? "bg-red-500 text-white" : "hover:bg-gray-700"}`;

  return (
    <aside className="w-64 bg-gray-800 text-gray-200 min-h-screen p-4">
      <nav>
        <ul className="space-y-2">

          <li>
            <NavLink to="/" className={menuClass}>
              <FontAwesomeIcon icon={faChartLine} />
              Dashboard
            </NavLink>
          </li>

          <li>
            <NavLink to="/teachers" className={menuClass}>
              <FontAwesomeIcon icon={faUsers} />
              Add Teachers
            </NavLink>
          </li>

          <li>
            <NavLink to="/reports" className={menuClass}>
              <FontAwesomeIcon icon={faFilePdf} />
              Reports
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  
  );
}

export default Sidebar;
