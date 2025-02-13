import { Navigate, Route, Routes } from "react-router";
import { useSelector } from "react-redux";
import { Spin } from "antd";

import Cart from "./pages/Cart";
import MarketPlace from "./pages/MarketPlace";
import ProductDetails from "./pages/ProductDetails";
import MainLayout from "./Layout/MainLayout";
import HomePage from "./pages/HomePage";
import Checkout from "./pages/Checkout";
import Admin from "./pages/protected/Admin";
import OrderDetails from "./components/admin/orders/OrderDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserProfile from "./pages/UserProfile";
import ProtectedLayout from "./Layout/ProtectedLayout";
import ProtectedAdminLayout from "./Layout/ProtectedAdminLayout";
import AddProductPage from "./pages/protected/AddProductPage";
import NotFound from "./pages/NotFound";
import ProductsPage from "./pages/protected/ProductsPage";
import OrdersPage from "./pages/protected/OrdersPage";
import UsersPage from "./pages/protected/UsersPage";
import UserDetails from "./components/admin/users/UserDetails";
import EmailVerificationPage from "./pages/EmailVerificationPage";
import { Toaster } from "react-hot-toast";

function App() {
  
  return (
    <>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />

          <Route path="products">
            <Route index element={<MarketPlace />} />
            <Route path=":product_id" element={<ProductDetails />} />
          </Route>

          <Route path="checkout" element={<Checkout />} />
          <Route path="cart" element={<Cart />} />

          {/* Public Routes */}
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="verify-email" element={<EmailVerificationPage />} />

          {/* Protected User Routes */}
          <Route element={<ProtectedLayout />}>
            {/* Protected Admin Routes */}
            <Route path="admin" element={<ProtectedAdminLayout />}>
              <Route index element={<Admin />} />
              <Route path=":order_id" element={<OrderDetails />} />
              <Route path="user/:user_id" element={<UserDetails />} />
              <Route path="add-product" element={<AddProductPage />} />
              <Route path="products" element={<ProductsPage />} />
              <Route path="orders" element={<OrdersPage />} />
              <Route path="users" element={<UsersPage />} />
            </Route>
          </Route>

          <Route path="profile" element={<UserProfile />} />
        </Route>

        {/* 404 Page */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
