import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import AdminLayout from "./admin/AdminLayout";
import Dashboard from "./admin/Dashboard";
import Cars from "./admin/Cars";
import Cities from "./admin/Cities";
import Pricing from "./admin/Pricing";
import Bookings from "./admin/Bookings";
import Home from "./pages/Home";
import Login from "./pages/AdminLogin";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import UserProfile from "./admin/UserProfile";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import AdminCarManager from "./admin/AdminCarManager";
import AdminCityManager from "./admin/AdminCityManager";
import AdminRouteManager from "./admin/AdminRouteManager";
import WhatsAppFloatingButton from "./components/WhatsappButton";

function App() {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <WhatsAppFloatingButton />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/cars" element={<AdminCarManager />} />
            <Route path="/cities" element={<AdminCityManager />} />
            <Route path="/pricing" element={<AdminRouteManager />} />
          </Route>

          <Route element={<PublicRoute />}>
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
