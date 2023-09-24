import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
//import App from './App.tsx';
import { NextUIProvider } from '@nextui-org/react';
import './index.scss';
import Landing from './layout/Landing';
import App from './layout/App';
import Register from './pages/Register';
import Login from './pages/Login';
import Verify from './pages/Verify';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Landing />,
    errorElement: <div>404</div>
  },
  {
    path: '/',
    element: <App />,
    errorElement: <div>404</div>,
    children: [
      {
        path: '/register',
        element: <Register />
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/verify/:token',
        element: <Verify />
      },
      {
        path: 'dashboard',
        element: <div>Dashboard</div>
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <NextUIProvider>
      <RouterProvider router={router} />
    </NextUIProvider>
  </React.StrictMode>
);
