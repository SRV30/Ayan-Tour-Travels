import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import api from "../api";

const LogoutButton = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await api.get("/admin/logout");
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      delete api.defaults.headers.common["Authorization"];
      toast.success("Logged out successfully", {
        position: "top-center",
        autoClose: 3000,
        className: "bg-green-50 text-green-800 border border-green-200",
        progressClassName: "bg-green-400",
      });
      navigate("/login");
    } catch {
      toast.error("Failed to logout. Try again.", {
        position: "top-center",
        autoClose: 3000,
        className: "bg-red-50 text-red-800 border border-red-200",
        progressClassName: "bg-red-400",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative group">
      <motion.div
        className="absolute -inset-1 bg-gradient-to-r from-green-300 via-white to-green-300 rounded-2xl blur opacity-0 group-hover:opacity-75 transition-opacity duration-500"
        animate={isHovered ? { scale: 1.02 } : { scale: 1 }}
      />

      <motion.button
        onClick={handleLogout}
        disabled={isLoading}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        initial={{ scale: 1, rotateX: 0 }}
        whileHover={{
          scale: 1.05,
          rotateX: 5,
          boxShadow:
            "0 20px 40px rgba(34,197,94,0.3), 0 0 0 1px rgba(255,255,255,0.5)",
        }}
        whileTap={{ scale: 0.98, rotateX: -2 }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 25,
          mass: 0.8,
        }}
        className={`
          relative w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl mx-auto
          py-3 px-6 sm:py-4 sm:px-8 md:py-5 md:px-10
          rounded-xl sm:rounded-2xl
          bg-gradient-to-br from-white via-green-50 to-green-100
          hover:from-green-50 hover:via-white hover:to-green-50
          border-2 border-green-200 hover:border-green-300
          text-green-700 hover:text-green-800
          font-bold text-base sm:text-lg md:text-xl
          shadow-lg hover:shadow-2xl
          focus:outline-none focus:ring-4 focus:ring-green-200 focus:ring-opacity-60
          transition-all duration-300 ease-out
          backdrop-blur-sm
          disabled:opacity-60 disabled:cursor-not-allowed
          overflow-hidden
          transform-gpu perspective-1000
        `}
        style={{ transformStyle: "preserve-3d" }}
        aria-label="Logout"
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0"
          animate={
            isHovered ? { x: ["-100%", "100%"], opacity: [0, 0.3, 0] } : {}
          }
          transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
        />

        <motion.div
          className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-400 to-green-600 origin-left"
          initial={{ scaleX: 0 }}
          animate={isHovered ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 0.3 }}
        />

        <div className="relative flex items-center justify-center space-x-3">
          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                className="flex items-center space-x-2"
              >
                <motion.div
                  className="w-5 h-5 sm:w-6 sm:h-6 border-3 border-green-400 border-t-transparent rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
                <span className="font-medium">Processing...</span>
              </motion.div>
            ) : (
              <motion.div
                key="default"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex items-center space-x-3"
              >
                <motion.div
                  animate={
                    isHovered ? { rotate: [0, -10, 10, 0] } : { rotate: 0 }
                  }
                  transition={{ duration: 0.5 }}
                >
                  <svg
                    className="w-5 h-5 sm:w-6 sm:h-6 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                </motion.div>

                <motion.span
                  className="font-bold tracking-wide"
                  animate={isHovered ? { scale: 1.02 } : { scale: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  Logout
                </motion.span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-green-600/20 rounded-xl opacity-0"
          animate={isHovered ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.3 }}
        />

        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-green-300 to-transparent opacity-50" />
      </motion.button>

      <motion.div
        className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-3/4 h-4 bg-green-200 rounded-full blur-md opacity-0"
        animate={
          isHovered ? { opacity: 0.6, scaleX: 1.1 } : { opacity: 0, scaleX: 1 }
        }
        transition={{ duration: 0.3 }}
      />
    </div>
  );
};

export default LogoutButton;
