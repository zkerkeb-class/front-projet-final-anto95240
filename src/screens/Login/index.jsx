import { useNavigate, Link } from "react-router";
import { useState, useEffect } from "react";
import axios from "axios"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import "./login.css"
import ThemeTrad from "../../components/ThemeTrad";
import { useTranslation } from "react-i18next";

const LoginPage = () => {
    
    const { t } = useTranslation();
    const [showPassword, setShowPassword] = useState(false);

    return <div>
        <div className="links" >
            {/* <Link to="/">Login</Link> */}
            <Link to="/register">register</Link>
            <Link to="/dashboard">dashboard</Link>
            <Link to="/deconnexion">deconnexion</Link>
            <Link to="/account">account</Link>
            <Link to="/category">category</Link>
            <Link to="/profile">profile</Link>
            <Link to="/statistique">statistique</Link>
            <Link to="/transaction">transaction</Link> 
        </div>
      <div className="theme-wrapper">
        <ThemeTrad />
      </div>
        
        <section id="section-login" className="login-section-wrapper">
            <div className="login-form-container">
                <p className="form-greeting">{t('LoginPage.title1')}</p>
                <h2 className="form-title">{t('LoginPage.title2')}</h2>

                <form className="login-form" action="#" method="POST">
                    <div className="form-group floating-label">
                        <input type="text"className="form-input" id="username" name="username"  required placeholder=" " />
                        <label htmlFor="username">{t('LoginPage.usernameOrEmail')}</label>
                    </div>

                    <div className="form-group floating-label">
                        <input type={showPassword ? "text" : "password"} className="form-input" id="password" name="password"  required placeholder=" " />
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

                    <button type="submit" className="submit-button">{t('LoginPage.connexion')}</button>
                </form>

                <p className="create-account">
                {t('LoginPage.newUser')} <Link className="create-account-link" to="/register">{t('LoginPage.linkNewUser')}</Link>
                </p>
            </div>
        </section>
        </div>
    
};

export default LoginPage;