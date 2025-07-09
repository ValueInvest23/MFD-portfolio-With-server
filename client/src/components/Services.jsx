// File: src/components/Services.jsx
import React from "react";
import { motion } from "framer-motion";
import { ChartBarIcon, CurrencyDollarIcon, PresentationChartLineIcon } from "@heroicons/react/24/outline";

const services = [
    {
        icon: <PresentationChartLineIcon className="w-8 h-8 text-accent" />,
        title: "Investment Planning",
        desc: "Tailored strategies for your financial goals.",
    },
    {
        icon: <ChartBarIcon className="w-8 h-8 text-accent" />,
        title: "Portfolio Monitoring",
        desc: "Track and optimize returns with active rebalancing.",
    },
    {
        icon: <CurrencyDollarIcon className="w-8 h-8 text-accent" />,
        title: "Tax Optimization",
        desc: "Efficient solutions to reduce tax liabilities.",
    },
];

const itemVariants = {
    offscreen: { y: 20, opacity: 0 },
    onscreen: (i) => ({
        y: 0,
        opacity: 1,
        transition: {
            type: "spring",
            bounce: 0.3,
            duration: 0.6,
            delay: i * 0.1,
        },
    }),
};

export default function Services() {
    return (
        <section id="services" className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={{
                        hidden: {},
                        visible: {
                            transition: {
                                staggerChildren: 0.15,
                            },
                        },
                    }}
                    className="text-center mb-12"
                >
                    <motion.p
                        className="text-accent font-semibold mb-2"
                        variants={{
                            hidden: { opacity: 0, y: 20 },
                            visible: { opacity: 1, y: 0 },
                        }}
                        transition={{ duration: 0.6 }}
                    >
                        OUR SERVICES
                    </motion.p>
                    <motion.h2
                        className="text-4xl md:text-5xl font-bold text-gray-900"
                        variants={{
                            hidden: { opacity: 0, y: 20 },
                            visible: { opacity: 1, y: 0 },
                        }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        Professional Wealth Management
                    </motion.h2>
                    <motion.div
                        className="mx-auto h-1 w-20 bg-accent rounded-full mt-4"
                        variants={{
                            hidden: { scaleX: 0 },
                            visible: { scaleX: 1 },
                        }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        style={{ transformOrigin: "left" }}
                    />
                    <motion.div
                        className="mx-auto h-1 w-20 bg-blue-600 rounded-full"
                        variants={{
                            hidden: { scaleX: 0 },
                            visible: { scaleX: 1 },
                        }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    />
                </motion.div>


                {/* Label/List Style */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            custom={index}
                            initial="offscreen"
                            whileInView="onscreen"
                            viewport={{ once: true }}
                            variants={itemVariants}
                            className="flex flex-col items-center p-6 bg-white rounded-lg shadow hover:shadow-md transition"
                        >
                            <div className="mb-4">
                                {service.icon}
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">{service.title}</h3>
                            <p className="text-gray-600">{service.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
