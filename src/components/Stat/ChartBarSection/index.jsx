import { useOutletContext } from "react-router";
import { useMemo } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip } from "chart.js";

import "./chartBarSection.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
);

const ChartBarSection = () => {
  const { t, transactions } = useOutletContext();
  const year = new Date().getFullYear();

  const monthlyData = useMemo(() => {
    const revenus = Array(12).fill(0);
    const depenses = Array(12).fill(0);

    transactions.forEach((tx) => {
      const date = new Date(tx.date);
      const txYear = date.getFullYear();
      if (txYear !== year) return;

      const month = date.getMonth();
      if (tx.transactionType === "credit") {
        revenus[month] += tx.amount;
      } else if (tx.transactionType === "debit") {
        depenses[month] += tx.amount;
      }
    });

    return { revenus, depenses };
  }, [transactions, year]);

  const data = {
    labels: [
      "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
      "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
    ],
    datasets: [
      {
        label: t("StatistiquePage.revenus"),
        data: monthlyData.revenus,
        backgroundColor: "rgba(75, 192, 192, 0.7)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
      {
        label: t("StatistiquePage.depenses"),
        data: monthlyData.depenses,
        backgroundColor: "rgba(255, 99, 132, 0.7)",
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
          label: (context) =>
            `${context.dataset.label} : ${context.parsed.y.toLocaleString()} €`,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 500,
          callback: (value) => `${value.toLocaleString()} €`,
        },
      },
    },
  };

  return (

    <section className="dashboard-chart">
        <h3 className="chart-label">{t('StatistiquePage.titleChartBar')}</h3>
        <Bar data={data} options={options} />
    </section>
  );
};

export default ChartBarSection;