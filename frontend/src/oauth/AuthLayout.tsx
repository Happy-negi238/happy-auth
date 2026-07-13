import { oauthSignUpClientId } from "@/api/axios/apps";
import { useEffect, useState } from "react";
import { Outlet, Navigate, useSearchParams } from "react-router-dom";
import Unauthorized from "./oauth-signup/Unauthorized";

const AuthLayout = () => {
  const [searchParams] = useSearchParams();

  const [loading, setLoading] = useState(true);
  const [verified, setVerified] = useState(false);

  const clientId = searchParams.get("client_id");

  useEffect(() => {
    if (!clientId) {
      setLoading(false);
      return;
    }

    const verifyClient = async () => {
      try {
        await oauthSignUpClientId(clientId);
        setVerified(true);
      } catch {
        setVerified(false);
      } finally {
        setLoading(false);
      }
    };

    verifyClient();
  }, [clientId]);

  if (!clientId) {
    return <Navigate to="/not-found" replace />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!verified) {
    return <Unauthorized />;
  }

  return <Outlet />;
};

export default AuthLayout;
