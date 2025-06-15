import { createBrowserRouter } from "react-router";

import HomePage from "../screens/Dashboard";
import LoginPage from "../screens/Login"; 
import AccountPage from "../screens/Account";
import CategoryPage from "../screens/Category";
import DeconnexionPage from "../screens/Deconnexion";
import ProfilePage from "../screens/Profile";
import RegisterPage from "../screens/Register";
import StatistiquePage from "../screens/Statistique";
import TransactionPage from "../screens/Transaction";
import ProtectedRoutes from "../components/ProtectedRoutes"
import AppLayout from "../components/AppLayout";

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
    {
      path: "/deconnexion",
      Component: DeconnexionPage,
    },
    {
      element: <AppLayout />,
      children: [  
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
        }
      ]
    }
  //   ]
  // },
  
]
);

export default router;

