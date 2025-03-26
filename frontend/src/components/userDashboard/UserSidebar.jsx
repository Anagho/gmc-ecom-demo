import { Link, useLocation } from "react-router";
import { FaEnvelope } from "react-icons/fa";
import {
  UserOutlined,
  ShoppingCartOutlined,
  HeartOutlined,
} from "@ant-design/icons";
import { motion } from "framer-motion";
import { Space } from "antd";

const UserSidebar = () => {
  const location = useLocation();

  const menuItems = [
    {
      name: "My Farmgry Account",
      icon: <UserOutlined />,
      path: "/profile",
      title: "My Farmgry Account",
    },

    {
      name: "Orders",
      icon: <ShoppingCartOutlined />,
      path: "/profile/orders",
      title: "Orders",
    },
    {
      name: "Inbox",
      icon: <FaEnvelope />,
      path: "/profile/inbox",
      title: "Inbox",
    },
    {
      name: "Wishlist",
      icon: <HeartOutlined />,
      path: "/profile/wishlist",
      title: "Wishlist",
    },
  ];

  return (
    <motion.aside className="w-20 md:w-80">
      {/* Menu */}
      <nav className="flex flex-col gap-2 mt-10 border border-gray-300 rounded-md">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            title={item.title}
            className={`flex items-center gap-2 p-4 transition ${
              location.pathname === item.path
                ? "bg-gray-200"
                : "hover:bg-gray-100"
            }`}
          >
            <Space size={16} className="items-center">
              <span className="text-xl">{item.icon}</span>
              <span className="text-[1rem] font-light">{item.name}</span>
            </Space>
          </Link>
        ))}
      </nav>
    </motion.aside>
  );
};

export default UserSidebar;
