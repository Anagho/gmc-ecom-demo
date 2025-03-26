import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router";
import Filter from "./Filter";
import {
  UserOutlined,
  ShoppingCartOutlined,
  DownOutlined,
  HeartOutlined,
  ShoppingOutlined,
  ShopOutlined,
  DashboardOutlined,
  CarryOutOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { motion } from "framer-motion";
import { Space, Dropdown, Avatar } from "antd";
import { logoutUser } from "../../features/auth/authSlice";
import axios from "axios";
import { serverUrl } from "../../utils/helper";
import toast from "react-hot-toast";
import { useState } from "react";
import { MenuIcon, ShoppingBagIcon, User2Icon, UserCheck2Icon, UserRoundCheck } from "lucide-react";
import MobileSidebar from "./MobileSidebar";
import Logo from "./Logo";

function Navbar() {
  const { cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);

  // console.log(user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Filter options
  const productOptions = [
    { label: "All category", value: "all" },
    { label: "Fruits", value: "fruits" },
    { label: "Vegetables", value: "vegetables" },
    { label: "Dairy", value: "dairy" },
    { label: "Grains", value: "grains" },
  ];

  async function handleUserLogout() {
    const response = await axios.post(
      `${serverUrl}/auth/logout`,
      {},
      { withCredentials: true }
    );
    dispatch(logoutUser());
    navigate("/");
    toast.success(response.data.message);
  }

  // Dropdown Menu
  const dropDownItems1 = [
    {
      label: (
        <NavLink to="/login">
          <motion.button
            className="mt-5 w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
          >
            Login
          </motion.button>
        </NavLink>
      ),
      key: "0",
    },
    {
      type: "divider",
    },
    {
      label: (
        <NavLink to={user ? "/profile" : "/login"}>
          <Space className="text-[1rem]">
            <UserOutlined className="text-2xl" /> <span>My Account</span>
          </Space>
        </NavLink>
      ),
      key: "2",
    },
    {
      label: (
        <NavLink to={user ? "/profile/orders" : "/login"}>
          <Space className="text-[1rem]">
            <ShoppingOutlined className="text-2xl" /> <span>Orders</span>
          </Space>
        </NavLink>
      ),
      key: "3",
    },
    {
      label: (
        <NavLink to={user ? "/profile/wishlist" : "/login"}>
          <Space className="text-[1rem]">
            <HeartOutlined className="text-2xl" /> <span>Wishlist</span>
          </Space>
        </NavLink>
      ),
      key: "4",
    },
  ];

  const dropDownItems2 = [
    {
      label: (
        <NavLink to={user && user.userType === "admin" ? "/admin" : "/profile"}>
          <Space className="text-[1rem]">
            <UserOutlined className="text-2xl" /> <span>My Account</span>
          </Space>
        </NavLink>
      ),
      key: "2",
    },
    {
      label: (
        <NavLink
          to={
            user && user.userType === "admin"
              ? "/admin/orders"
              : "/profile/orders"
          }
        >
          <Space className="text-[1rem]">
            <ShoppingOutlined className="text-2xl" /> <span>Orders</span>
          </Space>
        </NavLink>
      ),
      key: "3",
    },
    {
      label:
        user && user.userType === "admin" ? (
          <NavLink to={"/admin/products"}>
            <Space className="text-[1rem]">
              <CarryOutOutlined className="text-2xl" /> <span>Products</span>
            </Space>
          </NavLink>
        ) : (
          <NavLink to={"/admin/products"}>
            <Space className="text-[1rem]">
              <HeartOutlined className="text-2xl" /> <span>Wishlist</span>
            </Space>
          </NavLink>
        ),
      key: "4",
    },
    {
      type: "divider",
    },
    {
      label: (
        <button
          onClick={handleUserLogout}
          className="bg-orange-400 text-white w-full p-2 text-medium font-semibold shadow-lg rounded-md"
        >
          Logout
        </button>
      ),
      key: "6",
    },
  ];

  // Sidebar State
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <nav className="shadow-md bg-white sticky top-0 z-[999]">
      <section className="container mx-auto flex p-4">
        {/* Only show in small screens */}
        <div className="md:hidden w-full">
          <div className="flex items-center justify-between">
            {/* left */}
            <div className="flex items-center gap-4">
              {/* Menu */}
              <button onClick={() => setIsSidebarOpen(true)}>
                <MenuIcon size={24} />
              </button>

              {/* Logo */}
              <Logo />
            </div>

            {/* right */}
            <div className="flex items-center gap-4">
              {/* User */}
              {user && <Space>
                <Avatar className="bg-green-200 text-emerald-900 font-semibold text-sm">{user.name[0]}</Avatar></Space>}
              <Space>{user ? <UserCheck2Icon /> : <User2Icon />}</Space>

              {/* Cart */}
              <NavLink
                className={
                  "hover:text-orange-500 relative transition-colors duration-500 flex items-center gap-3"
                }
                to={"/cart"}
              >
                <Space>
                  <ShoppingBagIcon />
                </Space>
                <span className="bg-emerald-500 absolute -top-1 left-4 px-1 text-white rounded-full text-center text-xs">
                  {cartItems.length}
                </span>
              </NavLink>
            </div>
          </div>

          {/* Search Bar */}
          <div className="w-full mt-4">
            {/* Search Input */}
            <div className="flex items-center border border-gray-600 rounded-full px-2 py-1">
              <SearchOutlined className="text-lg text-gray-500 mr-2 rounded-full" />
              <input
                type="text"
                placeholder="Search products, farms, categories..."
                className="outline-none border-none py-1 w-full text-sm"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Sidebar */}
      <MobileSidebar
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
        user={user}
        cartItems={cartItems}
      />
    </nav>
  );
}

export default Navbar;
