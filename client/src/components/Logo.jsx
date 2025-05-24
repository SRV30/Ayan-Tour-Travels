import React, { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { Car } from "lucide-react";

const AnimatedLogo = () => {
  const [isHovered, setIsHovered] = useState(false);

  const containerVariants = {
    initial: { opacity: 0, y: -50, scale: 0.8 },
    animate: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25,
        staggerChildren: 0.2
      }
    },
    hover: {
      scale: 1.08,
      y: -5,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 20
      }
    },
    tap: {
      scale: 0.95,
      transition: { duration: 0.1 }
    }
  };

  const logoBoxVariants = {
    initial: { scale: 0, rotate: -180 },
    animate: { 
      scale: 1, 
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
        delay: 0.2
      }
    },
    hover: {
      rotate: [0, -15, 15, 0],
      scale: 1.1,
      boxShadow: [
        "0 10px 20px rgba(34, 197, 94, 0.3)",
        "0 15px 30px rgba(34, 197, 94, 0.4)",
        "0 20px 40px rgba(34, 197, 94, 0.5)"
      ],
      transition: {
        rotate: {
          duration: 0.8,
          ease: "easeInOut"
        },
        scale: {
          duration: 0.3
        },
        boxShadow: {
          duration: 0.5,
          ease: "easeInOut"
        }
      }
    },
    idle: {
      rotate: [0, 5, -5, 0],
      y: [0, -3, 3, 0],
      transition: {
        repeat: Infinity,
        duration: 4,
        ease: "easeInOut"
      }
    }
  };

  const carIconVariants = {
    initial: { x: -20, opacity: 0 },
    animate: { 
      x: 0, 
      opacity: 1,
      transition: { delay: 0.5, duration: 0.5 }
    },
    hover: {
      x: [0, 10, -5, 0],
      scale: [1, 1.2, 1.1, 1],
      transition: {
        duration: 0.6,
        ease: "easeInOut"
      }
    },
    drive: {
      x: [0, 15, -10, 5, 0],
      rotate: [0, 10, -5, 0],
      transition: {
        repeat: Infinity,
        duration: 3,
        ease: "easeInOut"
      }
    }
  };

  const textVariants = {
    initial: { opacity: 0, x: 20 },
    animate: { 
      opacity: 1, 
      x: 0,
      transition: {
        delay: 0.6,
        duration: 0.8,
        ease: "easeOut"
      }
    },
    hover: {
      scale: 1.05,
      color: "#059669",
      textShadow: "0 0 10px rgba(34, 197, 94, 0.3)",
      transition: {
        duration: 0.3
      }
    }
  };

  const letterVariants = {
    initial: { y: 20, opacity: 0 },
    animate: (i) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: 0.8 + i * 0.05,
        duration: 0.5,
        ease: "easeOut"
      }
    }),
    hover: {
      y: [-2, 2, -2],
      transition: {
        repeat: Infinity,
        duration: 1.5,
        ease: "easeInOut"
      }
    }
  };

  const glowVariants = {
    animate: {
      opacity: [0.5, 1, 0.5],
      scale: [1, 1.2, 1],
      transition: {
        repeat: Infinity,
        duration: 2,
        ease: "easeInOut"
      }
    }
  };

  const sparkleVariants = {
    animate: {
      scale: [0, 1, 0],
      rotate: [0, 180, 360],
      opacity: [0, 1, 0],
      transition: {
        repeat: Infinity,
        duration: 2,
        ease: "easeInOut",
        times: [0, 0.5, 1]
      }
    }
  };

  const text = "Ayan Tour & Travels";

  return (
    <motion.a
      href="/"
      variants={containerVariants}
      initial="initial"
      animate="animate"
      whileHover="hover"
      whileTap="tap"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="flex items-center gap-3 px-4 py-3 rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-green-600 relative overflow-hidden cursor-pointer group"
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-green-50 via-white to-green-50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        animate={{
          background: [
            "linear-gradient(45deg, rgba(34, 197, 94, 0.1), rgba(255, 255, 255, 0.1))",
            "linear-gradient(135deg, rgba(34, 197, 94, 0.1), rgba(255, 255, 255, 0.1))",
            "linear-gradient(225deg, rgba(34, 197, 94, 0.1), rgba(255, 255, 255, 0.1))",
            "linear-gradient(315deg, rgba(34, 197, 94, 0.1), rgba(255, 255, 255, 0.1))"
          ]
        }}
        transition={{
          repeat: Infinity,
          duration: 4,
          ease: "linear"
        }}
      />

      <motion.div className="relative">
        <motion.div
          variants={logoBoxVariants}
          animate={isHovered ? "hover" : "idle"}
          className="w-12 h-12 sm:w-14 sm:h-14 relative"
        >
          <motion.div
            variants={glowVariants}
            animate="animate"
            className="absolute inset-0 bg-gradient-to-br from-green-400 via-green-500 to-green-600 rounded-2xl blur-sm opacity-50"
          />
          
          <motion.div
            className="relative w-full h-full bg-gradient-to-br from-green-500 via-green-600 to-green-700 rounded-2xl flex items-center justify-center text-white shadow-xl border-2 border-white/20 overflow-hidden"
            style={{
              background: "linear-gradient(135deg, #22c55e 0%, #16a34a 50%, #15803d 100%)"
            }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              animate={{
                x: ["-100%", "100%"],
                transition: {
                  repeat: Infinity,
                  duration: 3,
                  ease: "easeInOut"
                }
              }}
            />

            <motion.div
              variants={carIconVariants}
              animate={isHovered ? "hover" : "drive"}
              className="relative z-10"
            >
              <Car className="w-6 h-6 sm:w-7 sm:h-7" />
            </motion.div>

            <AnimatePresence>
              {isHovered && (
                <>
                  <motion.div
                    variants={sparkleVariants}
                    animate="animate"
                    className="absolute top-1 right-1 w-2 h-2 bg-white rounded-full"
                  />
                  <motion.div
                    variants={sparkleVariants}
                    animate="animate"
                    className="absolute bottom-2 left-2 w-1.5 h-1.5 bg-yellow-300 rounded-full"
                    style={{ animationDelay: "0.5s" }}
                  />
                  <motion.div
                    variants={sparkleVariants}
                    animate="animate"
                    className="absolute top-1/2 right-1 w-1 h-1 bg-white rounded-full"
                    style={{ animationDelay: "1s" }}
                  />
                </>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.div variants={textVariants} className="flex overflow-hidden">
        {text.split("").map((char, i) => (
          <motion.span
            key={i}
            variants={letterVariants}
            custom={i}
            animate={isHovered ? "hover" : "animate"}
            className="text-lg sm:text-xl font-bold text-green-800 inline-block"
            style={{
              textShadow: isHovered ? "0 2px 8px rgba(34, 197, 94, 0.3)" : "none"
            }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </motion.div>

      <motion.div
        className="absolute -inset-1 bg-gradient-to-r from-green-400 via-green-500 to-green-600 rounded-2xl opacity-0 group-hover:opacity-20 blur-xl"
        animate={{
          rotate: [0, 360],
          transition: {
            repeat: Infinity,
            duration: 8,
            ease: "linear"
          }
        }}
      />
    </motion.a>
  );
};

export default AnimatedLogo;