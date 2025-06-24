import { useRef } from "react";
import "./ProfilSection.css"

const ProfilSection = ({ user, form, setForm, t, handleSaveProfile}) => {
    
  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) setForm((prev) => ({ ...prev, imageFile: file }));
  };
    
  return(
    <section className="profile-card" id="profile-section">
      <h3>{t('ProfilePage.linkDetailProfil')}</h3>
      <hr />
      <div className="profile-form">
        <div className="profile-fields">
        <div className="profile-fields-item">
            <label>{t('ProfilePage.labelFirstname')}</label>
            <input type="text" value={form.firstname} onChange={(e) => setForm(prev => ({ ...prev, firstname: e.target.value }))} />
        </div>
        <div className="profile-fields-item">
            <label>{t('ProfilePage.labelName')}</label>
            <input type="text" value={form.lastname} onChange={(e) => setForm(prev => ({ ...prev, lastname: e.target.value }))} />
        </div>
        <div className="profile-fields-item">
            <label>{t('ProfilePage.labelUsername')}</label>
            <input type="text" value={form.username} onChange={(e) => setForm(prev => ({ ...prev, username: e.target.value }))} />
        </div>
        
        </div>
        <div className="profile-avatar">
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleFileChange}
          />

          {form.imageFile instanceof File ? (
            <img
              className="avatar-circle"
              src={URL.createObjectURL(form.imageFile)}
              alt="Image sélectionnée"
            />
          ) : form.avatarURL ? (
            <img className="avatar-circle" src={form.avatarURL} alt="Profil" />
          ) : (
            <div className="avatar-circle">{t("ProfilePage.noImage")}</div>
          )}

          <button className="btn-img" onClick={handleButtonClick}>
              {t("ProfilePage.labelDownloadPicture")}
          </button>
        </div>
      </div>
      <div className="profile-actions">
        <button
        className="btn-light"
        onClick={() => {
            setForm(prev => ({
            ...prev,
            firstname: user?.firstname || "",
            lastname: user?.lastname || "",
            username: user?.username || "",
            imageFile: null,
            }));
        }}
        >
        {t("ProfilePage.cancel")}
        </button>
        <button className="btn-blue" onClick={handleSaveProfile}>
        {t("ProfilePage.save")}
        </button>
      </div>
    </section>
  )
};

export default ProfilSection;
