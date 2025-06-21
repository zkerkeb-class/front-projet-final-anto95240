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
  const API_url = import.meta.env.VITE_API_url;  
  const [user, setUser] = useState(null);
  const [account, setAccount] = useState(null);
  const [transaction, setTransaction] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userRes = await axios.get(`${API_url}/api/user/me`);
        setUser(userRes.data);

        const accountRes = await axios.get(`${API_url}/api/account/me`);
        const currentAccount = Array.isArray(accountRes.data)
          ? accountRes.data[0]
          : accountRes.data;
        setAccount(currentAccount);
        
        if (currentAccount?._id) {
          const transactionRes = await axios.get(`${API_url}/api/transaction/account/${currentAccount._id}`);
          setTransaction(Array.isArray(transactionRes.data) ? transactionRes.data : []);
        }
        
        const categoryRes = await axios.get(`${API_url}/api/category`);
        setCategories(categoryRes.data);

      } catch (error) {
        console.error(t('ErrorMsg.errorRecupData'), error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="app-container">
      <Sidebar />
      <main className="main-content">
        <Navbar user={user} API_url={API_url} />
        <Outlet context={{ user, setUser, account, setAccount, transaction, setTransaction, categories, setCategories, API_url, t }} />
      </main>
      <div className="top-bar-mobile">
        <ThemeTrad />
      </div>
    </div>
  );
};

export default AppLayout;
