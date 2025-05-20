import { motion } from "framer-motion";

const popularRoutes = [
  {
    from: "Delhi",
    to: "Jaipur",
    price: "₹1800",
    distance: "268 km",
    time: "5 hrs",
  },
  {
    from: "Mumbai",
    to: "Pune",
    price: "₹1500",
    distance: "148 km",
    time: "3 hrs",
  },
  {
    from: "Bangalore",
    to: "Mysore",
    price: "₹1200",
    distance: "143 km",
    time: "3.5 hrs",
  },
];

const staggerContainer = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 20 },
  },
};

const Card = ({ children, className, ...props }) => {
  return (
    <motion.div
      className={`bg-white rounded-xl p-4 sm:p-6 shadow-md ${className}`}
      whileHover={{ y: -5, boxShadow: "0 15px 30px rgba(0,0,0,0.1)" }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

const AnimatedButton = ({ children, className, ...props }) => {
  return (
    <motion.a
      className={`inline-block px-6 py-3 font-semibold rounded-full shadow-md touch-manipulation ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      {...props}
    >
      {children}
    </motion.a>
  );
};

const DesRoutes = () => {
  return (
    <section
      id="routes"
      className="py-16 sm:py-20 px-4 sm:px-6 lg:px-16 bg-white"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10 sm:mb-16"
        >
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-block px-3 py-1.5 sm:px-4 sm:py-2 mb-4 bg-green-100 text-green-800 rounded-full font-medium text-xs sm:text-sm"
          >
            Top Routes
          </motion.span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
            Popular Routes & Pricing
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our most booked routes with competitive pricing.
          </p>
        </motion.div>
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {popularRoutes.map((route, idx) => (
            <motion.div key={idx} variants={staggerItem}>
              <Card className="h-full border border-gray-200 hover:border-green-300 transition-all duration-300">
                <div className="flex justify-between items-start mb-4 sm:mb-6">
                  <div className="bg-green-100 px-2 sm:px-3 py-1 rounded-lg text-green-700 text-xs sm:text-sm font-medium">
                    Popular
                  </div>
                  <div className="text-green-700 text-lg sm:text-xl font-bold">
                    {route.price}
                  </div>
                </div>
                <div className="mb-4 sm:mb-6">
                  <div className="flex items-center justify-between">
                    <div className="text-lg sm:text-xl font-semibold">
                      {route.from}
                    </div>
                    <div className="text-gray-400 px-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
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
                    </div>
                    <div className="text-lg sm:text-xl font-semibold">
                      {route.to}
                    </div>
                  </div>
                  <div className="mt-2 flex justify-between text-xs sm:text-sm text-gray-500">
                    <span>{route.distance}</span>
                    <span>{route.time}</span>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full py-2 sm:py-3 bg-gradient-to-r from-green-50 to-green-100 hover:from-green-100 hover:to-green-200 text-green-700 rounded-lg font-medium border border-green-200 text-sm sm:text-base touch-manipulation"
                >
                  Book This Route
                </motion.button>
              </Card>
            </motion.div>
          ))}
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mt-10 sm:mt-12 text-center"
        >
          <AnimatedButton
            href="/pricing"
            className="bg-white text-green-700 border border-green-500 hover:bg-green-50 px-6 py-3 sm:px-8 sm:py-4 text-sm sm:text-base"
          >
            View All Routes
          </AnimatedButton>
        </motion.div>
      </div>
    </section>
  );
};

export default DesRoutes;
