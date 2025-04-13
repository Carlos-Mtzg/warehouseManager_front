import React, { useState, useEffect } from 'react';
import styles from './../assets/css/users.module.css';
import AxiosClient from './../config/axios-client';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { handleConfirm, handleError, handleSuccess } from '../utils/simpleAlerts';
const API_URL = import.meta.env.VITE_API_URL_LOCAL;

const OutsList = () => {
  const [outs, setOuts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [outsPerPage] = useState(5);
  const navigate = useNavigate();

  const fetchOuts = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      const role = localStorage.getItem('role');
      const uuid = localStorage.getItem('uuid');
      let endpoint = 'productOut/';
      if (role !== 'ROLE_ADMIN') {
        endpoint = `productOut/user/${uuid}`;
      }

      const response = await AxiosClient.get(`${API_URL}${endpoint}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setOuts(response.data);

      if (response.data.length <= 0) {
        Swal.fire({
          icon: 'info',
          title: 'No hay salidas',
          text: 'No hay registro de ninguna salida para mostrar',
          showConfirmButton: false,
          timer: 2000
        }).then(() => {
          navigate('/product-out')
        })
      }
    } catch (error) {
      handleError('Error', 'Ocurrió un error inesperado.');
    }
  };

  useEffect(() => {
    fetchOuts();
  }, []);

  const indexOfLastOut = currentPage * outsPerPage;
  const indexOfFirstOut = indexOfLastOut - outsPerPage;
  const currentOuts = outs.slice(indexOfFirstOut, indexOfLastOut);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleCancelOut = async (outId) => {
    const confirmed = await handleConfirm(
      '¿Estás seguro de cancelar esta salida?',
      'Esta acción no se puede deshacer.'
    );

    if (confirmed) {
      try {
        const token = localStorage.getItem('accessToken');
        await AxiosClient.delete(`productOut/${outId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        handleSuccess(
          'Cancelado',
          'La salida ha sido cancelada exitosamente.',
          null,
          fetchOuts
        )
      } catch (error) {
        handleError('Error', 'No se pudo cancelar la salida.');
      }
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleString('es-MX', options);
  };

  return (
    <div className="table-responsive slide-in-right">
      <table className={`table table-bordered table-hover table-striped ${styles['table-custom']}`}>
        <thead className='text-center'>
          <tr>
            <th>Cantidad</th>
            <th>Unidad de Medida</th>
            <th>Producto</th>
            <th>Monto Total</th>
            <th>Fecha</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody className='text-center'>
          {currentOuts.map((out) => (
            <tr key={out.uuid}>
              <td>{out.quantity}</td>
              <td>{out.measurementUnit}</td>
              <td>{out.productName}</td>
              <td>${out.totalAmount}</td>
              <td>{formatDate(out.outDate)}</td>
              <td>
                <button
                  className={`text-danger ${styles['btn-custom']}`}
                  onClick={() => handleCancelOut(out.uuid)}
                >
                  <i className="bi bi-trash"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="d-flex justify-content-center mt-4">
        {Array.from(
          { length: Math.ceil(outs.length / outsPerPage) },
          (_, index) => (
            <button
              key={index + 1}
              className={`${styles['btn-custom']} ${currentPage === index + 1 ? styles['active-page'] : ''}`}
              onClick={() => paginate(index + 1)}
            >
              {index + 1}
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default OutsList;