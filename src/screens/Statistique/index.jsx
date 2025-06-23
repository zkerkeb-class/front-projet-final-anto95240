import "./stat.css"

import CardAccountSection from "../../components/Stat/CardAccountSection";
import ChartDoughnutSection from "../../components/Stat/ChartDoughnutSection";
import ChartBarSection from "../../components/Stat/ChartBarSection";

const StatistiquePage = () => {
    return (
      <div className="dashboard-content">
          <CardAccountSection/>
          <ChartDoughnutSection/>
          <ChartBarSection/>
      </div>
    );
};

export default StatistiquePage;