// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import {
  User,
  BarChart3,
  Users,
  FileText,
  Bell,
  Activity,
  TrendingUp,
  Shield,
  Search,
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

  const statsData = [
    {
      title: "Total Users",
      value: "2,847",
      change: "+12%",
      icon: Users,
      color: "from-green-400 to-green-600",
    },
    {
      title: "Revenue",
      value: "$48,392",
      change: "+8%",
      icon: TrendingUp,
      color: "from-green-500 to-green-700",
    },
    {
      title: "Active Sessions",
      value: "1,234",
      change: "+23%",
      icon: Activity,
      color: "from-green-600 to-green-800",
    },
    {
      title: "Reports",
      value: "89",
      change: "+5%",
      icon: FileText,
      color: "from-green-400 to-green-700",
    },
  ];

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
    {
      title: "Security",
      icon: Shield,
      action: () => toast.info("Security clicked"),
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
          <div className="text-center mb-8">
            <motion.h2
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, delay: 0.3 }}
              className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent mb-2"
            >
              Dashboard Overview
            </motion.h2>
            <p className="text-green-600">
              Monitor your system performance and analytics
            </p>
          </div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {statsData.map((stat) => (
            <motion.div
              key={stat.title}
              variants={cardVariants}
              whileHover="hover"
              className="bg-white rounded-2xl shadow-xl border border-green-100 overflow-hidden"
            >
              <div className={`bg-gradient-to-r ${stat.color} p-4`}>
                <div className="flex items-center justify-between text-white">
                  <stat.icon className="w-8 h-8" />
                  <span className="text-sm font-medium bg-white bg-opacity-20 px-2 py-1 rounded-full">
                    {stat.change}
                  </span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-2xl font-bold text-green-800 mb-1">
                  {stat.value}
                </h3>
                <p className="text-green-600 text-sm">{stat.title}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

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

        <motion.div
          variants={itemVariants}
          className="grid lg:grid-cols-2 gap-8"
        >
          <motion.div
            variants={cardVariants}
            whileHover={{ scale: 1.02 }}
            className="bg-white rounded-2xl shadow-xl border border-green-100 overflow-hidden"
          >
            <div className="bg-gradient-to-r from-green-600 to-green-700 px-6 py-4">
              <h3 className="text-xl font-bold text-white flex items-center">
                <Activity className="w-5 h-5 mr-2" />
                Recent Activity
              </h3>
            </div>
            <div className="p-6 space-y-4">
              {[
                {
                  action: "New user registered",
                  time: "2 minutes ago",
                  type: "user",
                },
                {
                  action: "Report generated",
                  time: "15 minutes ago",
                  type: "report",
                },
                {
                  action: "System backup completed",
                  time: "1 hour ago",
                  type: "system",
                },
                {
                  action: "Security scan finished",
                  time: "3 hours ago",
                  type: "security",
                },
              ].map((activity, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg"
                >
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-green-800 font-medium">
                      {activity.action}
                    </p>
                    <p className="text-green-600 text-sm">{activity.time}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            variants={cardVariants}
            whileHover={{ scale: 1.02 }}
            className="bg-white rounded-2xl shadow-xl border border-green-100 overflow-hidden"
          >
            <div className="bg-gradient-to-r from-green-600 to-green-700 px-6 py-4">
              <h3 className="text-xl font-bold text-white flex items-center">
                <BarChart3 className="w-5 h-5 mr-2" />
                Performance Metrics
              </h3>
            </div>
            <div className="p-6 space-y-4">
              {[
                { metric: "CPU Usage", value: "45%", color: "bg-green-400" },
                { metric: "Memory Usage", value: "62%", color: "bg-green-500" },
                { metric: "Disk Space", value: "78%", color: "bg-green-600" },
                { metric: "Network Load", value: "34%", color: "bg-green-400" },
              ].map((metric, index) => (
                <motion.div
                  key={metric.metric}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="space-y-2"
                >
                  <div className="flex justify-between text-green-800">
                    <span className="font-medium">{metric.metric}</span>
                    <span className="font-bold">{metric.value}</span>
                  </div>
                  <div className="w-full bg-green-100 rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: metric.value }}
                      transition={{ duration: 1, delay: index * 0.2 }}
                      className={`h-2 ${metric.color} rounded-full`}
                    ></motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        <motion.div variants={itemVariants} className="mt-12 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1 }}
            className="inline-flex items-center space-x-2 text-green-600 bg-green-50 px-6 py-3 rounded-full shadow-lg"
          >
            <Shield className="w-5 h-5" />
            <span className="font-medium">
              System Status: All Systems Operational
            </span>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Dashboard;
