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

  // Recheck authentication on route changes
  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch, location]);

  // Show a loading spinner while checking authentication
  if (isCheckingAuth) {
    return <Spin />;
 
  }
  if (user && !user.isVerified) return <Navigate to="/verify-email" replace />

  // Redirect to login if the user is not authenticated
  if (!user && !isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default ProtectedLayout;
