import { useState, useEffect } from "react";
import axios from "axios";
import "./TransactionModal.css"

const TransactionModal = ({
    typeModal,
    transactionToEdit,
    closeModal,
    setTransactions,
    account,
    t,
    user,
    categories,
    API_URL
  }) => {
  const [formData, setFormData] = useState({
    date: "",
    categorie: "",
    typeCompte: "",
    paiement: "",
    beneficiaire: "",
    typeMontant: "debit",
    montant: "",
    commentaire: "",
  });

  useEffect(() => {
    if (transactionToEdit) {
      setFormData({
        date: transactionToEdit.date ? transactionToEdit.date.slice(0, 10) : "",
        categorie: transactionToEdit.categoryId || "",
        typeCompte: transactionToEdit.accountType || "",
        paiement: transactionToEdit.paiement || "",
        beneficiaire: transactionToEdit.beneficiaire || "",
        typeMontant: transactionToEdit.transactionType || "",
        montant: transactionToEdit.amount || "",
        commentaire: transactionToEdit.description || "",
      });
    }
  }, [transactionToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataToSend = {
      date: formData.date,
      paiement: formData.paiement,
      beneficiaire: formData.beneficiaire,
      categoryId: formData.categorie,
      description: formData.commentaire || "",
      type: formData.typeMontant,
      amount: Number(formData.montant),
      accountId: account?._id || account?.id || null,
      userId: user?._id || user?.id || null,
    }

    try {
      if (typeModal === "add") {
        await axios.post(`${API_URL}/api/transaction`, dataToSend);
      } else {
        await axios.put(`${API_URL}/api/transaction/${transactionToEdit._id}`, dataToSend);
      }

      const updatedTransactions = await axios.get(`${API_URL}/api/transaction/account/${account._id}`);
      setTransactions(updatedTransactions.data);

      closeModal();
    } catch (error) {
      alert(t('ErrorMsg.errorAddModTransaction'));
    }
  };

  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={closeModal}>&times;</button>

        <h2 className="modal-title">
          {typeModal === "add" ? t('TransactionPage.addTransaction') : t('TransactionPage.modTransaction')}
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="modal-date-cat">
            <label>
              {t('TransactionPage.date')}
              <input type="date" name="date" value={formData.date} onChange={handleChange} required />
            </label>
            <label>
                {t('TransactionPage.categorie')}
              <select name="categorie" value={formData.categorie} onChange={handleChange} required>
                <option value="">-- {t('TransactionPage.selectCategory')} --</option>
                {categories
                  .filter(cat => !cat.isDefault)
                  .map(cat => (
                    <option key={cat._id} value={cat._id}>
                      {cat.name}
                    </option>
                ))}
              </select>
            </label>
          </div>

          <div className="modal-typeCompte">
            <label>
              {t('TransactionPage.typeAccount')}
              <input
                type="text"
                name="typeCompte"
                value={account?.type || formData.typeCompte || ""}
                readOnly
              />
            </label>
          </div>

          <div className="modal-paiement-beneficiaire">
            <label>
              {t('TransactionPage.paiement')}
              <input type="text" name="paiement" value={formData.paiement} onChange={handleChange} required />
            </label>
            <label>
              {t('TransactionPage.beneficiaire')}
              <input type="text" name="beneficiaire" value={formData.beneficiaire} onChange={handleChange} required />
            </label>
          </div>

          <div className="modal-montant">
            <label>
              {t('TransactionPage.amountType')}
              <select name="typeMontant" value={formData.typeMontant} onChange={handleChange} required>
                <option value="debit">{t('TransactionPage.debit')}</option>
                <option value="credit">{t('TransactionPage.credit')}</option>
              </select>
            </label>
            <label>
              {t('TransactionPage.amount')}
              <input type="number" name="montant" value={formData.montant} onChange={handleChange} required min="0" step="0.01" />
            </label>
          </div>

          <div className="modal-commentaire">
            <label>
              {t('TransactionPage.comment')}
              <input type="text" name="commentaire" value={formData.commentaire} onChange={handleChange} />
            </label>
          </div>

          <button type="submit">
            {typeModal === "add" ? t('AccountPage.add') : t('AccountPage.save')}
          </button>
        </form>
      </div>
    </div>
  );
};

export default TransactionModal;
