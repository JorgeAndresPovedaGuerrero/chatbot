import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./ViewQuestions.css";

const ViewQuestions = () => {
    const [chats, setChats] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchChats = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/chats");
                setChats(response.data);
            } catch (err) {
                setError("Error al cargar las preguntas.");
            } finally {
                setLoading(false);
            }
        };

        fetchChats();
    }, []);

    return (
        <div className="view-questions-container">
            <div className="header">
                <button className="back-button" onClick={() => navigate("/")}>
                    ← Volver al inicio
                </button>
                <h2>Preguntas y Respuestas Guardadas</h2>
            </div>

            {loading && <p>Cargando...</p>}
            {error && <p className="error">{error}</p>}
            {!loading && chats.length === 0 && <p>No hay preguntas registradas.</p>}

            <ul className="questions-list">
                {chats.map((chat, index) => (
                    <li key={index} className="question-card">
                        <p><strong>Pregunta:</strong> {chat.question}</p>
                        <p><strong>Respuesta:</strong> {chat.answer}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ViewQuestions;