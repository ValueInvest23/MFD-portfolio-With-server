import React, { useState } from "react";
import { motion } from "framer-motion";
import { UserIcon, EnvelopeIcon, ChatBubbleLeftRightIcon } from "@heroicons/react/24/outline";

export default function Contact() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { name, email, message } = formData;

        const whatsappNumber = "7203977628"; // e.g., "919876543210" (with country code, no +)
        const text = `Hello!%0AName: ${name}%0AEmail: ${email}%0AMessage: ${message}`;

        window.open(`https://wa.me/${whatsappNumber}?text=${text}`, "_blank");
    };

    return (
        <section id="contact" className="py-20 bg-gradient-to-br from-gray-50 to-white">
            <div className="max-w-lg mx-auto px-6">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-80px" }}
                    variants={{
                        hidden: {},
                        visible: {
                            transition: {
                                staggerChildren: 0.15,
                            },
                        },
                    }}
                    className="text-center mb-10"
                >
                    <motion.h2
                        className="text-4xl font-extrabold text-gray-800 mb-3"
                        variants={{
                            hidden: { opacity: 0, y: 20 },
                            visible: { opacity: 1, y: 0 },
                        }}
                        transition={{ duration: 0.5 }}
                    >
                        Let’s Connect
                    </motion.h2>

                    <motion.p
                        className="text-gray-600"
                        variants={{
                            hidden: { opacity: 0, y: 20 },
                            visible: { opacity: 1, y: 0 },
                        }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        Fill out the form and send us a WhatsApp directly
                    </motion.p>

                    <motion.div
                        className="h-1 w-16 bg-blue-600 mx-auto mt-4 rounded-full"
                        variants={{
                            hidden: { scaleX: 0 },
                            visible: { scaleX: 1 },
                        }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        style={{ transformOrigin: "left" }}
                    />
                </motion.div>


                <motion.form
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="bg-white p-8 rounded-2xl shadow-lg space-y-6 border border-gray-200"
                >
                    <div className="relative">
                        <UserIcon className="w-5 h-5 absolute top-3 left-3 text-gray-400" />
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Your Name"
                            required
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                    </div>

                    <div className="relative">
                        <EnvelopeIcon className="w-5 h-5 absolute top-3 left-3 text-gray-400" />
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Your Email"
                            required
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                    </div>

                    <div className="relative">
                        <ChatBubbleLeftRightIcon className="w-5 h-5 absolute top-3 left-3 text-gray-400" />
                        <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            placeholder="Your Message"
                            rows="4"
                            required
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
                        />
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
                    >
                        Send via WhatsApp
                    </motion.button>
                </motion.form>

                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                    className="text-center text-sm text-gray-500 mt-6"
                >
                    We'll reply to you as soon as possible!
                </motion.p>
            </div>
        </section>
    );
}
