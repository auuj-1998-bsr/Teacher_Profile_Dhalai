import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();


  //Logout function 
  const handleLogout=()=>{
    localStorage.removeItem("token");
    navigate("/login");
  }
  return (
    <header className="h-18 bg-white-400 text-black flex items-center justify-between px-6">
     <img src={`${import.meta.env.VITE_API_URL}/uploads/MOe_logo.png`}className="h-16 w-35" alt="" />
      <h1 className="text-2xl font-semibold pl-10 ">
       School Teacher Information
      </h1>

      <button
        onClick={handleLogout}
        className="bg-blue-500 px-4 py-1 rounded-lg hover:bg-blue-600"
      >
        Logout
      </button>
    </header>
  );
};

export default Header;