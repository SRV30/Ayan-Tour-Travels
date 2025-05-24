import { useEffect, useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { ArrowBigUp } from "lucide-react";

const ScrollToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setVisible(window.scrollY > 300);
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          onClick={scrollToTop}
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          whileHover={{ scale: 1.1, rotate: -10 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed bottom-25 right-7 sm:bottom-25 sm:right-6 z-50 bg-green-500 hover:bg-green-600 text-white p-4 sm:p-3 rounded-full shadow-xl focus:outline-none"
        >
          <ArrowBigUp className="w-7 h-7 sm:w-7 sm:h-7" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTop;
