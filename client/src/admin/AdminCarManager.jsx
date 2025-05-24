import React, { useState, useEffect } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import { Edit2, Trash2, Plus, Car, Upload, X } from "lucide-react";
import api from "../api";
import { useNavigate } from "react-router";

const AdminCarManager = () => {
  const [cars, setCars] = useState([]);
  const [form, setForm] = useState({
    name: "",
    type: "",
    pricePerKm: "",
    image: null,
  });
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  const fetchCars = async () => {
    try {
      setLoading(true);
      const { data } = await api.get("/cars");
      setCars(data.cars);
    } catch (err) {
      toast.error("Failed to fetch cars", err);
    } finally {
      setLoading(false);
    }
  };

  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/dashboard");
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      const file = files[0];
      setForm((prev) => ({ ...prev, image: file }));
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => setImagePreview(reader.result);
        reader.readAsDataURL(file);
      }
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("type", form.type);
    formData.append("pricePerKm", form.pricePerKm);
    if (form.image) formData.append("image", form.image);

    try {
      setLoading(true);
      if (editId) {
        await api.put(`/cars/${editId}`, formData);
        toast.success("Car updated successfully!");
        setEditId(null);
      } else {
        await api.post("/cars", formData);
        toast.success("Car created successfully!");
      }
      fetchCars();
      resetForm();
    } catch {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setForm({ name: "", type: "", pricePerKm: "", image: null });
    setImagePreview(null);
    setEditId(null);
  };

  const handleEdit = (car) => {
    setEditId(car._id);
    setForm({
      name: car.name,
      type: car.type,
      pricePerKm: car.pricePerKm,
      image: null,
    });
    setImagePreview(car.images[0]?.url || null);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this car?")) return;
    try {
      setLoading(true);
      await api.delete(`/cars/${id}`);
      toast.success("Car deleted successfully!");
      fetchCars();
    } catch {
      toast.error("Failed to delete car");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  const cardVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
    hover: {
      y: -8,
      scale: 1.02,
      boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
      transition: { type: "spring", stiffness: 300 },
    },
  };

  const buttonVariants = {
    hover: { scale: 1.05 },
    tap: { scale: 0.95 },
  };

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 p-4 sm:p-6 lg:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
        <motion.button
            onClick={handleClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition-all duration-300"
          >
            Go to Dashboard
          </motion.button>
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-8"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, type: "spring" }}
        >
          
          <div className="flex items-center justify-center gap-3 mb-4">
            <motion.div
              className="p-3 rounded-full bg-gradient-to-r from-green-600 to-green-700 text-white"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
            >
              <Car size={24} />
            </motion.div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-green-700 to-green-600 bg-clip-text text-transparent">
              Car Fleet Manager
            </h1>
          </div>
          <p className="text-gray-600 text-lg">
            Manage your vehicle fleet with ease
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 xl:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div className="xl:col-span-1" variants={itemVariants}>
            <div className="bg-white rounded-2xl shadow-xl border border-green-100 overflow-hidden">
              <div className="bg-gradient-to-r from-green-600 to-green-700 p-6">
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                  <Plus size={24} />
                  {editId ? "Update Car" : "Add New Car"}
                </h2>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                <motion.div variants={itemVariants}>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Car Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter car name"
                    value={form.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-0 transition-colors duration-200"
                    required
                  />
                </motion.div>

                <motion.div variants={itemVariants}>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Vehicle Type
                  </label>
                  <input
                    type="text"
                    name="type"
                    placeholder="e.g., SUV, Sedan, Hatchback"
                    value={form.type}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-0 transition-colors duration-200"
                    required
                  />
                </motion.div>

                <motion.div variants={itemVariants}>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Price per KM (₹)
                  </label>
                  <input
                    type="number"
                    name="pricePerKm"
                    placeholder="Enter price per kilometer"
                    value={form.pricePerKm}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-0 transition-colors duration-200"
                    min="0"
                    step="0.01"
                    required
                  />
                </motion.div>

                <motion.div variants={itemVariants}>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Car Image
                  </label>
                  <div className="relative">
                    <input
                      type="file"
                      name="image"
                      onChange={handleChange}
                      accept="image/*"
                      className="hidden"
                      id="image-upload"
                    />
                    <label
                      htmlFor="image-upload"
                      className="flex items-center justify-center w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-green-500 transition-colors duration-200"
                    >
                      <Upload className="mr-2" size={20} />
                      Choose Image
                    </label>
                  </div>

                  <AnimatePresence>
                    {imagePreview && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="mt-4 relative"
                      >
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="w-full h-32 object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setImagePreview(null);
                            setForm((prev) => ({ ...prev, image: null }));
                          }}
                          className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                        >
                          <X size={16} />
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                <motion.div className="flex gap-3" variants={itemVariants}>
                  <motion.button
                    type="submit"
                    disabled={loading}
                    className="flex-1 bg-gradient-to-r from-green-600 to-green-700 text-white py-3 px-6 rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                  >
                    {loading ? (
                      <div className="flex items-center justify-center">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Processing...
                      </div>
                    ) : (
                      <div className="flex items-center justify-center">
                        <Plus size={20} className="mr-2" />
                        {editId ? "Update Car" : "Add Car"}
                      </div>
                    )}
                  </motion.button>

                  {editId && (
                    <motion.button
                      type="button"
                      onClick={resetForm}
                      className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:border-gray-400 transition-colors"
                      variants={buttonVariants}
                      whileHover="hover"
                      whileTap="tap"
                    >
                      Cancel
                    </motion.button>
                  )}
                </motion.div>
              </form>
            </div>
          </motion.div>

          <motion.div className="xl:col-span-2" variants={itemVariants}>
            <div className="bg-white rounded-2xl shadow-xl border border-green-100 overflow-hidden">
              <div className="bg-gradient-to-r from-green-600 to-green-700 p-6">
                <h2 className="text-2xl font-bold text-white">
                  Fleet Overview
                </h2>
                <p className="text-green-100 mt-1">
                  {cars.length} vehicles in your fleet
                </p>
              </div>

              <div className="p-6">
                <AnimatePresence>
                  {loading ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex justify-center items-center h-64"
                    >
                      <div className="text-center">
                        <div className="w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                        <p className="text-gray-600">Loading cars...</p>
                      </div>
                    </motion.div>
                  ) : cars.length === 0 ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-center py-16"
                    >
                      <Car size={64} className="mx-auto text-gray-300 mb-4" />
                      <h3 className="text-xl font-semibold text-gray-600 mb-2">
                        No cars in your fleet
                      </h3>
                      <p className="text-gray-500">
                        Add your first car to get started
                      </p>
                    </motion.div>
                  ) : (
                    <motion.div
                      className="grid grid-cols-1 lg:grid-cols-2 gap-6"
                      variants={containerVariants}
                    >
                      {cars.map((car) => (
                        <motion.div
                          key={car._id}
                          className="bg-gradient-to-br from-white to-green-50 rounded-xl shadow-lg border border-green-100 overflow-hidden"
                          variants={cardVariants}
                          whileHover="hover"
                          layout
                        >
                          <div className="relative">
                            <img
                              src={
                                car.images[0]?.url || "/api/placeholder/400/200"
                              }
                              alt={car.name}
                              className="w-full h-48 object-fit"
                            />
                            <div className="absolute top-4 right-4">
                              <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                                {car.type}
                              </span>
                            </div>
                          </div>

                          <div className="p-6">
                            <h3 className="text-xl font-bold text-gray-800 mb-2">
                              {car.name}
                            </h3>
                            <div className="flex items-center justify-between mb-4">
                              <div className="flex items-center text-green-600">
                                <span className="text-2xl font-bold">
                                  ₹{car.pricePerKm}
                                </span>
                                <span className="text-sm text-gray-500 ml-1">
                                  /km
                                </span>
                              </div>
                            </div>

                            <div className="flex gap-2">
                              <motion.button
                                onClick={() => handleEdit(car)}
                                className="flex-1 flex items-center justify-center gap-2 py-2 px-4 bg-amber-500 text-white rounded-lg font-medium hover:bg-amber-600 transition-colors"
                                variants={buttonVariants}
                                whileHover="hover"
                                whileTap="tap"
                              >
                                <Edit2 size={16} />
                                Edit
                              </motion.button>
                              <motion.button
                                onClick={() => handleDelete(car._id)}
                                className="flex-1 flex items-center justify-center gap-2 py-2 px-4 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition-colors"
                                variants={buttonVariants}
                                whileHover="hover"
                                whileTap="tap"
                              >
                                <Trash2 size={16} />
                                Delete
                              </motion.button>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default AdminCarManager;
