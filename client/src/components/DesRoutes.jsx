// eslint-disable-next-line no-unused-vars
import { motion, useAnimation } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import api from "../api";

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const staggerItem = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 400, damping: 20 },
  },
};

const Card = ({ children, className, ...props }) => {
  const controls = useAnimation();

  const handleHoverStart = async () => {
    await controls.start({
      y: -8,
      scale: 1.02,
      rotate: 1,
      boxShadow: "0 12px 24px rgba(0, 128, 0, 0.25)",
      background: "linear-gradient(135deg, #ffffff 0%, #c6f0d8 100%)",
      transition: { duration: 0.3 },
    });
  };

  const handleHoverEnd = async () => {
    await controls.start({
      y: 0,
      scale: 1,
      rotate: 0,
      boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
      background: "linear-gradient(135deg, #ffffff 0%, #e6fff0 100%)",
      transition: { duration: 0.3 },
    });
  };

  return (
    <motion.div
      className={`bg-gradient-to-br from-white to-green-50 rounded-2xl p-5 sm:p-6 shadow-lg border border-green-100 ${className}`}
      animate={controls}
      onHoverStart={handleHoverStart}
      onHoverEnd={handleHoverEnd}
      {...props}
    >
      {children}
    </motion.div>
  );
};

const AnimatedButton = ({ children, className, ...props }) => {
  const controls = useAnimation();

  useEffect(() => {
    const pulse = async () => {
      await controls.start({
        scale: [1, 1.05, 1],
        boxShadow: [
          "0 6px 12px rgba(0, 128, 0, 0.2)",
          "0 8px 16px rgba(0, 128, 0, 0.3)",
          "0 6px 12px rgba(0, 128, 0, 0.2)",
        ],
        transition: { duration: 2, repeat: Infinity, ease: "easeInOut" },
      });
    };
    pulse();
  }, [controls]);

  return (
    <motion.a
      className={`inline-block px-6 py-3 font-semibold rounded-full shadow-md touch-manipulation ${className}`}
      animate={controls}
      whileHover={{ scale: 1.05, boxShadow: "0 8px 16px rgba(0, 128, 0, 0.3)" }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      {...props}
    >
      {children}
    </motion.a>
  );
};

const DesRoutes = () => {
  const [loading, setLoading] = useState(false);
  const [routes, setRoutes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [visibleCount, setVisibleCount] = useState(6);
  const [showAll, setShowAll] = useState(false);
  const sectionRef = useRef(null);

  const fetchRoutes = async () => {
    setLoading(true);
    try {
      const { data } = await api.get("/routes");
      setRoutes(data.routes);
      console.log("Fetched routes:", data.routes);
    } catch (error) {
      console.error("Error fetching routes", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRoutes();

    const updateVisibleCount = () => {
      if (window.innerWidth < 640) {
        setVisibleCount(4);
      } else if (window.innerWidth < 1024) {
        setVisibleCount(4);
      } else {
        setVisibleCount(6);
      }
    };

    updateVisibleCount();
    window.addEventListener("resize", updateVisibleCount);
    return () => window.removeEventListener("resize", updateVisibleCount);
  }, []);

  useEffect(() => {
    if (showAll && sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [showAll, routes]);

  const filteredRoutes = routes.filter((route) => {
    const from = route.fromCity?.city?.toLowerCase() || "";
    const to = route.toCity?.city?.toLowerCase() || "";
    const car = route.car?.name?.toLowerCase() || "";
    const term = searchTerm.toLowerCase();
    return from.includes(term) || to.includes(term) || car.includes(term);
  });

  const displayedRoutes = showAll
    ? filteredRoutes
    : filteredRoutes.slice(0, visibleCount);

  const generateWhatsAppLink = (route) => {
    const message = encodeURIComponent(
      `Hi, I want to book a ride from ${route.fromCity?.city} to ${route.toCity?.city} with ${route.car?.name} for ₹${route.totalPrice}. Please assist!`
    );
    return `https://wa.me/+917070186631?text=${message}`;
  };

  return (
    <section
      id="routes"
      ref={sectionRef}
      className="py-16 sm:py-24 px-4 sm:px-6 lg:px-16 bg-gradient-to-b from-white to-green-50"
    >
      <div className="max-w-7xl mx-auto relative">


        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-block px-4 py-2 mb-4 bg-green-100 text-green-800 rounded-full font-medium text-sm sm:text-base shadow-sm"
          >
            Top Routes
          </motion.span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4 text-gray-900 bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-blue-600">
            Popular Routes & Pricing
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto">
            Explore our most popular routes with transparent pricing for
            seamless travel.
          </p>
        </motion.div>

        <div className="mb-8 max-w-md mx-auto">
          <motion.input
            type="text"
            placeholder="Search by city or car..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            whileFocus={{
              scale: 1.02,
              borderColor: "#10B981",
              boxShadow: "0 0 8px rgba(16, 185, 129, 0.3)",
            }}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-white text-gray-900 placeholder-gray-500 transition-all duration-300"
          />
        </div>

        {loading && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-gray-500 text-sm sm:text-base mb-6"
          >
            Loading routes...
          </motion.p>
        )}

        {!loading && filteredRoutes.length === 0 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-red-500 text-sm sm:text-base mb-6"
          >
            No matching routes found.
          </motion.p>
        )}

        {!loading && displayedRoutes.length > 0 && (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
            variants={staggerContainer}
            initial="hidden"
            animate="show"
          >
            {displayedRoutes.map((route, idx) => (
              <motion.div key={idx} variants={staggerItem}>
                <Card className="h-full flex flex-col justify-between transition-all duration-300">
                  <div>
                    <div className="flex justify-between items-start mb-4 sm:mb-6">
                      <div className="bg-green-100 px-3 py-1 rounded-lg text-green-700 text-xs sm:text-sm font-medium">
                        Popular
                      </div>
                      <div className="text-green-700 text-lg sm:text-xl font-bold">
                        {route.car?.name}
                      </div>
                    </div>
                    <div className="mb-4 sm:mb-6">
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <div className="text-lg sm:text-xl font-semibold text-gray-900">
                          {route.fromCity?.city}
                        </div>
                        <motion.div
                          className="text-gray-400 px-2"
                          animate={{ x: [0, 6, 0], scale: [1, 1.2, 1] }}
                          transition={{
                            duration: 1.8,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                            <polyline points="12 5 19 12 12 19"></polyline>
                          </svg>
                        </motion.div>
                        <div className="text-lg sm:text-xl font-semibold text-gray-900">
                          {route.toCity?.city}
                        </div>
                        <div className="text-green-700 text-lg sm:text-xl font-bold flex items-center gap-1 bg-green-50 px-3 py-1 rounded-full">
                          <span className="text-base sm:text-lg">₹</span>
                          <span>{route.totalPrice}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <AnimatedButton
                    href={generateWhatsAppLink(route)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2 sm:py-3 bg-gradient-to-r from-green-600 to-green-700 text-white hover:from-green-700 hover:to-green-800 rounded-lg font-medium text-sm sm:text-base flex items-center justify-center gap-2"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="group-hover:scale-110 transition-transform duration-300"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    Book This Route
                  </AnimatedButton>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}

        {!showAll && filteredRoutes.length > visibleCount && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="mt-10 sm:mt-12 text-center"
          >
            <AnimatedButton
              onClick={() => setShowAll(true)}
              className="cursor-pointer bg-gradient-to-r from-green-600 to-green-700 text-white hover:from-green-700 hover:to-green-800 px-6 py-3 sm:px-8 sm:py-4 text-sm sm:text-base"
            >
              View All Routes
            </AnimatedButton>
          </motion.div>
        )}

        {showAll && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="mt-10 sm:mt-12 text-center"
          >
            <AnimatedButton
              onClick={() => setShowAll(false)}
              className="cursor-pointer bg-white text-green-700 border border-green-500 hover:bg-green-50 px-6 py-3 sm:px-8 sm:py-4 text-sm sm:text-base"
            >
              Show Less
            </AnimatedButton>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default DesRoutes;
