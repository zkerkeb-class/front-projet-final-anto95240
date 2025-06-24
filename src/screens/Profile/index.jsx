import { useNavigate, useOutletContext } from "react-router";
import { useState, useEffect } from "react";
import axios from "axios";
import "./profile.css";

import DeleteAccountSection from"../../components/ProfilePage/DeleteAccountSection"
import ConnexionSection from"../../components/ProfilePage/ConnexionSection"
import AccountInfoSection from"../../components/ProfilePage/AccountInfoSection"
import ProfilSection from"../../components/ProfilePage/ProfilSection"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList } from "@fortawesome/free-solid-svg-icons";

const ProfilePage = () => {  
  const navigate = useNavigate();  
  const { user, setUser, account, setAccount, API_URL, t } = useOutletContext();

  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    typeAccount: "",
    budgetStart: "",
    nameAccount: "",
    imageFile: null,
    avatarURL: "", 
  });

  const [uiState, setUiState] = useState({
    showAccountTypeForm: false,
    showBudgetStartForm: false,
    showNameAccountForm: false,
    showEmailForm: false,
    showPasswordForm: false,
    showDeletePopup: false,
    showMobileMenu: false,
  });
    
  useEffect(() => {
    setForm((prev) => ({
      ...prev,
      firstname: user?.firstname || "",
      lastname: user?.lastname || "",
      username: user?.username || "",
      email: user?.email || "",
      password: "",
      confirmPassword: "",
      typeAccount: account?.type || "",
      budgetStart: account?.budgetStart || "",
      nameAccount: account?.name || "",
      avatarURL: user?.image
        ? user.image.startsWith("http")
          ? user.image
          : `${API_URL}/${user.image}`
        : "",
      imageFile: null,
    }));

    setUiState((prev) => ({
      ...prev,
      showEmailForm: false,
      showPasswordForm: false,
      showAccountTypeForm: false,
      showBudgetStartForm: false,
      showNameAccountForm: false,
    }));
  }, [user, account, API_URL]);

  const handleSaveProfile = async () => {
    try {
      const formData = new FormData();
      ["firstname", "lastname", "username", "email"].forEach((key) =>
        formData.append(key, form[key])
      );
      if (form.password && form.confirmPassword) {
        if (form.password !== form.confirmPassword) {
          return alert(t('ErrorMsg.passwordsNotMatching'));
        }
        formData.append("password", form.password);
      }
      if (form.imageFile) formData.append("image", form.imageFile);

      const res = await axios.put(`${API_URL}/api/user/${user._id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setUser(res.data);
      alert(t('ErrorMsg.alerteSucces'));
    } catch (err) {
      console.error(err);
      alert(t('ErrorMsg.errorUpdateUser'));
    }
  };
  
  const handleSaveAccount = async () => {
    try {
      const res = await axios.put(`${API_URL}/api/account/${account._id}`, {
        type: form.typeAccount,
        name: form.nameAccount,
        budgetStart: form.budgetStart,
      });
      setAccount(res.data);
      alert(t('ErrorMsg.alerteSucces'));
    } catch (err) {
      console.error(err);
      alert(t('ErrorMsg.errorUpdateUser'));
    }
  };

  const handleDeleteUser = async () => {
    try {
      await axios.delete(`${API_URL}/api/user/${user._id}`);
      alert(t('ErrorMsg.alerteDeleteUser'));
      navigate("/login");
    } catch (err) {
      console.error(err);
      alert(t('ErrorMsg.errorDelete'));
    }
  };

  return (
    <div>
      <div className="profile-container">
        <div className={`profile-sidebar ${uiState.showMobileMenu ? "show" : ""}`}>
          <a href="#profile-section">{t('ProfilePage.linkDetailProfil')}</a>
          <a href="#account-details-section">{t('ProfilePage.linkDetailAccount')}</a>
          <a href="#login-section">{t('ProfilePage.linkMethodCo')}</a>
          <a href="#account-delete-section">{t('ProfilePage.linkDeleteUser')}</a>
        </div>

        <div className="mobile-menu-toggle">
          <button onClick={() => setUiState(prev => ({ ...prev, showMobileMenu: !prev.showMobileMenu }))}>
            <FontAwesomeIcon icon={faList} />
          </button>
        </div>

        <div className="profile-content">
          {/* Profil */}
          <ProfilSection user={user} form={form} setForm={setForm} uiState={uiState} setUiState={setUiState} t={t} handleSaveProfile={handleSaveProfile} />

          {/* Account */}
          <AccountInfoSection account={account} form={form} setForm={setForm} uiState={uiState} setUiState={setUiState} t={t} handleSaveAccount={handleSaveAccount}/>

          {/* Connexion */}
          <ConnexionSection user={user} form={form} setForm={setForm} uiState={uiState} setUiState={setUiState} t={t} handleSaveProfile={handleSaveProfile} />

          {/* Suppression */}
          <DeleteAccountSection setUiState={setUiState} t={t} />
        </div>
      </div>
    
      {uiState.showDeletePopup && (
        <div className="modal-overlay" onClick={() => setUiState(prev => ({ ...prev, showDeletePopup: false }))}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h4>{t('ProfilePage.popupConfirm')}</h4>
            <p>{t('ProfilePage.popupMessage')}</p>
            <div className="modal-actions">
              <button className="btn-light" onClick={() => setUiState(prev => ({ ...prev, showDeletePopup: false }))}>{t('ProfilePage.cancel')}</button>
              <button className="btn-red" onClick={handleDeleteUser} >{t('ProfilePage.popupSupprUser')}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;

