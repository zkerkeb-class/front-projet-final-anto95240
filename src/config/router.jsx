import { createBrowserRouter } from "react-router";

import HomePage from "../screens/Dashboard";
import LoginPage from "../screens/Login"; 
import AccountPage from "../screens/Account";
import Layout from "../components/Layout";
import CategoryPage from "../screens/Category";
import DeconnexionPage from "../screens/Deconnexion";
import ProfilePage from "../screens/Profile";
import RegisterPage from "../screens/Register";
import StatistiquePage from "../screens/Statistique";
import TransactionPage from "../screens/Transaction";
import ProtectedRoutes from "../components/ProtectedRoutes"

let router = createBrowserRouter([
  // {
    // Component: ProtectedRoutes,
    // children: [
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
  //   ]
  // },
  
]
);

export default router;

