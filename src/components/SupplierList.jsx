import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import styles from '../assets/css/users.module.css'
import AxiosClient from '../config/axios-client'

const SupplierList = ({ refresh }) => {
  const [suppliers, setSuppliers] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchSuppliers()
  }, [refresh])

  const fetchSuppliers = async () => {
    try {
      const response = await AxiosClient.get('supplier/')
      if (response) {
        setSuppliers(response.data)
        setError(null)
      } else {
        throw new Error(response.message || 'Error al obtener proveedores')
      }
    } catch (err) {
      setError(err.message || 'Error inesperado al cargar proveedores')
    }
  }

  const deleteSupplier = async (uuid) => {
    const result = await Swal.fire({
      title: '¿Eliminar proveedor?',
      text: 'Esta acción no se puede deshacer.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#16423C',
      reverseButtons: true,
      allowOutsideClick: false,
    })

    if (result.isConfirmed) {
      try {
        const response = await AxiosClient.delete(`supplier/${uuid}`)
        if (response.state === 'success') {
          Swal.fire({
            title: 'Proveedor eliminado',
            icon: 'success',
            showConfirmButton: false,
            timer: 2000,
          }).then(fetchSuppliers)
        } else {
          throw new Error(
            response.message || 'No se pudo eliminar el proveedor'
          )
        }
      } catch (error) {
        Swal.fire('Error', error.message, 'error')
      }
    }
  }

  return (
    <div>
      {error && (
        <div className="alert alert-danger">
          <i className="bi bi-exclamation-circle me-2"></i>
          {error}
        </div>
      )}
      <div className="table-responsive">
        <table
          className={`table table-bordered table-hover table-striped ${styles['table-custom']}`}
        >
          <thead>
            <tr>
              <th className="text-center">#</th>
              <th className="text-center">Nombre</th>
              <th className="text-center">Correo electrónico</th>
              <th className="text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(suppliers) && suppliers.length > 0 ? (
              suppliers.map((supplier, index) => (
                <tr key={supplier.id}>
                  <td className="text-center">{index + 1}</td>
                  <td className="text-center">{supplier.name}</td>
                  <td className="text-center">{supplier.email}</td>
                  <td className="text-center d-flex justify-content-center gap-3">
                    <button
                      className={`text-danger ${styles['btn-custom']}`}
                      onClick={() => deleteSupplier(supplier.uuid)}
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center">
                  No hay proveedores disponibles
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

SupplierList.propTypes = {
  refresh: PropTypes.bool.isRequired,
  onEditSupplier: PropTypes.func.isRequired,
}

export default SupplierList
