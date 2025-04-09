import React from 'react';
import styles from '../../assets/css/users.module.css';
import EntriesList from '../../components/EntriesList';

const Entries = () => {
  return (
    <div className="bg-transparent rounded shadow-sm p-4 slide-up">
      <h1 className={`${styles['title']}`}>Gestión de entradas</h1>
      <EntriesList />
    </div>
  );
};

export default Entries;