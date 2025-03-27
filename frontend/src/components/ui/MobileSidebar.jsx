import { NavLink, useNavigate } from "react-router";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, X, Grid, Clock, LayoutGrid, Search } from "lucide-react";
import {
  ShoppingCartOutlined,
  HeartOutlined,
  UserOutlined,
  ShopOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import Logo from "./Logo";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../features/auth/authSlice";
import { serverUrl } from "../../utils/helper";
import axios from "axios";
import toast from "react-hot-toast";
import { useState } from "react";

const categories = [
  { name: "Vegetables", subcategories: ["Tomatoes", "Carrots", "Spinach"] },
  { name: "Fruits", subcategories: ["Oranges", "Apples", "Bananas"] },
  { name: "Grains & Cereals", subcategories: ["Rice", "Maize", "Wheat"] },
  { name: "Dairy Products", subcategories: ["Milk", "Cheese", "Yogurt"] },
  { name: "Meat & Poultry", subcategories: ["Chicken", "Beef", "Fish"] },
  { name: "Herbs & Spices", subcategories: ["Ginger", "Garlic", "Turmeric"] },
];

function MobileSidebar({ isOpen, setIsOpen, user, cartItems }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [expandedCategory, setExpandedCategory] = useState(null);
  const [activeTab, setActiveTab] = useState("CATEGORY")
    const [featuredProducts, setFeaturedProducts] = useState([
      "Organic Honey",
      "Fresh Avocados",
      "Premium Rice",
    ]);

  const toggleCategory = (category) => {
    setExpandedCategory(expandedCategory === category ? null : category);
  };

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
    <AnimatePresence>
      {isOpen && (
        <div
          id="sidebar-wrapper"
          className="fixed inset-0 bg-black bg-opacity-10 z-[999]"
          onClick={handleOutsideClick}
        >
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: isOpen ? "0%" : "-100%" }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-[1000] flex flex-col p-4"
          >
            <div className="flex items-center justify-between mb-5">
              <NavLink to="/" onClick={() => setIsOpen(false)}>
                {/* Logo */}
                <Logo />
              </NavLink>

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

            <hr className="border-gray-300 my-4" />
            {/* Shop by Categories*/}
            <div>
              <p className="text-gray-600 flex items-center justify-between font-light mb-2">
                <span>Shop by Categories</span>
                <ArrowRight />
              </p>

              {/* Tab Bar */}
              <div className="flex justify-between bg-gray-100">
                <button
                  className={`flex-1 flex items-center justify-center p-2 ${
                    activeTab === "CATEGORY"
                      ? "bg-emerald-600 text-white"
                      : "bg-gray-200 text-gray-800"
                  } rounded-tl-lg rounded-bl-lg  transition-all duration-500 ease-in-out`}
                  onClick={() => setActiveTab("CATEGORY")}
                >
                  <LayoutGrid size={18} className="mr-2" /> CATEGORY
                </button>
                <button
                  className={`flex-1 flex items-center justify-center p-2 ${
                    activeTab === "SEARCH"
                      ? "bg-emerald-600 text-white"
                      : "bg-gray-200 text-gray-800"
                  } rounded-tr-lg rounded-br-lg  transition-all duration-500 ease-in-out`}
                  onClick={() => setActiveTab("SEARCH")}
                >
                  <Search size={18} className="mr-2" /> SEARCH
                </button>
              </div>

              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.3 }}
              >
                {activeTab === "CATEGORY" && (
                  <ul className="flex flex-col gap-2 my-3">
                    {categories.map((category) => {
                      return (
                        <li key={category.name}>
                          <button
                            className="w-full flex justify-between items-center py-1 px-3 bg-gray-100 rounded-lg hover:bg-gray-200"
                            onClick={() => toggleCategory(category.name)}
                          >
                            <span>{category.name}</span>
                            {expandedCategory === category.name ? (
                              <span>-</span>
                            ) : (
                              <span>+</span>
                            )}
                          </button>

                          <AnimatePresence>
                            {expandedCategory === category.name && (
                              <motion.ul
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3 }}
                                className="pl-4 mt-1 space-y-1"
                              >
                                {category.subcategories.map((sub) => (
                                  <li
                                    key={sub}
                                    className="text-gray-700 hover:text-green-500"
                                  >
                                    <NavLink
                                      to={`/category/${sub.toLowerCase()}`}
                                      onClick={() => setIsOpen(false)}
                                    >
                                      {sub}
                                    </NavLink>
                                  </li>
                                ))}
                              </motion.ul>
                            )}
                          </AnimatePresence>
                        </li>
                      );
                    })}
                  </ul>
                )}

                {activeTab === "SEARCH" && (
                  <div className="my-2">
                    <input
                      type="text"
                      placeholder="Search products..."
                      className="w-full p-2 border rounded-lg"
                    />
                    <div className="mt-4">
                      <h3 className="font-bold text-gray-800">
                        Featured Products
                      </h3>
                      <ul className="mt-2">
                        {featuredProducts.map((product, index) => (
                          <li
                            key={index}
                            className="text-gray-700 hover:text-green-500"
                          >
                            {product}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </motion.div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export default MobileSidebar;
