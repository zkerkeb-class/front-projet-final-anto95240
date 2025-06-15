import { Outlet } from "react-router";

import Sidebar from "../Sidebar";
import Navbar from "../Navbar";
import ThemeTrad from "../ThemeTrad";
import "./AppLayout.css";

const AppLayout = ({ user, children }) => {
  return (
    <div className="app-container"> {/*dashboard-layout*/}
      <Sidebar />
      <main className="main-content"> {/*dashboard-main*/}
        <Navbar user={user} />
        <Outlet /> {/*category-container*/}
      </main>
      <div className="top-bar-mobile"> {/*theme-wrapper*/}
        <ThemeTrad />
      </div>
    </div>
  );
};

export default AppLayout;
