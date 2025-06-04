import { createBrowserRouter } from "react-router";

import HomePage from "../screens/DashboardPage";
import LoginPage from "../screens/LoginPage"; 
import AccountPage from "../screens/AccountPage";
import Layout from "../components/Layout";
import CategoryPage from "../screens/CategoryPage";
import DeconnexionPage from "../screens/DeconnexionPage";
import ProfilePage from "../screens/ProfilePage";
import RegisterPage from "../screens/RegisterPage";
import StatistiquePage from "../screens/StatistiquePage";
import TransactionPage from "../screens/TransactionPage";
import ProtectedRoutes from "../components/ProtectedRoutes"

let router = createBrowserRouter([
  {
    path: "/",
    Component: LoginPage,
  }, 
  {
    path: "/register",
    Component: RegisterPage,
  }, 
  // {
    // Component: ProtectedRoutes,
    // children: [  
    {
      path: "/dashboard",
      Component: HomePage,
    }, 
    {
        path: "/category",
        Component: CategoryPage,
      },
      {
        path: "/transaction",
        Component: TransactionPage
      },
      {
        path: "/account",
        Component: AccountPage,
      },
      {
        path: "/profile",
        Component: ProfilePage,
      },
      {
        path: "/statistique",
        Component: StatistiquePage,
      },
      {
        path: "/deconnexion",
        Component: DeconnexionPage,
      }
  //   ]
  // },
  
]
);

export default router;

