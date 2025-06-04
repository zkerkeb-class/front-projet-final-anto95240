import { useNavigate, Link } from "react-router";
import { useState, useEffect } from "react";
import axios from "axios"
import "./style.css"

const LoginPage = () => {

    return <div>
        <h1>page de login</h1>
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

    </div>;
};

export default LoginPage;