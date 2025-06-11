import { useNavigate, Link } from "react-router";
import { useState, useEffect } from "react";
import axios from "axios"
import "./deco.css";

const DeconnexionPage = () => {

    return <div>
        <h1>Page deconnexion</h1>
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

        <section id="section-login" className="logout-section-wrapper">
            <div className="logout-form-container">
                <p>A bientôt <br />Merci d'utiliser Budgee. Vous êtes maintenant déconnecté.</p>
                <Link to="/" className="logout-button">Retour à la connexion</Link>
            </div>
        </section>
    </div>;
};

export default DeconnexionPage;