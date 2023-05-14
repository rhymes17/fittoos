import React from "react";
import useAuthStatus from "../hooks/useAuthStatus";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const { loggedIn, isChecking } = useAuthStatus();

  if (isChecking) return <h1>Loading...</h1>;

  return loggedIn ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
