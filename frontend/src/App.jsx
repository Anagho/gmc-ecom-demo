import { Navigate, Route, Routes } from "react-router";
import { useDispatch, useSelector } from "react-redux";
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
import toast, { Toaster } from "react-hot-toast";
import { checkAuth, setError } from "./features/auth/authSlice";
import { useEffect } from "react";
import axios from "axios";
import { serverUrl } from "./utils/helper";

// Redirect authenticated users to the homepage
const RedirectAuthenticatedUser = ({ children, message }) => {
  const { isCheckingAuth, isAuthenticated, user } = useSelector(
    (state) => state.auth
  );

  if (isCheckingAuth) {
    return (
      <Spin
        size="large"
        className="h-screen flex justify-center items-center"
      />
    ); // Show a spinner while checking auth
  }

  if (isAuthenticated && user?.isVerified) {
    toast.success(message);
    return <Navigate to="/" replace />;
  }

  return children;
};

function App() {
  const dispatch = useDispatch();

  const { isCheckingAuth, isAuthenticated, user } = useSelector(
    (state) => state.auth
  );

  console.log("isAuthenticated:", isAuthenticated);
  console.log("user:", user);

  useEffect(() => {
    const handleCheckAuth = async () => {
      try {
        const response = await axios.get(`${serverUrl}/auth/check-auth`, {
          withCredentials: true,
        });

        if (response.data.user) {
          dispatch(checkAuth(response.data.user));
        } else {
          dispatch(checkAuth(null));
        }
      } catch (error) {
        dispatch(checkAuth(null)); // Ensure state resets on error
        dispatch(
          setError(
            error.response?.data?.message || "Authentication check failed"
          )
        );
      }
    };

    handleCheckAuth();
  }, [dispatch]);

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
          <Route
            path="login"
            element={
              <RedirectAuthenticatedUser message="You are already logged in">
                <Login />
              </RedirectAuthenticatedUser>
            }
          />
          <Route
            path="register"
            element={
              <RedirectAuthenticatedUser message="You are already registered">
                <Register />
              </RedirectAuthenticatedUser>
            }
          />
          <Route
            path="verify-email"
            element={
              <RedirectAuthenticatedUser message="Your email is already verified">
                <EmailVerificationPage />
              </RedirectAuthenticatedUser>
            }
          />

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
            <Route path="profile" element={<UserProfile />} />
          </Route>

          {/* 404 Page */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
