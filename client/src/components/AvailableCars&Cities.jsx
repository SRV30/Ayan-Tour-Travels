import React, { useEffect, useState } from "react";
import api from "../api";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const AvailableCarsandCities = () => {
  const [cities, setCities] = useState([]);
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCities = async () => {
    try {
      const { data } = await api.get("/cities");
      setCities(data.cities);
    } catch {
      console.log("Failed to fetch cities");
    }
  };

  const fetchCars = async () => {
    try {
      setLoading(true);
      const { data } = await api.get("/cars");
      setCars(data.cars);
    } catch (err) {
      console.error("Failed to fetch cars:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCities();
    fetchCars();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
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
        damping: 12,
      },
    },
  };

  const cardHoverVariants = {
    hover: {
      scale: 1.05,
      y: -10,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
      },
    },
  };

  const imageVariants = {
    hover: {
      scale: 1.1,
      transition: {
        duration: 0.4,
        ease: "easeInOut",
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(34,197,94,0.1),transparent_50%)] pointer-events-none"></div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex justify-center mb-16"
        >
          <a
            href="/"
            className=" bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-medium px-6 py-3 rounded-full shadow-lg transition transform hover:scale-105"
          >
            Back to Home
          </a>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold bg-gradient-to-r from-green-600 via-green-700 to-green-800 bg-clip-text text-transparent mb-4">
            Available Cars & Cities
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-green-500 to-green-600 mx-auto rounded-full"></div>
        </motion.div>

        {loading ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-20"
          >
            <div className="relative">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="w-16 h-16 border-4 border-green-200 border-t-green-600 rounded-full"
              ></motion.div>
            </div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-4 text-lg text-green-700 font-medium"
            >
              Loading amazing content...
            </motion.p>
          </motion.div>
        ) : (
          <>
            <motion.section
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="mb-20"
            >
              <motion.div variants={itemVariants} className="mb-10">
                <h2 className="text-3xl sm:text-4xl font-bold text-green-800 mb-2 flex items-center">
                  <span className="w-8 h-8 bg-green-600 rounded-full mr-3"></span>
                  Cities
                </h2>
                <p className="text-green-600 text-lg ml-11">
                  Discover our service locations
                </p>
              </motion.div>

              <motion.div
                variants={containerVariants}
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
              >
                {cities.map((city, index) => (
                  <motion.div
                    key={city._id}
                    variants={itemVariants}
                    whileHover="hover"
                    className="group cursor-pointer"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <motion.div
                      variants={cardHoverVariants}
                      className="relative p-6 bg-white rounded-2xl shadow-lg border border-green-100 hover:shadow-2xl transition-all duration-300 overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-white opacity-50 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="relative z-10">
                        <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                          <svg
                            className="w-6 h-6 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                          </svg>
                        </div>
                        <h3 className="text-xl font-bold text-green-800 mb-2 group-hover:text-green-700 transition-colors duration-300">
                          {city.city}
                        </h3>
                        <p className="text-green-600 font-medium">
                          {city.state}, {city.country}
                        </p>
                      </div>
                    </motion.div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.section>

            <motion.section
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div variants={itemVariants} className="mb-10">
                <h2 className="text-3xl sm:text-4xl font-bold text-green-800 mb-2 flex items-center">
                  <span className="w-8 h-8 bg-green-600 rounded-full mr-3"></span>
                  Cars
                </h2>
                <p className="text-green-600 text-lg ml-11">
                  Choose your perfect ride
                </p>
              </motion.div>

              <motion.div
                variants={containerVariants}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
              >
                {cars.map((car, index) => (
                  <motion.div
                    key={car._id}
                    variants={itemVariants}
                    whileHover="hover"
                    className="group cursor-pointer"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <motion.div
                      variants={cardHoverVariants}
                      className="bg-white rounded-3xl shadow-xl overflow-hidden border border-green-100 hover:shadow-2xl transition-all duration-500"
                    >
                      <div className="relative overflow-hidden">
                        <motion.img
                          variants={imageVariants}
                          src={car.images[0]?.url}
                          alt={car.name}
                          className="w-full h-64 object-fit"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 transform translate-x-full group-hover:translate-x-0 transition-transform duration-300">
                          <span className="text-sm font-bold text-green-700">
                            ₹{car.pricePerKm}/km
                          </span>
                        </div>
                      </div>

                      <div className="p-6">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="text-xl font-bold text-green-800 group-hover:text-green-700 transition-colors duration-300">
                            {car.name}
                          </h3>
                          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center text-green-600">
                            <span className="font-medium">{car.type}</span>
                          </div>

                          <motion.div
                            className="flex items-center  pt-4 border-t border-green-100"
                            whileHover={{ scale: 1.02 }}
                          >
                            <span className="text-2xl font-bold text-green-700 mr-1">
                              ₹{car.pricePerKm}
                            </span>
                            <span className="text-green-600 font-medium">
                              per km
                            </span>
                          </motion.div>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.section>
          </>
        )}
      </motion.div>
    </div>
  );
};

export default AvailableCarsandCities;
