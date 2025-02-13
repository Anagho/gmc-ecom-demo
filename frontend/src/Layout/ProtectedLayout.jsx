import React from "react";
import { Outlet, Navigate } from "react-router";
import { useSelector } from "react-redux";

const ProtectedLayout = () => {
  const { user } = useSelector((state) => state.auth);
 
  return user === null ? <Navigate to={"/login"} /> : <Outlet />;
};

export default ProtectedLayout;
