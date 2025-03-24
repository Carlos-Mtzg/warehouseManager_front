import styles from '../assets/css/sidebar.module.css';
import { Outlet, Link } from 'react-router-dom';
import { useContext } from 'react';
import Header from './Header';
import AuthContext from '../context/AuthProvider';

const Layout = () => {
  const { handleLogout } = useContext(AuthContext);
  return (
    <div className={`${styles['content']}`}>
      <Header />
      <div className={`${styles['wrapper']}`}>
        <aside className={`${styles['sidebar']}`}>
          <ul className={`${styles['sidebar-nav']}`}>
            <li className={`${styles['sidebar-item']}`}>
              <Link to="/" className={`${styles['sidebar-link']}`}>
                <i className="bi bi-grid me-3"></i>
                <span>Inicio</span>
              </Link>
            </li>
            <li className={`${styles['sidebar-item']}`}>
              <Link to="/requests" className={`${styles['sidebar-link']}`}>
                <i className="bi bi-building-add me-3"></i>
                <span>Entradas</span>
              </Link>
            </li>
            <li className={`${styles['sidebar-item']}`}>
              <Link to="/" className={`${styles['sidebar-link']}`}>
                <i className="bi bi-building-dash me-3"></i>
                <span>Salidas</span>
              </Link>
            </li>
            <li className={`${styles['sidebar-item']}`}>
              <Link
                to="/requestsSelected"
                className={`${styles['sidebar-link']}`}
              >
                <i className="bi bi-person-plus me-3"></i>
                <span>Usuarios</span>
              </Link>
            </li>
            <li className={`${styles['sidebar-item']}`}>
              <Link
                to="/requestsSelected"
                className={`${styles['sidebar-link']}`}
              >
                <i className="bi bi-person-fill me-3"></i>
                <span>Mi Perfil</span>
              </Link>
            </li>
          </ul>
          <div className={styles['sidebar-footer']}>
            <Link
              onClick={handleLogout}
              to="#"
              className={`${styles['sidebar-link']} ${styles['sign-out']}`}
            >
              <i className="bi bi-box-arrow-left me-3"></i>
              <span>Cerrar Sesión</span>
            </Link>
          </div>
        </aside>
        <div className={`p-4 overflow-auto ${styles['main']}`}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
