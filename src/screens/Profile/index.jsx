import { useNavigate, useOutletContext } from "react-router";
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import "./profile.css";

import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList } from "@fortawesome/free-solid-svg-icons";

const ProfilePage = () => {
  const API_url = "http://localhost:5000";    
  const { t } = useTranslation();
  const context = useOutletContext();
  const user = context?.user;
  const setUser = context?.setUser;
  const account = context?.account;
  const setAccount = context?.setAccount;
  const navigate = useNavigate();  
  
  const [firstname, setFirstname] = useState(user?.firstname || '');
  const [lastname, setLastname] = useState(user?.lastname || '');
  const [username, setUsername] = useState(user?.username || '');
  const [email, setEmail] = useState(user?.email || '');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [typeAccount, setTypeAccount] = useState(account?.type || '');
  const [budgetStart, setBudgetStart] = useState(account?.budgetStart || '');
  const [nameAccount, setNameAccount] = useState(account?.name || '');

  const [imageFile, setImageFile] = useState(user?.image || '');
  const fileInputRef = useRef(null);

  const [showAccountTypeForm, setShowAccountTypeForm] = useState(false);
  const [showBudgetStartForm, setShowBudgetStartForm] = useState(false);
  const [showNameAccountForm, setShowNameAccountForm] = useState(false);
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);

  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  
  useEffect(() => {
    setFirstname(user?.firstname || "");
    setLastname(user?.lastname || "");
    setUsername(user?.username || "");
    setEmail(user?.email || "");
    setTypeAccount(account?.type || "");
    setNameAccount(account?.name || "");
    setBudgetStart(account?.budgetStart || "");
    setImageFile(null);
    setShowEmailForm(false);
    setShowPasswordForm(false);
    setShowAccountTypeForm(false);
    setShowBudgetStartForm(false);
    setShowNameAccountForm(false);
  }, [user, account]);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  // Gérer sélection du fichier
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
    }
  };

  const handleSaveProfile = async () => {
    try {
      const formData = new FormData();
      formData.append("firstname", firstname);
      formData.append("lastname", lastname);
      formData.append("username", username);
      formData.append("email", email);
      if (password && confirmPassword) {
        if (password !== confirmPassword) {
          return alert("Passwords do not match");
        }
        formData.append("password", password);
      }
      if (imageFile) {
        formData.append("image", imageFile);
      }

      const res = await axios.put(
        `${API_url}/api/user/${user._id}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      setUser(res.data);
      alert("Profil mis à jour");
    } catch (err) {
      console.error(err);
      alert("Erreur lors de la mise à jour du profil");
    }
  };

  const handleSaveAccount = async () => {
    try {
      const res = await axios.put(`${API_url}/api/account/${account._id}`, {
        type: typeAccount,
        name: nameAccount,
        budgetStart: budgetStart
      });
      setAccount(res.data);
      alert("Compte mis à jour");
    } catch (err) {
      console.error("Erreur update account :", err.response?.data || err.message || err);
      alert("Erreur lors de la mise à jour du compte : " + (err.response?.data?.message || err.message));
    }
  };

  const handleDeleteUser = async () => {
    try {
      await axios.delete(`${API_url}/api/user/${user._id}`);
      alert("Compte supprimé");
      navigate("/login");
    } catch (err) {
      console.error(err);
      alert("Erreur lors de la suppression du compte");
    }
  };

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
                  <input type="text" value={firstname} onChange={(e) => setFirstname(e.target.value)} />
                </div>
                <div className="profile-fields-item">
                  <label>{t('ProfilePage.labelName')}</label>
                  <input type="text" value={lastname} onChange={(e) => setLastname(e.target.value)} />
                </div>
                <div className="profile-fields-item">
                  <label>{t('ProfilePage.labelUsername')}</label>
                  <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
              
              </div>
              <div className="profile-avatar">
                {/* input file caché */}
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                />

                {/* Affiche soit l’image du user, soit l’aperçu de l’image sélectionnée */}
                {imageFile instanceof File ? (
                  <img
                    className="avatar-circle"
                    src={URL.createObjectURL(imageFile)}
                    alt="Image sélectionnée"
                  />
                ) : user?.image ? (
                  <img
                    className="avatar-circle"
                    src={`http://localhost:5000/uploads/${user.image}`}
                    alt="Profil"
                  />
                ) : null}


                {/* Bouton déclencheur du sélecteur de fichier */}
                <button className="btn-img" onClick={handleButtonClick}>
                  {t("ProfilePage.labelDownloadPicture")}
                </button>
              </div>
            </div>
            <div className="profile-actions">
              <button
                className="btn-light"
                onClick={() => {
                  // Annuler : réinitialiser aux valeurs du contexte user
                  setFirstname(user?.firstname || "");
                  setLastname(user?.lastname || "");
                  setUsername(user?.username || "");
                  setImageFile(null);
                }}
              >
                {t("ProfilePage.cancel")}
              </button>
              <button className="btn-blue" onClick={handleSaveProfile}>
                {t("ProfilePage.save")}
              </button>
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
                    <p className="value">{account?.type}</p>
                  </div>
                  <button
                    className="btn-light small"
                    onClick={() => setShowAccountTypeForm(!showAccountTypeForm)}
                  >
                    {t('ProfilePage.changeAccountType')} </button>
                </div>
                
                {showAccountTypeForm  && (
                  <div className="inline-form">
                    <input
                        type="text"
                        placeholder={t('ProfilePage.newType')}
                        value={typeAccount}
                        onChange={(e) => setTypeAccount(e.target.value)}
                      />

                  </div>
                )}

                <div className="account-info-item">
                  <div>
                    <p className="label">{t('ProfilePage.labelNameType')}</p>
                    <p className="value">{account?.name}</p>
                  </div>
                  <button
                    className="btn-light small"
                    onClick={() => setShowNameAccountForm(!showNameAccountForm)}
                  >
                    {t('ProfilePage.changeNameType')} </button>
                </div>
                
                {showNameAccountForm && (
                  <div className="inline-form">
                    <input
                        type="text"
                        placeholder={t('ProfilePage.newName')}
                        value={nameAccount}
                        onChange={(e) => setNameAccount(e.target.value)}
                      />

                  </div>
                )}

                <div className="account-info-item">
                  <div>
                    <p className="label">{t('ProfilePage.labelBudgetStart')}</p>
                    <p className="value">{account?.budgetStart}</p>
                  </div>
                  <button
                    className="btn-light small"
                  onClick={() => setShowBudgetStartForm(!showBudgetStartForm)}
                  >
                    {t('ProfilePage.changeBudgetStart')} </button>
                </div>
                
                {showBudgetStartForm && (
                 <div className="inline-form">
                    <input
                      type="number"
                      placeholder={t('ProfilePage.newBudget')}
                      value={budgetStart}
                      onChange={(e) => setBudgetStart(e.target.value)}
                    />
                  </div>
              )}
              </div>

            <div className="profile-actions">
              <button 
                className="btn-light" 
                onClick={() => {
                  // Annuler : réinitialiser aux valeurs du contexte user
                  setBudgetStart(account?.budgetStart || "");
                  setTypeAccount(account?.type || "");
                  setNameAccount(account?.name || "");
                }}
              >
                {t('ProfilePage.cancel')}
              </button>
              <button className="btn-blue" onClick={handleSaveAccount}>{t('ProfilePage.save')}</button>
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
                  <p className="value">{user?.email}</p>     
                </div>
                <button
                  className="btn-light small"
                  onClick={() => setShowEmailForm(!showEmailForm)}
                >
                  {t('ProfilePage.changeEmail')} </button>
              </div>
              {showEmailForm && (
                <div className="inline-form">
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder={t('ProfilePage.newEmail')} />
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
                  <input type="password" placeholder={t('ProfilePage.newPassword')} value={newPassword} onChange={(e) => setPassword(e.target.value)} />
                  <input type="password" placeholder={t('ProfilePage.confirmPassword')} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                </div>
              )}
            </div>
            

            <div className="profile-actions">
              <button className="btn-light" onClick={() => setEmail(user?.email || "")}>{t('ProfilePage.cancel')}</button>
              <button className="btn-blue" onClick={handleSaveProfile}>{t('ProfilePage.save')}</button>
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
                <button className="btn-red"onClick={() => setShowDeletePopup(true)}>{t('ProfilePage.supprUser')}</button>
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
              <button className="btn-red" onClick={handleDeleteUser} >{t('ProfilePage.popupSupprUser')}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
