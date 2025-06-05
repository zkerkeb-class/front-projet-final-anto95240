import { useNavigate, Link } from "react-router";
import { useState, useEffect } from "react";
import axios from "axios"
import "./signUpPart1.css"

const SignUpPart1 = ({ formData, setFormData, nextStep }) => {

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    nextStep();
  };

    return (
        <section id="section-signupPart1" className="signupPart1-section-wrapper">
            <div className="signupPart1-form-container">
                <p className="form-greeting">Vous êtes nouveaux ici</p>
                <h2 className="form-title">Inscrivez-vous ici</h2>

                <form onSubmit={handleSubmit} className="signupPart1-form">
                    <div className="form-group floating-label">
                        <input type="text "className="form-input" id="firstname" name="firstname" value={formData.firstname} onChange={handleChange} required placeholder=" " />
                        <label htmlFor="firstname">Prénom</label>
                    </div>

                    <div className="form-group floating-label">
                        <input type="text"className="form-input" id="lastname" name="lastname" value={formData.lastname} onChange={handleChange} required placeholder=" " />
                        <label htmlFor="lastname">Nom</label>
                    </div>
                    
                    <div className="form-group floating-label">
                        <input type="text"className="form-input" id="username" name="username" value={formData.username} onChange={handleChange} required placeholder=" " />
                        <label htmlFor="username">Nom d’Utilisateur</label>
                    </div>

                    <button type="submit" className="submit-button">Continuer</button>
                </form>

                <p className="create-account">
                    Vous avez déjà un compte ? <Link className="create-account-link" to="/">Se connecter ici</Link>
                </p>
            </div>
        </section>
    );
};

export default SignUpPart1;