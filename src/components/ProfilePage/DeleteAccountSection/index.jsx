import "./DeleteAccountSection.css"

const DeleteAccountSection = ({ setUiState, t }) => (
  <section className="profile-card" id="account-delete-section">
    <h3>{t('ProfilePage.linkDeleteUser')}</h3>
    <hr />
    <div className="profile-delete">
      <p className="delete-warning">
        {t('ProfilePage.message1')} <br />
        {t('ProfilePage.message2')} </p>
      <div className="profile-actions">
        <button 
          className="btn-red"
          onClick={() =>
            setUiState(prev => ({ ...prev, showDeletePopup: true }))
          }
        >
          {t('ProfilePage.supprUser')}
        </button>
      </div>
    </div>
  </section>
);

export default DeleteAccountSection;
