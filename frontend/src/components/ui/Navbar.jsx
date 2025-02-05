import { ShoppingCart } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router";
import { updateUser } from "../../features/user/userSlice";
import Filter from "./Filter";
import {
  UserOutlined,
  ShoppingCartOutlined,
  DownOutlined,
  HeartOutlined,
  ShoppingOutlined,
  ShopOutlined,
  DashboardOutlined,
  BoxPlotOutlined,
  CarryOutOutlined,
} from "@ant-design/icons";
import { Avatar, Space, Dropdown } from "antd";
import { FaBox } from "react-icons/fa";

function Navbar() {
  const { cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);

  // const [searchValue, setSearchValue] = useState('');
  // const [selectedFilter, setSelectedFilter] = useState('all');

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
    dispatch(updateUser(null));
    navigate("/");
  }

  // Dropdown Menu
  const dropDownItems1 = [
    {
      label: (
        <NavLink
          to="/login"
          className="block w-full text-center font-semibold rounded-md shadow-md bg-orange-400 !text-white text-lg py-2 px-4 my-2"
        >
          Login
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
          to={user && user.userType === "admin" ? "/admin/orders" : "/profile/orders"}
        >
          <Space className="text-[1rem]">
            <ShoppingOutlined className="text-2xl" /> <span>Orders</span>
          </Space>
        </NavLink>
      ),
      key: "3",
    },
    {
      label: user &&
        user.userType === "admin" ? (
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
          <h1 className="font-bold text-2xl text-green-800 font-sans">
            Farmgry
          </h1>
        </NavLink>

        {/* Filter and Search Bar */}
        <Filter productOptions={productOptions} />

        {/* Navbar Links */}
        <div className="flex gap-4 text-gray-900 font-medium items-center text-lg">
          <NavLink className={"hover:text-orange-500"} to={"/products"}>
            <Space>
              <ShopOutlined className="text-2xl" />
              <span>Marketplace</span>
            </Space>
          </NavLink>

          <Dropdown
            menu={{
              items: user === null ? dropDownItems1 : dropDownItems2,
            }}
            trigger={["click"]}
            size="large"
            className="w-full"
          >
            <a
              onClick={(e) => e.preventDefault()}
              className="cursor-pointer p-2 rounded-md hover:text-orange-500"
            >
              <Space>
                <UserOutlined className="text-2xl" />
                {user === null ? (
                  <span>Account</span>
                ) : (
                  <span className="capitalize">Hi, {user.name}</span>
                )}
                <DownOutlined className="text-sm" />
              </Space>
            </a>
          </Dropdown>

          {user !== null && user.userType === "admin" ? (
            <NavLink to={"/admin"} className="hover:text-orange-500">
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
              <p className="bg-orange-500 absolute -top-1 left-6  px-1 text-white rounded-lg text-center text-xs">
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
