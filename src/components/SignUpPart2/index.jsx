import { useState } from "react";
import { Link } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import "./signUpPart2.css";

const SignUpPart2 = ({ formData, setFormData, nextStep, prevStep }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    nextStep();
  };

  return (
    <section id="section-signupPart2" className="signupPart2-section-wrapper">
      <div className="signupPart2-form-container">
        <p className="form-greeting">Vous êtes nouveaux ici</p>
        <h2 className="form-title">Inscrivez-vous ici</h2>

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
            <label htmlFor="email">Email</label>
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
            <label htmlFor="password">Mot de passe</label>
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="eye-button"
              aria-label="Afficher le mot de passe"
            >
            {showPassword ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />}
            </button>
          </div>

          <div className="form-group floating-label password-wrapper">
            <input
              type={showConfirmPassword ? "text" : "password"}
              className="form-input"
              id="confirmerPassword"
              name="confirmerPassword"
              value={formData.confirmerPassword}
              onChange={handleChange}
              required
              placeholder=" "
            />
            <label htmlFor="confirmerPassword">Confirmer mot de passe</label>
            <button
              type="button"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className="eye-button"
              aria-label="Afficher le mot de passe"
            >
            {showConfirmPassword ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />}
            </button>
          </div>

          <div className="btn-group">
            <button type="button" onClick={prevStep} className="submit-button">
              Retour
            </button>
            <button type="submit" className="submit-button">
              Continuer
            </button>
          </div>
        </form>

        <p className="create-account">
            Vous avez déjà un compte ? <Link className="create-account-link" to="/">Se connecter ici</Link>
        </p>
      </div>
    </section>
  );
};

export default SignUpPart2;
