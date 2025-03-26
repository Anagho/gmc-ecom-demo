import { useEffect } from "react";
import { Outlet, Navigate, useLocation } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { Spin } from "antd";
import { checkAuth } from "../features/auth/authSlice";

const ProtectedLayout = () => {
  const { user, isAuthenticated, isCheckingAuth } = useSelector(
    (state) => state.auth
  );

  const location = useLocation();
  const dispatch = useDispatch();

  // Show a loading spinner while checking authentication
  if (isCheckingAuth) {
    return <Spin />;
 
  }
  if (!isAuthenticated ) return <Navigate to={"/"} />

  // Redirect to login if the user is not authenticated
  

  return <Outlet />;
};

export default ProtectedLayout;
