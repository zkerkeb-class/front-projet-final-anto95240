import { useNavigate, Link } from "react-router";
import { useState, useEffect } from "react";
import axios from "axios"
import "./signUpPart1.css"
import { useTranslation } from "react-i18next";

const SignUpPart1 = ({ formData, setFormData, nextStep }) => {

    const { t } = useTranslation();
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
                <p className="form-greeting">{t('RegisterPage.title1')}</p>
                <h2 className="form-title">{t('RegisterPage.title2')}</h2>

                <form onSubmit={handleSubmit} className="signupPart1-form">
                    <div className="form-group floating-label">
                        <input type="text "className="form-input" id="firstname" name="firstname" value={formData.firstname} onChange={handleChange} required placeholder=" " />
                        <label htmlFor="firstname">{t('RegisterPage.firstName')}</label>
                    </div>

                    <div className="form-group floating-label">
                        <input type="text"className="form-input" id="lastname" name="lastname" value={formData.lastname} onChange={handleChange} required placeholder=" " />
                        <label htmlFor="lastname">{t('RegisterPage.name')}</label>
                    </div>
                    
                    <div className="form-group floating-label">
                        <input type="text"className="form-input" id="username" name="username" value={formData.username} onChange={handleChange} required placeholder=" " />
                        <label htmlFor="username">{t('RegisterPage.userName')}</label>
                    </div>

                    <button type="submit" className="submit-button">{t('RegisterPage.next')}</button>
                </form>

                <p className="create-account">
                    {t('RegisterPage.alreadyUser')} <Link className="create-account-link" to="/">{t('RegisterPage.alreadyUserLink')}</Link>
                </p>
            </div>
        </section>
    );
};

export default SignUpPart1;