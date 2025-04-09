import React, { useEffect, useState } from 'react';
import styles from '../../assets/css/admin/admin.module.css';
import ProductChart from '../../components/charts/ProductChart';
import ProductGauge from '../../components/charts/ProductGauge';
import StockMoney from '../../components/charts/StockMoney';
import ProductEntriesGauge from '../../components/charts/ProductEntriesGauge';
import ProductOutGauge from '../../components/charts/ProductOutGauge';
import AxiosClient from '../../config/axios-client';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [userName, setUserName] = useState('');
  const [lastname, setLastname] = useState('');
  const userUuid = localStorage.getItem('uuid');
  const navigate = useNavigate();

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
      <div className="slide-in-right">
        <div className="mb-4 d-flex align-items-center gap-3">
          <h1 className={`font-bold text-2xl me-auto ${styles['title']}`}>Bienvenido, {userName} {lastname}</h1>
          <button
            className={`rounded ${styles['submit-btn']}`}
            type='button'
            onClick={() => navigate('/product-entries')}
          >
            <div className={`btn d-flex text-center ${styles['submit-content']}`}>
              Registrar Entrada<i className="bi bi-building-add ms-2"></i>
            </div>
            <span></span>
          </button>
          <button
            className={`rounded ${styles['primary-outline-btn']}`}
            type='button'
            onClick={() => navigate('/')}
          >
            <div className={`btn d-flex text-center ${styles['primary-outline-content']}`}>
              Registrar Salida<i className="bi bi-building-dash ms-2"></i>
            </div>
            <span></span>
          </button>
        </div>
      </div>

      <div className="row slide-in-left">
        <div className={`col-12 col-md-3 mb-4`}>
          <div className={`bg-card p-4 rounded shadow ${styles['gauge-card']}`} style={{ height: '250px' }}>
            <ProductGauge />
          </div>
        </div>
        <div className={`col-12 col-md-3 mb-4`}>
          <div className={`bg-card p-4 rounded shadow ${styles['gauge-card']}`} style={{ height: '250px' }}>
            <StockMoney />
          </div>
        </div>
        <div className={`col-12 col-md-3 mb-4`}>
          <div className={`bg-card p-4 rounded shadow ${styles['gauge-card']}`} style={{ height: '250px' }}>
            <ProductOutGauge />
          </div>
        </div>
        <div className={`col-12 col-md-3 mb-4`}>
          <div className={`bg-card p-4 rounded shadow ${styles['gauge-card']}`} style={{ height: '250px' }}>
            <ProductEntriesGauge />
          </div>
        </div>
      </div>

      <div className={`bg-card p-4 rounded shadow slide-in-right ${styles['gauge-card']}`} style={{ height: '350px' }}>
        <ProductChart />
      </div>
    </div>
  );
};

export default Home;
