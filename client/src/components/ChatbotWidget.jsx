import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle } from "lucide-react"; // Lucide chat icon

export default function ChatbotWidget() {
    const [open, setOpen] = useState(false);
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);

    const starterQuestions = [
        "What is a SIP?",
        "How do mutual funds work?",
        "How can I save tax using mutual funds?",
    ];

    const toggleModal = () => setOpen(!open);

    const sendMessage = async (question) => {
        if (!question && !input.trim()) return;

        const userInput = question || input;

        const newMessages = [...messages, { sender: "user", text: userInput }];
        setMessages(newMessages);
        setInput("");
        setLoading(true);
        const baseURL = "https://mfd-portfolio-with-server.onrender.com"

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

    return (
        <>
            {/* Floating Lucide Chat Icon */}
            <button
                onClick={toggleModal}
                className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-all"
            >
                <MessageCircle className="w-6 h-6" />
            </button>

            {/* Animated Modal */}
            <AnimatePresence>
                {open && (
                    <>
                        {/* Blurred BG */}
                        <motion.div
                            key="backdrop"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1, backdropFilter: "blur(6px)" }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/10 z-50"
                            onClick={toggleModal}
                        ></motion.div>

                        {/* Chat Container */}
                        <motion.div
                            key="chatbox"
                            initial={{ opacity: 0, y: 50, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 50, scale: 0.95 }}
                            transition={{ type: "spring", stiffness: 300, damping: 25 }}
                            className="fixed bottom-20 right-6 md:bottom-auto md:right-10 md:top-1/2 md:-translate-y-1/2 bg-white w-full md:w-[400px] h-[80%] md:h-[600px] flex flex-col rounded-2xl shadow-2xl overflow-hidden z-50"
                        >
                            {/* Header */}
                            <div className="bg-blue-600 text-white p-4 flex justify-between items-center">
                                <h2 className="font-bold">ValueInvesting AI Assistant</h2>
                                <button onClick={toggleModal} className="text-white text-xl">
                                    &times;
                                </button>
                            </div>

                            {/* Messages */}
                            <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-gray-50">
                                {messages.map((msg, idx) => (
                                    <div
                                        key={idx}
                                        className={`max-w-[80%] p-2 rounded-lg ${msg.sender === "user"
                                            ? "ml-auto bg-blue-100 text-right"
                                            : "mr-auto bg-green-100 text-left"
                                            }`}
                                    >
                                        <span className="block">{msg.text}</span>
                                    </div>
                                ))}

                                {loading && (
                                    <div className="text-gray-500 italic">Bot is typing...</div>
                                )}
                            </div>

                            {/* Starter questions */}
                            {messages.length === 0 && (
                                <div className="p-4 border-t bg-white">
                                    <p className="text-sm mb-2 text-gray-600">Try asking:</p>
                                    <div className="flex flex-wrap gap-2">
                                        {starterQuestions.map((q, idx) => (
                                            <button
                                                key={idx}
                                                onClick={() => sendMessage(q)}
                                                className="text-sm bg-gray-200 px-3 py-1 rounded-full hover:bg-gray-300"
                                            >
                                                {q}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Input */}
                            <div className="p-4 border-t flex gap-2 bg-white">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder="Type your question..."
                                    onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                                    className="flex-1 border border-gray-300 rounded p-2 text-sm"
                                />
                                <button
                                    onClick={() => sendMessage()}
                                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                                >
                                    Send
                                </button>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
