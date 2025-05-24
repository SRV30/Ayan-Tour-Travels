import { useEffect, useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import api from "../api";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const [user, setUser] = useState({ name: "", email: "", mobile: "" });
  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/dashboard");
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await api.get("/admin/me");
        setUser({
          name: data.user.name || "",
          email: data.user.email || "",
          mobile: data.user.mobile || "",
        });
      } catch (err) {
        toast.error(
          "Failed to load user details",
          {
            position: "top-right",
            autoClose: 3000,
            theme: "light",
          },
          err
        );
      }
    };
    fetchUser();
  }, []);

  const handleUpdateDetails = async (e) => {
    e.preventDefault();
    setUpdating(true);
    try {
      const { data } = await api.put("/admin/me/update", {
        name: user.name,
        email: user.email,
        mobile: user.mobile,
      });
      toast.success("Profile updated successfully", {
        position: "top-right",
        autoClose: 3000,
        theme: "light",
      });
      setUser({
        name: data.user.name || "",
        email: data.user.email || "",
        mobile: data.user.mobile || "",
      });
    } catch (err) {
      toast.error(err.response?.data?.message || "Update failed", {
        position: "top-right",
        autoClose: 3000,
        theme: "light",
      });
    } finally {
      setUpdating(false);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match", {
        position: "top-right",
        autoClose: 3000,
        theme: "light",
      });
      setLoading(false);
      return;
    }

    try {
      await api.put("/admin/password/update", {
        oldPassword,
        newPassword,
        confirmPassword,
      });
      toast.success("Password updated successfully", {
        position: "top-right",
        autoClose: 3000,
        theme: "light",
      });
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      toast.error(err.response?.data?.message || "Password update failed", {
        position: "top-right",
        autoClose: 3000,
        theme: "light",
      });
    } finally {
      setLoading(false);
    }
  };

  const inputVariants = {
    focus: {
      scale: 1.02,
      borderColor: "#10B981",
      transition: { duration: 0.3 },
    },
    blur: { scale: 1, borderColor: "#D1D5DB", transition: { duration: 0.3 } },
  };

  const buttonVariants = {
    hover: {
      scale: 1.05,
      backgroundColor: "#059669",
      transition: { duration: 0.3 },
    },
    tap: { scale: 0.95 },
    disabled: { opacity: 0.5, cursor: "not-allowed" },
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl w-full space-y-10">
        <motion.button
          onClick={handleClick}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition-all duration-300"
        >
          Go to Dashboard
        </motion.button>
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-extrabold text-green-700 text-center"
        >
          My Profile
        </motion.h2>

        <AnimatePresence>
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            onSubmit={handleUpdateDetails}
            className="bg-white shadow-lg rounded-2xl p-8 space-y-6"
          >
            <motion.div
              variants={inputVariants}
              whileFocus="focus"
              animate="blur"
              className="space-y-2"
            >
              <label className="block text-green-800 font-semibold text-sm">
                Name
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 bg-white text-gray-900 placeholder-gray-400 transition-all duration-300"
                value={user.name}
                onChange={(e) => setUser({ ...user, name: e.target.value })}
                placeholder="Enter your name"
              />
            </motion.div>

            <motion.div
              variants={inputVariants}
              whileFocus="focus"
              animate="blur"
              className="space-y-2"
            >
              <label className="block text-green-800 font-semibold text-sm">
                Email
              </label>
              <input
                type="email"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 bg-white text-gray-900 placeholder-gray-400 transition-all duration-300"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                placeholder="Enter your email"
              />
            </motion.div>

            <motion.div
              variants={inputVariants}
              whileFocus="focus"
              animate="blur"
              className="space-y-2"
            >
              <label className="block text-green-800 font-semibold text-sm">
                Mobile
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 bg-white text-gray-900 placeholder-gray-400 transition-all duration-300"
                value={user.mobile}
                onChange={(e) => setUser({ ...user, mobile: e.target.value })}
                placeholder="Enter your mobile number"
              />
            </motion.div>

            <motion.button
              type="submit"
              disabled={updating}
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              animate={updating ? "disabled" : ""}
              className="w-full bg-green-600 text-white font-bold py-3 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {updating ? "Updating..." : "Update Profile"}
            </motion.button>
          </motion.form>
        </AnimatePresence>

        <AnimatePresence>
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            onSubmit={handleChangePassword}
            className="bg-white shadow-lg rounded-2xl p-8 space-y-6"
          >
            <motion.h3
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="text-2xl font-semibold text-green-700"
            >
              Change Password
            </motion.h3>

            <motion.div
              variants={inputVariants}
              whileFocus="focus"
              animate="blur"
              className="space-y-2"
            >
              <label className="block text-green-800 font-semibold text-sm">
                Old Password
              </label>
              <input
                type="password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 bg-white text-gray-900 placeholder-gray-400 transition-all duration-300"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                placeholder="Enter old password"
              />
            </motion.div>

            <motion.div
              variants={inputVariants}
              whileFocus="focus"
              animate="blur"
              className="space-y-2"
            >
              <label className="block text-green-800 font-semibold text-sm">
                New Password
              </label>
              <input
                type="password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 bg-white text-gray-900 placeholder-gray-400 transition-all duration-300"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
              />
            </motion.div>

            <motion.div
              variants={inputVariants}
              whileFocus="focus"
              animate="blur"
              className="space-y-2"
            >
              <label className="block text-green-800 font-semibold text-sm">
                Confirm New Password
              </label>
              <input
                type="password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 bg-white text-gray-900 placeholder-gray-400 transition-all duration-300"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
              />
            </motion.div>

            <motion.button
              type="submit"
              disabled={loading}
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              animate={loading ? "disabled" : ""}
              className="w-full bg-green-600 text-white font-bold py-3 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Updating..." : "Update Password"}
            </motion.button>
          </motion.form>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default UserProfile;
