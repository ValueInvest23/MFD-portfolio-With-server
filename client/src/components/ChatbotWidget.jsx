import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Send, X, Bot } from "lucide-react";

export default function ChatbotWidget() {
    const [open, setOpen] = useState(false);
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const starterQuestions = [
        "What is a SIP?",
        "How do mutual funds work?",
        "How can I save tax using mutual funds?",
    ];

    const toggleModal = () => setOpen(!open);

    // Auto-scroll to bottom when messages change
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, loading]);

    const sendMessage = async (question) => {
        if (!question && !input.trim()) return;

        const userInput = question || input;

        const newMessages = [...messages, { sender: "user", text: userInput }];
        setMessages(newMessages);
        setInput("");
        setLoading(true);

        const baseURL = "https://mfd-portfolio-with-server.onrender.com";

        try {
            const response = await fetch(`${baseURL}/api/chat`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ question: userInput }),
            });

            const data = await response.json();

            setMessages([
                ...newMessages,
                { sender: "bot", text: data.answer || "No answer received." },
            ]);
        } catch (error) {
            console.error(error);
            setMessages([
                ...newMessages,
                { sender: "bot", text: "Something went wrong. Please try again." },
            ]);
        } finally {
            setLoading(false);
        }
    };

    // Typing animation dots
    const TypingIndicator = () => (
        <div className="flex space-x-1">
            {[...Array(3)].map((_, i) => (
                <motion.div
                    key={i}
                    animate={{ y: [0, -5, 0] }}
                    transition={{
                        repeat: Infinity,
                        duration: 1,
                        delay: i * 0.2,
                    }}
                    className="w-2 h-2 bg-gray-400 rounded-full"
                />
            ))}
        </div>
    );

    return (
        <>
            {/* Floating Chat Button with Bounce Animation */}
            <motion.button
                onClick={toggleModal}
                className="fixed bottom-6 right-6 bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 rounded-full shadow-xl hover:shadow-2xl transition-all z-40"
                initial={{ scale: 0 }}
                animate={{
                    scale: 1,
                    y: [0, -10, 0],
                    boxShadow: ["0 4px 6px rgba(0, 0, 0, 0.1)", "0 10px 15px rgba(0, 0, 0, 0.2)", "0 4px 6px rgba(0, 0, 0, 0.1)"]
                }}
                transition={{
                    scale: { type: "spring", stiffness: 300, damping: 20 },
                    y: { repeat: Infinity, duration: 2, ease: "easeInOut" },
                    boxShadow: { repeat: Infinity, duration: 2, ease: "easeInOut" }
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
            >
                <MessageCircle className="w-6 h-6" />
                {!open && (
                    <motion.div
                        className="absolute -top-1 -right-1 bg-red-500 rounded-full w-5 h-5 flex items-center justify-center text-xs"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 500, damping: 20 }}
                    >
                        <span className="text-white">!</span>
                    </motion.div>
                )}
            </motion.button>

            {/* Animated Modal */}
            <AnimatePresence>
                {open && (
                    <>
                        {/* Blurred BG */}
                        <motion.div
                            key="backdrop"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
                            onClick={toggleModal}
                        ></motion.div>

                        {/* Chat Container */}
                        <motion.div
                            key="chatbox"
                            initial={{ opacity: 0, y: 100, scale: 0.8 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 100, scale: 0.8 }}
                            transition={{ type: "spring", stiffness: 300, damping: 25 }}
                            className="fixed bottom-20 right-6 md:right-10 w-[calc(100%-3rem)] md:w-96 h-[70vh] max-h-[600px] flex flex-col rounded-2xl shadow-2xl overflow-hidden z-50 bg-white"
                        >
                            {/* Header with gradient */}
                            <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 flex justify-between items-center">
                                <div className="flex items-center space-x-2">
                                    <Bot className="w-5 h-5" />
                                    <h2 className="font-bold text-lg">Investing AI Assistant</h2>
                                </div>
                                <motion.button
                                    onClick={toggleModal}
                                    className="text-white p-1 rounded-full hover:bg-white/20"
                                    whileHover={{ rotate: 90 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    <X className="w-5 h-5" />
                                </motion.button>
                            </div>

                            {/* Messages Container */}
                            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-gray-50 to-gray-100">
                                {messages.length === 0 ? (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.3 }}
                                        className="flex flex-col items-center justify-center h-full text-center text-gray-500"
                                    >
                                        <Bot className="w-12 h-12 mb-4 text-blue-400" />
                                        <h3 className="text-lg font-medium text-gray-700">How can I help with your investments today?</h3>
                                        <p className="text-sm mt-2">Ask me anything about mutual funds, SIPs, or tax savings.</p>
                                    </motion.div>
                                ) : (
                                    messages.map((msg, idx) => (
                                        <motion.div
                                            key={idx}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.3 }}
                                            className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                                        >
                                            <div
                                                className={`max-w-[80%] p-3 rounded-2xl ${msg.sender === "user"
                                                    ? "bg-blue-500 text-white rounded-br-none"
                                                    : "bg-white text-gray-800 rounded-bl-none shadow-sm"
                                                    }`}
                                            >
                                                <span className="block">{msg.text}</span>
                                            </div>
                                        </motion.div>
                                    ))
                                )}
                                {loading && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="flex justify-start"
                                    >
                                        <div className="bg-white p-3 rounded-2xl rounded-bl-none shadow-sm">
                                            <TypingIndicator />
                                        </div>
                                    </motion.div>
                                )}
                                <div ref={messagesEndRef} />
                            </div>

                            {/* Starter questions */}
                            {messages.length === 0 && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5 }}
                                    className="p-4 border-t bg-white"
                                >
                                    <p className="text-sm mb-3 text-gray-500 font-medium">Try asking:</p>
                                    <div className="grid grid-cols-1 gap-2">
                                        {starterQuestions.map((q, idx) => (
                                            <motion.button
                                                key={idx}
                                                onClick={() => sendMessage(q)}
                                                className="text-left text-sm bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-xl transition-all"
                                                whileHover={{ x: 5 }}
                                                whileTap={{ scale: 0.98 }}
                                            >
                                                {q}
                                            </motion.button>
                                        ))}
                                    </div>
                                </motion.div>
                            )}

                            {/* Input Area */}
                            <div className="p-3 border-t bg-white">
                                <motion.div
                                    layout
                                    className="flex items-center gap-2"
                                >
                                    <input
                                        type="text"
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        placeholder="Type your question..."
                                        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                                        className="flex-1 border border-gray-200 focus:border-blue-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all"
                                    />
                                    <motion.button
                                        onClick={() => sendMessage()}
                                        className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        disabled={!input.trim()}
                                    >
                                        <Send className="w-5 h-5" />
                                    </motion.button>
                                </motion.div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}