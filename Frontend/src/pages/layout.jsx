import Header from "../component/header";
import Sidebar from "../component/sidebar";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
 <div className="bg-gray-100 min-h-screen">
      
      <div className="fixed top-0 left-0 w-full z-50">
        <Header />
      </div>

      <div className="flex pt-16">
      
        <div className="fixed left-0 top-16 h-[calc(100vh-4rem)]">
          <Sidebar />
        </div>

        <div className="flex-1 ml-64 p-6">
          <div className="bg-white rounded-2xl shadow-md p-6 min-h-[80vh]">
            <Outlet />
          </div>
        </div>

      </div>
    </div>
  );
}