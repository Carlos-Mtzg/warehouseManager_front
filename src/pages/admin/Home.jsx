import React, { useEffect, useState } from 'react';
import styles from '../../assets/css/admin/admin.module.css';
import ProductChart from '../../components/charts/ProductChart';
import ProductGauge from '../../components/charts/ProductGauge';
import StockMoney from '../../components/charts/StockMoney';
import ProductEntriesGauge from '../../components/charts/ProductEntriesGauge';
import ProductOutGauge from '../../components/charts/ProductOutGauge';
import AxiosClient from '../../config/axios-client';
import { Link } from 'react-router-dom';

const Home = () => {
  const [userName, setUserName] = useState('');
  const [lastname, setLastname] = useState('');
  const userUuid = localStorage.getItem('uuid');

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const response = await AxiosClient.get(`/user/${userUuid}`);
        setUserName(response.name);
        setLastname(response.lastname);
      } catch (error) {
        console.error('Error al obtener el nombre del usuario:', error);
      }
    };

    if (userUuid) {
      fetchUserName();
    }
  }, [userUuid]);

  return (
    <div className="container mx-auto p-4">
      <h1 className={`font-bold mb-4 text-2xl ${styles['title']}`}>Hola, {userName} {lastname}</h1>

      <div className="mb-4 d-flex justify-content-between">
      <Link to="/product-entries" className={`rounded ${styles['submit-btn']}`}>
          Registrar entrada
        </Link>
        <button className={`rounded ${styles['submit-btn']}`}>Registrar salida</button>
      </div>

      <div className="row">
        <div className="col-12 col-md-3 mb-4">
          <div className="bg-card p-4 rounded shadow" style={{ height: '250px' }}>
            <ProductGauge />
          </div>
        </div>
        <div className="col-12 col-md-3 mb-4">
          <div className="bg-card p-4 rounded shadow" style={{ height: '250px' }}>
            <StockMoney />
          </div>
        </div>
        <div className="col-12 col-md-3 mb-4">
          <div className="bg-card p-4 rounded shadow" style={{ height: '250px' }}>
            <ProductOutGauge />
          </div>
        </div>
        <div className="col-12 col-md-3 mb-4">
          <div className="bg-card p-4 rounded shadow" style={{ height: '250px' }}>
            <ProductEntriesGauge />
          </div>
        </div>
      </div>

      <div className="bg-card p-4 rounded shadow" style={{ height: '350px' }}>
        <ProductChart />
      </div>
    </div>
  );
};

export default Home;
