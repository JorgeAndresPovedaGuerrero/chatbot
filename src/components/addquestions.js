import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const AddQuestion = () => {
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!question.trim() || !answer.trim()) {
            setSubmitStatus({ 
                type: "error", 
                message: "Por favor, complete todos los campos" 
            });
            return;
        }

        setIsSubmitting(true);
        setSubmitStatus(null);

        try {
            await axios.post("http://localhost:5000/api/chats/add", { 
                question: question.trim(), 
                answer: answer.trim() 
            });
            
            setSubmitStatus({ 
                type: "success", 
                message: "Pregunta agregada con éxito" 
            });
            
            setQuestion("");
            setAnswer("");
        } catch (error) {
            console.error("Error al agregar la pregunta: ", error);
            setSubmitStatus({ 
                type: "error", 
                message: "Error al guardar la pregunta. Intente nuevamente." 
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="add-question-container">
            <div className="add-question-card">
                <h2>Agregar Nueva Pregunta</h2>
                
                <form onSubmit={handleSubmit} className="add-question-form">
                    <div className="form-group">
                        <label htmlFor="question">Pregunta</label>
                        <input
                            id="question"
                            type="text"
                            value={question}
                            onChange={(e) => setQuestion(e.target.value)}
                            placeholder="Escribe la pregunta"
                            required
                            disabled={isSubmitting}
                        />
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="answer">Respuesta</label>
                        <textarea
                            id="answer"
                            value={answer}
                            onChange={(e) => setAnswer(e.target.value)}
                            placeholder="Escribe la respuesta"
                            required
                            disabled={isSubmitting}
                            rows="4"
                        />
                    </div>

                    {submitStatus && (
                        <div className={`status-message ${submitStatus.type}`}>
                            {submitStatus.message}
                        </div>
                    )}

                    <div className="form-actions">
                        <button 
                            type="button" 
                            className="btn btn-secondary"
                            onClick={() => navigate("/")}
                            disabled={isSubmitting}
                        >
                            Volver al home
                        </button>
                        <button 
                            type="submit" 
                            className="btn btn-primary"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? "Guardando..." : "Guardar"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddQuestion;