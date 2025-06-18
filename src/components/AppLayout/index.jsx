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
  useEffect(() => {
    const fetchUser = async () => {
      // const token = sessionStorage.getItem("loginToken");
      // if (!token) return;

      try {
        // const config = {
        //   headers: { Authorization: `Bearer ${token}` },
        // };
        // Appelle une route backend qui renvoie les infos utilisateur connecté
        const { data } = await axios.get(`${API_url}/api/user/me`);
        console.log("data", data);
        setUser(data);
      } catch (error) {
        console.error("Erreur récupération user:", error);
        // optionnel : gérer logout si token invalide
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="app-container"> {/*dashboard-layout*/}
      <Sidebar />
      <main className="main-content"> {/*dashboard-main*/}
        <Navbar user={user} />
        <Outlet context={{ user, setUser }} /> {/*category-container*/}
      </main>
      <div className="top-bar-mobile"> {/*theme-wrapper*/}
        <ThemeTrad />
      </div>
    </div>
  );
};

export default AppLayout;
