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
} from "@ant-design/icons";
import { motion } from "framer-motion";
import { Space, Dropdown } from "antd";
import { logoutUser } from "../../features/auth/authSlice";

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

  function handleUserLogout() {
    localStorage.removeItem("user");
    dispatch(logoutUser());
    navigate("/");
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
        <NavLink to="/login">
          <Space className="text-[1rem]">
            <UserOutlined className="text-2xl" /> <span>My Account</span>
          </Space>
        </NavLink>
      ),
      key: "2",
    },
    {
      label: (
        <NavLink to="/login">
          <Space className="text-[1rem]">
            <ShoppingOutlined className="text-2xl" /> <span>Orders</span>
          </Space>
        </NavLink>
      ),
      key: "3",
    },
    {
      label: (
        <NavLink to="/login">
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

  return (
    <nav className="shadow-md bg-white sticky top-0 z-[999]">
      <section className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4 p-4">
        {/* Logo */}
        <NavLink to={"/"}>
          <h1 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-500 to-emerald-800 text-transparent bg-clip-text">
            Farmgry
          </h1>
        </NavLink>

        {/* Filter and Search Bar */}
        <Filter productOptions={productOptions} />

        {/* Navbar Links */}
        <div className="flex gap-4 text-gray-900 font-medium items-center text-lg">
          <NavLink
            className={"hover:text-orange-500 transition-colors duration-500 "}
            to={"/products"}
          >
            <Space>
              <ShopOutlined className="text-2xl" />
              <span>Marketplace</span>
            </Space>
          </NavLink>

          <Dropdown
            menu={{
              items: user ? dropDownItems2 : dropDownItems1,
            }}
            trigger={["click"]}
            size="large"
            className="w-full"
          >
            <a
              onClick={(e) => e.preventDefault()}
              className="cursor-pointer p-2 rounded-md hover:text-orange-500 transition-colors duration-500"
            >
              <Space>
                <UserOutlined className="text-2xl" />
                <span className="capitalize">
                  {user ? `Hi ${user.name}` : "Account"}
                </span>
                <DownOutlined className="text-sm" />
              </Space>
            </a>
          </Dropdown>

          {user && user.userType === "admin" ? (
            <NavLink
              to={"/admin"}
              className="hover:text-orange-500 transition-colors duration-500 "
            >
              <Space>
                <DashboardOutlined className="text-2xl" />
                <span>Admin</span>
              </Space>
            </NavLink>
          ) : (
            <NavLink
              className={
                "hover:text-orange-500 relative transition-colors duration-500 flex items-center gap-4"
              }
              to={"/cart"}
            >
              {/* <ShoppingCart strokeWidth={2.5} /> */}
              <Space size={8}>
                <ShoppingCartOutlined className="text-3xl" />
              </Space>
              <p className="bg-emerald-500 absolute -top-1 left-6  px-1 text-white rounded-lg text-center text-xs">
                {cartItems.length}
              </p>
              <span className="text-lg">Cart</span>
            </NavLink>
          )}
        </div>
      </section>
    </nav>
  );
}

export default Navbar;
