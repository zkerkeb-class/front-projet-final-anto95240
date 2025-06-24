import { Outlet } from "react-router";
import axios from "axios"
import { useState, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";

import Sidebar from "../Sidebar";
import Navbar from "../Navbar";
import ThemeTrad from "../ThemeTrad";
import "./AppLayout.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUp
} 
from "@fortawesome/free-solid-svg-icons";

const AppLayout = () => {
  
  const { t } = useTranslation();
  const API_URL = import.meta.env.VITE_API_URL;  
  const [user, setUser] = useState(null);
  const [account, setAccount] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showScrollToTopButton, setShowScrollToTopButton] = useState(false);

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

  const calculateBalance = (txs) => {
    let balance = account?.budgetStart || 0;
    let totalCredit = 0;
    let totalDebit = 0;
    let lastMonthCredit = 0;
    let lastMonthDebit = 0;
    
    const now = new Date();
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(now.getMonth() - 1);

    const updatedTransactions = txs.map(tx => {
      const amount = Number(tx.amount);
      const txDate = new Date(tx.date);

      const isLastMonth = txDate >= oneMonthAgo && txDate <= now;

      if (tx.transactionType === "credit") {
        balance += amount;
        totalCredit += amount;
        if (isLastMonth) lastMonthCredit += amount;
      } else if (tx.transactionType === "debit") {
        balance -= amount;
        totalDebit += amount;
        if (isLastMonth) lastMonthDebit += amount;
      }

      return { ...tx, solde: balance };
    });

    return {
      transactions: updatedTransactions,
      balance,
      totalCredit,
      totalDebit,
      lastMonthCredit,
      lastMonthDebit
    };
  };

  const handleScroll = useCallback(() => {
    setShowScrollToTopButton(window.scrollY > 50);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [ handleScroll]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="app-container">
      <Sidebar />
      <main className="main-content">
        <Navbar user={user} API_URL={API_URL} />
        <Outlet context={{ user, setUser, account, setAccount, transactions, setTransactions, categories, setCategories, API_URL, t, calculateBalance }} />
      </main>
      <div className="top-bar-mobile">
        <ThemeTrad />
      </div>
      {showScrollToTopButton && (
        <button 
          className="return-top" 
          onClick={scrollToTop}   
          aria-label="Retour en haut"
        >
          <FontAwesomeIcon icon={faArrowUp} />
        </button>
      )}
    </div>
  );
};

export default AppLayout;
