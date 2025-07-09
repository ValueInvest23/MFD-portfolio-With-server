import React from "react";
import { motion, useAnimation } from "framer-motion";

// ✅ Local logo paths in /public
const logos = [
    { src: "/sbi-mf.png", alt: "SBI Mutual Fund" },
    { src: "/icici-mf.png", alt: "ICICI Prudential Mutual Fund" },
    { src: "/hdfc-mf.jpg", alt: "HDFC Mutual Fund" },
    { src: "/axis-mf.jpg", alt: "Axis Mutual Fund" },
    { src: "/kotak-mf.png", alt: "Kotak Mutual Fund" },
    { src: "/nippon-mf.jpg", alt: "Nippon India Mutual Fund" },
    { src: "/birla-mf.webp", alt: "Aditya Birla Sun Life Mutual Fund" },
    { src: "/uti-mf.jpg", alt: "UTI Mutual Fund" },
    { src: "/dsp-mf.png", alt: "DSP Mutual Fund" },
    { src: "/franklin-mf.webp", alt: "Franklin Templeton Mutual Fund" },
    { src: "/mirae-mf.avif", alt: "Mirae Asset Mutual Fund" },
    { src: "/motilal-mf.gif", alt: "Motilal Oswal Mutual Fund" },
];

export default function Companies() {
    const controls = useAnimation();

    // Double the logos for seamless wrap
    const loopLogos = [...logos, ...logos];

    React.useEffect(() => {
        controls.start({
            x: ["0%", "-50%"],
            transition: {
                repeat: Infinity,
                duration: 25,
                ease: "linear",
            },
        });
    }, [controls]);

    const handleHoverStart = () => controls.stop();
    const handleHoverEnd = () =>
        controls.start({
            x: ["0%", "-50%"],
            transition: {
                repeat: Infinity,
                duration: 25,
                ease: "linear",
            },
        });

    return (
        <section
            id="companies"
            className="py-20 bg-gradient-to-b from-white to-blue-50 relative overflow-hidden"
        >
            {/* Fade overlays */}
            <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white to-transparent z-10" />
            <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white to-transparent z-10" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
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
                    className="text-center mb-16"
                >
                    <motion.h2
                        className="text-3xl md:text-5xl font-bold text-gray-900 mb-6"
                        variants={{
                            hidden: { opacity: 0, y: 20 },
                            visible: { opacity: 1, y: 0 },
                        }}
                        transition={{ duration: 0.6 }}
                    >
                        Trusted By Leading AMFI Mutual Funds
                    </motion.h2>

                    <motion.div
                        className="mx-auto h-1 w-20 bg-blue-600 rounded-full"
                        variants={{
                            hidden: { scaleX: 0 },
                            visible: { scaleX: 1 },
                        }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        style={{ transformOrigin: "left" }}
                    />
                </motion.div>


                <div
                    className="relative w-full py-4 overflow-hidden"
                    onMouseEnter={handleHoverStart}
                    onMouseLeave={handleHoverEnd}
                >
                    <motion.div
                        className="flex min-w-fit gap-12 items-center"
                        animate={controls}
                    >
                        {loopLogos.map((logo, idx) => (
                            <motion.div
                                key={idx}
                                className="min-w-[180px] h-24 flex items-center justify-center bg-white rounded-xl shadow-sm p-4 hover:shadow-lg transition-all duration-300"
                                whileHover={{
                                    scale: 1.05,
                                    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                                }}
                            >
                                <img
                                    src={logo.src}
                                    alt={logo.alt}
                                    className="h-12 object-contain transition-all duration-500"
                                    loading="lazy"
                                />
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
