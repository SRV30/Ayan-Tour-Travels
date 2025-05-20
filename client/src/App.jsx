import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminLayout from "./admin/AdminLayout";
import Dashboard from "./admin/Dashboard";
import Cars from "./admin/Cars";
import Cities from "./admin/Cities";
import Pricing from "./admin/Pricing";
import Bookings from "./admin/Bookings";
import Home from "./pages/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="cars" element={<Cars />} />
          <Route path="cities" element={<Cities />} />
          <Route path="pricing" element={<Pricing />} />
          <Route path="bookings" element={<Bookings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
