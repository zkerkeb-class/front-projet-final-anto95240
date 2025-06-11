import { useNavigate, Link } from "react-router";
import { useState, useEffect } from "react";
import axios from "axios"
import "./signUpPart3.css"
import { useTranslation } from "react-i18next";

const SignUpPart3 = ({ formData, setFormData, prevStep, handleSubmit }) => {
  
    const { t } = useTranslation();
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
                <p className="form-greeting">{t('RegisterPage.title1')}</p>
                <h2 className="form-title">{t('RegisterPage.title2')}</h2>

                <form onSubmit={onSubmit} className="signupPart3-form">
                    <div className="form-group floating-label">
                        <input type="text"className="form-input" id="typeCompte" name="typeCompte" value={formData.typeCompte} onChange={handleChange} required placeholder=" " />
                        <label htmlFor="typeCompte">{t('RegisterPage.typeAccount')}</label>
                    </div>

                    <div className="form-group floating-label">
                        <input type="text"className="form-input" id="BudgetStart" name="BudgetStart" value={formData.BudgetStart} onChange={handleChange} required placeholder=" " />
                        <label htmlFor="BudgetStart">{t('RegisterPage.budgetStart')}</label>
                    </div>
                    
                    <div className="form-group floating-label">
                        <input type="text"className="form-input" id="taux" name="taux" value={formData.taux} onChange={handleChange} required placeholder=" " />
                        <label htmlFor="taux">{t('RegisterPage.taux')}</label>
                    </div>
                    <div className="btn-group">
                      <button type="button" onClick={prevStep} className="submit-button">{t('RegisterPage.back')}</button>
                      <button type="submit" className="submit-button">{t('RegisterPage.register')}</button>
                    </div>
                </form>

                <p className="create-account">
                    {t('RegisterPage.alreadyUser')} <Link className="create-account-link" to="/">{t('RegisterPage.alreadyUserLink')}</Link>
                </p>
            </div>
        </section>
    );
};

export default SignUpPart3;