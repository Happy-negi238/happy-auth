import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { authenticate } from "./api/axios/apps";
import { useAuth } from "./context/AuthContext";

const ProtectedRoute = () => {
  const [loading, setLoading] = useState(true);
  const { isAuthenticated, setIsAuthenticated } = useAuth();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await authenticate();
        setIsAuthenticated(response.data);
      } catch (error) {
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/sign-in" replace />;
};

export default ProtectedRoute;
