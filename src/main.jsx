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
import ForgotPassword from './pages/auth/ForgotPassword.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';
import PublicRoute from './components/PublicRoute.jsx';
import ResetPassword from './pages/auth/ResetPassword.jsx';
import ProductEntry from './pages/user/ProductEntry.jsx';
import ActiveAccount from './pages/auth/ActiveAccount.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <PublicRoute />,
    children: [
      { path: 'login', element: <Login />, errorElement: <Error500 /> },
      {
        path: 'forgot-password',
        element: <ForgotPassword />,
        errorElement: <Error500 />,
      },
      {
        path: 'reset-password/:token',
        element: <ResetPassword />,
        errorElement: <Error500 />,
      },
      {
        path: 'active-account/:token',
        element: <ActiveAccount />,
        errorElement: <Error500 />,
      },
    ],
  },
  {
    path: '/admin',
    element: <PrivateRoute />,
    children: [
      {
        path: '',
        element: <Layout />,
        children: [
          { index: true, element: <Home />, errorElement: <Error500 /> },
          {
            path: 'productEntries',
            element: <ProductEntry />,
            errorElement: <Error500 />,
          },
        ],
      },
    ],
  },
  { path: '*', element: <Error404 /> },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
