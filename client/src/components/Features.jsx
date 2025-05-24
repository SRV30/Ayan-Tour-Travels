// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const staggerContainer = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 20 },
  },
};

const features = [
  {
    emoji: "🚘",
    title: "Multiple Car Types",
    desc: "Economy, SUV, luxury & more.",
    icon: "car",
  },
  {
    emoji: "🔁",
    title: "One-way & Two-way",
    desc: "Flexible trip options.",
    icon: "repeat",
  },
  {
    emoji: "⚡",
    title: "Instant Booking",
    desc: "No login needed, super fast.",
    icon: "zap",
  },
  {
    emoji: "📩",
    title: "Email & SMS",
    desc: "Instant booking confirmation.",
    icon: "mail",
  },
  {
    emoji: "🛣️",
    title: "Wide City Coverage",
    desc: "Major cities connected.",
    icon: "map",
  },
  {
    emoji: "🔒",
    title: "Secure Payments",
    desc: "Multiple payment options.",
    icon: "lock",
  },
];

const Card = ({ children, className, ...props }) => {
  return (
    <motion.div
      className={`bg-white rounded-xl p-4 sm:p-6 shadow-md ${className}`}
      whileHover={{ y: -5, boxShadow: "0 15px 30px rgba(0,0,0,0.1)" }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      {...props}
    >
      {children}
    </motion.div>
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

const Features = () => {
  return (
    <section
      id="features"
      className="py-16 sm:py-20 px-4 sm:px-6 lg:px-16 bg-white"
    >
      <div className="max-w-7xl mx-auto">
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
            Why Choose Us
          </motion.span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
            Features You'll Love
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            Experience the best in intercity travel with features designed for
            convenience and reliability.
          </p>
        </motion.div>
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {features.map((feature, idx) => (
            <motion.div key={idx} variants={staggerItem} className="group">
              <Card className="h-full bg-gradient-to-br from-white to-green-50 border border-gray-100 group-hover:border-green-200 transition-all duration-300">
                <div className="flex items-start">
                  <div className="mr-3 sm:mr-4 bg-green-100 p-2 sm:p-3 rounded-xl text-green-600 transition-all duration-300 group-hover:bg-green-600 group-hover:text-white">
                    <Icon name={feature.icon} />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-semibold mb-2 text-gray-800">
                      {feature.title}
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600">
                      {feature.desc}
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
