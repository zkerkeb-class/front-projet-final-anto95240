import { useNavigate, Link } from "react-router";
import { useTranslation } from "react-i18next";

import ThemeTrad from "../../components/ThemeTrad";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowTurnUp } from "@fortawesome/free-solid-svg-icons";
import "./deco.css";

const DeconnexionPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    sessionStorage.removeItem("loginToken");
    navigate("/");
  };

  return (
    <div>
    <div className="theme-wrapper">
      <ThemeTrad />
    </div>

    <section id="section-login" className="logout-section-wrapper">
        <div className="logout-form-container">
            <p>{t("DeconnexionPage.message1")}</p>
            <p>{t("DeconnexionPage.message2")}</p>
            <div className="logout">
                <FontAwesomeIcon className="fa-logout" icon={faArrowTurnUp} />
                <Link to="/" className="logout-button" onClick={handleLogout}>{t("DeconnexionPage.logout")}</Link>
            </div>
        </div>
    </section>
  </div>
  );
};

export default DeconnexionPage;