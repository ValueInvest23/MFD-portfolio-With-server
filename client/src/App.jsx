import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Services from "./components/Services";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Companies from "./components/Compnies";
import FAQ from "./components/FAQ";
import ChatbotWidget from "./components/ChatbotWidget"; // ✅ New

function App() {
  return (
    <div className="bg-gray-50 text-gray-800 scroll-smooth relative">
      <Navbar />
      <Hero />
      <Services />
      <Testimonials />
      <Companies />
      <FAQ />
      <Contact />
      <Footer />
      <ChatbotWidget /> {/* ✅ New */}
    </div>
  );
}

export default App;
