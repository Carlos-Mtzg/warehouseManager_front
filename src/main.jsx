import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AuthProvider } from './context/AuthProvider.jsx';
import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './index.css';

import Layout from './components/Layout.jsx';
import Login from './pages/auth/Login.jsx';
import Error404 from './pages/errors/Error404.jsx';
import Error500 from './pages/errors/Error500.jsx';
import Home from './pages/admin/Home.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    children: [
      {
        index: true,
        element: <Login />,
        errorElement: <Error500 />,
      },
      {
        path: '*',
        element: <Error404 />,
      },
    ],
  },
  {
    path: '/admin',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
        errorElement: <Error500 />,
      },
      {
        path: '*',
        element: <Error404 />,
      },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router}></RouterProvider>
    </AuthProvider>
  </StrictMode>
);
