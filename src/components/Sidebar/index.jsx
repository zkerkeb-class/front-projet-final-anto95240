import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faArrowRightArrowLeft,
  faFolder,
  faWallet,
  faChartSimple,
  faCircleNotch
} from "@fortawesome/free-solid-svg-icons";
import "./sidebar.css";

const Sidebar = () => {
  const location = useLocation();
  const [isHovered, setIsHovered] = useState(false);
  const [isPinned, setIsPinned] = useState(() => {
    const stored = localStorage.getItem("sidebarPinned");
    return stored === "true";
  });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const isExpanded = isHovered || isPinned || isMobileMenuOpen;

  // Met à jour localStorage quand isPinned change
  useEffect(() => {
    localStorage.setItem("sidebarPinned", isPinned);
  }, [isPinned]);

  // Gère le resize pour activer le mode mobile
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {isMobile && !isMobileMenuOpen && (
        <button className="burger-btn" onClick={() => setIsMobileMenuOpen(true)}>
            ☰
        </button>
      )}

      <div
        className={`sidebar-wrapper ${isExpanded ? "expanded" : ""} ${isMobileMenuOpen ? "mobile-open" : ""}`}
        onMouseEnter={() => !isMobile && setIsHovered(true)}
        onMouseLeave={() => !isMobile && setIsHovered(false)}
      >
        <div className="sidebar-logo">
          <img src="/logo.png" alt="logo" />
          {(isExpanded || isMobileMenuOpen) && (
            <div className="sidebar-buttons">
                {!isMobile && (
                <button className="toggle-btn" onClick={() => setIsPinned(!isPinned)}>
                    <FontAwesomeIcon icon={faCircleNotch} />
                </button>
                )}
                {isMobile && (
                <button className="close-btn" onClick={() => setIsMobileMenuOpen(false)}>
                    ✖
                </button>
                )}
            </div>
            )}

        </div>

        <nav className="sidebar-menu">
          <div className="menu-section">
            <Link to="/dashboard" className={`menu-item ${location.pathname === "/dashboard" ? "active" : ""}`}>
                <div className="fa-icon-wrapper">
                    <FontAwesomeIcon icon={faHouse} />
                </div>
                {isExpanded && <span>Dashboard</span>}
            </Link>
          </div>

          <div className="menu-section">
            <Link to="/transaction" className={`menu-item ${location.pathname === "/transaction" ? "active" : ""}`}>
              <div className="fa-icon-wrapper">
                <FontAwesomeIcon icon={faArrowRightArrowLeft} />
              </div>
              {isExpanded && <span>Transaction</span>}
            </Link>
          </div>

          <div className="menu-section">
            <Link to="/category" className={`menu-item ${location.pathname === "/category" ? "active" : ""}`}>
              <div className="fa-icon-wrapper">
                <FontAwesomeIcon icon={faFolder} />
              </div>
              {isExpanded && <span>Catégorie</span>}
            </Link>
          </div>

          <div className="menu-section">
            <Link to="/account" className={`menu-item ${location.pathname === "/account" ? "active" : ""}`}>
              <div className="fa-icon-wrapper">
                <FontAwesomeIcon icon={faWallet} />
              </div>
              {isExpanded && <span>Compte</span>}
            </Link>
          </div>

          <div className="menu-section">
            <Link to="/statistique" className={`menu-item ${location.pathname === "/statistique" ? "active" : ""}`}>
              <div className="fa-icon-wrapper">
                <FontAwesomeIcon icon={faChartSimple} />
              </div>
              {isExpanded && <span>Statistique</span>}
            </Link>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
