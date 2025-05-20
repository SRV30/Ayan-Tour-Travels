import { motion } from "framer-motion";

const Cars = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
    >
      <h2 className="text-2xl font-bold mb-2">Manage Cars</h2>
      <p className="text-gray-400">Add, edit or delete car types here.</p>
    </motion.div>
  );
};

export default Cars;
