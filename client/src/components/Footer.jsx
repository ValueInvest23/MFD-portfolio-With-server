import React, { useMemo } from "react";
import { motion } from "framer-motion";

const socialLinks = [
    { name: "LinkedIn", url: "#" },
    { name: "Twitter", url: "#" },
    { name: "Instagram", url: "#" }
];

export default function Footer() {
    const currentYear = useMemo(() => new Date().getFullYear(), []);

    return (
        <footer className="bg-gray-900 text-gray-300 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3 }}
                        className="text-sm mb-4 md:mb-0"
                    >
                        &copy; {currentYear} ValueInvesting  MFD. All rights reserved.
                    </motion.p>

                    <div className="flex space-x-6">
                        {socialLinks.map((link, index) => (
                            <motion.a
                                key={link.name}
                                href={link.url}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.3, delay: index * 0.1 }}
                                className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                                aria-label={link.name}
                            >
                                {link.name}
                            </motion.a>
                        ))}
                    </div>
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="mt-8 pt-8 border-t border-gray-800 text-center text-xs text-gray-500"
                >
                    <p>ValueInvesting is a SEBI registered Mutual Fund Distributor</p>

                </motion.div>
            </div>
        </footer>
    );
}