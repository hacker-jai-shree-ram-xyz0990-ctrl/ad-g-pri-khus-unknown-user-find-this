import { Navigate } from "react-router-dom";
import { useAdminAuth } from "../auth/AdminAuthContext";

const ProtectedAdminRoute = ({ children }) => {
  const { token } = useAdminAuth();
  if (!token) return <Navigate to="/login" replace />;
  return children;
};

export default ProtectedAdminRoute;