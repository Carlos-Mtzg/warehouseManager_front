import { useState, createContext, useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';
import Swal from 'sweetalert2';
import { getUserByUUID } from '../services/ApiUser';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const isTokenValid = (token) => !!token;

  const [auth, setAuth] = useState(() => {
    const token = localStorage.getItem('accessToken');
    return isTokenValid(token);
  });

  const [role, setRole] = useState(() => localStorage.getItem('role') || '');
  const [user, setUser] = useState(null);

  const fetchAndSetUser = async (setUser) => {
    const uuid = localStorage.getItem('uuid');
    if (uuid) {
      const response = await getUserByUUID(uuid);
      if (response.state === 'success') {
        setUser(response.user);
      }
    }
  };

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    setAuth(isTokenValid(accessToken));
    setRole(localStorage.getItem('role') || '');

    fetchAndSetUser(setUser);
  }, []);

  const handleLogin = async (accessToken, role, uuid) => {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('role', role);
    localStorage.setItem('uuid', uuid);
    setAuth(true);
    setRole(role);

    const response = await getUserByUUID(uuid);
    if (response.state === 'success') {
      setUser(response.user);
    } else {
      console.error('Error al cargar la información del usuario después del login');
    }
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
        setRole('');
        setUser(null);
      }
    });
  };

  const updateUser = async () => {
    await fetchAndSetUser(setUser);
  };


  const contextValue = useMemo(
    () => ({ auth, role, user, handleLogin, handleLogout, updateUser }),
    [auth, role, user]
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
