import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
//import App from './App.tsx';
import { NextUIProvider } from '@nextui-org/react';
import './index.scss';
import Landing from './layout/Landing';
import App from './layout/App';
import Register from './pages/Register';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Landing />,
    errorElement: <div>404</div>
  },
  {
    path: '/register',
    element: <App />,
    errorElement: <div>404</div>,
    children: [
      {
        path: '/register',
        element: <Register />
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
