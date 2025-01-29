import React from 'react'
import { Outlet, Navigate } from 'react-router'
import { useSelector } from "react-redux"

const ProtectedLayout = () => {
    const { user } = useSelector((state) => state.user)


  return user === null ? <Navigate to={"/login"} /> : <Outlet />
}

export default ProtectedLayout