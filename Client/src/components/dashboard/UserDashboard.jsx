import React from "react";
import { motion } from "framer-motion";
import { FiSun, FiMoon, FiArrowRight } from "react-icons/fi";

const WelcomePage = ({ darkMode, toggleDarkMode }) => {
  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        darkMode ? "bg-slate-900" : "bg-slate-50"
      }`}
    >
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.1 }}
            transition={{
              duration: 2,
              delay: i * 0.2,
              repeat: Infinity,
              repeatType: "mirror",
            }}
            className={`absolute ${
              darkMode ? "bg-indigo-500" : "bg-slate-300"
            } rounded-full -z-10`}
            style={{
              width: `${Math.random() * 100 + 50}px`,
              height: `${Math.random() * 100 + 50}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="max-w-2xl text-center">
          {/* Theme Toggle */}
          <motion.button
            onClick={toggleDarkMode}
            whileHover={{ scale: 1.1 }}
            className={`p-3 rounded-full mb-8 ${
              darkMode
                ? "bg-slate-800 text-slate-100"
                : "bg-white text-slate-900"
            } shadow-lg`}
          >
            {darkMode ? <FiSun size={24} /> : <FiMoon size={24} />}
          </motion.button>

          {/* Main Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1
              className={`text-5xl md:text-7xl font-bold mb-6 ${
                darkMode ? "text-white" : "text-slate-900"
              }`}
            >
              Welcome to
              <span className="bg-gradient-to-r from-indigo-400 to-indigo-600 bg-clip-text text-transparent">
                {" "}
                SupportHub
              </span>
            </h1>
          </motion.div>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className={`text-xl md:text-2xl mb-12 ${
              darkMode ? "text-slate-300" : "text-slate-600"
            }`}
          >
            Your all-in-one solution for seamless support management
          </motion.p>

          {/* Features Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="grid md:grid-cols-3 gap-6 mb-12"
          >
            {["Instant Support", "Secure Platform", "24/7 Access"].map(
              (feature, index) => (
                <div
                  key={index}
                  className={`p-6 rounded-2xl backdrop-blur-sm border ${
                    darkMode
                      ? "bg-slate-800/30 border-slate-700"
                      : "bg-white/30 border-slate-200"
                  }`}
                >
                  <div className="text-indigo-400 mb-4">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-indigo-500/10 rounded-xl">
                      <FiArrowRight size={24} />
                    </div>
                  </div>
                  <h3
                    className={`text-lg font-semibold ${
                      darkMode ? "text-white" : "text-slate-900"
                    }`}
                  >
                    {feature}
                  </h3>
                </div>
              )
            )}
          </motion.div>

          {/* CTA Button */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block"
          >
            <button
              className={`flex items-center gap-2 px-8 py-4 rounded-full text-lg font-semibold transition-all ${
                darkMode
                  ? "bg-indigo-600 text-white hover:bg-indigo-700"
                  : "bg-indigo-500 text-white hover:bg-indigo-600"
              }`}
            >
              Get Started
              <FiArrowRight className="animate-bounce-horizontal" />
            </button>
          </motion.div>

          {/* Footer Note */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className={`mt-12 text-sm ${
              darkMode ? "text-slate-400" : "text-slate-500"
            }`}
          >
            Trusted by teams worldwide • 99.9% Uptime • Enterprise-grade
            security
          </motion.p>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
