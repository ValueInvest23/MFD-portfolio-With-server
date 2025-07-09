import React from "react";
import { motion } from "framer-motion";
import HeroBg from "../assets/HeroBg.png"; // Adjust as needed

export default function Hero() {
    return (
        <section
            id="home"
            className="relative min-h-screen w-full flex flex-col justify-center items-center text-center px-4 sm:px-6 lg:px-8 overflow-hidden"
        >
            {/* Background */}
            <div className="absolute inset-0 z-0">
                <img
                    src={HeroBg}
                    alt="Financial security background"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black/80" />
            </div>

            {/* Content */}
            <div className="relative z-10 text-white w-full max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="flex flex-col items-center space-y-8"
                >
                    <motion.h1
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight tracking-tight"
                    >
                        <span className="block">Secure Your Wealth</span>
                        <span className="block text-accent">With Professional Guidance</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-base sm:text-lg md:text-xl max-w-3xl mx-auto text-gray-300 px-2"
                    >
                        Trusted mutual fund distributor offering expert advice and customized financial planning to help you achieve your long-term financial goals.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-2 sm:pt-4 w-full sm:w-auto"
                    >
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-accent text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg shadow-lg transition-all duration-300 w-full sm:w-auto"
                            onClick={() => document.getElementById("services").scrollIntoView({ behavior: "smooth" })}
                        >
                            Explore Services
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-transparent border-2 border-white text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg transition-all duration-300 w-full sm:w-auto"
                            onClick={() => document.getElementById("contact").scrollIntoView({ behavior: "smooth" })}
                        >
                            Contact Advisor
                        </motion.button>
                    </motion.div>
                </motion.div>
            </div>

            {/* Optional: Scroll indicator */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1 }}
                className="absolute bottom-8 sm:bottom-10 left-1/2 transform -translate-x-1/2"
            >
                {/* Add scroll icon if you like */}
            </motion.div>
        </section>
    );
}
