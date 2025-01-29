import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";

const ProtectedAdminLayout = () => {
  const { user } = useSelector((state) => state.user);
  return user !== null && user.userType !== "admin" ? (
    <Navigate to={"/profile"} />
  ) : (
    <Outlet />
  );
};

export default ProtectedAdminLayout;
