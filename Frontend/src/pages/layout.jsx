import Header from "../component/header";
import Sidebar from "../component/sidebar";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <>
      <div className="fixed top-0 left-0 w-full h-17 z-50 bg-white shadow-md">
        <Header />
      </div>

      <div className="flex">
    
        <div className="fixed top-17 left-0  h-[calc(100vh-56px)]">
          <Sidebar />
        </div>

        <div className="flex-1 ml-60 mt-14 p-6 bg-gray-200 min-h-screen">
          <Outlet />
        </div>
      </div>
    </>
  );
}