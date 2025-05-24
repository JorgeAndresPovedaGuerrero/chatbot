import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./ChatBot.css";

const ChatBot = () => {
    const [chats, setChats] = useState([]);
    const [query, setQuery] = useState("");
    const [messages, setMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        const fetchChats = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/chats");
                setChats(response.data);
            } catch (error) {
                console.error("Error fetching questions:", error);
                setMessages((prev) => [
                    ...prev, 
                    { role: "bot", text: "No se pudieron cargar las preguntas predefinidas." }
                ]);
            }
        };
        fetchChats();
    }, []);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const handleChat = async () => {
        const trimmedQuery = query.trim();
        if (!trimmedQuery) return;

        setMessages((prev) => [...prev, { role: "user", text: trimmedQuery }]);
        setQuery("");
        setIsLoading(true);

        try {
            const found = chats.find(
                (chat) => chat.question.toLowerCase() === trimmedQuery.toLowerCase()
            );

            setTimeout(() => {
                setMessages((prev) => [
                    ...prev,
                    {
                        role: "bot",
                        text: found ? found.answer : "Lo siento, no encontré una respuesta específica a tu pregunta.",
                    }
                ]);
                setIsLoading(false);
            }, 500);
        } catch (error) {
            console.error("Error processing chat:", error);
            setMessages((prev) => [
                ...prev,
                { role: "bot", text: "Hubo un error procesando tu mensaje." }
            ]);
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            handleChat();
        }
    };

    // 🔹 NUEVA función para limpiar historial
    const handleClearChat = () => {
        setMessages([]);
    };

    return (
        <div className="chat-container">
            <div className="chat-header">
                <h2>Chatea con el bot</h2>
            </div>
            <div className="chat-messages">
                {messages.map((msg, idx) => (
                    <div
                        key={idx}
                        className={`message-bubble ${
                            msg.role === "user" ? "user-bubble" : "bot-bubble"
                        }`}
                    >
                        {msg.text}
                    </div>
                ))}
                {isLoading && (
                    <div className="message-bubble bot-bubble typing-indicator">
                        Escribiendo...
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>
            {/* 🔹 Botón discreto debajo del chat */}
            <div className="clear-chat-container">
                <button className="clear-button" onClick={handleClearChat}>
                    Limpiar historial
                </button>
            </div>

            <div className="chat-input">
                <input
                    type="text"
                    placeholder="Escribe tu pregunta..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={handleKeyPress}
                    disabled={isLoading}
                />
                <button 
                    onClick={handleChat} 
                    disabled={!query.trim() || isLoading}
                >
                    Enviar
                </button>
            </div>
        </div>
    );
};

export default ChatBot;