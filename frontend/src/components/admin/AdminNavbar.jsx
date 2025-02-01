import {
  FaUserCircle,
  FaSignOutAlt,
  FaClock,
  FaCalendarAlt,
} from "react-icons/fa";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const AdminNavbar = () => {
  const { user } = useSelector((state) => state.user);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Format time with day & date
  const formattedTime = time.toLocaleTimeString();
  const formattedDate = time.toLocaleDateString(undefined, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <nav className="bg-gray-200 shadow-md p-2 px-4 flex justify-between items-center">
      <h1 className="font-semibold hidden md:block text-lg md:text-xl text-green-700">Admin Dashboard</h1>
      <div className="flex items-center ml-auto gap-6 md:gap-4 sm:gap-2 whitespace-nowrap">
        {/* Date & Time */}
        <div className="hidden md:flex flex-col text-center text-sm">
          <div className="flex items-center gap-2">
            <FaCalendarAlt className="text-gray-500" />
            <p className="text-gray-600">{formattedDate}</p>
          </div>
          <div className="flex items-center gap-2">
            <FaClock className="text-gray-500" />
            <p>{formattedTime}</p>
          </div>
        </div>

        {/* Profile */}
        <div className="flex items-center gap-2">
          <FaUserCircle className="text-gray-600 text-2xl" />
          <span>{user?.name}</span>
        </div>

        {/* Logout Button */}
        <button className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-md">
          <FaSignOutAlt />
          Logout
        </button>
      </div>
    </nav>
  );
};

export default AdminNavbar;
