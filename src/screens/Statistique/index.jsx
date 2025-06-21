import { useNavigate, Link, useOutletContext } from "react-router";
import { useState, useEffect } from "react";
import axios from "axios"

import { Bar, Doughnut  } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend } from "chart.js";
import "./stat.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
);

const StatistiquePage = () => {
  const { t } = useOutletContext();

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
        data: [1000, 1000], 
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
    );
};

export default StatistiquePage;