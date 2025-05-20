import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const AnimatedButton = ({ children, className, ...props }) => {
  return (
    <motion.a
      className={`inline-block px-6 py-3 font-semibold rounded-full shadow-md touch-manipulation ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      {...props}
    >
      {children}
    </motion.a>
  );
};

const FAQ = () => {
  const [activeFaq, setActiveFaq] = useState(null);

  const staggerContainer = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const faqs = [
    {
      question: "Can I book without logging in?",
      answer:
        "Yes, no login is required for booking. Simply enter your contact details and you're good to go!",
    },
    {
      question: "How will I receive confirmation?",
      answer:
        "Booking details are sent via email and SMS instantly. You'll also get driver details 2 hours before pickup.",
    },
    {
      question: "Can I cancel or reschedule?",
      answer:
        "Currently, cancellations are not supported but coming soon. Please contact our support team for any changes.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit/debit cards, UPI, and net banking. Cash payments can be arranged for certain routes.",
    },
  ];

  const staggerItem = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 20 },
    },
  };

  return (
    <section id="faq" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-16 bg-white">
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
            className="inline-block px-3 py-1.5 sm:px-4 sm:py-2 mb-4 bg-green-100 text-green-800 rounded-full font-medium text-xs sm:text-sm"
          >
            Questions Answered
          </motion.span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            Get answers to common questions about our service.
          </p>
        </motion.div>
        <motion.div
          className="space-y-4"
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {faqs.map((faq, idx) => (
            <motion.div key={idx} variants={staggerItem}>
              <div
                className={`bg-white rounded-xl p-4 sm:p-5 shadow-sm border ${
                  activeFaq === idx ? "border-green-300" : "border-gray-200"
                } cursor-pointer transition-all duration-300 touch-manipulation`}
                onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
              >
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold text-gray-800 text-base sm:text-lg">
                    {faq.question}
                  </h3>
                  <div
                    className={`transform transition-transform duration-300 text-green-600 ${
                      activeFaq === idx ? "rotate-180" : ""
                    }`}
                  >
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
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </div>
                </div>
                <AnimatePresence>
                  {activeFaq === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="mt-4 text-gray-600 text-sm sm:text-base">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mt-10 sm:mt-12 text-center"
        >
          <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base">
            Still have questions?
          </p>
          <AnimatedButton
            href="/contact"
            className="bg-gradient-to-r from-green-600 to-blue-600 text-white hover:from-green-700 hover:to-blue-700 px-6 py-3 sm:px-8 sm:py-4 text-sm sm:text-base"
          >
            Contact Support
          </AnimatedButton>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;
