import { Outlet } from "react-router";
import axios from "axios"
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

import Sidebar from "../Sidebar";
import Navbar from "../Navbar";
import ThemeTrad from "../ThemeTrad";
import "./AppLayout.css";

const AppLayout = () => {
  
  const { t } = useTranslation();
  const API_URL = import.meta.env.VITE_API_URL;  
  const [user, setUser] = useState(null);
  const [account, setAccount] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      
    try {
      const userRes = await axios.get(`${API_URL}/api/user/me`);
      setUser(userRes.data);
      console.log("data user:", userRes.data);
    } catch (error) {
      console.error("Erreur user:", error);
    }

    let currentAccount = null;
    try {
      const accountRes = await axios.get(`${API_URL}/api/account/me`);
      currentAccount = Array.isArray(accountRes.data)
        ? accountRes.data[0]
        : accountRes.data;
      setAccount(currentAccount);
      console.log("account:", currentAccount);
    } catch (error) {
      console.error("Erreur compte:", error);
    }
    
    try {
      if (currentAccount?._id) {
        const transactionRes = await axios.get(`${API_URL}/api/transaction/account/${currentAccount._id}`);
        setTransactions(Array.isArray(transactionRes.data) ? transactionRes.data : []);
        console.log("transactions:", transactionRes.data);
      } else {
        setTransactions([]);
      }
    } catch (error) {
      console.error("Erreur transactions:", error);
    }
        
    try {
      const categoryRes = await axios.get(`${API_URL}/api/category/visible`);
      setCategories(categoryRes.data);
      console.log("data cat:", categoryRes.data);
    } catch (error) {
      console.error("Erreur catégories:", error);
    }
  };

    fetchData();
  }, []);

  return (
    <div className="app-container">
      <Sidebar />
      <main className="main-content">
        <Navbar user={user} API_URL={API_URL} />
        <Outlet context={{ user, setUser, account, setAccount, transactions, setTransactions, categories, setCategories, API_URL, t }} />
      </main>
      <div className="top-bar-mobile">
        <ThemeTrad />
      </div>
    </div>
  );
};

export default AppLayout;
