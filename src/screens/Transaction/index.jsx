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

    const dummyTransactions = [
    {
      date: "2025-06-10",
      typeCompte: "Compte courant",
      paiement: "CB",
      beneficiaire: "Alice",
      categorie: "Courses",
      commentaire: "Supermarché",
      typeMontant: "debit",
      montant: 50,
      solde: 950,
    },
    {
      date: "2025-06-11",
      typeCompte: "Compte épargne",
      paiement: "Virement",
      beneficiaire: "Bob",
      categorie: "Loisirs",
      commentaire: "Concert",
      typeMontant: "credit",
      montant: 120,
      solde: 1070,
    },
  ];

  return (
    <div>
        <div className="transaction-content">
            <div>
                <button className="btn-add" onClick={openAddModal}>
                    <p>{t('TransactionPage.addTransaction')}</p>
                </button>
            </div>
            <section className="transaction-list">
                <table className="transaction-table">
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
                        <th></th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {dummyTransactions.map((tx, index) => (
                        <tr key={index}>
                        <td>{tx.date}</td>
                        <td>{tx.typeCompte}</td>
                        <td>{tx.paiement}</td>
                        <td>{tx.beneficiaire}</td>
                        <td>{tx.categorie}</td>
                        <td>{tx.commentaire}</td>
                        <td>{tx.typeMontant === "debit" ? tx.montant : "-"}</td>
                        <td>{tx.typeMontant === "credit" ? tx.montant : "-"}</td>
                        <td>{tx.solde}</td>
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
                    ))}
                    </tbody>
                </table>

                {/* Vue Mobile - Cards */}
                <div className="table-card-container">
                    {dummyTransactions.map((tx, index) => (
                    <div className="table-card" key={index}>
                        <span><strong>{t('TransactionPage.date')} </strong> {tx.date}</span>
                        <span><strong>{t('TransactionPage.typeAccount')} </strong> {tx.typeCompte}</span>
                        <span><strong>{t('TransactionPage.paiement')} </strong> {tx.paiement}</span>
                        <span><strong>{t('TransactionPage.beneficiare')} </strong> {tx.beneficiaire}</span>
                        <span><strong>{t('TransactionPage.categorie')} </strong> {tx.categorie}</span>
                        <span><strong>{t('TransactionPage.comment')} </strong> {tx.commentaire}</span>
                        <span><strong>{t('TransactionPage.amount')} </strong> {tx.montant}</span>
                        <span><strong>{t('TransactionPage.amountType')} </strong> {tx.typeMontant}</span>
                        <span><strong>{t('TransactionPage.titleTableSolde')} :</strong> {tx.solde}</span>
                        <div className="card-actions">
                        <Link className="btn-edit" onClick={openEditModal}>
                            <FontAwesomeIcon icon={faPen} />
                        </Link>
                        <Link className="btn-delete">
                            <FontAwesomeIcon icon={faTrash} />
                        </Link>
                        </div>
                    </div>
                    ))}
                </div>
            </section>
        </div>

        {/* Popup Modal */}
      {typeModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>
              &times;
            </button>

            {typeModal && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                    <button className="modal-close" onClick={closeModal}>
                        &times;
                    </button>

                    <h2 className="modal-title">
                        {typeModal === "add"
                        ? t('TransactionPage.addTransaction')
                        : t('TransactionPage.modTransaction')}
                    </h2>

                    <form>
                        <div className="modal-date-cat">
                        <label>
                            {t('TransactionPage.date')}
                            <input
                            type="date"
                            name="date"
                            defaultValue={transactionToEdit?.date || ""}
                            />
                        </label>
                        <label>
                            {t('TransactionPage.categorie')}
                            <input
                            type="text"
                            name="categorie"
                            defaultValue={transactionToEdit?.categorie || ""}
                            />
                        </label>
                        </div>

                        <div className="modal-typeCompte">
                        <label>
                            {t('TransactionPage.typeAccount')}
                            <input
                            type="text"
                            name="typeCompte"
                            defaultValue={transactionToEdit?.typeCompte || ""}
                            />
                        </label>
                        </div>

                        <div className="modal-paiement-beneficiaire">
                        <label>
                            {t('TransactionPage.paiement')}
                            <input
                            type="text"
                            name="paiement"
                            defaultValue={transactionToEdit?.paiement || ""}
                            />
                        </label>
                        <label>
                            {t('TransactionPage.beneficiare')}
                            <input
                            type="text"
                            name="beneficiaire"
                            defaultValue={transactionToEdit?.beneficiaire || ""}
                            />
                        </label>
                        </div>

                        <div className="modal-montant">
                        <label>
                            {t('TransactionPage.amountType')}
                            <input
                            type="text"
                            name="typeMontant"
                            defaultValue={transactionToEdit?.typeMontant || ""}
                            />
                        </label>
                        <label>
                            {t('TransactionPage.amount')}
                            <input
                            type="number"
                            name="montant"
                            defaultValue={transactionToEdit?.montant || ""}
                            />
                        </label>
                        </div>

                        <div className="modal-commentaire">
                        <label>
                            {t('TransactionPage.comment')}
                            <input
                            type="text"
                            name="commentaire"
                            defaultValue={transactionToEdit?.commentaire || ""}
                            />
                        </label>
                        </div>

                        <button type="submit">
                        {typeModal === "add" ? t('AccountPage.add') : t('AccountPage.save')}
                        </button>
                    </form>
                    </div>
                </div>
            )}


          </div>
        </div>
      )}
      </div>
    );
};

export default TransactionPage;