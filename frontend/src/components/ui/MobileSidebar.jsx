import { NavLink } from "react-router";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import {
  ShoppingCartOutlined,
  HeartOutlined,
  UserOutlined,
  ShopOutlined,
} from "@ant-design/icons";

function MobileSidebar({ isOpen, setIsOpen, user, cartItems }) {
  return (
    <motion.div
      initial={{ x: "-100%" }}
      animate={{ x: isOpen ? "0%" : "-100%" }}
      transition={{ duration: 0.3 }}
      className="fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-[1000] flex flex-col p-4"
    >
      {/* Close Button */}
      <button
        className="self-end mb-5 text-gray-600"
        onClick={() => setIsOpen(false)}
      >
        <X size={24} />
      </button>

      {/* Navigation Links */}
      <nav className="flex flex-col gap-4">
        <NavLink
          to="/"
          className="flex items-center gap-3 text-gray-800 hover:text-green-500"
        >
          <ShopOutlined className="text-xl" />
          <span>Home</span>
        </NavLink>

        <NavLink
          to="/products"
          className="flex items-center gap-3 text-gray-800 hover:text-green-500"
        >
          <ShopOutlined className="text-xl" />
          <span>Marketplace</span>
        </NavLink>

        {user ? (
          <NavLink
            to="/profile"
            className="flex items-center gap-3 text-gray-800 hover:text-green-500"
          >
            <UserOutlined className="text-xl" />
            <span>My Account</span>
          </NavLink>
        ) : (
          <NavLink
            to="/login"
            className="flex items-center gap-3 text-gray-800 hover:text-green-500"
          >
            <UserOutlined className="text-xl" />
            <span>Login</span>
          </NavLink>
        )}

        <NavLink
          to="/profile/wishlist"
          className="flex items-center gap-3 text-gray-800 hover:text-green-500"
        >
          <HeartOutlined className="text-xl" />
          <span>Wishlist</span>
        </NavLink>

        <NavLink
          to="/cart"
          className="relative flex items-center gap-3 text-gray-800 hover:text-green-500"
        >
          <ShoppingCartOutlined className="text-xl" />
          <span>Cart</span>
          {cartItems.length > 0 && (
            <span className="bg-red-500 text-white text-xs px-2 rounded-full absolute -top-2 -right-2">
              {cartItems.length}
            </span>
          )}
        </NavLink>
      </nav>
    </motion.div>
  );
}

export default MobileSidebar;
