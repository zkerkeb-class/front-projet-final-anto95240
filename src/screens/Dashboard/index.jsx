import { useNavigate, Link } from "react-router";
import { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import "./dashboard.css";

const HomePage = () => {
  const user = {
    name: "Alice Dupont",
    profilePicture: "/images/alice.jpg",
  };

  return (
    <div className="dashboard-layout">
      <Sidebar />

      <div className="dashboard-main">
        <Navbar user={user} className="dashboard-navbar" />

        {/* Ici ton contenu principal */}
        <div className="dashboard-content">
          <h2>Bienvenue sur le Dashboard</h2>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
