import { useState } from "react";
import { Link, useLocation } from "react-router";
import {
  FaChartBar,
  FaBox,
  FaShoppingCart,
  FaBars,
  FaTimes,
  FaHome,
  FaCogs,
} from "react-icons/fa";

const AdminSidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  const menuItems = [
    { name: "Dashboard", icon: <FaChartBar />, path: "/admin" },
    { name: "Products", icon: <FaBox />, path: "/admin/products" },
    { name: "Orders", icon: <FaShoppingCart />, path: "/admin/orders" },
    { name: "Visit Site", icon: <FaHome />, path: "/"},
    {name: "Settings", icon: <FaCogs />, path:"/"}
  ];

  return (
    <aside
      className={`h-screen bg-gray-800 text-white ${
        isCollapsed ? "w-16" : "w-64"
      } transition-all duration-300 flex flex-col`}
    >
      {/* Toggle Button */}
      <button
        className="p-4 focus:outline-none text-lg flex justify-end"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        {isCollapsed ? <FaBars /> : <FaTimes />}
      </button>

      {/* Menu */}
      <nav className="flex flex-col gap-4 mt-6">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`flex items-center gap-3 p-3 mx-2 rounded-md transition ${
              location.pathname === item.path
                ? "bg-blue-600"
                : "hover:bg-gray-700"
            }`}
          >
            {item.icon}
            {!isCollapsed && <span>{item.name}</span>}
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default AdminSidebar;
