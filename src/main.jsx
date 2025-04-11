import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AuthProvider } from './context/AuthProvider.jsx';
import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../src/assets/css/page-animations.css';
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
import Entries from './pages/admin/Entries.jsx';
import ActiveAccount from './pages/auth/ActiveAccount.jsx';
import Users from './pages/admin/Users.jsx';
import RoleBasedRoute from './components/RoleBasedRoute.jsx';
import UserProfile from './pages/user/UserProfile.jsx';
import Categories from './pages/admin/Categories.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <PublicRoute />,
    children: [
      { path: '/', element: <Login />, errorElement: <Error500 /> },
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
    path: '/',
    element: <PrivateRoute />,
    children: [
      {
        path: '',
        element: <Layout />,
        children: [
          {
            path: 'product-entries',
            element: <ProductEntry />,
            errorElement: <Error500 />,
          },
          {
            path: 'entries',
            element: <Entries />,
            errorElement: <Error500 />,
          },
          {
            path: 'categories',
            element: <Categories />,
            errorElement: <Error500 />,
          },
        ],
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
          {
            path: '',
            element: <RoleBasedRoute allowedRoles={['ROLE_ADMIN']} />,
            children: [
              { index: true, element: <Home />, errorElement: <Error500 /> },
              {
                path: 'user-management',
                element: <Users />,
                errorElement: <Error500 />,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: '/user',
    element: <PrivateRoute />,
    children: [
      {
        path: '',
        element: <Layout />,
        children: [
          {
            path: '',
            element: <RoleBasedRoute allowedRoles={['ROLE_USER']} />,
            children: [
              { index: true, element: <ProductEntry />, errorElement: <Error500 /> },
              {
                path: 'my-profile',
                element: <UserProfile />,
                errorElement: <Error500 />,
              },
            ],
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
