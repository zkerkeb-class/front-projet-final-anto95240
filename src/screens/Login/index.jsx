import { useNavigate, Link } from "react-router";
import { useState, useEffect } from "react";
import axios from "axios"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import "./login.css"

const LoginPage = () => {
    const [showPassword, setShowPassword] = useState(false);

    return <div>
            <h1>Page login</h1>
            <div className="links" >
                <Link to="/">Login</Link>
                <Link to="/register">register</Link>
                <Link to="/dashboard">dashboard</Link>
                <Link to="/deconnexion">deconnexion</Link>
                <Link to="/account">account</Link>
                <Link to="/category">category</Link>
                <Link to="/profile">profile</Link>
                <Link to="/statistique">statistique</Link>
                <Link to="/transaction">transaction</Link> 
            </div>
        
        <section id="section-login" className="login-section-wrapper">
            <div className="login-form-container">
                <p className="form-greeting">Vous avez déjà un compte</p>
                <h2 className="form-title">Connectez-vous ici</h2>

                <form className="login-form" action="#" method="POST">
                    <div className="form-group floating-label">
                        <input type="text"className="form-input" id="username" name="username"  required placeholder=" " />
                        <label htmlFor="username">Nom d’Utilisateur ou Email</label>
                    </div>

                    <div className="form-group floating-label">
                        <input type={showPassword ? "text" : "password"} className="form-input" id="password" name="password"  required placeholder=" " />
                        <label htmlFor="password">Mot de Passe</label>
                        <button
                            type="button"
                            onClick={() => setShowPassword((prev) => !prev)}
                            className="eye-button"
                            aria-label="Afficher le mot de passe"
                        >
                        {showPassword ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />}
                        </button>
                    </div>

                    <button type="submit" className="submit-button">Se connecter</button>
                </form>

                <p className="create-account">
                Nouveau ici ? <Link className="create-account-link" to="/register">Créer un compte</Link>
                </p>
            </div>
        </section>
        </div>
    
};

export default LoginPage;