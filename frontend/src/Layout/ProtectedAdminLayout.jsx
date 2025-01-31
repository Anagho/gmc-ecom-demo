import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";
import AdminSidebar from "../components/admin/AdminSidebar";
import AdminNavbar from "../components/admin/AdminNavbar";

const ProtectedAdminLayout = () => {
  const { user } = useSelector((state) => state.user);

  
  if (user == null && user.userType !== "admin") {
    return <Navigate to={"/profile"} />;
  }

  return (
    <div className="flex h-screen">
      <AdminSidebar />

      <div className="flex-1 flex flex-col">
        {/* Top Navbar */}
        <AdminNavbar />

        {/* Page Content */}
        <main className="p-6 bg-gray-100 flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default ProtectedAdminLayout;
