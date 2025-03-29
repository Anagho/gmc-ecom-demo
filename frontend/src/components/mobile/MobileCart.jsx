import { NavLink, useNavigate } from "react-router";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, X, LayoutGrid, Search,ShoppingCart } from "lucide-react";
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

const MobileCart = () => {
  return (
    <div>MobileCart</div>
  )
}

export default MobileCart