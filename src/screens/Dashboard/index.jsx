import { useNavigate, Link, useOutletContext } from "react-router";
import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

import "./dashboard.css";
import { useTranslation } from "react-i18next";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
);

const HomePage = () => {
  const { t } = useTranslation();
  const { transaction: transactions, categories } = useOutletContext();

  const lastFiveTransactions = useMemo(() => {
    if (!transactions) return [];
    return [...transactions]
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 5);
  }, [transactions]);

  const data = {
    labels: [
      "Janvier",
      "Février",
      "Mars",
      "Avril",
      "Mai",
      "Juin",
      "Juillet",
      "Août",
      "Septembre",
      "Octobre",
      "Novembre",
      "Décembre",
    ],
    datasets: [
      {
        label: "Revenus",
        data: [1200, 1900, 3000, 5000, 2000, 5000, 1200, 6000, 1100, 3000, 1000, 5000],
        backgroundColor: "rgba(75, 192, 192, 0.7)", // Couleur pour revenus
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
      {
        label: "Dépenses",
        data: [1000, 1500, 2500, 4000, 1800, 4800, 1000, 5700, 900, 2800, 800, 4900],
        backgroundColor: "rgba(255, 99, 132, 0.7)", // Couleur pour dépenses
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: (context) => `${context.dataset.label} : ${context.parsed.y} €`,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 500,
          callback: (value) => `${value} €`,
        },
      },
    },
  };


  return (
    <div className="dashboard-content">
      <section className="dashboard-card-grid">
        <div className="dashboard-card-body">
          <p className="card-label">{t('StatistiquePage.actualSolde')}</p>
          <h1 className="card-value">1000 €</h1>
        </div>
        <div className="dashboard-card-body">
          <p className="card-label">{t('StatistiquePage.gainMois')}</p>
          <h1 className="card-value">1000 €</h1>
        </div>
        <div className="dashboard-card-body">
          <p className="card-label">{t('StatistiquePage.depenseMois')}</p>
          <h1 className="card-value">1000 €</h1>
        </div>
      </section>

      <section className="dashboard-table">
        <table>
          <caption>{t('DashboardPage.tableTitle')}</caption>
          <thead>
            <tr>
              <th title={t('TransactionPage.tooltipDate')}>{t('DashboardPage.tableDate')}</th>
              <th title={t('TransactionPage.tooltipPaiement')}>{t('DashboardPage.tablePaiemant')}</th>
              <th title={t('TransactionPage.tooltipBeneficiare')}>{t('DashboardPage.tableBeneficiare')}</th>
              <th title={t('TransactionPage.tooltipCat')}>{t('DashboardPage.tableCategory')}</th>
              <th title={t('TransactionPage.tooltipSolde')}>{t('DashboardPage.tableSolde')}</th>
            </tr>
          </thead>
          <tbody>
            {lastFiveTransactions.map((tx) => {
              const category = categories.find(cat => cat._id === tx.categoryId);

              return (
                <tr key={tx._id}>
                  <td colSpan="5">
                    <div className="table-row-wrapper">
                      <span>{new Date(tx.date).toLocaleDateString()}</span>
                      <span>{tx.paiement}</span>
                      <span>{tx.beneficiare}</span>
                      <span>{category?.name || "-"}</span>
                      <span>{tx.amount} €</span>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </section>

      <section className="table-card-container">
        {lastFiveTransactions.map((tx) => (
          <div key={tx._id} className="table-card">
            <span><strong>{t('DashboardPage.tableDate')}:</strong> {new Date(tx.date).toLocaleDateString()}</span>
            <span><strong>{t('DashboardPage.tablePaiemant')}:</strong> {tx.category?.name || "-"}</span>
            <span><strong>{t('DashboardPage.tableBeneficiare')}:</strong> {tx.name}</span>
            <span><strong>{t('DashboardPage.tableSolde')}:</strong> {tx.amount} €</span>
          </div>
        ))}
      </section>


      <section className="dashboard-chart">
        <h3 className="chart-label">{t('StatistiquePage.titleChartBar')}</h3>
        <Bar data={data} options={options} />
      </section>
    </div>
  );
};

export default HomePage;