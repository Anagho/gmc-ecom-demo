import { NavLink, useNavigate } from "react-router";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import {
  ShoppingCartOutlined,
  HeartOutlined,
  UserOutlined,
  ShopOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import Logo from "./Logo";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../../features/auth/authSlice";
import { serverUrl } from "../../utils/helper";
import axios from "axios";
import toast from "react-hot-toast";

function MobileSidebar({ isOpen, setIsOpen, user, cartItems }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // function to close sidebar if the user clicks outside the sidebar
  const handleOutsideClick = (e) => {
    if (e.target.id === "sidebar-wrapper") {
      setIsOpen(false);
    }
  };

  // logout function
  async function handleLogout() {
    const response = await axios.post(
      `${serverUrl}/auth/logout`,
      {},
      { withCredentials: true }
    );
    dispatch(logoutUser());
    navigate("/");
    toast.success(response.data.message);
    setIsOpen(false);
  }

  return (
    isOpen && (
      <div
        id="sidebar-wrapper"
        className="fixed inset-0 bg-black bg-opacity-10 z-[999]"
        onClick={handleOutsideClick}
      >
        <motion.div
          initial={{ x: "-100%" }}
          animate={{ x: isOpen ? "0%" : "-100%" }}
          transition={{ duration: 0.3 }}
          className="fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-[1000] flex flex-col p-4"
        >
          <div className="flex items-center justify-between mb-5">
            {/* Logo */}
            <Logo />

            {/* Close Button */}
            <button
              className="self-end text-gray-600 bg-red-100 hover:bg-red-200 p-2 rounded-full"
              onClick={() => setIsOpen(false)}
            >
              <X size={24} />
            </button>
          </div>
          <hr className="border-gray-300 mb-4" />

          {/* Navigation Links */}
          <nav className="flex flex-col gap-4">
            {user ? (
              <NavLink
                to="/profile"
                className="flex items-center gap-3 text-gray-800 hover:text-green-500"
                onClick={() => setIsOpen(false)}
              >
                <UserOutlined className="text-xl" />
                <span>My Account</span>
              </NavLink>
            ) : (
              <NavLink
                to="/login"
                className="flex items-center gap-3 text-gray-800 hover:text-green-500"
                onClick={() => setIsOpen(false)}
              >
                <UserOutlined className="text-xl" />
                <span>My Account</span>
              </NavLink>
            )}

            <NavLink
              to="/products"
              className="flex items-center gap-3 text-gray-800 hover:text-green-500"
              onClick={() => setIsOpen(false)}
            >
              <ShopOutlined className="text-xl" />
              <span>Marketplace</span>
            </NavLink>

            <NavLink
              to="/profile/wishlist"
              className="flex items-center gap-3 text-gray-800 hover:text-green-500"
              onClick={() => setIsOpen(false)}
            >
              <HeartOutlined className="text-xl" />
              <span>Wishlist</span>
            </NavLink>

            <NavLink
              to="/cart"
              className="relative flex items-center justify-between w-fulltext-gray-800 hover:text-green-500"
              onClick={() => setIsOpen(false)}
            >
              <span className="flex items-center gap-3">
                <ShoppingCartOutlined className="text-xl" />
                <span>Cart</span>
              </span>

              <span>
                {cartItems.length > 0 && (
                  <span className="bg-orange-500 text-white text-xs px-2 rounded-full">
                    {cartItems.length}
                  </span>
                )}
              </span>
            </NavLink>

            {/* logout btn */}
            {user && (
              <button
                className="flex items-center justify-center gap-3 font-bold text-white text-center bg-gradient-to-r from-green-400 to-emerald-600 hover:bg-gradient-to-r hover:from-green-500 hover:to-emerald-700 duration-200 py-2 px-4 rounded-lg"
                onClick={handleLogout}
              >
                <LogoutOutlined className="text-xl" />
                <span>Logout</span>
              </button>
            )}
          </nav>
        </motion.div>
      </div>
    )
  );
}

export default MobileSidebar;
