
import React from "react";
import { useNavigate } from "react-router-dom";
import ChatBot from "../components/chatbot";
import "./Chat.css"; 

const Chat = () => {
    const navigate = useNavigate();
    
    return (
        <div className="chat-page-container">
            <div className="chat-page-header">
                <button 
                    className="back-button" 
                    onClick={() => navigate("/")}
                >
                    ← Volver al inicio
                </button>
                <h1>Asistente Virtual</h1>
            </div>
            <div className="chat-page-content">
                <ChatBot />
            </div>
        </div>
    );
};

export default Chat;