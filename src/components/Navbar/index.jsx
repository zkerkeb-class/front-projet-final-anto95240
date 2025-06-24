import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router";

import "./Navbar.css";
import ThemeTrad from "../ThemeTrad";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRightFromBracket,
  faUser
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

const Navbar = ({user, API_URL}) => {
  const location = useLocation();

  const pageTitle = pageTitles[location.pathname] || "Page";
  const [isScrolled, setIsScrolled] = useState(false);
  const [avatarURL, setAvatarURL] = useState("");

  const [form, setForm] = useState({
    imageFile: null,
  });
  
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

   useEffect(() => {
    if (user?.image) {
      if (user.image.startsWith("http")) {
        setAvatarURL(user.image);
      } else {
        setAvatarURL(`${API_URL}/${user.image}`);
      }
    } else {
      setAvatarURL("");
    }
  }, [user, API_URL]);

  return (
    <header className={`navbar ${isScrolled ? "scrolled" : ""}`}>
      <h1 className="page-title">{pageTitle}</h1>

      <div className="bottom-row">
        <div className="user-info">
          <span className="user-name">{user?.username || "Invité"}</span>
          <Link className="profile-pic" to="/profile">
            {avatarURL ? (
              <img src={avatarURL} alt="Profil" />
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
