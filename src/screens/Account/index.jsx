import { useNavigate, Link } from "react-router";
import { useState, useEffect } from "react";
import axios from "axios"
import "./account.css";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import ThemeTrad from "../../components/ThemeTrad";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPen,
  faTrash
} 
from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from 'react-i18next';

const AccountPage = () => {
    const { t } = useTranslation();
  const user = {
    name: "Alice Dupont",
    profilePicture: "/images/alice.jpg",
  };

  const [typeModal, setTypeModal] = useState(null);

  // Pour simuler la transaction éditée
  const [accountToEdit, setAccountToEdit] = useState(null);

  // Ouvrir modal ajout
  const openAddModal = () => {
    setTypeModal("add");
  };

  const openEditModal = () => {
    setAccountToEdit({
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
    setAccountToEdit(null);
  };

    return (
      <div>
        <div className="dashboard-content">
          <div>
              <button className="btn-add" onClick={openAddModal}>
                  <p>{t('AccountPage.addAccount')}</p>
              </button>
          </div>
          <section className="account-list">
              <div className="account-header">
                  <p className="items-label">Type de compte</p>
                  <p className="items-value">Taux d'intêret</p>
              </div>
              <div className="account-item">
                  <div className="account-items">
                      <p>Dépense</p>
                      <p>Gain</p>
                      <p>Solde</p>
                  </div> 
                  <div className="account-btn">
                      <button className="btn-edit" onClick={openEditModal}><FontAwesomeIcon icon={faPen} /></button>
                      <button className="btn-delete"><FontAwesomeIcon icon={faTrash} /></button>
                  </div>
              </div>
              
          </section>
      </div>

      {typeModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>
              &times;
            </button>

            {typeModal === "add" && (
              <>
                <p className="modal-title">{t('AccountPage.addAccount')}</p>
                {/* Formulaire simplifié */}
                <form className="add-account">
                    {/* <h3>Ajouter un compte</h3> */}
                    <div className="account-type">
                        <label>
                        {t('AccountPage.typeAccount')} <input type="text" name="typeAccount" required />
                        </label>
                    </div>
                    <div className="account-budgee">
                        <label>
                        {t('AccountPage.budetStart')} <input type="text" name="budget" required />
                        </label>
                    </div>
                    <div className="account-taux">
                        <label>
                        {t('AccountPage.taux')} <input type="text" name="taux" />
                        </label>
                    </div>
                    <button type="submit" className="btn-add">{t('AccountPage.add')}</button>
                </form>
              </>
            )}

            {typeModal === "edit" && accountToEdit && (
              <>
                <form className="mod-account">
                    <h3>{t('AccountPage.modAccount')}</h3>
                    <div className="account-type">
                        <label>
                        {t('AccountPage.typeAccount')} <input type="text" name="typeAccount" required />
                        </label>
                    </div>
                    <div className="account-budgee">
                        <label>
                        {t('AccountPage.budetStart')} <input type="text" name="budget" required />
                        </label>
                    </div>
                    <div className="account-taux">
                        <label>
                        {t('AccountPage.taux')} <input type="text" name="taux" />
                        </label>
                    </div>
                    <button type="submit" className="btn-add">{t('AccountPage.save')}</button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
      </div>
    );
};

export default AccountPage;