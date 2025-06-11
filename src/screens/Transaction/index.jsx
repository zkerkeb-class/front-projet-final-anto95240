import { useNavigate, Link } from "react-router";
import { useState, useEffect } from "react";
import axios from "axios"
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import "./transaction.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPen,
  faTrash
} 
from "@fortawesome/free-solid-svg-icons";

const TransactionPage = () => {
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

    return <div>
        {/* <h1>Page transaction</h1>
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
                            <p>ajouter un transaction</p>
                        </button>
                    </div>
                    <section className="transaction-list">
                        <table>
                            <thead>
                                <tr>
                                <th>Date</th>
                                <th>Type de compte</th>
                                <th>Paiement</th>
                                <th>Bénéficiare</th>
                                <th>Categorie</th>
                                <th>Commentaire</th>
                                <th>Debit</th>
                                <th>Credit</th>
                                <th>Solde</th>
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
                                <td></td>
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
                <p className="modal-title">Ajouter une transaction</p>
                {/* Formulaire simplifié */}
                <form>
                    <div className="modal-date-cat">
                       <label>
                            Date:
                            <input type="date" name="date" />
                        </label>
                        <label>
                            Catégorie:
                            <input type="text" name="categorie" />
                        </label>
                    </div>
                    <div className="modal-typeCompte">
                        <label>
                            Type de compte:
                            <input type="text" name="typeCompte" />
                        </label> 
                    </div>
                    <div className="modal-paiement-beneficiaire">
                       <label>
                            Paiement:
                            <input type="text" name="paiement" />
                        </label> 
                        <label>
                            Bénéficiaire:
                            <input type="text" name="beneficiaire" />
                        </label>
                    </div>
                    <div className="modal-montant">
                        <label>
                            Type de montant:
                            <input type="text" name="typeMontant" />
                        </label>
                        <label>
                            Montant:
                            <input type="number" name="montant" />
                        </label>
                    </div>
                    <div className="modal-commentaire">
                       <label>
                            Commentaire:
                            <input type="text" name="commentaire" />
                        </label> 
                    </div>
                  
                  <button type="submit">Ajouter</button>
                </form>
              </>
            )}

            {typeModal === "edit" && transactionToEdit && (
              <>
                <h2>Modifier la transaction</h2>
                <form>
                    <div className="modal-date-cat">
                       <label>
                            Date:
                            <input type="date" name="date" defaultValue={transactionToEdit.date} />
                        </label>
                        <label>
                            Catégorie:
                            <input type="text" name="categorie" defaultValue={transactionToEdit.categorie} />
                        </label>
                    </div>
                    <div className="modal-typeCompte">
                        <label>
                            Type de compte:
                            <input type="text" name="typeCompte" defaultValue={transactionToEdit.typeCompte} />
                        </label> 
                    </div>
                    <div className="modal-paiement-beneficiaire">
                       <label>
                            Paiement:
                            <input type="text" name="paiement" defaultValue={transactionToEdit.paiement} />
                        </label> 
                        <label>
                            Bénéficiaire:
                            <input type="text" name="beneficiaire" defaultValue={transactionToEdit.beneficiaire} />
                        </label>
                    </div>
                    <div className="modal-montant">
                        <label>
                            Type de montant:
                            <input type="text" name="typeMontant" defaultValue={transactionToEdit.typeMontant} />
                        </label>
                        <label>
                            Montant:
                            <input type="number" name="montant" defaultValue={transactionToEdit.montant} />
                        </label>
                    </div>
                    <div className="modal-commentaire" >
                       <label>
                            Commentaire:
                            <input type="text" name="commentaire" defaultValue={transactionToEdit.commentaire} />
                        </label> 
                    </div>
                  
                  <button type="submit">Enregistrer</button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>;
};

export default TransactionPage;