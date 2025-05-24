import React, { useEffect, useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import api from "../api";
import { Car } from "lucide-react";
import { useNavigate } from "react-router";

const AdminRouteManager = () => {
  const [routes, setRoutes] = useState([]);
  const [cities, setCities] = useState([]);
  const [cars, setCars] = useState([]);
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    fromCity: "",
    toCity: "",
    car: "",
    totalPrice: "",
  });

  useEffect(() => {
    fetchRoutes();
    fetchCities();
    fetchCars();
  }, []);

  const fetchRoutes = async () => {
    setLoading(true);
    try {
      const { data } = await api.get("/routes");
      setRoutes(data.routes);
    } catch {
      toast.error("Failed to load routes");
    } finally {
      setLoading(false);
    }
  };

  const fetchCities = async () => {
    try {
      const { data } = await api.get("/cities");
      setCities(data.cities);
    } catch {
      toast.error("Failed to load cities");
    }
  };

  const fetchCars = async () => {
    try {
      const { data } = await api.get("/cars");
      setCars(data.cars);
    } catch {
      toast.error("Failed to load cars");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      ...form,
      totalPrice: isNaN(form.totalPrice) ? null : Number(form.totalPrice),
    };

    try {
      if (editId) {
        await api.put(`/routes/${editId}`, payload);
        toast.success("Route updated successfully!");
        setEditId(null);
      } else {
        await api.post("/routes", payload);
        toast.success("Route created successfully!");
      }
      setForm({ fromCity: "", toCity: "", car: "", totalPrice: "" });
      fetchRoutes();
    } catch {
      toast.error("Operation failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (route) => {
    if (editId === route._id) return toast.info("Already in edit mode");

    setEditId(route._id);
    setForm({
      fromCity: route.fromCity._id,
      toCity: route.toCity._id,
      car: route.car._id,
      totalPrice: route.totalPrice === null ? "" : route.totalPrice,
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this route?")) return;
    setLoading(true);
    try {
      await api.delete(`/routes/${id}`);
      toast.success("Route deleted successfully!");
      fetchRoutes();
    } catch {
      toast.error("Delete failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  };

  const formVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 15,
      },
    },
  };

   const navigate = useNavigate();
  
    const handleClick = () => {
      navigate("/dashboard");
    };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
          <motion.button
                onClick={handleClick}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition-all duration-300"
              >
                Go to Dashboard
              </motion.button>
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-green-800 mb-4">
            Route Manager
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-green-500 to-green-700 mx-auto rounded-full"></div>
        </motion.div>

        <motion.div
          variants={formVariants}
          initial="hidden"
          animate="visible"
          className="mb-12"
        >
          <div className="bg-white/80 backdrop-blur-sm border border-green-200/50 rounded-3xl shadow-2xl p-6 sm:p-8 lg:p-10">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                <motion.div
                  whileFocus={{ scale: 1.02 }}
                  className="relative group"
                >
                  <select
                    name="fromCity"
                    value={form.fromCity}
                    onChange={handleChange}
                    className="w-full px-4 py-3 sm:py-4 text-gray-700 bg-white/90 border-2 border-green-600 rounded-xl focus:border-green-500 focus:ring-4 focus:ring-green-200 transition-all duration-300 appearance-none cursor-pointer group-hover:border-green-400"
                    required
                  >
                    <option value="">From City</option>
                    {cities.map((c) => (
                      <option key={c._id} value={c._id}>
                        {c.city}
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg
                      className="w-5 h-5 text-green-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </motion.div>

                <motion.div
                  whileFocus={{ scale: 1.02 }}
                  className="relative group"
                >
                  <select
                    name="toCity"
                    value={form.toCity}
                    onChange={handleChange}
                    className="w-full px-4 py-3 sm:py-4 text-gray-700 bg-white/90 border-2 border-green-600 rounded-xl focus:border-green-500 focus:ring-4 focus:ring-green-200 transition-all duration-300 appearance-none cursor-pointer group-hover:border-green-400"
                    required
                  >
                    <option value="">To City</option>
                    {cities.map((c) => (
                      <option key={c._id} value={c._id}>
                        {c.city}
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg
                      className="w-5 h-5 text-green-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </motion.div>

                <motion.div
                  whileFocus={{ scale: 1.02 }}
                  className="relative group"
                >
                  <select
                    name="car"
                    value={form.car}
                    onChange={handleChange}
                    className="w-full px-4 py-3 sm:py-4 text-gray-700 bg-white/90 border-2 border-green-600 rounded-xl focus:border-green-500 focus:ring-4 focus:ring-green-200 transition-all duration-300 appearance-none cursor-pointer group-hover:border-green-400"
                    required
                  >
                    <option value="">Select Car</option>
                    {cars.map((c) => (
                      <option key={c._id} value={c._id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg
                      className="w-5 h-5 text-green-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </motion.div>

                <motion.input
                  whileFocus={{ scale: 1.02 }}
                  type="number"
                  name="totalPrice"
                  value={form.totalPrice}
                  onChange={handleChange}
                  placeholder="Price (₹)"
                  className="w-full px-4 py-3 sm:py-4 text-gray-700 bg-white/90 border-2 border-green-600 rounded-xl focus:border-green-500 focus:ring-4 focus:ring-green-200 transition-all duration-300 hover:border-green-400"
                />
              </div>

              <div className="flex justify-center">
                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 sm:px-12 py-3 sm:py-4 bg-gradient-to-r from-green-600 to-green-700 text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-xl hover:from-green-700 hover:to-green-800 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3"
                >
                  {loading && (
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                  )}
                  {editId ? "Update Route" : "Add Route"}
                </motion.button>
              </div>
            </form>
          </div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {routes.map((route) => (
              <motion.div
                key={route._id}
                layout
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.3 } }}
                whileHover={{
                  y: -8,
                  scale: 1.03,
                  transition: { type: "spring", stiffness: 300 },
                }}
                className={`group relative bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border ${
                  editId === route._id
                    ? "border-green-400 ring-4 ring-green-200"
                    : "border-green-200/50 hover:border-green-300"
                }`}
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-green-600"></div>

                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center">
                      <svg
                        className="w-6 h-6 text-green-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </div>
                    {editId === route._id && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full"
                      >
                        EDITING
                      </motion.div>
                    )}
                  </div>

                  <motion.h3
                    className="text-xl font-bold text-gray-800 mb-3 group-hover:text-green-700 transition-colors duration-300"
                    whileHover={{ scale: 1.02 }}
                  >
                    {route.fromCity.city}
                    <span className="mx-2 text-green-500">→</span>
                    {route.toCity.city}
                  </motion.h3>

                  <div className="space-y-2 mb-6">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Car className="text-green-600" />
                      <span className="font-medium">{route.car.name}</span>
                    </div>

                    <div className="flex items-center gap-2 text-gray-600">
                      <span className="font-semibold text-lg">
                        {route.totalPrice !== null ? (
                          <span className="text-green-700">
                            ₹{route.totalPrice}
                          </span>
                        ) : (
                          <span className="text-amber-600">Not Decided</span>
                        )}
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <motion.button
                      onClick={() => handleEdit(route)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex-1 py-2.5 bg-gradient-to-r from-amber-400 to-amber-500 text-white font-semibold rounded-xl hover:from-amber-500 hover:to-amber-600 transition-all duration-300 shadow-md hover:shadow-lg"
                    >
                      Edit
                    </motion.button>
                    <motion.button
                      onClick={() => handleDelete(route._id)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex-1 py-2.5 bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold rounded-xl hover:from-red-600 hover:to-red-700 transition-all duration-300 shadow-md hover:shadow-lg"
                    >
                      Delete
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {routes.length === 0 && !loading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-12 h-12 text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-700 mb-2">
              No Routes Yet
            </h3>
            <p className="text-gray-500">
              Create your first route to get started!
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default AdminRouteManager;
