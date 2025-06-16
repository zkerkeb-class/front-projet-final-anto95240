import { Link } from "react-router";
import "./signUpPart3.css"
import { useTranslation } from "react-i18next";

const SignUpPart3 = ({ formData, setFormData, prevStep, handleSubmit, errorMsg, successMsg, loading }) => {
  
  const { t } = useTranslation();
  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    handleSubmit(e);
  };

  const needsTaux = ["épargne", "epargne", "savings"];

    return (
        <section id="section-signupPart3" className="signupPart3-section-wrapper">
            <div className="signupPart3-form-container">
                <p className="form-greeting">{t('RegisterPage.title1')}</p>
                <h2 className="form-title">{t('RegisterPage.title2')}</h2>

                <form onSubmit={onSubmit} className="signupPart3-form">
                    <div className="form-group floating-label">
                        <input type="text"className="form-input" id="accountType" name="accountType" value={formData.accountType} onChange={handleChange} required placeholder=" " />
                        <label htmlFor="accountType">{t('RegisterPage.typeAccount')}</label>
                    </div>

                    <div className="form-group floating-label">
                        <input type="number"className="form-input" id="budgetStart" name="budgetStart" value={formData.budgetStart} onChange={handleChange} required placeholder=" " />
                        <label htmlFor="budgetStart">{t('RegisterPage.budgetStart')}</label>
                    </div>
                    
                    {needsTaux.includes(formData.accountType.toLowerCase()) && (
                        <div className="form-group floating-label">
                            <input
                            type="number"
                            step="0.01"
                            className="form-input"
                            id="taux"
                            name="taux"
                            value={formData.taux}
                            onChange={handleChange}
                            required
                            placeholder=" "
                            />
                            <label htmlFor="taux">{t('RegisterPage.taux')}</label>
                        </div>
                    )}

                    {errorMsg && <p className="error-message">{errorMsg}</p>}
                    {successMsg && <p className="success-message">{successMsg}</p>}

                    <div className="btn-group">
                      <button type="button" onClick={prevStep} className="submit-button">{t('RegisterPage.back')}</button>
                      <button type="submit" className="submit-button" disabled={loading}>
                        {loading ? t("RegisterPage.loading") : t("RegisterPage.register")}
                      </button>
                    </div>
                </form>

                <p className="create-account">
                    {t('RegisterPage.alreadyUser')}{" "}<Link className="create-account-link" to="/">{t('RegisterPage.alreadyUserLink')}</Link>
                </p>
            </div>
        </section>
    );
};

export default SignUpPart3;