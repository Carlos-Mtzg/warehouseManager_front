import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css';
import './index.css'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Error404 from './pages/errors/Error404.jsx'
import App from './App.jsx'
import Login from './pages/auth/Login.jsx'
import Error500 from './pages/errors/Error500.jsx'
import { AuthProvider } from './context/AuthProvider.jsx';

const router = createBrowserRouter(
  [
    {
      path: '/',
      children: [
        {
          index: true,
          element: <App />,
          errorElement: <Error500 />
        },
        {
          path: '/login',
          element: <Login />,
          errorElement: <Error500 />
        },
        {
          path: '*',
          element: <Error404 />
        }
      ]
    }
  ]
);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router}></RouterProvider>
    </AuthProvider>
  </StrictMode>
)
