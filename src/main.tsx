import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
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
import ProfileSettings from "./pages/ProfileSettings";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
    errorElement: <div>404</div>,
  },
  {
    path: "/",
    element: <Auth />,
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
    element: <Dashboard />,
    children: [
      {
        path: "complete",
        element: <CompleteProfile />,
      },
      {
        path: "become-worker",
        element: <BecomeWorker />,
      },
    ],
  },
  {
    path: "/settings",
    element: <ProfileSettings />,
    errorElement: <div>404</div>,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <NextUIProvider>
      <RouterProvider router={router} />
    </NextUIProvider>
  </React.StrictMode>
);
