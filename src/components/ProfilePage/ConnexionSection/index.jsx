import "./ConnexionSection.css"
import InlineFormItem from "../InlineFormItem";

const ConnexionSection = ({ user, form, setForm, uiState, setUiState, t, handleSaveProfile  }) => (
  <section className="profile-card" id="login-section">
    <h3>{t('ProfilePage.linkMethodCo')}</h3>
    <hr />
    <div className="account-info">
      <InlineFormItem
        label={t("ProfilePage.labelEmail")}
        value={user?.email}
        placeholder={t("ProfilePage.newEmail")}
        showForm={uiState.showEmailForm}
        inputType="email"
        toggleForm={() =>
          setUiState((prev) => ({
            ...prev,
            showEmailForm: !prev.showEmailForm,
          }))
        }
        formValue={form.email}
        onFormChange={(e) =>
          setForm((prev) => ({ ...prev, email: e.target.value }))
        }
        buttonLabel={t("ProfilePage.changeEmail")}
      />

      <InlineFormItem
        label={t("ProfilePage.labelPassword")}
        value="********"
        placeholder={t("ProfilePage.newPassword")}
        showForm={uiState.showPasswordForm}
        inputType="password"
        toggleForm={() =>
          setUiState((prev) => ({
            ...prev,
            showPasswordForm: !prev.showPasswordForm,
          }))
        }
        formValue={form.password}
        onFormChange={(e) =>
          setForm((prev) => ({ ...prev, password: e.target.value }))
        }
        buttonLabel={t("ProfilePage.changePassword")}
      /> 
      {uiState.showPasswordForm && (
        <div className="inline-form">
          <input
            type="password"
            placeholder={t("ProfilePage.confirmPassword")}
            value={form.confirmPassword}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                confirmPassword: e.target.value,
              }))
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
