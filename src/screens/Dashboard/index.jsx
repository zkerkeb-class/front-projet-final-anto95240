import "./dashboard.css";
import CardAccountSection from "../../components/Stat/CardAccountSection";
import TableSection from "../../components/Stat/TableSection";
import ChartBarSection from "../../components/Stat/ChartBarSection";

const HomePage = () => {

  return (
    <div className="dashboard-content">
      <CardAccountSection/>
      <TableSection/>
      <ChartBarSection/>
    </div>
  );
};

export default HomePage;