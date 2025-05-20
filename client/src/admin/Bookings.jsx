import { motion } from "framer-motion";

const Bookings = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
    >
      <h2 className="text-2xl font-bold mb-2">All Bookings</h2>
      <p className="text-gray-400">View and manage all user bookings here.</p>
    </motion.div>
  );
};

export default Bookings;
