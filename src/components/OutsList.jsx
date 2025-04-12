import React, { useState, useEffect } from 'react';
import styles from './../assets/css/users.module.css';
import AxiosClient from './../config/axios-client';
import Swal from 'sweetalert2';
const API_URL = import.meta.env.VITE_API_URL_LOCAL;

const OutsList = () => {
  const [outs, setOuts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [outsPerPage] = useState(5);

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
    } catch (error) {
        Swal.fire({
          icon: 'info',
          title: 'No hay salidas',
          text: 'No has registrado ninguna salida para mostrar',
          confirmButtonColor: '#16423C',
      });
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
    const result = await Swal.fire({
      title: '¿Estás seguro de cancelar esta salida?',
      text: 'Esta acción no se puede deshacer.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#16423C',
      reverseButtons: true,
    });

    if (result.isConfirmed) {
      try {
        const token = localStorage.getItem('accessToken');
        await AxiosClient.delete(`productOut/${outId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        Swal.fire(
          'Cancelado',
          'La salida ha sido cancelada exitosamente.',
          'success'
        ).then(() => fetchOuts());
      } catch (error) {
        Swal.fire('Error', 'No se pudo cancelar la salida.', 'error');
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