import { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import api from "../api";
import { toast } from "react-toastify";

const containerVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const buttonVariants = {
  hover: { scale: 1.05, boxShadow: "0 0 8px rgba(34,197,94,0.6)" },
  tap: { scale: 0.95 },
};

const inputFocus =
  "focus:outline-none focus:ring-4 focus:ring-green-400 focus:ring-opacity-50";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const { data } = await api.post("/admin/login", { email, password });

      if (data.success && data.token && data.user) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        api.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;

        toast.success("Login successful");
        navigate("/dashboard");
        console.log(data);
      } else {
        toast.error("Invalid response from server.");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-green-100 flex items-center justify-center px-6 py-12 sm:px-12">
      <motion.div
        className="bg-white rounded-3xl shadow-2xl max-w-md w-full border border-green-200 p-10 sm:p-12"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <h2 className="text-4xl font-extrabold text-green-700 mb-8 text-center tracking-wide drop-shadow-sm">
          Admin Login
        </h2>

        <form onSubmit={handleLogin} className="space-y-8 relative">
          <div>
            <label className="block text-green-700 font-semibold mb-2 tracking-wide">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className={`w-full px-5 py-3 border border-green-300 rounded-xl shadow-sm transition duration-300 placeholder-green-400 text-green-900 ${inputFocus}`}
              required
            />
          </div>

          <div className="relative">
            <label className="block text-green-700 font-semibold mb-2 tracking-wide">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className={`w-full px-5 py-3 border border-green-300 rounded-xl shadow-sm transition duration-300 placeholder-green-400 text-green-900 pr-12 ${inputFocus}`}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-4 top-[3.4rem] text-green-600 hover:text-green-800 transition focus:outline-none"
              tabIndex={-1}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10a9.96 9.96 0 012.659-6.536"
                    style={{ display: showPassword ? "none" : "block" }}
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3l18 18"
                    style={{ display: showPassword ? "block" : "none" }}
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              )}
            </button>
          </div>

          <motion.button
            type="submit"
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-extrabold py-3 rounded-2xl shadow-lg tracking-wide transition"
          >
            Login
          </motion.button>
        </form>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="mt-8 text-center"
        >
          <Link
            to="/forgot-password"
            className="text-green-600 hover:text-green-800 font-semibold transition tracking-wide"
          >
            Forgot Password?
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Login;
