import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const PrivateRoute = () => {
  const { user } = useAuth();

  return <div>{user ? <Outlet /> : <Navigate to="/" />}</div>;
};

export default PrivateRoute;
