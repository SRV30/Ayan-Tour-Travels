// src/components/PublicRoute.jsx
import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = () => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  const isLoggedIn = !!token;
  const isAdmin = user?.role === "ADMIN";

  // Redirect logged-in admin to dashboard
  if (isLoggedIn && isAdmin) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};

export default PublicRoute;
