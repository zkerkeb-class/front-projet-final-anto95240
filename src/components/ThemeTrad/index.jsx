import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import "./themeTrad.css";

const ThemeTrad = () => {
  const { i18n } = useTranslation();
  const [isDark, setisDark] = useState(() => {
    const saved = localStorage.getItem("dark");
    return saved ? JSON.parse(saved) : false;
  });

  const [language, setLanguage] = useState(() => {
    return localStorage.getItem("language") || "fr";
  });
  
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    document.body.setAttribute("data-theme", isDark ? "dark" : "light");
    localStorage.setItem("dark", JSON.stringify(isDark));
  }, [isDark]);  

  useEffect(() => {
    const savedDark = JSON.parse(localStorage.getItem("dark"));
    if (savedDark !== null) {
        setisDark(savedDark);
    }
  }, []);

  useEffect(() => {
    i18n.changeLanguage(language);
    localStorage.setItem("language", language);
  }, [language, i18n]);

  
  useEffect(() => {
    const handleScroll = () => {
    setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleLanguage = () => {
    setLanguage((prevLang) => (prevLang === "fr" ? "en" : "fr"));
  };

  return (
    <div className={`theme-trad ${isScrolled ? "scrolled" : ""}`} data-theme={isDark ? "dark" : "light"}>
      <button className="theme-btn" onClick={() => setisDark(!isDark)}>
        <FontAwesomeIcon className="icon-dark" icon={isDark ? faSun : faMoon} />
      </button>
      <button className="lang-btn" onClick={toggleLanguage}>
        <span>{language === "fr" ? "FR" : "EN"}</span>
      </button>
    </div>
  );
}

export default ThemeTrad;