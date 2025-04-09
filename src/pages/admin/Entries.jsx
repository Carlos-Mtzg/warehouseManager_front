import React from 'react';
import styles from '../../assets/css/users.module.css';
import EntriesList from '../../components/EntriesList';

const Entries = () => {
  return (
    <div className="p-4">
      <h1 className={`${styles['title']} mb-3 slide-in-left`}>Gestión de entradas</h1>
      <EntriesList />
    </div>
  );
};

export default Entries;