import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
    {
        question: "What is a Mutual Fund Distributor (MFD)?",
        answer:
            "An MFD is a licensed agent authorized to offer and manage mutual fund investments for clients. They help you navigate the complex mutual fund landscape and make informed decisions aligned with your financial goals.",
    },
    {
        question: "How do I start investing?",
        answer:
            "We begin with a detailed financial assessment to understand your goals, risk appetite, and investment horizon. Based on this, we recommend suitable mutual fund schemes and guide you through each step, from KYC to portfolio monitoring.",
    },
    {
        question: "Are my investments safe?",
        answer:
            "Mutual funds in India are regulated by SEBI (Securities and Exchange Board of India). They ensure transparency and investor protection. While all investments carry some risk, mutual funds offer diversification and professional management to help manage risk effectively.",
    },
    {
        question: "What documents are needed to invest?",
        answer:
            "You'll need: PAN card, Aadhaar card, valid proof of address, a cancelled cheque leaf, and passport-sized photographs. We assist you in completing all KYC (Know Your Customer) requirements smoothly.",
    },
    {
        question: "What are the fees involved?",
        answer:
            "Our advisory fee is a small percentage of the assets under management (AUM). There are no hidden charges — all fees are disclosed upfront to ensure complete transparency.",
    },
];

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section
            id="faq"
            className="py-20 bg-gradient-to-b from-blue-50 to-indigo-50"
        >
            <div className="max-w-4xl mx-auto px-4 sm:px-6">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
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
                        className="text-black font-semibold mb-4"
                        variants={{
                            hidden: { opacity: 0, y: 20 },
                            visible: { opacity: 1, y: 0 },
                        }}
                        transition={{ duration: 0.6 }}
                    >
                        HAVE QUESTIONS?
                    </motion.p>

                    <motion.h2
                        className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
                        variants={{
                            hidden: { opacity: 0, y: 20 },
                            visible: { opacity: 1, y: 0 },
                        }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        Frequently Asked Questions
                    </motion.h2>

                    <motion.div
                        className="mx-auto h-1 w-20 bg-blue-600 rounded-full"
                        variants={{
                            hidden: { scaleX: 0 },
                            visible: { scaleX: 1 },
                        }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        style={{ transformOrigin: "left" }}
                    />
                </motion.div>


                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-20px" }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="bg-white rounded-xl shadow-md overflow-hidden"
                        >
                            <button
                                onClick={() => toggleFAQ(index)}
                                className="w-full flex justify-between items-center px-6 py-5 text-left focus:outline-none"
                            >
                                <h3 className="text-lg md:text-xl font-semibold text-gray-800">
                                    {faq.question}
                                </h3>
                                <motion.span
                                    animate={{ rotate: openIndex === index ? 45 : 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="text-blue-600 text-2xl ml-4"
                                >
                                    +
                                </motion.span>
                            </button>

                            <AnimatePresence initial={false}>
                                {openIndex === index && (
                                    <motion.div
                                        key="content"
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{
                                            height: "auto",
                                            opacity: 1,
                                            transition: {
                                                height: { duration: 0.4, ease: "easeInOut" },
                                                opacity: { duration: 0.3, ease: "easeInOut" },
                                            },
                                        }}
                                        exit={{
                                            height: 0,
                                            opacity: 0,
                                            transition: {
                                                height: { duration: 0.3, ease: "easeInOut" },
                                                opacity: { duration: 0.2, ease: "easeInOut" },
                                            },
                                        }}
                                        className="px-6 pb-5 overflow-hidden"
                                    >
                                        <div className="border-t border-gray-200 pt-4 text-gray-700 text-base leading-relaxed">
                                            {faq.answer}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="text-center mt-12"
                >
                    <p className="text-gray-600 mb-6">
                        Still have questions? We’re happy to help.
                    </p>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold shadow-md"
                        onClick={() =>
                            document
                                .getElementById("contact")
                                .scrollIntoView({ behavior: "smooth" })
                        }
                    >
                        Contact Us
                    </motion.button>
                </motion.div>
            </div>
        </section>
    );
}
