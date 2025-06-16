import { useState, useEffect, React } from "react";
import { useLocation, Link } from "react-router";
import "./Navbar.css";
import ThemeTrad from "../ThemeTrad";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRightFromBracket,
  faUser
} 
from "@fortawesome/free-solid-svg-icons";
// import ThemeTrad from "../ThemeTrad";

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
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  return (
    <header className={`navbar ${isScrolled ? "scrolled" : ""}`}>
      <h1 className="page-title">{pageTitle}</h1>

      <div className="bottom-row">
        <div className="user-info">
          <span className="user-name">{user?.name}</span>
          <Link className="profile-pic" to="/profile">
            {user?.profilePicture ? (
              <img
                src={user.profilePicture}
                alt="Profil"
              />
            ) : (
              <FontAwesomeIcon icon={faUser} alt="Profil" />
            )}
          </Link>
          <Link className="deconnexion-pic" to="/deconnexion">
            <FontAwesomeIcon icon={faRightFromBracket} />
          </Link>
        </div>

        <div className="theme-wrapper-desktop">
          <ThemeTrad />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
