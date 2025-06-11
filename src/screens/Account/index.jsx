import { useNavigate, Link } from "react-router";
import { useState, useEffect } from "react";
import axios from "axios"
import "./account.css";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPen,
  faTrash
} 
from "@fortawesome/free-solid-svg-icons";

const AccountPage = () => {
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

    return <div>
        {/* <h1>Page Account</h1>
        <div className="links" >
            <Link to="/">Login</Link>
            <Link to="/register">register</Link>
            <Link to="/dashboard">dashboard</Link>
            <Link to="/deconnexion">deconnexion</Link>
            <Link to="/account">account</Link>
            <Link to="/category">category</Link>
            <Link to="/profile">profile</Link>
            <Link to="/statistique">statistique</Link>
            <Link to="/transaction">transaction</Link> 
        </div> */}

        <div className="dashboard-layout">
            <Sidebar />

            <div className="dashboard-main">
                <Navbar user={user} />

                {/* Ici ton contenu principal */}
                <div className="dashboard-content">
                    <div>
                        <button className="btn-add" onClick={openAddModal}>
                            <p>ajouter un compte</p>
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
                                <button className="btn-edit"><FontAwesomeIcon icon={faPen} /></button>
                                <button className="btn-delete"><FontAwesomeIcon icon={faTrash} /></button>
                            </div>
                        </div>
                        
                    </section>
                </div>
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
                <p className="modal-title">Ajouter un compte</p>
                {/* Formulaire simplifié */}
                <form className="add-account">
                    <h3>Ajouter un compte</h3>
                    <div className="account-type">
                        <label>
                        Type de compe :
                        <input type="text" name="typeAccount" required />
                        </label>
                    </div>
                    <div className="account-budgee">
                        <label>
                        Budget de départ (en €):
                        <input type="text" name="budget" required />
                        </label>
                    </div>
                    <div className="account-taux">
                        <label>
                        Taux (en %):
                        <input type="text" name="taux" />
                        </label>
                    </div>
                    <button type="submit" className="btn-add">ajouter</button>
                </form>
              </>
            )}

            {typeModal === "edit" && accountToEdit && (
              <>
                <form className="mod-account">
                    <h3>Modifier un compte</h3>
                    <div className="account-type">
                        <label>
                        Type de compe :
                        <input type="text" name="typeAccount" required />
                        </label>
                    </div>
                    <div className="account-budgee">
                        <label>
                        Budget de départ (en €):
                        <input type="text" name="budget" required />
                        </label>
                    </div>
                    <div className="account-taux">
                        <label>
                        Taux (en %):
                        <input type="text" name="taux" />
                        </label>
                    </div>
                    <button type="submit" className="btn-add">Enregistrer</button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>;
};

export default AccountPage;