import React from "react";
import ReactDOM from "react-dom/client";
import {
  RouterProvider,
  createBrowserRouter,
  Navigate,
} from "react-router-dom";
import { NextUIProvider } from "@nextui-org/react";
import "./index.scss";
import Landing from "./layout/Landing";
import Auth from "./layout/Auth";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Verify from "./pages/Verify";
import Resend from "./pages/Resend";
import Dashboard from "./layout/Dashboard";
import CompleteProfile from "./pages/CompleteProfile";
import BecomeWorker from "./pages/UpgradeToWorker";
import Account from "./pages/Account";
import Mail from "./pages/Mail";
import Password from "./pages/Password";
import MicrositeConfiguration from "./pages/MicrositeConfig";
import MicrositeUpdate from "./pages/MicrositeUpdate";
import ServiceUpdate from "./pages/ServicesUpdate";
import ScheduleUpdate from "./pages/ScheduleUpdate";
import Profile from "./pages/Profile";
import Bookings from "./pages/Bookings";
import Index from "./pages/Index";
import { UserProvider } from "./utils/UserContext";
import SearchWorkerPage from "./pages/SearchWorkerPage";

const token = sessionStorage.getItem("token");

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
    errorElement: <div>404</div>,
  },
  {
    path: "/",
    element: token ? <Navigate to={"/dashboard"} replace /> : <Auth />,
    errorElement: <div>404</div>,
    children: [
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/resend",
        element: <Resend />,
      },
      {
        path: "/verify/:token",
        element: <Verify />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: !token ? <Navigate to={"/login"} replace /> : <Dashboard />,
    children: [
      {
        path: "/dashboard",
        element: <Index />,
      },
      {
        path: "complete",
        element: <CompleteProfile />,
      },
      {
        path: "become-worker",
        element: <BecomeWorker />,
      },
      {
        path: "account",
        element: <Account />,
      },
      {
        path: "mail",
        element: <Mail />,
      },
      {
        path: "password",
        element: <Password />,
      },
      {
        path: "microsite-config",
        element: <MicrositeConfiguration />,
      },
      {
        path: "schedule",
        element: <div>schedule</div>,
      },
      {
        path: "microsite-update",
        element: <MicrositeUpdate />,
      },
      {
        path: "service-update",
        element: <ServiceUpdate />,
      },
      {
        path: "schedule-update",
        element: <ScheduleUpdate />,
      },
      {
        path: "bookings",
        element: <Bookings />,
      },
    ],
  },
  {
    path: "ms/:id",
    element: <Profile />,
    errorElement: <div>404</div>,
  },
  {
    path: "search",
    element: <SearchWorkerPage />,
    errorElement: <div>404</div>,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <UserProvider>
    <React.StrictMode>
      <NextUIProvider>
        <RouterProvider router={router} />
      </NextUIProvider>
    </React.StrictMode>
  </UserProvider>
);
