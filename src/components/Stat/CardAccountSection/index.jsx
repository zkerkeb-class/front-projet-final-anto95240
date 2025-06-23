import { useNavigate, Link, useOutletContext } from "react-router";
import { useState, useEffect, useMemo } from "react";
import axios from "axios";

import "./cardAccountSection.css";

const CardAccountSection = () => {
  const { transactions, t, calculateBalance } = useOutletContext();

  const { balance, lastMonthCredit, lastMonthDebit } = calculateBalance(transactions || []);

  return (
    <section className="dashboard-card-grid">
    <div className="dashboard-card-body">
        <p className="card-label">{t('StatistiquePage.actualSolde')}</p>
        <h1 className="card-value">{balance.toFixed(2) || 0 } €</h1>
    </div>
    <div className="dashboard-card-body">
        <p className="card-label">{t('StatistiquePage.gainMois')}</p>
        <h1 className="card-value">{lastMonthCredit.toFixed(2) || 0 } €</h1>
    </div>
    <div className="dashboard-card-body">
        <p className="card-label">{t('StatistiquePage.depenseMois')}</p>
        <h1 className="card-value">{lastMonthDebit.toFixed(2) || 0 } €</h1>
    </div>
    </section>
  );
};

export default CardAccountSection;