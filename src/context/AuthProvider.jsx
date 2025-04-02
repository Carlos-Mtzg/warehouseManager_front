import { useState, createContext, useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';
import Swal from 'sweetalert2';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const isTokenValid = (token) => !!token;

  const [auth, setAuth] = useState(() => {
    const token = localStorage.getItem('token');
    return isTokenValid(token);
  });

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    setAuth(isTokenValid(accessToken));
  }, []);

  const handleLogin = (accessToken, role, uuid) => {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('role', role);
    localStorage.setItem('uuid', uuid);
    setAuth(true);
  };

  const handleLogout = () => {
    Swal.fire({
      title: '¿Deseas cerrar sesión?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Salir',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#16423C',
      reverseButtons: true,
      allowOutsideClick: false,
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('role');
        localStorage.removeItem('uuid');
        setAuth(false);
      }
    });
  };

  const contextValue = useMemo(
    () => ({ auth, handleLogin, handleLogout }),
    [auth]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { AuthProvider };

export default AuthContext;
