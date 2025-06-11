import { useState, useEffect, React } from "react";
import { useLocation, Link } from "react-router";
import "./Navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRightFromBracket
} 
from "@fortawesome/free-solid-svg-icons";

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
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`navbar ${isScrolled ? "scrolled" : ""}`}>
      <h1 className="page-title">{pageTitle}</h1>

      <div className="user-info">
        <span className="user-name" alt="Nom d'utilisateur">{user.name}</span>
        <Link className="profile-pic" to="/profile">
            <img src={user.profilePicture} alt="Profil" />
        </Link>
        
        <Link className="deconnexion-pic" to="/deconnexion">
            <FontAwesomeIcon icon={faRightFromBracket} />
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
