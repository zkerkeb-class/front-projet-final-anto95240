import { useNavigate, Link } from "react-router";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import axios from "axios"
import "./deco.css";
import ThemeTrad from "../../components/ThemeTrad";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowTurnUp } from "@fortawesome/free-solid-svg-icons";

const DeconnexionPage = () => {
  const { t } = useTranslation();

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
                  <Link to="/" className="logout-button">{t("DeconnexionPage.logout")}</Link>
              </div>
          </div>
      </section>
    </div>
    );
};

export default DeconnexionPage;