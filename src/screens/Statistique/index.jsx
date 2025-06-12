import { useNavigate, Link } from "react-router";
import { useState, useEffect } from "react";
import axios from "axios"
import "./stat.css";
import { Bar, Doughnut  } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend } from "chart.js";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import ThemeTrad from "../../components/ThemeTrad";
import { useTranslation } from "react-i18next";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
);

const StatistiquePage = () => {
    const { t } = useTranslation();
  const user = {
    name: "Alice Dupont",
    profilePicture: "/images/alice.jpg",
  };

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

  const doughnutData = {
    labels: ["Revenus", "Dépenses"],
    datasets: [
        {
        data: [1000, 1000], // valeurs à adapter dynamiquement si tu veux
        backgroundColor: [
            "rgba(75, 192, 192, 0.7)",   // Revenus
            "rgba(255, 99, 132, 0.7)",   // Dépenses
        ],
        borderColor: [
            "rgba(75, 192, 192, 1)",
            "rgba(255, 99, 132, 1)",
        ],
        borderWidth: 1,
        },
    ],
    };

    const doughnutOptions = {
    responsive: true,
    plugins: {
        legend: {
        position: "bottom",
        },
    },
    };


    return <div>
        {/* <h1>Page stat</h1>
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
                    <section className="dashboard-chart-dougnut">
                       <div className="dashboard-chart-small">
                            <h3 className="chart-label">Répartition ce mois-ci</h3>
                            <Doughnut data={doughnutData} options={doughnutOptions} />
                        </div>

                        <div className="dashboard-chart-small">
                            <h3 className="chart-label">Répartition ce mois-ci</h3>
                            <Doughnut data={doughnutData} options={doughnutOptions} />
                        </div>

                        <div className="dashboard-chart-small">
                            <h3 className="chart-label">Répartition ce mois-ci</h3>
                            <Doughnut data={doughnutData} options={doughnutOptions} />
                        </div> 
                    </section>
                    
                    
                    <section className="dashboard-chart">
                        <h3 className="chart-label">{t('StatistiquePage.titleChartBar')}</h3>
                        <Bar data={data} options={options}/>
                    </section>
                </div>
            </div>
            <div className="theme-wrapper">
              <ThemeTrad />
            </div>
        </div>
    </div>;
};

export default StatistiquePage;