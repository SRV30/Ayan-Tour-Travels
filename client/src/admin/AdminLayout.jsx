import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 bg-gradient-to-br from-gray-900 to-black text-white p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
