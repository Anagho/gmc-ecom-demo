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
    <main className="flex h-screen">
      <AdminSidebar />

      <section className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navbar */}
        <AdminNavbar />

        {/* Page Content */}
        <div className="p-6 bg-gray-100 flex-1 overflow-y-auto">
          <Outlet />
        </div>
      </section>
    </main>
  );
};

export default ProtectedAdminLayout;
