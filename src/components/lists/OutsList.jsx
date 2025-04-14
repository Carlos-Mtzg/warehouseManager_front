import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './../../assets/css/users.module.css';
import AxiosClient from './../../config/axios-client.js';
import Swal from 'sweetalert2';

const API_URL = import.meta.env.VITE_API_URL_LOCAL;

const OutsList = () => {
  const navigate = useNavigate();
  const [groupedOuts, setGroupedOuts] = useState([]);
  const [sortOrder, setSortOrder] = useState('desc');
  const [expandedGroups, setExpandedGroups] = useState([]);
  const [currentGroupPage, setCurrentGroupPage] = useState(1);
  const groupsPerPage = 15;
  const [entryPages, setEntryPages] = useState({});
  const outsPerGroup = 5;

  const fetchOuts = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      const role = localStorage.getItem('role');
      const uuid = localStorage.getItem('uuid');

      let endpoint = 'productOut/grouped';
      if (role !== 'ROLE_ADMIN') {
        endpoint = `productOut/grouped/user/${uuid}`;
      }

      const response = await AxiosClient.get(`${API_URL}${endpoint}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.length <= 0) {
        Swal.fire({
          icon: 'info',
          title: 'No hay salidas',
          text: 'No has registrado ninguna salida para mostrar',
          showConfirmButton: false,
          timer: 3000
        }).then(() => {
          navigate('/product-out')
        });
        return
      }

      const sorted = [...response.data].sort((a, b) =>
        sortOrder === 'desc'
          ? new Date(b.outDate) - new Date(a.outDate)
          : new Date(a.outDate) - new Date(b.outDate)
      );

      setGroupedOuts(sorted);
    } catch (error) {
      Swal.fire('Error', 'Error al obtener las salidas.', 'error');
    }
  };

  useEffect(() => {
    fetchOuts();
  }, [sortOrder]);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleString('es-MX', options);
  };

  const toggleSortOrder = () => {
    setSortOrder(prev => (prev === 'desc' ? 'asc' : 'desc'));
  };

  const toggleGroup = (index) => {
    setExpandedGroups(prev =>
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
    setEntryPages(prev => ({ ...prev, [index]: 1 }));
  };

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
        Swal.fire('Cancelado', 'La salida ha sido cancelada exitosamente.', 'success').then(() =>
          fetchOuts()
        );
      } catch (error) {
        Swal.fire('Error', 'No se pudo cancelar la salida.', 'error');
      }
    }
  };

  const indexOfLastGroup = currentGroupPage * groupsPerPage;
  const indexOfFirstGroup = indexOfLastGroup - groupsPerPage;
  const currentGroups = groupedOuts.slice(indexOfFirstGroup, indexOfLastGroup);

  return (
    <div className="slide-in-right">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <button className={`${styles['btn-custom']} btn btn-sm`} onClick={toggleSortOrder}>
          Ver {sortOrder === 'desc' ? 'más antiguos primero' : 'más recientes primero'}
        </button>
      </div>

      {currentGroups.map((group, indexInPage) => {
        const actualIndex = indexOfFirstGroup + indexInPage;
        const isExpanded = expandedGroups.includes(actualIndex);
        const currentPage = entryPages[actualIndex] || 1;
        const outs = group.outs || [];
        const totalPages = Math.ceil(outs.length / outsPerGroup);
        const paginatedOuts = outs.slice(
          (currentPage - 1) * outsPerGroup,
          currentPage * outsPerGroup
        );

        return (
          <div key={actualIndex} className="mb-3 p-3 border rounded shadow-sm">
            <div
              className="d-flex justify-content-between align-items-center cursor-pointer"
              onClick={() => toggleGroup(actualIndex)}
              style={{ cursor: 'pointer' }}
            >
              <div>
                <strong>Productos retirados el:</strong> {formatDate(group.outDate)} <br />
                <strong>Entregado a:</strong> {group.receiverName}
              </div>
              <div>
                <i className={`bi ${isExpanded ? 'bi-chevron-up' : 'bi-chevron-down'}`} />
              </div>
            </div>

            {isExpanded && (
              <div className="table-responsive mt-3">
                <table className={`table table-bordered table-hover table-striped ${styles['table-custom']}`}>
                  <thead className="text-center">
                    <tr>
                      <th>Cantidad</th>
                      <th>Unidad de Medida</th>
                      <th>Producto</th>
                      <th>Monto Total</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="text-center">
                    {paginatedOuts.map((out) => (
                      <tr key={out.uuid}>
                        <td>{out.quantity}</td>
                        <td>{out.measurementUnit}</td>
                        <td>{out.productName}</td>
                        <td>${out.totalAmount}</td>
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

                {totalPages > 1 && (
                  <div className="d-flex justify-content-center mt-2">
                    {Array.from({ length: totalPages }, (_, i) => (
                      <button
                        key={i}
                        className={`${styles['btn-custom']} btn btn-sm mx-1 ${currentPage === i + 1 ? styles['active-page'] : ''
                          }`}
                        onClick={() => setEntryPages((prev) => ({ ...prev, [actualIndex]: i + 1 }))}
                      >
                        {i + 1}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}

      <div className="d-flex justify-content-center mt-4">
        {Array.from({ length: Math.ceil(groupedOuts.length / groupsPerPage) }, (_, index) => (
          <button
            key={index + 1}
            className={`${styles['btn-custom']} mx-1 ${currentGroupPage === index + 1 ? styles['active-page'] : ''
              }`}
            onClick={() => setCurrentGroupPage(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default OutsList;
