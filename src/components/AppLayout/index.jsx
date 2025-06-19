import { Outlet } from "react-router";
import axios from "axios"
import { useState, useEffect } from "react";
import Sidebar from "../Sidebar";
import Navbar from "../Navbar";
import ThemeTrad from "../ThemeTrad";
import "./AppLayout.css";


const AppLayout = () => {
  
  const API_url = "http://localhost:5000";    
  const [user, setUser] = useState(null);
  const [account, setAccount] = useState(null);

    useEffect(() => {
    const fetchData = async () => {
      try {
        const userRes = await axios.get(`${API_url}/api/user/me`);
        setUser(userRes.data);
        console.log("User:", userRes.data);

        const accountRes = await axios.get(`${API_url}/api/account/me`);
        setAccount(Array.isArray(accountRes.data) ? accountRes.data[0] : accountRes.data);
        console.log("Account:", accountRes.data);

      } catch (error) {
        console.error("Erreur récupération données:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="app-container"> {/*dashboard-layout*/}
      <Sidebar />
      <main className="main-content"> {/*dashboard-main*/}
        <Navbar user={user} />
        <Outlet context={{ user, setUser, account, setAccount }} /> {/*category-container*/}
      </main>
      <div className="top-bar-mobile"> {/*theme-wrapper*/}
        <ThemeTrad />
      </div>
    </div>
  );
};

export default AppLayout;
