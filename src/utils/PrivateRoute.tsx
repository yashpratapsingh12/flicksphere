import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import Spinner from "../Components/Spinner";

const PrivateRoute = () => {
  const { user, loading } = useAuth();

  if (loading) {
    <Spinner />;
  }
  return <div>{user ? <Outlet /> : <Navigate to="/" />}</div>;
};

export default PrivateRoute;
