import { motion } from "framer-motion";

const Dashboard = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      <p className="text-gray-400">Welcome to the futuristic admin panel.</p>
    </motion.div>
  );
};

export default Dashboard;
