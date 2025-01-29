import { Route, Routes } from "react-router";

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
import AddProduct from "./pages/protected/AddProduct";

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />

        <Route path="products">
          <Route index element={<MarketPlace />} />
          <Route path=":product_id" element={<ProductDetails />} />
        </Route>

        <Route path="checkout" element={<Checkout />} />
        <Route path="cart" element={<Cart />} />

        {/* Protected Routes */}
        <Route element={<ProtectedLayout />}>
          <Route path="admin" element={<ProtectedAdminLayout />}>
            <Route index element={<Admin />} />
            <Route path=":order_id" element={<OrderDetails />} />
            <Route path="add-product" element={<AddProduct />} />
          </Route>

          <Route path="profile" element={<UserProfile />} />
        </Route>
        {/* **** */}

        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>
    </Routes>
  );
}

export default App;
