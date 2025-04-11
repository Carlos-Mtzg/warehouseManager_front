import styles from '../assets/css/sidebar.module.css';
import { Outlet, Link } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';
import Header from './Header';
import AuthContext from '../context/AuthProvider';
import UserCard from './UserCard';
import { getUserByUUID } from '../services/ApiUser';

const Layout = () => {
  const { handleLogout, role } = useContext(AuthContext);
  const [user, setUser] = useState(null);

  const loadUser = async () => {
    const uuid = localStorage.getItem('uuid');
    const response = await getUserByUUID(uuid);
    if (response.state === 'success') {
      setUser(response.user);
    } else {
      console.error('Error al cargar la información del usuario');
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <div className={`${styles['content']}`}>
      <Header />
      <div className={`${styles['wrapper']}`}>
        <aside className={`${styles['sidebar']} slide-in-left`}>
          <ul className={`${styles['sidebar-nav']}`}>
            <li className={`${styles['sidebar-item']}`}>
              <Link
                to={role === 'ROLE_ADMIN' ? '/admin/' : '/product-entries'}
                className={`${styles['sidebar-link']}`}
              >
                <i className="bi bi-grid me-3"></i>
                <span>Inicio</span>
              </Link>
            </li>
            <li className={`${styles['sidebar-item']}`}>
              <Link href="#" className={`${styles['sidebar-link']} collapsed d-flex`} data-bs-target="#entries" data-bs-toggle="collapse" aria-expanded="false">
                <i className="bi bi-building-add me-3"></i>
                <span>Entradas</span>
              </Link>
              <ul id="entries" className="sidebar-dropdown list-unstyled collapse">
                <Link
                  to="/product-entries"
                  className={`fw-light ${styles['sidebar-ul-link']}`}
                >
                  <span><i className="bi bi-arrow-right-short me-2"></i>Registrar Entrada</span>
                </Link>
                <Link
                  to="/categories"
                  className={`fw-light ${styles['sidebar-ul-link']}`}
                >
                  <span><i className="bi bi-arrow-right-short me-2"></i>Gestión de Categorías</span>
                </Link>
                <Link
                  to="#"
                  className={`fw-light ${styles['sidebar-ul-link']}`}
                >
                  <span><i className="bi bi-arrow-right-short me-2"></i>Gestión de Proveedores</span>
                </Link>
              </ul>
            </li>
            <li className={`${styles['sidebar-item']}`}>
              <Link to="#" className={`${styles['sidebar-link']}`}>
                <i className="bi bi-building-dash me-3"></i>
                <span>Salidas</span>
              </Link>
            </li>
            {role === 'ROLE_ADMIN' && (
              <li className={`${styles['sidebar-item']}`}>
                <Link
                  to="/admin/user-management"
                  className={`${styles['sidebar-link']}`}
                >
                  <i className="bi bi-person-plus me-3"></i>
                  <span>Usuarios</span>
                </Link>
              </li>
            )}
            <li className={`${styles['sidebar-item']}`}>
              <Link to="/entries" className={`${styles['sidebar-link']}`}>
                <i className="bi bi-building-add me-3"></i>
                <span>Entradas registradas</span>
              </Link>
            </li>
            {role === "ROLE_USER" && (
              <li className={`${styles['sidebar-item']}`}>
                <Link
                  to="/user/my-profile"
                  className={`${styles['sidebar-link']}`}
                >
                  <i className="bi bi-person-fill me-3"></i>
                  <span>Mi Perfil</span>
                </Link>
              </li>
            )}
          </ul>
          <div className="px-3 mb-5">
            <UserCard user={user} loadUser={loadUser} />
          </div>
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
        <div className={`p-4 overflow-auto ${styles['main']}`} style={{ height: 'calc(95vh - 80px)', overflowY: 'auto' }}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
