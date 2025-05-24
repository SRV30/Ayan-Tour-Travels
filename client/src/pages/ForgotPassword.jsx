import { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import api from "../api";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await api.post("/admin/password/forgot", { email });
      toast.success(data.message || "Reset link sent!", {
        position: "top-center",
        autoClose: 4000,
        hideProgressBar: false,
      });
      setIsSubmitted(true);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to send reset link", {
        position: "top-center",
      });
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
        duration: 0.6,
      },
    },
    exit: {
      opacity: 0,
      y: 20,
      transition: { duration: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 24 },
    },
  };

  const inputVariants = {
    focused: { scale: 1.02, boxShadow: "0 0 12px rgba(34,197,94,0.5)" },
    unfocused: { scale: 1, boxShadow: "none" },
  };

  const buttonVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.03, boxShadow: "0 8px 20px rgba(34,197,94,0.3)" },
    tap: { scale: 0.95 },
    loading: {
      boxShadow: "0 0 15px rgba(34,197,94,0.7)",
      transition: {
        repeat: Infinity,
        repeatType: "reverse",
        duration: 1,
      },
    },
  };

  const successVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-white px-4 py-16">
      <AnimatePresence mode="wait">
        {!isSubmitted ? (
          <motion.div
            key="form"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={containerVariants}
            className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-8 md:p-10 border border-green-200 backdrop-blur-sm"
          >
            <motion.div variants={itemVariants} className="mb-8">
              <motion.h2
                className="text-3xl md:text-4xl font-extrabold text-green-700 mb-3 text-center tracking-tight"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 300 }}
              >
                Forgot Password
              </motion.h2>
              <motion.p
                className="text-green-600 text-center text-md md:text-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                Enter your email to receive a reset link
              </motion.p>
            </motion.div>

            <form onSubmit={handleSubmit} className="space-y-8">
              <motion.div variants={itemVariants}>
                <motion.div
                  variants={inputVariants}
                  animate={isFocused ? "focused" : "unfocused"}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  className="relative"
                >
                  <label
                    htmlFor="email"
                    className="block mb-3 font-semibold text-green-700 text-lg"
                  >
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    className="w-full px-5 py-4 rounded-xl border-2 border-green-300 bg-green-50 placeholder-green-400 text-green-900 font-medium
                      focus:outline-none focus:ring-4 focus:ring-green-200 focus:border-green-500 transition-all duration-300"
                  />
                  <motion.div
                    initial={{ width: "0%" }}
                    animate={{ width: email.length > 0 ? "100%" : "0%" }}
                    className="h-1 bg-gradient-to-r from-green-400 to-green-600 rounded-full mt-1 origin-left"
                    style={{ transformOrigin: "left" }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                </motion.div>
              </motion.div>

              <motion.div variants={itemVariants}>
                <motion.button
                  type="submit"
                  disabled={loading}
                  variants={buttonVariants}
                  initial="initial"
                  whileHover={!loading ? "hover" : ""}
                  whileTap={!loading ? "tap" : ""}
                  animate={loading ? "loading" : "initial"}
                  className="w-full bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600
                    text-white font-bold py-4 rounded-xl shadow-lg tracking-wide text-lg
                    disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-300"
                >
                  {loading ? (
                    <div className="flex justify-center items-center space-x-3">
                      <svg
                        className="animate-spin h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v8z"
                        ></path>
                      </svg>
                      <span>Sending Link...</span>
                    </div>
                  ) : (
                    "Send Reset Link"
                  )}
                </motion.button>
              </motion.div>

              <motion.div variants={itemVariants} className="text-center">
                <motion.a
                  href="/login"
                  className="text-green-600 hover:text-green-800 font-medium text-sm inline-flex items-center transition-colors duration-300"
                  whileHover={{ scale: 1.05 }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 17l-5-5m0 0l5-5m-5 5h12"
                    />
                  </svg>
                  Back to Login
                </motion.a>
              </motion.div>
            </form>
          </motion.div>
        ) : (
          <motion.div
            key="success"
            variants={successVariants}
            initial="hidden"
            animate="visible"
            className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-10 border border-green-200"
          >
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                type: "spring",
                damping: 10,
                stiffness: 100,
                delay: 0.2,
              }}
              className="flex justify-center mb-6"
            >
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                <svg
                  className="w-10 h-10 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
              </div>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-2xl font-bold text-green-700 text-center mb-4"
            >
              Check Your Email
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-green-600 text-center mb-8"
            >
              We've sent a password reset link to{" "}
              <span className="font-semibold">{email}</span>
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <motion.button
                onClick={() => setIsSubmitted(false)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="w-full py-3 border-2 border-green-500 text-green-600 rounded-xl font-medium hover:bg-green-50 transition-colors duration-300"
              >
                Back to Form
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ForgotPassword;
