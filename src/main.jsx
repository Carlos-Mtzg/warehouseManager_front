import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Error404 from './pages/errors/Error404.jsx'
import App from './App.jsx'

const router = createBrowserRouter(
  [
    {
      path: '/',
      children: [
        {
          index: true,
          element: <App />
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
    <RouterProvider router={router}></RouterProvider>
  </StrictMode>,
)
