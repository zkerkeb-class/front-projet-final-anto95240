import { useNavigate, Link } from "react-router";
import { useState, useEffect } from "react";
import axios from "axios"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import "./login.css"
import ThemeTrad from "../../components/ThemeTrad";
import { useTranslation } from "react-i18next";

const LoginPage = () => {
    const [login, setLogin] = useState("antoine@test.com");
    const [password, setPassword] = useState("Test1234!");
    const [errorMsg, setErrorMsg] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();
    const loginToken = sessionStorage.getItem("loginToken");
    const API_url = import.meta.env.VITE_API_url;
    const { t } = useTranslation();

    const handleSubmit = async (e) => {
        e.preventDefault(); 

        const loginData = {
            login: login,
            password: password,
        }
        try {
            const { data } = await axios.post(`${API_url}/api/user/login`, loginData);
            sessionStorage.setItem("loginToken", data.token);
            navigate("/dashboard");
        } catch (error) {
            setErrorMsg(t('ErrorMsg.errorNetwork'));
        }
    }
    
    useEffect(() => {
        if (loginToken) {
            navigate("/dashboard");
        }
    }, [loginToken, navigate]);

    return (
    <div>
        <div className="theme-wrapper">
            <ThemeTrad />
        </div>
        
        <section id="section-login" className="login-section-wrapper">
            <div className="login-form-container">
                <p className="form-greeting">{t('LoginPage.title1')}</p>
                <h2 className="form-title">{t('LoginPage.title2')}</h2>

                <form className="login-form" onSubmit={handleSubmit}>
                    <div className="form-group floating-label">
                        <input type="text"className="form-input" id="login" name="login" value={login} onChange={(e) => { setLogin(e.target.value) }}  required placeholder=" " />
                        <label htmlFor="login">{t('LoginPage.usernameOrEmail')}</label>
                    </div>

                    <div className="form-group floating-label">
                        <input type={showPassword ? "text" : "password"} className="form-input" id="password" name="password" value={password} onChange={(e) => { setPassword(e.target.value) }} required placeholder=" " />
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
                    {errorMsg && <span className="loginError">{errorMsg}</span>}

                    <button type="submit" className="submit-button">{t('LoginPage.connexion')}</button>
                </form>

                <p className="create-account">
                {t('LoginPage.newUser')} <Link className="create-account-link" to="/register">{t('LoginPage.linkNewUser')}</Link>
                </p>
            </div>
        </section>
    </div>
    );
};

export default LoginPage;