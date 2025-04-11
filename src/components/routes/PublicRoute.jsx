import { Navigate, Outlet } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../../context/AuthProvider.jsx';

const PublicRoute = () => {
  const { auth } = useContext(AuthContext);

  return auth ? <Navigate to="/admin" replace /> : <Outlet />;
};

export default PublicRoute;
