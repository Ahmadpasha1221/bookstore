import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRouteForAdmin = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    console.warn("Token not found. Redirecting to login.");
    return <Navigate to="/admin" replace />;
  }

  return children ? children : <Outlet />;
};

export default PrivateRouteForAdmin;
