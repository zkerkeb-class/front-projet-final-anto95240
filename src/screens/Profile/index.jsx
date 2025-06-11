import { useNavigate, Link } from "react-router";
import { useState, useEffect } from "react";
import axios from "axios";
import "./profile.css";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

const ProfilePage = () => {
  const user = {
    firstname: "Alice",
    lastname: "Dupont",
    username: "alice123",
    email: "test@test.fr",
    profilePicture: "/images/alice.jpg",
  };

  const [showAccountTypeForm, setShowAccountTypeForm] = useState(false);
  const [showBudgetForm, setShowBudgetForm] = useState(false);
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);

  return (
    <div className="dashboard-layout">
      <Sidebar />
      <div className="dashboard-main">
        <Navbar user={user} />
        <div className="profile-container">
          <div className="profile-sidebar">
            <a href="#profile-section">Détail du profil</a>
            <a href="#account-details-section">Account Detail</a>
            <a href="#login-section">Sign-in method</a>
            <a href="#account-delete-section">Delete Account</a>
          </div>

          <div className="profile-content">
            {/* Profil */}
            <section className="profile-card" id="profile-section">
              <h3>Détail du profil</h3>
              <hr />
              <div className="profile-form">
                <div className="profile-fields">
                  <div className="profile-fields-item">
                    <label>Prénom</label>
                    <input type="text" defaultValue={user.firstname} />
                  </div>
                  <div className="profile-fields-item">
                    <label>Nom</label>
                    <input type="text"  defaultValue={user.lastname} />
                  </div>
                  <div className="profile-fields-item">
                    <label>Nom d'utilisateur</label>
                    <input type="text"  defaultValue={user.username} />
                  </div>
                
                </div>
                <div className="profile-avatar">
                  <div className="avatar-circle"></div>
                  <button className="btn-img">Upload image</button>
                </div>
              </div>
              <div className="profile-actions">
                <button className="btn-light">Cancel</button>
                <button className="btn-blue">Save Changes</button>
              </div>
            </section>

            {/* Account */}
            <section className="profile-card" id="account-details-section">
              <h3>Account Detail</h3>
              <hr />
              <div className="account-info">
                <div className="account-info-item">
                  <div>
                    <p className="label">Type de compte</p>
                    <p className="value">Compte bancaire</p>
                  </div>
                  <button
                    className="btn-light small"
                    onClick={() => setShowAccountTypeForm(!showAccountTypeForm)}
                  >
                    Change type de compte
                  </button>
                </div>
                {showAccountTypeForm && (
                  <div className="inline-form">
                    <input type="text" placeholder="Nouveau type" />
                  </div>
                )}

                <div className="account-info-item">
                  <div>
                    <p className="label">Budget de départ</p>
                    <p className="value">300 €</p>
                  </div>
                  <button
                    className="btn-light small"
                    onClick={() => setShowBudgetForm(!showBudgetForm)}
                  >
                    Change budget de départ
                  </button>
                </div>
                {showBudgetForm && (
                  <div className="inline-form">
                    <input type="number" placeholder="Nouveau budget" />
                  </div>
                )}
              </div>
              

              <div className="profile-actions">
                <button className="btn-light">Cancel</button>
                <button className="btn-blue">Save Changes</button>
              </div>
            </section>

            {/* Connexion */}
            <section className="profile-card" id="login-section">
              <h3>Sign-in method</h3>
              <hr />
              <div className="account-info">
                <div className="account-info-item">
                  <div>
                    <p className="label">Email</p>
                    <p className="value">{user.email}</p>
                  </div>
                  <button
                    className="btn-light small"
                    onClick={() => setShowEmailForm(!showEmailForm)}
                  >
                    Change email
                  </button>
                </div>
                {showEmailForm && (
                  <div className="inline-form">
                    <input type="email" placeholder="Nouvel email" />
                  </div>
                )}

                <div className="account-info-item">
                  <div>
                    <p className="label">Mot de passe</p>
                    <p className="value">********</p>
                  </div>
                  <button
                    className="btn-light small"
                    onClick={() => setShowPasswordForm(!showPasswordForm)}
                  >
                    Reset password
                  </button>
                </div>
                {showPasswordForm && (
                  <div className="inline-form">
                    <input type="password" placeholder="Nouveau mot de passe" />
                    <input type="password" placeholder="Confirmation du mot de passe" />
                  </div>
                )}
              </div>
              

              <div className="profile-actions">
                <button className="btn-light">Cancel</button>
                <button className="btn-blue">Save Changes</button>
              </div>
            </section>

            {/* Suppression */}
            <section className="profile-card" id="account-delete-section">
              <h3>Delete Account</h3>
              <hr />
              <div className="profile-delete">
                <p className="delete-warning">
                  Please note, deleting your account is a permanent action and <br />
                  will not be recoverable once completed.
                </p>
                <div className="profile-actions">
                  <button className="btn-red" onClick={() => setShowDeletePopup(true)}>Delete</button>
                </div>
              </div>
              
            </section>
          </div>
        </div>
      </div>

      {/* POPUP DE CONFIRMATION */}
      {showDeletePopup && (
        <div className="modal-overlay" onClick={() => setShowDeletePopup(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h4>Confirmer la suppression</h4>
            <p>Êtes-vous sûr de vouloir supprimer votre compte ?</p>
            <div className="modal-actions">
              <button className="btn-light" onClick={() => setShowDeletePopup(false)}>Annuler</button>
              <button className="btn-red">Supprimer définitivement</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
