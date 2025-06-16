import { useNavigate, Link } from "react-router";
import { useState, useEffect } from "react";
import axios from "axios";
import "./profile.css";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import ThemeTrad from "../../components/ThemeTrad";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faList,
} from "@fortawesome/free-solid-svg-icons";

const ProfilePage = () => {
    const { t } = useTranslation();
  const user = {
    firstname: "Alice",
    lastname: "Dupont",
    username: "alice123",
    email: "test@test.fr",
    profilePicture: "/images/alice.jpg",
  };

  const [showAccountTypeForm, setShowAccountTypeForm] = useState(false);
  const [showBudgetForm, setShowBudgetForm] = useState(false);
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);

  const [showMobileMenu, setShowMobileMenu] = useState(false);

  return (
    <div>
      <div className="profile-container">
        <div className={`profile-sidebar ${showMobileMenu ? "show" : ""}`}>
          <a href="#profile-section">{t('ProfilePage.linkDetailProfil')}</a>
          <a href="#account-details-section">{t('ProfilePage.linkDetailAccount')}</a>
          <a href="#login-section">{t('ProfilePage.linkMethodCo')}</a>
          <a href="#account-delete-section">{t('ProfilePage.linkDeleteUser')}</a>
        </div>

        <div className="mobile-menu-toggle">
          <button onClick={() => setShowMobileMenu(!showMobileMenu)}>
            <FontAwesomeIcon icon={faList} />
          </button>
        </div>

        <div className="profile-content">
          {/* Profil */}
          <section className="profile-card" id="profile-section">
            <h3>{t('ProfilePage.linkDetailProfil')}</h3>
            <hr />
            <div className="profile-form">
              <div className="profile-fields">
                <div className="profile-fields-item">
                  <label>{t('ProfilePage.labelFirstname')}</label>
                  <input type="text" defaultValue={user.firstname} />
                </div>
                <div className="profile-fields-item">
                  <label>{t('ProfilePage.labelName')}</label>
                  <input type="text"  defaultValue={user.lastname} />
                </div>
                <div className="profile-fields-item">
                  <label>{t('ProfilePage.labelUsername')}</label>
                  <input type="text"  defaultValue={user.username} />
                </div>
              
              </div>
              <div className="profile-avatar">
                <div className="avatar-circle"></div>
                <button className="btn-img">{t('ProfilePage.labelDownloadPicture')}</button>
              </div>
            </div>
            <div className="profile-actions">
              <button className="btn-light">{t('ProfilePage.cancel')}</button>
              <button className="btn-blue">{t('ProfilePage.save')}</button>
            </div>
          </section>

          {/* Account */}
          <section className="profile-card" id="account-details-section">
            <h3>{t('ProfilePage.linkDetailAccount')}</h3>
            <hr />
            <div className="account-info">
              <div className="account-info-item">
                <div>
                  <p className="label">{t('ProfilePage.labelAccountType')}</p>
                  <p className="value">Compte bancaire</p>
                </div>
                <button
                  className="btn-light small"
                  onClick={() => setShowAccountTypeForm(!showAccountTypeForm)}
                >
                  {t('ProfilePage.changeAccountType')} </button>
              </div>
              {showAccountTypeForm && (
                <div className="inline-form">
                  <input type="text" placeholder={t('ProfilePage.newType')} />
                </div>
              )}

              <div className="account-info-item">
                <div>
                  <p className="label">{t('ProfilePage.labelBudgetStart')}</p>
                  <p className="value">300 €</p>
                </div>
                <button
                  className="btn-light small"
                  onClick={() => setShowBudgetForm(!showBudgetForm)}
                >
                  {t('ProfilePage.changeBudgetStart')} </button>
              </div>
              {showBudgetForm && (
                <div className="inline-form">
                  <input type="number" placeholder={t('ProfilePage.newBudget')} />
                </div>
              )}
            </div>
            

            <div className="profile-actions">
              <button className="btn-light">{t('ProfilePage.cancel')}</button>
              <button className="btn-blue">{t('ProfilePage.save')}</button>
            </div>
          </section>

          {/* Connexion */}
          <section className="profile-card" id="login-section">
            <h3>{t('ProfilePage.linkMethodCo')}</h3>
            <hr />
            <div className="account-info">
              <div className="account-info-item">
                <div>
                  <p className="label">{t('ProfilePage.labelEmail')}</p>
                  <p className="value">{user.email}</p>
                </div>
                <button
                  className="btn-light small"
                  onClick={() => setShowEmailForm(!showEmailForm)}
                >
                  {t('ProfilePage.changeEmail')} </button>
              </div>
              {showEmailForm && (
                <div className="inline-form">
                  <input type="email" placeholder={t('ProfilePage.newEmail')} />
                </div>
              )}

              <div className="account-info-item">
                <div>
                  <p className="label">{t('ProfilePage.labelPassword')}</p>
                  <p className="value">********</p>
                </div>
                <button
                  className="btn-light small"
                  onClick={() => setShowPasswordForm(!showPasswordForm)}
                >
                  {t('ProfilePage.changePassword')} </button>
              </div>
              {showPasswordForm && (
                <div className="inline-form">
                  <input type="password" placeholder={t('ProfilePage.newPassword')} />
                  <input type="password" placeholder={t('ProfilePage.confirmPassword')} />
                </div>
              )}
            </div>
            

            <div className="profile-actions">
              <button className="btn-light">{t('ProfilePage.cancel')}</button>
              <button className="btn-blue">{t('ProfilePage.save')}</button>
            </div>
          </section>

          {/* Suppression */}
          <section className="profile-card" id="account-delete-section">
            <h3>{t('ProfilePage.linkDeleteUser')}</h3>
            <hr />
            <div className="profile-delete">
              <p className="delete-warning">
                {t('ProfilePage.message1')} <br />
                {t('ProfilePage.message2')} </p>
              <div className="profile-actions">
                <button className="btn-red" onClick={() => setShowDeletePopup(true)}>{t('ProfilePage.supprUser')}</button>
              </div>
            </div>
            
          </section>
        </div>
      </div>

    
      {showDeletePopup && (
        <div className="modal-overlay" onClick={() => setShowDeletePopup(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h4>{t('ProfilePage.popupConfirm')}</h4>
            <p>{t('ProfilePage.popupMessage')}</p>
            <div className="modal-actions">
              <button className="btn-light" onClick={() => setShowDeletePopup(false)}>{t('ProfilePage.cancel')}</button>
              <button className="btn-red">{t('ProfilePage.popupSupprUser')}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
