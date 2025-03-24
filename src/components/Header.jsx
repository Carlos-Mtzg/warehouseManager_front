import React from 'react';

import styles from '../assets/css/header.module.css';
import logo from '../assets/images/logo-blanco.png';

const Header = () => {
  return (
    <header
      className={`d-flex align-items-center py-2 gap-2 ${styles['header']}`}
    >
      <img className={`${styles['logo']}`} src={logo} alt="Logo" />
      <h1 className={`px-4 ${styles['title']}`}>Warehouse Manager</h1>
    </header>
  );
};

export default Header;
