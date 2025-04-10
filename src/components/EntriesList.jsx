import React, { useState, useEffect } from 'react';
import styles from './../assets/css/users.module.css';
import AxiosClient from './../config/axios-client';
import Swal from 'sweetalert2';

const EntriesList = () => {
  const [entries, setEntries] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage] = useState(5);

  const fetchEntries = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      const role = localStorage.getItem('role'); 
      const uuid = localStorage.getItem('uuid'); 

      let endpoint = 'productEntry/';
      if (role !== 'ROLE_ADMIN') {
        endpoint = `productEntry/user/${uuid}`; 
      }

      const response = await AxiosClient.get(endpoint, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setEntries(response.data);
    } catch (error) {
      Swal.fire('Error', 'Error al obtener las entradas.', 'error');
    }
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = entries.slice(indexOfFirstEntry, indexOfLastEntry);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleCancelEntry = async (entryId) => {
    const result = await Swal.fire({
      title: '¿Estás seguro de cancelar esta entrada?',
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
        await AxiosClient.delete(`productEntry/${entryId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        Swal.fire(
          'Cancelado',
          'La entrada ha sido cancelada exitosamente.',
          'success'
        ).then(() => fetchEntries());
      } catch (error) {
        Swal.fire('Error', 'No se pudo cancelar la entrada.', 'error');
      }
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleString('es-MX', options);
  };

  return (
    <div className="table-responsive">
      <table className={`table table-bordered table-hover table-striped ${styles['table-custom']}`}>
        <thead>
          <tr>
            <th>Cantidad</th>
            <th>Unidad de Medida</th>
            <th>Producto</th>
            <th>Monto Total</th>
            <th>Fecha</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {currentEntries.map((entry) => (
            <tr key={entry.uuid}>
              <td>{entry.quantity}</td>
              <td>{entry.measurementUnit}</td>
              <td>{entry.productName}</td>
              <td>${entry.totalAmount}</td>
              <td>{formatDate(entry.entryDate)}</td>
              <td>
                <button
                  className={`text-danger ${styles['btn-custom']}`}
                  onClick={() => handleCancelEntry(entry.uuid)}
                >
                  <i className="bi bi-trash"></i> Cancelar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="d-flex justify-content-center mt-4">
        {Array.from(
          { length: Math.ceil(entries.length / entriesPerPage) },
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

export default EntriesList;