import "./AccountInfoSection.css"

const AccountInfoSection = ({ account, form, uiState, setForm, setUiState, t, handleSaveAccount }) => (
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
          onClick={() =>
          setUiState(prev => ({
            ...prev,
            showAccountTypeForm: !prev.showAccountTypeForm,
          }))
        }
      >
        {t('ProfilePage.changeAccountType')} </button>
      </div>
      
      {uiState.showAccountTypeForm  && (
        <div className="inline-form">
          <input
              type="text"
              placeholder={t('ProfilePage.newType')}
              value={form.typeAccount}
              onChange={(e) =>
                setForm(prev => ({ ...prev, typeAccount: e.target.value }))
              }
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
          onClick={() =>
            setUiState(prev => ({
              ...prev,
              showNameAccountForm: !prev.showNameAccountForm,
            }))
          }
        >
          {t('ProfilePage.changeNameType')} </button>
      </div>
      
      {uiState.showNameAccountForm && (
        <div className="inline-form">
          <input
              type="text"
              placeholder={t('ProfilePage.newName')}
              value={form.nameAccount}
              onChange={(e) =>
                setForm(prev => ({ ...prev, nameAccount: e.target.value }))
              }
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
          onClick={() =>
            setUiState(prev => ({
              ...prev,
              showBudgetStartForm: !prev.showBudgetStartForm,
            }))
          }
        >
          {t('ProfilePage.changeBudgetStart')} </button>
      </div>
      
      {uiState.showBudgetStartForm && (
        <div className="inline-form">
          <input
            type="number"
            placeholder={t('ProfilePage.newBudget')}
            value={form.budgetStart}
            onChange={(e) =>
              setForm(prev => ({ ...prev, budgetStart: e.target.value }))
            }
          />
        </div>
      )}
    </div>

    <div className="profile-actions">
      <button 
        className="btn-light" 
        onClick={() => {
          setBudgetStart(account?.budgetStart || "");
          setTypeAccount(account?.type || "");
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