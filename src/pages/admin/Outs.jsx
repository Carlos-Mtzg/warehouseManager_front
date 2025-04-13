import React from 'react';
import styles from '../../assets/css/users.module.css';
import OutsList from '../../components/OutsList';

const Entries = () => {
  return (
    <div className="p-4">
      <h1 className={`${styles['title']} mb-3 slide-in-left`}>Gestión de Salidas</h1>
      <OutsList />
    </div>
  );
};

export default Entries;