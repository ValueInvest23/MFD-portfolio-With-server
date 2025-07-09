import React, { useState, useEffect } from "react";
import { Link } from "react-scroll";
import { FiMenu, FiX } from "react-icons/fi";
import Logo from "../assets/Logo.png";

export default function Navbar() {
    const [active, setActive] = useState("home");
    const [isOpen, setIsOpen] = useState(false);

    const navItems = ["home", "services", "testimonials", "companies", "faq", "contact"];

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY + window.innerHeight / 2;
            navItems.forEach((id) => {
                const el = document.getElementById(id);
                if (el && scrollPosition >= el.offsetTop) {
                    setActive(id);
                }
            });
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const closeMenu = () => {
        setIsOpen(false);
    };

    // Optional: lock body scroll when menu is open
    useEffect(() => {
        document.body.style.overflow = isOpen ? "hidden" : "auto";
    }, [isOpen]);

    return (
        <nav className="fixed w-full bg-white shadow-md z-50">
            <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
                {/* Logo */}
                <div className="flex items-center">
                    <img src={Logo} alt="Logo" className="w-32 h-auto" />
                </div>

                {/* Desktop nav */}
                <div className="hidden md:flex space-x-8">
                    {navItems.map((sec) => (
                        <Link
                            key={sec}
                            to={sec}
                            smooth
                            duration={500}
                            offset={-70}
                            onClick={closeMenu}
                            className={`capitalize cursor-pointer font-medium hover:text-blue-600 transition ${active === sec ? "text-blue-600 underline underline-offset-4" : ""
                                }`}
                        >
                            {sec}
                        </Link>
                    ))}
                </div>

                {/* Hamburger */}
                <button
                    onClick={toggleMenu}
                    className="md:hidden text-3xl text-gray-800 focus:outline-none"
                    aria-label="Menu"
                >
                    <FiMenu />
                </button>
            </div>

            {/* Backdrop Blur */}
            <div
                className={`fixed inset-0 bg-black/30 backdrop-blur-sm z-40 transition-opacity duration-300 ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"
                    }`}
                onClick={closeMenu}
            ></div>

            {/* Mobile side panel */}
            <div
                className={`fixed top-0 right-0 h-full w-4/5 max-w-xs bg-white z-50 shadow-lg transform transition-transform duration-300 ${isOpen ? "translate-x-0" : "translate-x-full"
                    }`}
            >
                <div className="flex justify-between items-center px-4 py-4 border-b">
                    <img src={Logo} alt="Logo" className="w-28 h-auto" />
                    <button
                        onClick={toggleMenu}
                        className="text-3xl text-gray-800 focus:outline-none"
                    >
                        <FiX />
                    </button>
                </div>

                <div className="flex flex-col items-start px-6 mt-8 space-y-6">
                    {navItems.map((sec) => (
                        <Link
                            key={sec}
                            to={sec}
                            smooth
                            duration={500}
                            offset={-70}
                            onClick={closeMenu}
                            className={`text-lg font-semibold capitalize cursor-pointer hover:text-blue-600 transition ${active === sec ? "text-blue-600 underline underline-offset-4" : ""
                                }`}
                        >
                            {sec}
                        </Link>
                    ))}
                </div>
            </div>
        </nav>
    );
}
