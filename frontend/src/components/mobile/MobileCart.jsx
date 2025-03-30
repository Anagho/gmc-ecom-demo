import { NavLink, useNavigate } from "react-router";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, X, LayoutGrid, Search, ShoppingCart } from "lucide-react";
import {
  ShoppingCartOutlined,
  HeartOutlined,
  UserOutlined,
  ShopOutlined,
  LogoutOutlined,
  FacebookFilled,
  FacebookOutlined,
} from "@ant-design/icons";
import Logo from "../ui/Logo";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../features/auth/authSlice";
import { serverUrl } from "../../utils/helper";
import axios from "axios";
import toast from "react-hot-toast";
import { useState } from "react";

const MobileCart = ({ cartOpen, setCartOpen }) => {

  // handle outside click
  const handleOutsideClick = (e) => {
    if (e.target.id === "cart-wrapper") {
      setCartOpen(false);
    }
  }
  return (
    <AnimatePresence>
      {cartOpen && (
        <div
          id="cart-wrapper"
          className="fixed inset-0 bg-black bg-opacity-60 z-[999]"
          onClick={handleOutsideClick}
        >
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: "30%" }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.2 }}
            className="fixed top-0 left-0 h-full w-[80%] bg-white shadow-lg z-[1000] flex flex-col p-4 scrollable-hidden"
          >
            <div className="flex items-center justify-between mb-3">
              <p className="text-lg">Shopping Cart</p>

              {/* Close Button */}
              <button
                className="self-end text-gray-500 px-4"
                onClick={() => setCartOpen(false)}
              >
                <X size={24} />
              </button>
            </div>
            <hr className="border-gray-300 mb-4" />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default MobileCart;
