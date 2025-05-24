import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const Home = () => {
    const navigate = useNavigate();
    return (
        <div className="home-container">
            <div className="home-content">
                <h1 className="home-title">Chatbot Inteligente</h1>
                <p className="home-subtitle">Plataforma de Gestión de Preguntas y Respuestas</p>
                
                {/* Imagen agregada */}
                <img 
                    src="https://i.pinimg.com/1200x/fd/2d/65/fd2d65b2e4e497fa6015c44e359e2f5d.jpg" 
                    alt="Chatbot" 
                    className="home-image"
                />
                
                <div className="home-actions">
                    <button 
                        className="home-btn home-btn-primary" 
                        onClick={() => navigate("/add")}
                    >
                        <i className="icon-plus"></i>
                        Agregar Preguntas
                    </button>
                    <button 
                        className="home-btn home-btn-secondary" 
                        onClick={() => navigate("/chat")}
                    >
                        <i className="icon-chat"></i>
                        Iniciar Chat
                    </button>
                    <button 
                        className="home-btn home-btn-tertiary" 
                        onClick={() => navigate("/view")}
                    >
                        📚 Ver Preguntas Guardadas
                    </button>
                </div>
            </div>  
            <footer className="home-footer">
                Desarrollado por <span className="author-name">Jorge Andrés Poveda Guerrero</span>
            </footer>
        </div>
    );
}

export default Home;