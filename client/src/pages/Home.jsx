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
            <AnimatedButton
              href="/book"
              className="ml-4 bg-gradient-to-r from-green-600 to-green-700 text-white hover:from-green-700 hover:to-green-800 px-5 py-2 text-sm lg:text-base"
            >
              Book Now
            </AnimatedButton>
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
              <AnimatedButton
                href="/book"
                className="mt-4 mb-2 bg-gradient-to-r from-green-600 to-green-700 text-white hover:from-green-700 hover:to-green-800 px-4 py-2.5 text-base text-center"
                onClick={toggleMenu}
              >
                Book Now
              </AnimatedButton>
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
              Seamless city-to-city travel with instant bookings. No login required.
            </p>

            <motion.div
              className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <AnimatedButton
                href="/book"
                className="bg-gradient-to-r from-green-600 to-green-700 text-white hover:from-green-700 hover:to-green-800 px-6 py-3 sm:px-8 sm:py-4 text-base"
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

      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-green-600 to-blue-600 text-white">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center"
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6">
              Ready to Book Your Ride?
            </h2>

            <p className="text-base sm:text-lg text-white text-opacity-90 max-w-2xl mx-auto mb-8">
              Experience hassle-free intercity travel with just a few clicks. No login required!
            </p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 justify-center"
            >
              <AnimatedButton
                href="/book"
                className="bg-white text-green-700 hover:bg-gray-100 px-6 py-3 sm:px-8 sm:py-4 text-base"
              >
                Book Now
              </AnimatedButton>

              <AnimatedButton
                href="https://wa.me/1234567890"
                target="_blank"
                rel="noreferrer"
                className="bg-transparent border-2 border-white text-white hover:bg-white hover:bg-opacity-10 px-6 py-3 sm:px-8 sm:py-4 text-base"
              >
                <span className="flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="mr-2"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Chat on WhatsApp
                </span>
              </AnimatedButton>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="mt-12 text-center"
          >
            <div className="inline-flex items-center justify-center space-x-2 bg-white bg-opacity-20 rounded-full px-5 py-3">
              <MessageCircle size={18} />
              <span className="text-sm font-medium">
                24/7 Customer Support Available
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;