import React from "react";
import { Navigate } from "react-router-dom";

interface IPrivateRoute {
  children: React.ReactNode;
}
const PrivateRoute: React.FC<IPrivateRoute> = ({ children }) => {
  const authenticated = localStorage.getItem("token");

  return authenticated ? <>{children}</> : <Navigate to={"/"} replace />;
};

export default PrivateRoute;
