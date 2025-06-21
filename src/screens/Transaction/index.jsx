import { useNavigate, Link, useOutletContext } from "react-router";
import React, { useState, useEffect } from "react";
import TransactionModal from "../../components/TransactionModal";
import axios from "axios";
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
  const API_url = "http://localhost:5000";   

  const { transaction: transactions, user, setTransaction, account, categories } = useOutletContext();
  const [typeModal, setTypeModal] = useState(null);
  const [transactionToEdit, setTransactionToEdit] = useState(null);

  const openEditModal = (tx) => {
    setTransactionToEdit(tx);
    setTypeModal("edit");
  };


  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');     // jour avec 2 chiffres
    const month = String(date.getMonth() + 1).padStart(2, '0'); // mois (0-indexé donc +1)
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  };

  // Fonction pour calculer le solde cumulatif (exemple simple)
  const calculateBalance = (txs) => {
    let balance = account?.budgetStart || 0;
    const sortedTxs = [...txs].sort((a, b) => new Date(a.date) - new Date(b.date));
    return txs.map(tx => {
    const amount = Number(tx.amount);
        if (tx.transactionType  === "debit") balance -= amount
        else if (tx.transactionType  === "credit") balance += amount;
        return { ...tx, solde: balance };
    });
  };

  const transactionsWithBalance = (transactions && account)
    ? calculateBalance(transactions)
  : [];

  const handleDeleteTransaction = async (txId) => {
    try {
      await axios.delete(`${API_url}/api/transaction/${txId}`);
      setTransaction(prev => prev.filter(tx => tx._id !== txId)); // mise à jour immédiate
      alert(t("Transaction supprimée"));
    } catch (err) {
        console.error("Erreur lors de la suppression :", err.response?.data || err.message);
      alert(t("Erreur lors de la suppression"));
    }
  };

  return (
    <div>
        <div className="transaction-content">
            <div>
                <button className="btn-add" onClick={() => setTypeModal("add")}>
                    <p>{t('TransactionPage.addTransaction')}</p>
                </button>
            </div>
            <section className="transaction-list">
                <table className="transaction-table">
                    <thead>
                    <tr> 
                      <th title={t('TransactionPage.tooltipDate')}>{t('TransactionPage.titleTableDate')}</th>
                      <th title={t('TransactionPage.tooltipAccountType')}>{t('TransactionPage.titleTableAccountType')}</th>
                      <th title={t('TransactionPage.tooltipPaiement')}>{t('TransactionPage.titleTablePaiement')}</th>
                      <th title={t('TransactionPage.tooltipBeneficiare')}>{t('TransactionPage.titleTableBeneficiare')}</th>
                      <th title={t('TransactionPage.tooltipCat')}>{t('TransactionPage.titleTableCat')}</th>
                      <th title={t('TransactionPage.tooltipComment')}>{t('TransactionPage.titleTableComment')}</th>
                      <th title={t('TransactionPage.tooltipDebit')}>{t('TransactionPage.titleTableDebit')}</th>
                      <th title={t('TransactionPage.tooltipCredit')}>{t('TransactionPage.titleTableCredit')}</th>
                      <th title={t('TransactionPage.tooltipSolde')}>{t('TransactionPage.titleTableSolde')}</th>
                      <th></th>
                      <th></th>
                    </tr>

                    </thead>
                    <tbody>
                      {transactionsWithBalance.map(tx => {
                        const category = categories.find(cat => cat._id === tx.categoryId);

                        return (
                        <tr key={tx._id}>
                            <td>{formatDate(tx.date)}</td>
                            <td>{account.type}</td>
                            <td>{tx.paiement}</td>
                            <td>{tx.beneficiare}</td>
                            <td>{category?.name || "?"}</td>
                            <td>{tx.description}</td>
                            <td>{tx.transactionType === "debit" ? tx.amount : "-"}</td>
                            <td>{tx.transactionType === "credit" ? tx.amount : "-"}</td>
                            <td>{tx.solde.toFixed(2)}</td>
                        <td>
                            <Link className="btn-edit" onClick={() => openEditModal(tx)}>
                            <FontAwesomeIcon icon={faPen} />
                            </Link>
                        </td>
                        <td>
                            <Link className="btn-delete" onClick={() => handleDeleteTransaction(tx._id)}>
                            <FontAwesomeIcon icon={faTrash} />
                            </Link>
                        </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>

                {/* Vue Mobile - Cards */}
                <div className="table-card-container">
                  {transactionsWithBalance.map((tx) => {
                    const category = categories.find(cat => cat._id === tx.categoryId);
                    const categoryName = category?.name || "?";
                    const type = account?.type || "?";

                    return (
                      <div className="table-card" key={tx._id}>
                        <span><strong>{t('TransactionPage.date')} :</strong> {formatDate(tx.date)}</span>
                        <span><strong>{t('TransactionPage.typeAccount')} :</strong> {type}</span>
                        <span><strong>{t('TransactionPage.paiement')} :</strong> {tx.paiement}</span>
                        <span><strong>{t('TransactionPage.beneficiare')} :</strong> {tx.beneficiare}</span>
                        <span><strong>{t('TransactionPage.categorie')} :</strong> {categoryName}</span>
                        <span><strong>{t('TransactionPage.comment')} :</strong> {tx.description}</span>
                        <span><strong>{t('TransactionPage.debit')} :</strong> {tx.transactionType === "debit" ? `${tx.amount}` : "-"}</span>
                        <span><strong>{t('TransactionPage.credit')} :</strong> {tx.transactionType === "credit" ? `${tx.amount}` : "-"}</span>
                        <span><strong>{t('TransactionPage.titleTableSolde')} :</strong> 
                          {typeof tx.solde === "number" ? tx.solde.toFixed(2) : "-"}
                        </span>

                        <div className="card-actions">
                          <Link className="btn-edit" onClick={() => openEditModal(tx)}>
                            <FontAwesomeIcon icon={faPen} />
                          </Link>
                          <Link className="btn-delete" onClick={() => handleDeleteTransaction(tx._id)}>
                            <FontAwesomeIcon icon={faTrash} />
                          </Link>
                        </div>
                      </div>
                    );
                  })}
                </div>
            </section>
        </div>

        {/* Popup Modal */}
        {typeModal && (
            <TransactionModal
                typeModal={typeModal}
                closeModal={() => {
                  setTypeModal(null);
                  setTransactionToEdit(null); // réinitialise à la fermeture
                }}
                setTransactions={setTransaction}
                account={account}
                t={t}
                transactionToEdit={transactionToEdit}
                user={user}
                categories={categories}
            />
        )}
      </div>
  );
}

export default TransactionPage;
