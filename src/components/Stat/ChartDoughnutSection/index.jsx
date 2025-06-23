import { useOutletContext } from "react-router";
import { useMemo, useState, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, LinearScale, ArcElement, Tooltip } from "chart.js";
import "./chartDoughnutSection.css";

ChartJS.register(LinearScale, ArcElement, Tooltip);

const LOCAL_STORAGE_KEY = "selectedCategories";

const ChartDoughnutSection = () => {
  const { transactions, categories, t } = useOutletContext();

  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  // Garde uniquement les catégories utilisateurs
  const userCategories = categories.filter((cat) => !cat.isDefault);

  // Calcul top catégories avec revenus/dépenses
  const topCategories = useMemo(() => {
    if (!transactions?.length || !userCategories?.length) return [];

    const map = new Map();

    transactions.forEach((tx) => {
      const date = new Date(tx.date);
      if (date.getMonth() !== currentMonth || date.getFullYear() !== currentYear) return;

      const cat = userCategories.find((c) => c._id === tx.categoryId);
      if (!cat) return;

      const key = tx.categoryId.toString();
      if (!map.has(key)) {
        map.set(key, {
          categoryId: key,
          label: cat.name,
          theme: cat.theme,
          revenus: 0,
          depenses: 0,
        });
      }

      if (tx.transactionType === "credit") {
        map.get(key).revenus += tx.amount;
      } else if (tx.transactionType === "debit") {
        map.get(key).depenses += tx.amount;
      }
    });

    const enriched = Array.from(map.values()).map((cat) => ({
      ...cat,
      total: cat.revenus + cat.depenses,
    }));

    enriched.sort((a, b) => b.total - a.total);
    return enriched.slice(0, 3);
  }, [transactions, userCategories, currentMonth, currentYear]);

  const [selectedCategories, setSelectedCategories] = useState(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length === 3) return parsed;
      }
    } catch {
    }
    return [];
  });

  useEffect(() => {
    if (selectedCategories.length === 3) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(selectedCategories));
    }
  }, [selectedCategories]);

  useEffect(() => {
    if (selectedCategories.length !== 3) {
      if (topCategories.length >= 3) {
        setSelectedCategories(topCategories.map((cat) => cat.categoryId));
      } else {
        const needed = 3 - topCategories.length;
        const fillCats = userCategories
          .filter(cat => !topCategories.find(tc => tc.categoryId === cat._id))
          .slice(0, needed)
          .map(cat => cat._id);
        const initialCats = [...topCategories.map(c => c.categoryId), ...fillCats];
        while (initialCats.length < 3) {
          initialCats.push(null);
        }
        setSelectedCategories(initialCats);
      }
    }
  }, [topCategories, userCategories, selectedCategories]);

  // Gestion du changement dans le select
  const handleSelectChange = (index, categoryId) => {
    const newSelected = [...selectedCategories];
    newSelected[index] = categoryId;
    setSelectedCategories(newSelected);
  };

  // Génération des données à afficher pour un doughnut
  const generateChartData = (categoryData) => {
    if (!categoryData) {
      // données vides si aucune catégorie choisie
      return {
        labels: [t("StatistiquePage.revenus"), t("StatistiquePage.depenses")],
        datasets: [{
          data: [0, 0],
          backgroundColor: [
            "rgba(75, 192, 192, 0.2)",
            "rgba(255, 99, 132, 0.2)"
          ],
          borderColor: [
            "rgba(75, 192, 192, 0.5)",
            "rgba(255, 99, 132, 0.5)"
          ],
          borderWidth: 1,
        }],
      };
    }

    return {
      labels: [t("StatistiquePage.revenus"), t("StatistiquePage.depenses")],
      datasets: [
        {
          data: [categoryData.revenus, categoryData.depenses],
          backgroundColor: [
            "rgba(75, 192, 192, 0.7)", // Revenu
            "rgba(255, 99, 132, 0.7)", // Dépense
          ],
          borderColor: [
            "rgba(75, 192, 192, 1)",
            "rgba(255, 99, 132, 1)",
          ],
          borderWidth: 1,
        },
      ],
    };
  };

  const doughnutOptions = {
    responsive: true,
    plugins: {
      legend: { position: "bottom" },
    },
  };

  return (
    <section className="dashboard-chart-dougnut">
      {selectedCategories.map((catId, index) => {
        const cat = userCategories.find((c) => c._id === catId);
        const categoryData = topCategories.find((c) => c.categoryId === catId) || {
          revenus: 0,
          depenses: 0,
        };

        return (
          <div className="dashboard-chart-small" key={index}>
            <h3 className="chart-label">
              {t("StatistiquePage.doughnutTitle")} #{cat ? cat.name : t("StatistiquePage.noCategory")}
            </h3>
            <select
              className="category-select"
              value={catId || ""}
              onChange={(e) => handleSelectChange(index, e.target.value)}
            > 
              <option value="" disabled>-- {t("StatistiquePage.selectCategory")} --</option>
              {userCategories.map((catOption) => (
                <option key={catOption._id} value={catOption._id}>
                  {catOption.name} ({catOption.theme})
                </option>
              ))}
            </select>
            <Doughnut data={generateChartData(categoryData)} options={doughnutOptions} />
          </div>
        );
      })}
    </section>
  );
};

export default ChartDoughnutSection;
