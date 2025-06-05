import React from "react";
import { useLocation, Link } from "react-router";
import "./Navbar.css";

const pageTitles = {
  "/dashboard": "Dashboard",
  "/transaction": "Transactions",
  "/category": "Catégories",
  "/account": "Comptes",
  "/statistique": "Statistiques",
  "/profile": "Profile",
  "/deconnexion": "Deconnexion",
};

const Navbar = ({ user }) => {
  const location = useLocation();
  const pageTitle = pageTitles[location.pathname] || "Page";

  return (
    <header className="navbar">
      <h1 className="page-title">{pageTitle}</h1>

      <div className="user-info">
        <span className="user-name" alt="Nom d'utilisateur">{user.name}</span>
        <Link className="profile-pic" to="/profile">
            <img src={user.profilePicture} alt="Profil" />
        </Link>
        
        <Link className="deconnexion-pic" to="/deconnexion">
            <img alt="Deconnexion" />
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
