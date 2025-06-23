import { useNavigate, Link, useOutletContext } from "react-router";
import { useState, useEffect } from "react";
import axios from "axios"

import { Bar, Doughnut  } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend } from "chart.js";
import "./chartDoughnutSection.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
);

const ChartDoughnutSection = () => {
  const { categories } = useOutletContext();

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
  );
};

export default ChartDoughnutSection;