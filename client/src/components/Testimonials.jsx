// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const testimonials = [
  {
    text: "Smooth booking! Driver arrived on time and the car was clean. Will definitely use again for my next trip.",
    name: "Aman Kumar",
    location: "Bettiah",
    rating: 5,
  },
  {
    text: "Loved the no-login booking. Very convenient and fast. The driver was professional and courteous.",
    name: "Riya Sharma",
    location: "Siwan",
    rating: 5,
  },
  {
    text: "Excellent service at a reasonable price. The car was comfortable and well-maintained.",
    name: "Vikram Singh",
    location: "Patna",
    rating: 4,
  },
  {
    text: "Booking from Patna was incredibly smooth. Great UI, and the driver was super polite!",
    name: "Sonal Raj",
    location: "Patna",
    rating: 5,
  },
  {
    text: "Booked a ride from Gaya to Bodhgaya. Car was on time and service was top-notch.",
    name: "Nikhil Verma",
    location: "Gaya",
    rating: 4,
  },
  {
    text: "Reliable and efficient! Booked for Muzaffarpur — no delays, clean car, and good support.",
    name: "Preeti Kumari",
    location: "Muzaffarpur",
    rating: 5,
  },
].map((item) => ({
  ...item,
  avatar: item.name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase(), // RS, AK, VS
}));

const Rating = ({ value }) => {
  return (
    <div className="flex justify-center">
      {[...Array(5)].map((_, i) => (
        <span
          key={i}
          className={`mx-0.5 ${i < value ? "text-yellow-400" : "text-gray-300"}`}
        >
          {i < value ? "★" : "☆"}
        </span>
      ))}
    </div>
  );
};

const Testimonials = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

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
            className="inline-block px-4 py-2 mb-4 bg-green-100 text-green-800 rounded-full font-medium text-sm"
          >
            Customer Stories
          </motion.span>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-green-800">
            What Our Customers Say
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
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
                  <div className="mb-6">
                    <Rating value={testimonials[activeTestimonial].rating} />
                  </div>
                  <p className="text-xl sm:text-2xl font-medium text-gray-700 italic mb-6">
                    "{testimonials[activeTestimonial].text}"
                  </p>
                  <div className="flex items-center justify-center">
                    <div className="mr-4">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-green-600 text-white flex items-center justify-center font-semibold text-lg sm:text-xl uppercase border-2 border-green-200">
                        {testimonials[activeTestimonial].avatar}
                      </div>
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

          <div className="flex justify-center mt-6 space-x-2">
            {testimonials.map((_, idx) => (
              <motion.button
                key={idx}
                className={`w-3 h-3 rounded-full transition-all ${
                  idx === activeTestimonial ? "bg-green-600" : "bg-gray-300"
                }`}
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
