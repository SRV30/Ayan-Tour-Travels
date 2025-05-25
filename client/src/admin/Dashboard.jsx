// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import {
  User,
  Home,
  Car,
  BuildingIcon,
  IndianRupee,
  Contact,
} from "lucide-react";
import LogoutButton from "../components/LogoutButton";

const Dashboard = () => {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4 },
    },
    hover: {
      scale: 1.05,
      transition: { duration: 0.2 },
    },
  };

  const quickActions = [
    { title: "My Profile", icon: User, action: () => navigate("/profile") },
    {
      title: "Cars",
      icon: Car,
      action: () => navigate("/cars"),
    },
    {
      title: "City",
      icon: BuildingIcon,
      action: () => navigate("/cities"),
    },
    {
      title: "Pricing",
      icon: IndianRupee,
      action: () => navigate("/pricing"),
    },
    {
      title: "Contact Us",
      icon: Contact,
      action: () => navigate("/contact"),
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white shadow-lg border-b border-green-100"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
                className="bg-gradient-to-r from-green-600 to-green-700 p-2 rounded-xl shadow-lg"
              >
                <Home className="w-6 h-6 text-white" />
              </motion.div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">
                  Admin Dashboard
                </h1>
                <p className="text-green-600 text-sm">Welcome back, Admin!</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <LogoutButton />
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
      >
        <motion.div variants={itemVariants} className="mb-8">
          <h3 className="text-2xl font-bold text-green-800 mb-6 text-center">
            Quick Actions
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {quickActions.map((action) => (
              <motion.button
                key={action.title}
                variants={cardVariants}
                whileHover="hover"
                whileTap={{ scale: 0.95 }}
                onClick={action.action}
                className="bg-white rounded-2xl shadow-lg border border-green-100 p-6 text-center hover:shadow-xl transition-all duration-300 group"
              >
                <div className="bg-gradient-to-r from-green-100 to-green-200 rounded-full p-3 mb-3 mx-auto w-fit group-hover:from-green-200 group-hover:to-green-300 transition-all duration-300">
                  <action.icon className="w-6 h-6 text-green-600" />
                </div>
                <p className="text-green-800 font-medium text-sm">
                  {action.title}
                </p>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Dashboard;
