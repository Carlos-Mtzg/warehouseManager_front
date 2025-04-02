import { Navigate, Outlet } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../context/AuthProvider';

const PrivateRoute = () => {
  const { auth } = useContext(AuthContext);

  return auth ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
