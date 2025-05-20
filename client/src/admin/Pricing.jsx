import { motion } from "framer-motion";

const Pricing = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
    >
      <h2 className="text-2xl font-bold mb-2">Manage Pricing</h2>
      <p className="text-gray-400">Set prices between cities for one-way/two-way trips.</p>
    </motion.div>
  );
};

export default Pricing;
