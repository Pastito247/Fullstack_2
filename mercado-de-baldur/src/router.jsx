import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Store from "./pages/Store";
import Login from "./pages/Login";
import StoreDetail from "./pages/StoreDetail"; 
import Checkout from "./pages/Checkout";
import Profile from "./pages/Profile";
import UserStore from "./pages/UserStore";

import App from "./App";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/store", element: <Store /> },
      { path: "/store/:id", element: <StoreDetail /> },
      { path: "/checkout", element: <Checkout/> },
      { path: "/profile", element: <Profile/> },
      { path: "/mystore", element: <UserStore/> },
      { path: "/login", element: <Login /> },
    ],
  },
]);
