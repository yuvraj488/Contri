import { Navigate } from "react-router-dom";

import { useAuth } from "@/context/AuthContext";
import PageLoader from "@/components/common/PageLoader";
export default function HomeRedirect() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
  return <PageLoader />;
}

  return (
    <Navigate
      to={isAuthenticated ? "/dashboard" : "/login"}
      replace
    />
  );
}