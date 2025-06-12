import { useNavigate, Link } from "react-router";
import { useState, useEffect } from "react";
import axios from "axios"
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import ThemeTrad from "../../components/ThemeTrad";
import "./transaction.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPen,
  faTrash
} 
from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from 'react-i18next';

const TransactionPage = () => {
    const { t } = useTranslation();
  const user = {
    name: "Alice Dupont",
    profilePicture: "/images/alice.jpg",
  };

  const [typeModal, setTypeModal] = useState(null);

  // Pour simuler la transaction éditée
  const [transactionToEdit, setTransactionToEdit] = useState(null);

  // Ouvrir modal ajout
  const openAddModal = () => {
    setTypeModal("add");
  };

  const openEditModal = () => {
    setTransactionToEdit({
      date: "2025-06-10",
      typeCompte: "Compte courant",
      paiement: "CB",
      beneficiaire: "Alice",
      categorie: "Courses",
      commentaire: "Supermarché",
      typeMontant: "debit",
      montant: 50,
      solde: 950,
    });
    setTypeModal("edit");
  };

  // Fermer modal
  const closeModal = () => {
    setTypeModal(null);
    setTransactionToEdit(null);
  };

    return (
    <div>
        <div className="dashboard-layout">
            <Sidebar />

            <div className="dashboard-main">
                <Navbar user={user} />

                {/* Ici ton contenu principal */}
                <div className="dashboard-content">
                    <div>
                        <button className="btn-add" onClick={openAddModal}>
                            <p>{t('TransactionPage.addTransaction')}</p>
                        </button>
                    </div>
                    <section className="transaction-list">
                        <table>
                            <thead>
                                <tr>
                                    <th>{t('TransactionPage.titleTableDate')}</th>
                                    <th>{t('TransactionPage.titleTableAccountType')}</th>
                                    <th>{t('TransactionPage.titleTablePaiement')}</th>
                                    <th>{t('TransactionPage.titleTableBeneficiare')}</th>
                                    <th>{t('TransactionPage.titleTableCat')}</th>
                                    <th>{t('TransactionPage.titleTableComment')}</th>
                                    <th>{t('TransactionPage.titleTableDebit')}</th>
                                    <th>{t('TransactionPage.titleTableCredit')}</th>
                                    <th>{t('TransactionPage.titleTableSolde')}</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Chris</td>
                                    <td>HTML tables</td>
                                    <td>22</td>
                                    <td>45</td>
                                    <td>Chris</td>
                                    <td>HTML tables</td>
                                    <td>22</td>
                                    <td>14</td>
                                    <td>45</td>
                                    <td>
                                    <Link className="btn-edit" onClick={openEditModal}>
                                        <FontAwesomeIcon icon={faPen} />
                                    </Link>
                                    </td>
                                    <td>
                                    <Link className="btn-delete">
                                        <FontAwesomeIcon icon={faTrash} />
                                    </Link>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Chris</td>
                                    <td>HTML tables</td>
                                    <td>22</td>
                                    <td>45</td>
                                    <td>Chris</td>
                                    <td>HTML tables</td>
                                    <td>22</td>
                                    <td>14</td>
                                    <td>45</td>
                                    <td>
                                    <Link className="btn-edit" onClick={openEditModal}>
                                        <FontAwesomeIcon icon={faPen} />
                                    </Link>
                                    </td>
                                    <td>
                                    <Link className="btn-delete">
                                        <FontAwesomeIcon icon={faTrash} />
                                    </Link>
                                    </td>
                                </tr>
                            </tbody>

                            <tfoot>
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td>45</td>
                                </tr>
                            </tfoot>
                        </table>
                    </section>
                </div>
            </div>
            <div className="theme-wrapper">
                <ThemeTrad />
            </div>
        </div>

        {/* Popup Modal */}
      {typeModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>
              &times;
            </button>

            {typeModal === "add" && (
              <>
                <p className="modal-title">{t('TransactionPage.addTransaction')}</p>
                {/* Formulaire simplifié */}
                <form>
                    <div className="modal-date-cat">
                       <label>
                            {t('TransactionPage.date')}
                            <input type="date" name="date" />
                        </label>
                        <label>
                            {t('TransactionPage.categorie')} <input type="text" name="categorie" />
                        </label>
                    </div>
                    <div className="modal-typeCompte">
                        <label>
                            {t('TransactionPage.typeAccount')} <input type="text" name="typeCompte" />
                        </label> 
                    </div>
                    <div className="modal-paiement-beneficiaire">
                       <label>
                            {t('TransactionPage.paiement')}
                            <input type="text" name="paiement" />
                        </label> 
                        <label>
                            {t('TransactionPage.beneficiare')} <input type="text" name="beneficiaire" />
                        </label>
                    </div>
                    <div className="modal-montant">
                        <label>
                            {t('TransactionPage.amountType')} <input type="text" name="typeMontant" />
                        </label>
                        <label>
                            {t('TransactionPage.amount')}
                            <input type="number" name="montant" />
                        </label>
                    </div>
                    <div className="modal-commentaire">
                       <label>
                            {t('TransactionPage.comment')}
                            <input type="text" name="commentaire" />
                        </label> 
                    </div>
                  
                  <button type="submit">{t('AccountPage.add')}</button>
                </form>
              </>
            )}

            {typeModal === "edit" && transactionToEdit && (
              <>
                <h2>{t('TransactionPage.modTransaction')}</h2>
                <form>
                    <div className="modal-date-cat">
                       <label>
                            {t('TransactionPage.date')}
                            <input type="date" name="date" defaultValue={transactionToEdit.date} />
                        </label>
                        <label>
                            {t('TransactionPage.categorie')} <input type="text" name="categorie" defaultValue={transactionToEdit.categorie} />
                        </label>
                    </div>
                    <div className="modal-typeCompte">
                        <label>
                            {t('TransactionPage.typeAccount')} <input type="text" name="typeCompte" defaultValue={transactionToEdit.typeCompte} />
                        </label> 
                    </div>
                    <div className="modal-paiement-beneficiaire">
                       <label>
                            {t('TransactionPage.paiement')}
                            <input type="text" name="paiement" defaultValue={transactionToEdit.paiement} />
                        </label> 
                        <label>
                            {t('TransactionPage.beneficiare')} <input type="text" name="beneficiaire" defaultValue={transactionToEdit.beneficiaire} />
                        </label>
                    </div>
                    <div className="modal-montant">
                        <label>
                            {t('TransactionPage.amountType')} <input type="text" name="typeMontant" defaultValue={transactionToEdit.typeMontant} />
                        </label>
                        <label>
                            {t('TransactionPage.amount')}
                            <input type="number" name="montant" defaultValue={transactionToEdit.montant} />
                        </label>
                    </div>
                    <div className="modal-commentaire" >
                       <label>
                            {t('TransactionPage.comment')}
                            <input type="text" name="commentaire" defaultValue={transactionToEdit.commentaire} />
                        </label> 
                    </div>
                  
                  <button type="submit">{t('AccountPage.save')}</button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
      </div>
    );
};

export default TransactionPage;