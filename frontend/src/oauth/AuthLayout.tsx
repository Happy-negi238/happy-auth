import { Outlet, Navigate, useSearchParams } from "react-router-dom";

const AuthLayout = () => {
  const [searchParams] = useSearchParams();

  const clientId = searchParams.get("client_id");

  if (!clientId) {
    return <Navigate to="/not-found" replace />; // or render your own error component
  }

  return <Outlet />;
};

export default AuthLayout;
