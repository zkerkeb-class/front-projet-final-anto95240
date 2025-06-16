import { useState } from "react";
import { Link } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import "./signUpPart2.css";
import { useTranslation } from "react-i18next";

const SignUpPart2 = ({ formData, setFormData, nextStep, prevStep, badPassword, setBadPassword, errorMsg, setErrorMsg }) => {
  
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  // const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrorMsg("");

    if (name === "password") {
      setBadPassword(value.length < 8);
    }
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    
    setBadPassword(false);
    setErrorMsg("");

   if (!formData.email.includes("@")) {
      setErrorMsg("Email invalide.");
      return;
    }

    if (formData.password !== formData.passwordConfirm) {
      setErrorMsg(t("RegisterPage.passwordsNotMatching")); // à traduire
      return;
    }

    // ✅ Si OK, passer à l'étape suivante
    nextStep();
  };

  return (
    <section id="section-signupPart2" className="signupPart2-section-wrapper">
      <div className="signupPart2-form-container">
        <p className="form-greeting">{t('RegisterPage.title1')}</p>
        <h2 className="form-title">{t('RegisterPage.title2')}</h2>

        <form onSubmit={handleSubmit} className="signupPart2-form">
          <div className="form-group floating-label">
            <input
              type="email"
              className="form-input"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder=" "
            />
            <label htmlFor="email">{t('RegisterPage.email')}</label>
          </div>

          <div className="form-group floating-label password-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              className="form-input"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder=" "
            />
            <label htmlFor="password">{t('LoginPage.password')}</label>
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="eye-button"
              aria-label={t('LoginPage.arialLabelPassword')}
            >              
            {showPassword ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />}
            </button>
          </div>

          <div className="form-group floating-label password-wrapper">
            <input
              type={showConfirmPassword ? "text" : "password"}
              className="form-input"
              id="passwordConfirm"
              name="passwordConfirm"
              value={formData.passwordConfirm}
              onChange={handleChange}
              required
              placeholder=" "
            />
            <label htmlFor="passwordConfirm">{t('RegisterPage.confirmPassword')}</label>
            <button
              type="button"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className="eye-button"
              aria-label={t('LoginPage.arialLabelPassword')}
            >
            {showConfirmPassword ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />}
            </button>
          </div>

          {badPassword && <p className="signinError">{t("RegisterPage.badPassword")}</p>}
          {errorMsg && <p className="signinError">{errorMsg}</p>}


          <div className="btn-group">
            <button type="button" onClick={prevStep} className="submit-button">
              {t('RegisterPage.back')} </button>
            <button type="submit" className="submit-button">
              {t('RegisterPage.next')} </button>
          </div>
        </form>

        <p className="create-account">
            {t('RegisterPage.alreadyUser')} <Link className="create-account-link" to="/">{t('RegisterPage.alreadyUserLink')}</Link>
        </p>
      </div>
    </section>
  );
};

export default SignUpPart2;
