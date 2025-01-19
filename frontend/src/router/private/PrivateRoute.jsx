import React from "react";
import { useAuth } from "../../context/provider";
import { Navigate } from "react-router-dom";
import Loading from "../../components/Loading";
const PrivateRoute = ({ children }) => {
  const { currentUser, loading } = useAuth();
  if (loading) {
    return <Loading />;
  }
  if (currentUser) {
    return children;
  }
  return <Navigate to="/login" replace />;
};

export default PrivateRoute;
