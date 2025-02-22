import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const token = localStorage.getItem("token"); // Check if user is authenticated

  return token ? <Outlet /> : <Navigate to="/signin" replace />;
};

export default ProtectedRoute;
