import "./ConnexionSection.css"

const ConnexionSection = ({ user, form, setForm, uiState, setUiState, t, handleSaveProfile  }) => (
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
          onClick={() =>
            setUiState(prev => ({ ...prev, showEmailForm: !prev.showEmailForm }))
          }
        >
          {t('ProfilePage.changeEmail')} </button>
      </div>
      {uiState.showEmailForm && (
        <div className="inline-form">
          <input 
            type="email" 
            placeholder={t('ProfilePage.newEmail')} 
            value={form.email}
            onChange={(e) =>
              setForm(prev => ({ ...prev, email: e.target.value }))
            }
          />
        </div>
      )}

      <div className="account-info-item">
        <div>
          <p className="label">{t('ProfilePage.labelPassword')}</p>
          <p className="value">********</p>
        </div>
        <button
          className="btn-light small"
          onClick={() =>
            setUiState(prev => ({ ...prev, showPasswordForm: !prev.showPasswordForm }))
          }
        >
          {t('ProfilePage.changePassword')} </button>
      </div>
      {uiState.showPasswordForm && (
        <div className="inline-form">
          <input 
            type="password" 
            placeholder={t('ProfilePage.newPassword')} 
            value={form.password}
            onChange={(e) =>
              setForm(prev => ({ ...prev, password: e.target.value }))
            }
          />
          <input 
            type="password"
            placeholder={t('ProfilePage.confirmPassword')}
            value={form.confirmPassword}
            onChange={(e) =>
              setForm(prev => ({ ...prev, confirmPassword: e.target.value }))
            }
          />
        </div>
      )}
    </div>

    <div className="profile-actions">
      <button className="btn-light" onClick={() => setEmail(user?.email || "")}>{t('ProfilePage.cancel')}</button>
      <button className="btn-blue" onClick={handleSaveProfile}>{t('ProfilePage.save')}</button>
    </div>
  </section>
);

export default ConnexionSection;
