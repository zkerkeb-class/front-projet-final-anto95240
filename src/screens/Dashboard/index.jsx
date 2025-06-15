import { useNavigate, Link } from "react-router";
import { useState, useEffect } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

// import Sidebar from "../../components/Sidebar";
// import Navbar from "../../components/Navbar";
// import ThemeTrad from "../../components/ThemeTrad";
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
  // const user = {
  //   name: "Alice Dupont",
  //   profilePicture: "/images/alice.jpg",
  // };

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
          <p className="card-label">{t('StatistiquePage.nbAccount')}</p>
          <h1 className="card-value">1</h1>
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
              <th>{t('DashboardPage.tableDate')}</th>
              <th>{t('DashboardPage.tablePaiemant')}</th>
              <th>{t('DashboardPage.tableBeneficiare')}</th>
              <th>{t('DashboardPage.tableSolde')}</th>
            </tr>
          </thead>
          <tbody>
            {[1, 2, 3].map((_, index) => (
              <tr key={index}>
                <td colSpan="4">
                  <div className="table-row-wrapper">
                    <span>Chris</span>
                    <span>HTML tables</span>
                    <span>22</span>
                    <span>45 €</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="table-card-container">
        {[1, 2, 3].map((_, index) => (
          <div key={index} className="table-card">
            <span><strong>{t('DashboardPage.tableDate')}:</strong> 22</span>
            <span><strong>{t('DashboardPage.tablePaiemant')}:</strong> HTML tables</span>
            <span><strong>{t('DashboardPage.tableBeneficiare')}:</strong> Chris</span>
            <span><strong>{t('DashboardPage.tableSolde')}:</strong> 45 €</span>
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