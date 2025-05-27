import { useState, useEffect } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, useScroll, useTransform } from "framer-motion";
import { AlignJustify, X, MessageCircle } from "lucide-react";
import Footer from "../components/Footer";
import FAQ from "../components/FAQ";
import Testimonials from "../components/Testimonials";
import DesRoutes from "../components/DesRoutes";
import HowItWorks from "../components/HowItWorks";
import Features from "../components/Features";
import AnimatedLogo from "../components/Logo";

const AnimatedButton = ({ children, className, ...props }) => {
  return (
    <motion.a
      className={`inline-block px-5 py-2.5 font-semibold rounded-lg shadow-md transition-all ${className}`}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      {...props}
    >
      {children}
    </motion.a>
  );
};

const ProgressBar = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <motion.div
      className="fixed top-25 left-0 right-0 h-1 bg-green-600 z-50"
      style={{ scaleX, transformOrigin: "0%" }}
    />
  );
};

const Home = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const navLinks = [
    { href: "#features", label: "Features" },
    { href: "#how-it-works", label: "How It Works" },
    { href: "#routes", label: "Routes" },
    { href: "#testimonials", label: "Testimonials" },
    { href: "#faq", label: "FAQ" },
  ];

  const menuVariants = {
    open: {
      opacity: 1,
      height: "auto",
      transition: { type: "spring", stiffness: 300, damping: 30 },
    },
    closed: {
      opacity: 0,
      height: 0,
      transition: { duration: 0.3, type: "spring" },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-green-50 text-gray-900 font-sans">
      <ProgressBar />

      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? "bg-white bg-opacity-95 backdrop-blur-sm shadow-md py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center px-4 sm:px-6 lg:px-8">
          <AnimatedLogo />

          <div className="hidden md:flex items-center space-x-1 lg:space-x-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-medium text-gray-700 hover:text-green-600 transition px-3 py-2 rounded-md hover:bg-green-50 text-sm lg:text-base"
              >
                {link.label}
              </a>
            ))}
          </div>

          <button
            className="md:hidden text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-600 rounded-md p-1"
            onClick={toggleMenu}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <AlignJustify className="w-6 h-6" />
            )}
          </button>
        </div>

        <motion.div
          initial="closed"
          animate={isMenuOpen ? "open" : "closed"}
          variants={menuVariants}
          className="md:hidden overflow-hidden"
        >
          <div className="bg-white shadow-lg rounded-b-lg mx-4 mt-2 overflow-hidden">
            <div className="flex flex-col px-4 py-2">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="font-medium text-gray-700 hover:text-green-600 transition text-base py-3 border-b border-gray-100 last:border-b-0"
                  onClick={toggleMenu}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.nav>

      <section className="relative overflow-hidden pt-32 sm:pt-40 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            style={{ y: window.scrollY * 0.2 }}
            className="absolute top-20 -right-16 w-64 sm:w-80 lg:w-96 h-64 sm:h-80 lg:h-96 bg-green-200 rounded-full opacity-30 blur-3xl"
          />
          <motion.div
            style={{ y: window.scrollY * -0.1 }}
            className="absolute -top-20 -left-16 w-64 sm:w-80 lg:w-96 h-64 sm:h-80 lg:h-96 bg-blue-200 rounded-full opacity-30 blur-3xl"
          />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="inline-block px-4 py-2 mb-6 bg-green-100 text-green-800 rounded-full font-medium text-sm"
            >
              Smart Travel Solutions
            </motion.span>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-blue-600">
              Book Your Ride in Seconds
            </h1>

            <p className="text-base sm:text-lg lg:text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Seamless city-to-city travel with instant bookings. No login
              required.
            </p>

            <motion.div
              className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <AnimatedButton
                onClick={() => {
                  window.open(
                    "https://wa.me/917070186631?text=Hi%2C%20I%20need%20some%20help%20regarding%20your%20services.",
                    "_blank"
                  );
                }}
                className="bg-gradient-to-r from-green-600 to-green-700 text-white hover:from-green-700 hover:to-green-800 px-6 py-3 sm:px-8 sm:py-4 text-base cursor-pointer"
              >
                Book Now
              </AnimatedButton>

              <AnimatedButton
                href="#how-it-works"
                className="bg-white text-green-700 border border-green-600 hover:bg-green-50 px-6 py-3 sm:px-8 sm:py-4 text-base"
              >
                How It Works
              </AnimatedButton>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Features />
      <HowItWorks />
      <DesRoutes />
      <Testimonials />
      <FAQ />

      <Footer />
    </div>
  );
};

export default Home;
