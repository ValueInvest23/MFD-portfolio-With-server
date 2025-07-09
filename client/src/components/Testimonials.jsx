import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
    {
        quote: "Very reliable and professional service! My investments have grown consistently.",
        name: "Anjali Mehta",
        role: "Entrepreneur",
    },
    {
        quote: "Helped me invest smartly. Tax-saving strategies saved me ₹2.8L last year.",
        name: "Vikram Shah",
        role: "IT Professional",
    },
    {
        quote: "Best MFD I've worked with so far. Truly understands financial goals.",
        name: "Priya Ghosh",
        role: "Doctor",
    },
    {
        quote: "Excellent guidance! I feel confident about my retirement plans.",
        name: "Ramesh Iyer",
        role: "Bank Manager",
    },
    {
        quote: "Their SIP & ELSS advice made my portfolio strong.",
        name: "Sneha Agarwal",
        role: "HR Consultant",
    },
    {
        quote: "Smart, responsive, and reliable. Highly recommend them.",
        name: "Manoj Nair",
        role: "Architect",
    },
];

const cardVariants = {
    enter: (direction) => ({
        x: direction > 0 ? 1000 : -1000,
        opacity: 0,
    }),
    center: {
        x: 0,
        opacity: 1,
        transition: {
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
        },
    },
    exit: (direction) => ({
        x: direction < 0 ? 1000 : -1000,
        opacity: 0,
        transition: {
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
        },
    }),
};

export default function TestimonialsCarousel() {
    const [[page, direction], setPage] = useState([0, 0]);
    const [perPage, setPerPage] = useState(3);

    useEffect(() => {
        const updatePerPage = () => {
            const width = window.innerWidth;
            if (width < 640) setPerPage(1); // Mobile
            else if (width < 1024) setPerPage(2); // Tablet
            else setPerPage(3); // Desktop
        };
        updatePerPage();
        window.addEventListener("resize", updatePerPage);
        return () => window.removeEventListener("resize", updatePerPage);
    }, []);

    const totalPages = Math.ceil(testimonials.length / perPage);

    const paginate = (newDirection) => {
        setPage([(page + newDirection + totalPages) % totalPages, newDirection]);
    };

    const currentTestimonials = testimonials.slice(
        page * perPage,
        page * perPage + perPage
    );

    return (
        <section id="testimonials" className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50 relative overflow-hidden">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <p className="text-blue-600 font-semibold mb-4">CLIENT TESTIMONIALS</p>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        Trusted by Investors
                    </h2>
                    <div className="mx-auto h-1 w-20 bg-blue-600 rounded-full" />
                </motion.div>

                {/* Arrows */}
                <div className="relative flex items-center justify-between">
                    <button
                        onClick={() => paginate(-1)}
                        className="z-10 bg-white text-blue-600 p-2 rounded-full shadow-md hover:bg-blue-100 transition-colors cursor-pointer"
                        aria-label="Previous testimonials"
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </button>

                    {/* Carousel Cards */}
                    <div className="relative w-full mx-4 overflow-hidden">
                        <div className="h-[360px] sm:h-[320px]">
                            <AnimatePresence initial={false} custom={direction}>
                                <motion.div
                                    key={page}
                                    custom={direction}
                                    variants={cardVariants}
                                    initial="enter"
                                    animate="center"
                                    exit="exit"
                                    className="absolute top-0 left-0 w-full flex justify-center items-stretch gap-6"
                                >
                                    {currentTestimonials.map((testimonial, index) => (
                                        <div
                                            key={`${page}-${index}`}
                                            className={`bg-white p-6 sm:p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col h-[300px] ${perPage === 1
                                                ? "w-[90%] mx-auto"
                                                : perPage === 2
                                                    ? "w-[45%]"
                                                    : "w-[30%]"
                                                }`}
                                        >
                                            <div className="mb-4 sm:mb-6">
                                                <svg
                                                    className="w-8 h-8 sm:w-10 sm:h-10 mx-auto text-yellow-400"
                                                    fill="currentColor"
                                                    viewBox="0 0 20 20"
                                                >
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                </svg>
                                            </div>
                                            <blockquote className="flex-grow">
                                                <p className="text-base sm:text-lg italic text-gray-700 mb-4 sm:mb-6">
                                                    "{testimonial.quote}"
                                                </p>
                                            </blockquote>
                                            <div className="mt-auto text-center">
                                                <div className="font-semibold text-black">{testimonial.name}</div>
                                                <div className="text-sm text-gray-500">{testimonial.role}</div>
                                            </div>
                                        </div>
                                    ))}
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>

                    <button
                        onClick={() => paginate(1)}
                        className="z-10 bg-white text-blue-600 p-2 rounded-full shadow-md hover:bg-blue-100 transition-colors cursor-pointer"
                        aria-label="Next testimonials"
                    >
                        <ChevronRight className="w-6 h-6" />
                    </button>
                </div>

                {/* Dots */}
                <div className="flex justify-center mt-8 space-x-2">
                    {Array.from({ length: totalPages }).map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setPage([index, index > page ? 1 : -1])}
                            className={`w-3 h-3 rounded-full transition-colors ${index === page ? "bg-blue-600" : "bg-gray-300"
                                }`}
                            aria-label={`Go to testimonial page ${index + 1}`}
                        />
                    ))}
                </div>

                {/* Trust Score */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6 }}
                    className="text-center mt-12"
                >
                    <div className="inline-flex items-center text-blue-600 font-medium">
                        <span className="mr-2">TrustScore 4.9/5</span>
                        <div className="flex">
                            {[...Array(5)].map((_, i) => (
                                <svg
                                    key={i}
                                    className="w-5 h-5 text-yellow-400"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
