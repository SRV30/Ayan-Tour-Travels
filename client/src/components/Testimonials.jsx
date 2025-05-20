import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const testimonials = [
  {
    text: "Smooth booking! Driver arrived on time and the car was clean. Will definitely use again for my next trip.",
    name: "Aman Kumar",
    location: "Delhi",
    rating: 5,
    avatar: "/api/placeholder/40/40",
  },
  {
    text: "Loved the no-login booking. Very convenient and fast. The driver was professional and courteous.",
    name: "Riya Sharma",
    location: "Mumbai",
    rating: 5,
    avatar: "/api/placeholder/40/40",
  },
  {
    text: "Excellent service at a reasonable price. The car was comfortable and well-maintained.",
    name: "Vikram Singh",
    location: "Bangalore",
    rating: 4,
    avatar: "/api/placeholder/40/40",
  },
];

const Rating = ({ value }) => {
  return (
    <div className="flex">
      {[...Array(5)].map((_, i) => (
        <span
          key={i}
          className={i < value ? "text-yellow-400" : "text-gray-300"}
        >
          <Icon name={i < value ? "star" : "star-empty"} />
        </span>
      ))}
    </div>
  );
};

const Icon = ({ name }) => {
  const iconMap = {
    "map-pin": (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
        <circle cx="12" cy="10" r="3"></circle>
      </svg>
    ),
    car: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M14 16H9m10 0h3v-3.15a1 1 0 0 0-.84-.99L16 11l-2.7-3.6a1 1 0 0 0-.8-.4H5.24a2 2 0 0 0-1.8 1.1l-.8 1.63A6 6 0 0 0 2 12.42V16h2"></path>
        <circle cx="6.5" cy="16.5" r="2.5"></circle>
        <circle cx="16.5" cy="16.5" r="2.5"></circle>
      </svg>
    ),
    user: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
        <circle cx="12" cy="7" r="4"></circle>
      </svg>
    ),
    repeat: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m17 2 4 4-4 4"></path>
        <path d="M3 11v-1a4 4 0 0 1 4-4h14"></path>
        <path d="m7 22-4-4 4-4"></path>
        <path d="M21 13v1a4 4 0 0 1-4 4H3"></path>
      </svg>
    ),
    zap: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
      </svg>
    ),
    mail: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect width="20" height="16" x="2" y="4" rx="2"></rect>
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
      </svg>
    ),
    map: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"></polygon>
        <line x1="9" x2="9" y1="3" y2="18"></line>
        <line x1="15" x2="15" y1="6" y2="21"></line>
      </svg>
    ),
    lock: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect>
        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
      </svg>
    ),
    star: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
      </svg>
    ),
    "star-empty": (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
      </svg>
    ),
  };

  return (
    <span className="text-green-600">
      {iconMap[name] || <span>{name}</span>}
    </span>
  );
};

const Testimonials = () => {
  const [scrollY, setScrollY] = useState(0);

  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);
  return (
    <section
      id="testimonials"
      className="py-16 sm:py-20 px-4 sm:px-6 lg:px-16 bg-gradient-to-br from-green-50 to-blue-50"
    >
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10 sm:mb-16"
        >
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-block px-3 py-1.5 sm:px-4 sm:py-2 mb-4 bg-blue-100 text-blue-800 rounded-full font-medium text-xs sm:text-sm"
          >
            Customer Stories
          </motion.span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
            What Our Customers Say
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            Real experiences from our satisfied customers.
          </p>
        </motion.div>
        <div className="relative">
          <motion.div
            className="overflow-hidden rounded-2xl bg-white shadow-xl"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="relative px-4 sm:px-6 py-8 sm:py-12 md:p-12 overflow-hidden">
              <div className="absolute top-0 left-0 w-32 sm:w-40 h-32 sm:h-40 bg-green-100 rounded-full opacity-20 -translate-x-1/2 -translate-y-1/2" />
              <div className="absolute bottom-0 right-0 w-32 sm:w-40 h-32 sm:h-40 bg-blue-100 rounded-full opacity-20 translate-x-1/2 translate-y-1/2" />
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTestimonial}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="max-w-3xl mx-auto text-center relative z-10"
                >
                  <div className="mb-4 sm:mb-6">
                    <Rating value={testimonials[activeTestimonial].rating} />
                  </div>
                  <p className="text-base sm:text-xl md:text-2xl font-medium text-gray-700 italic mb-6 sm:mb-8">
                    "{testimonials[activeTestimonial].text}"
                  </p>
                  <div className="flex items-center justify-center">
                    <div className="mr-3 sm:mr-4">
                      <img
                        src={testimonials[activeTestimonial].avatar}
                        alt={testimonials[activeTestimonial].name}
                        className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover border-2 border-green-200"
                      />
                    </div>
                    <div className="text-left">
                      <div className="font-semibold text-gray-900 text-sm sm:text-base">
                        {testimonials[activeTestimonial].name}
                      </div>
                      <div className="text-gray-600 text-xs sm:text-sm">
                        {testimonials[activeTestimonial].location}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
          <div className="flex justify-center mt-6 sm:mt-8 space-x-2">
            {testimonials.map((_, idx) => (
              <motion.button
                key={idx}
                className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full ${
                  idx === activeTestimonial ? "bg-green-600" : "bg-gray-300"
                } touch-manipulation`}
                onClick={() => setActiveTestimonial(idx)}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
