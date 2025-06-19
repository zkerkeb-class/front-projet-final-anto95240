import { useOutletContext  } from "react-router";

import "./account.css";

const AccountPage = () => {
  const { account } = useOutletContext();

  return (
    <div>
      <div className="dashboard-content">
        <section className="account-list">
          <div className="account-header">
            <p className="items-label">{account?.name || "Nom du compte non défini"}</p>
            <p className="items-label">{account?.type || "Type de compte non défini"}</p>
          </div>
          <div className="account-item">
            <div className="account-items">
              <p>Dépense</p>
              <p>Gain</p>
              <p>Solde</p>
            </div> 
          </div>
        </section>
      </div> 
    </div>
  );
};

export default AccountPage;