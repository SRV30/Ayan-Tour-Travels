import { useState, useEffect } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../api";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [focusedInput, setFocusedInput] = useState(null);
  const [passwordStrength, setPasswordStrength] = useState(0);

  useEffect(() => {
    if (!token) {
      toast.error("Invalid reset token");
      navigate("/forgot-password");
    }
  }, [token, navigate]);

  useEffect(() => {
    let strength = 0;
    if (password.length > 0) {
      strength += 1;
      if (password.length >= 8) strength += 1;
      if (/[A-Z]/.test(password)) strength += 1;
      if (/[0-9]/.test(password)) strength += 1;
      if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    }
    setPasswordStrength(strength);
  }, [password]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.", {
        position: "top-center",
        autoClose: 4000,
      });
      return;
    }

    if (passwordStrength < 3) {
      toast.warning("Please choose a stronger password.", {
        position: "top-center",
        autoClose: 4000,
      });
      return;
    }

    setLoading(true);
    try {
      const { data } = await api.put(`/admin/password/reset/${token}`, {
        password,
        confirmPassword,
      });
      toast.success(data.message || "Password reset successful!", {
        position: "top-center",
        autoClose: 4000,
      });
      setSuccess(true);
      setTimeout(() => navigate("/login"), 3000);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to reset password", {
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
        staggerChildren: 0.2,
        duration: 0.6,
      },
    },
    exit: {
      opacity: 0,
      y: 20,
      transition: { duration: 0.4 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 22 },
    },
  };

  const inputVariants = {
    focused: { scale: 1.02, boxShadow: "0 0 14px rgba(34,197,94,0.5)" },
    unfocused: { scale: 1, boxShadow: "0 4px 6px rgba(0,0,0,0.05)" },
  };

  const buttonVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.03, boxShadow: "0 8px 20px rgba(34,197,94,0.3)" },
    tap: { scale: 0.96 },
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
      },
    },
  };

  const passwordInputs = [
    {
      id: "password",
      label: "New Password",
      type: "password",
      value: password,
      onChange: setPassword,
      placeholder: "••••••••",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-green-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
          />
        </svg>
      ),
    },
    {
      id: "confirmPassword",
      label: "Confirm New Password",
      type: "password",
      value: confirmPassword,
      onChange: setConfirmPassword,
      placeholder: "••••••••",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-green-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
          />
        </svg>
      ),
    },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-white px-4 py-16">
      <AnimatePresence mode="wait">
        {!success ? (
          <motion.div
            key="form"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={containerVariants}
            className="max-w-lg w-full bg-white rounded-3xl shadow-2xl p-8 md:p-12 border border-green-200 backdrop-blur-sm"
          >
            <motion.div variants={itemVariants} className="mb-10">
              <motion.h2
                className="text-3xl md:text-4xl font-extrabold text-green-700 mb-3 text-center tracking-tight"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 300 }}
              >
                Reset Your Password
              </motion.h2>
              <motion.p
                className="text-green-600 text-center text-md md:text-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                Create a new secure password for your account
              </motion.p>
            </motion.div>

            <form onSubmit={handleSubmit} className="space-y-8">
              {passwordInputs.map(
                ({ id, label, type, value, onChange, placeholder, icon }) => (
                  <motion.div
                    key={id}
                    variants={itemVariants}
                    className="relative"
                  >
                    <motion.div
                      variants={inputVariants}
                      animate={focusedInput === id ? "focused" : "unfocused"}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 25,
                      }}
                    >
                      <label
                        htmlFor={id}
                        className="block mb-3 font-semibold text-green-700 text-md md:text-lg"
                      >
                        {label}
                      </label>
                      <div className="relative">
                        <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                          {icon}
                        </div>
                        <input
                          id={id}
                          type={type}
                          required
                          minLength={6}
                          value={value}
                          onChange={(e) => onChange(e.target.value)}
                          placeholder={placeholder}
                          onFocus={() => setFocusedInput(id)}
                          onBlur={() => setFocusedInput(null)}
                          className="w-full pl-14 pr-5 py-4 rounded-xl border-2 border-green-300 bg-green-50 placeholder-green-400 text-green-900 font-medium
                        focus:outline-none focus:ring-4 focus:ring-green-200 focus:border-green-500 transition-all duration-300"
                        />
                      </div>
                    </motion.div>

                    {id === "password" && (
                      <motion.div
                        className="mt-3"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: password.length > 0 ? 1 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="flex justify-between mb-1">
                          <span className="text-sm text-green-700">
                            Password Strength
                          </span>
                          <span className="text-sm font-medium text-green-700">
                            {passwordStrength === 0 && "Very Weak"}
                            {passwordStrength === 1 && "Weak"}
                            {passwordStrength === 2 && "Fair"}
                            {passwordStrength === 3 && "Good"}
                            {passwordStrength === 4 && "Strong"}
                            {passwordStrength === 5 && "Very Strong"}
                          </span>
                        </div>
                        <div className="w-full h-2 bg-green-100 rounded-full overflow-hidden">
                          <motion.div
                            className="h-full bg-gradient-to-r from-red-500 via-yellow-400 to-green-500"
                            initial={{ width: "0%" }}
                            animate={{ width: `${passwordStrength * 20}%` }}
                            transition={{
                              type: "spring",
                              stiffness: 300,
                              damping: 30,
                            }}
                          />
                        </div>
                        <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-green-700">
                          <div className="flex items-center">
                            <motion.div
                              animate={{
                                opacity: password.length >= 8 ? 1 : 0.5,
                                scale: password.length >= 8 ? 1 : 0.95,
                              }}
                              className={`w-4 h-4 rounded-full mr-2 flex items-center justify-center ${
                                password.length >= 8
                                  ? "bg-green-500"
                                  : "bg-green-200"
                              }`}
                            >
                              {password.length >= 8 && (
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-3 w-3 text-white"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M5 13l4 4L19 7"
                                  />
                                </svg>
                              )}
                            </motion.div>
                            At least 8 characters
                          </div>
                          <div className="flex items-center">
                            <motion.div
                              animate={{
                                opacity: /[A-Z]/.test(password) ? 1 : 0.5,
                                scale: /[A-Z]/.test(password) ? 1 : 0.95,
                              }}
                              className={`w-4 h-4 rounded-full mr-2 flex items-center justify-center ${
                                /[A-Z]/.test(password)
                                  ? "bg-green-500"
                                  : "bg-green-200"
                              }`}
                            >
                              {/[A-Z]/.test(password) && (
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-3 w-3 text-white"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M5 13l4 4L19 7"
                                  />
                                </svg>
                              )}
                            </motion.div>
                            Uppercase letter
                          </div>
                          <div className="flex items-center">
                            <motion.div
                              animate={{
                                opacity: /[0-9]/.test(password) ? 1 : 0.5,
                                scale: /[0-9]/.test(password) ? 1 : 0.95,
                              }}
                              className={`w-4 h-4 rounded-full mr-2 flex items-center justify-center ${
                                /[0-9]/.test(password)
                                  ? "bg-green-500"
                                  : "bg-green-200"
                              }`}
                            >
                              {/[0-9]/.test(password) && (
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-3 w-3 text-white"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M5 13l4 4L19 7"
                                  />
                                </svg>
                              )}
                            </motion.div>
                            Number
                          </div>
                          <div className="flex items-center">
                            <motion.div
                              animate={{
                                opacity: /[^A-Za-z0-9]/.test(password)
                                  ? 1
                                  : 0.5,
                                scale: /[^A-Za-z0-9]/.test(password) ? 1 : 0.95,
                              }}
                              className={`w-4 h-4 rounded-full mr-2 flex items-center justify-center ${
                                /[^A-Za-z0-9]/.test(password)
                                  ? "bg-green-500"
                                  : "bg-green-200"
                              }`}
                            >
                              {/[^A-Za-z0-9]/.test(password) && (
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-3 w-3 text-white"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M5 13l4 4L19 7"
                                  />
                                </svg>
                              )}
                            </motion.div>
                            Special character
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {id === "confirmPassword" && confirmPassword && (
                      <motion.div
                        className="flex items-center mt-2 ml-1"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        {password === confirmPassword ? (
                          <>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5 text-green-500 mr-2"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                            <span className="text-green-600 text-sm">
                              Passwords match
                            </span>
                          </>
                        ) : (
                          <>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5 text-red-500 mr-2"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                            <span className="text-red-600 text-sm">
                              Passwords do not match
                            </span>
                          </>
                        )}
                      </motion.div>
                    )}
                  </motion.div>
                )
              )}

              <motion.div variants={itemVariants} className="pt-4">
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
                      <span>Resetting Password...</span>
                    </div>
                  ) : (
                    "Reset Password"
                  )}
                </motion.button>
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
              <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center">
                <svg
                  className="w-12 h-12 text-green-500"
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
              Password Reset Successful!
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-green-600 text-center mb-8"
            >
              Your password has been reset successfully. You'll be redirected to
              the login page in a moment.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <motion.button
                onClick={() => navigate("/login")}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="w-full bg-gradient-to-r from-green-600 to-green-500 py-4 text-white rounded-xl font-bold hover:from-green-700 hover:to-green-600 transition-colors duration-300 shadow-lg"
              >
                Go to Login
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ResetPassword;
