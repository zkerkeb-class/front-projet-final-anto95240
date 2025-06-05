import { useNavigate, Link } from "react-router";
import { useState, useEffect } from "react";
import axios from "axios"
import "./signUpPart3.css"

const SignUpPart3 = ({ formData, setFormData, prevStep, handleSubmit }) => {
  
    const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    handleSubmit();
  };

    return (
        <section id="section-signupPart3" className="signupPart3-section-wrapper">
            <div className="signupPart3-form-container">
                <p className="form-greeting">Vous êtes nouveaux ici</p>
                <h2 className="form-title">Inscrivez-vous ici</h2>

                <form onSubmit={onSubmit} className="signupPart3-form">
                    <div className="form-group floating-label">
                        <input type="text"className="form-input" id="typeCompte" name="typeCompte" value={formData.typeCompte} onChange={handleChange} required placeholder=" " />
                        <label htmlFor="typeCompte">Type de compte</label>
                    </div>

                    <div className="form-group floating-label">
                        <input type="text"className="form-input" id="BudgetStart" name="BudgetStart" value={formData.BudgetStart} onChange={handleChange} required placeholder=" " />
                        <label htmlFor="BudgetStart">Budget de départ</label>
                    </div>
                    
                    <div className="form-group floating-label">
                        <input type="text"className="form-input" id="taux" name="taux" value={formData.taux} onChange={handleChange} required placeholder=" " />
                        <label htmlFor="taux">Taux</label>
                    </div>
                    <div className="btn-group">
                      <button type="button" onClick={prevStep} className="submit-button">Retour</button>
                      <button type="submit" className="submit-button">continuer</button>
                    </div>
                </form>

                <p className="create-account">
                    Vous avez déjà un compte ? <Link className="create-account-link" to="/">Se connecter ici</Link>
                </p>
            </div>
        </section>
    );
};

export default SignUpPart3;