import "./AccountInfoSection.css"
import InlineFormItem from "../InlineFormItem";

const AccountInfoSection = ({ account, form, uiState, setForm, setUiState, t, handleSaveAccount }) => (
  <section className="profile-card" id="account-details-section">
    <h3>{t('ProfilePage.linkDetailAccount')}</h3>
    <hr />
    <div className="account-info">
      <InlineFormItem
        label={t("ProfilePage.labelAccountType")}
        value={account?.type}
        placeholder={t("ProfilePage.newType")}
        showForm={uiState.showAccountTypeForm}
        inputType="text"
        toggleForm={() =>
          setUiState((prev) => ({
            ...prev,
            showAccountTypeForm: !prev.showAccountTypeForm,
          }))
        }
        formValue={form.typeAccount}
        onFormChange={(e) =>
          setForm((prev) => ({ ...prev, typeAccount: e.target.value }))
        }
        buttonLabel={t("ProfilePage.changeAccountType")}
      />

      <InlineFormItem
        label={t("ProfilePage.labelNameType")}
        value={account?.name}
        placeholder={t("ProfilePage.newName")}
        showForm={uiState.showNameAccountForm}
        inputType="text"
        toggleForm={() =>
          setUiState((prev) => ({
            ...prev,
            showNameAccountForm: !prev.showNameAccountForm,
          }))
        }
        formValue={form.nameAccount}
        onFormChange={(e) =>
          setForm((prev) => ({ ...prev, nameAccount: e.target.value }))
        }
        buttonLabel={t("ProfilePage.changeNameType")}
      />

      <InlineFormItem
        label={t("ProfilePage.labelBudgetStart")}
        value={account?.budgetStart}
        placeholder={t("ProfilePage.newBudget")}
        showForm={uiState.showBudgetStartForm}
        inputType="number"
        toggleForm={() =>
          setUiState((prev) => ({
            ...prev,
            showBudgetStartForm: !prev.showBudgetStartForm,
          }))
        }
        formValue={form.budgetStart}
        onFormChange={(e) =>
          setForm((prev) => ({ ...prev, budgetStart: e.target.value }))
        }
        buttonLabel={t("ProfilePage.changeBudgetStart")}
      />

    </div>

    <div className="profile-actions">
      <button 
        className="btn-light" 
        onClick={() => {
          setBudgetStart(account?.budgetStart || "");
          setTypeAccount(account?.accountType || "");
          setNameAccount(account?.name || "");
        }}
      >
        {t('ProfilePage.cancel')}
      </button>
      <button className="btn-blue" onClick={handleSaveAccount}>
        {t('ProfilePage.save')}
      </button>
    </div>
  </section>
);

export default AccountInfoSection;