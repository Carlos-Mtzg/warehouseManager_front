import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import styles from '../assets/css/users.module.css'
import { getAllSuppliers, deleteSupplier } from '../services/ApiSupplier'

const SupplierList = ({ refresh }) => {
  const [suppliers, setSuppliers] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchSuppliers()
  }, [refresh])

  const fetchSuppliers = async () => {
    const result = await getAllSuppliers()
    if (result.state === 'success') {
      setSuppliers(result.data)
      setError(null)
    } else {
      setError(result.message)
    }
  }

  const handleDeleteSupplier = async (uuid) => {
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
      const response = await deleteSupplier(uuid)
      if (response.state === 'success') {
        await Swal.fire({
          title: 'Proveedor eliminado',
          text: 'El proveedor ha sido eliminado correctamente',
          icon: 'success',
          showConfirmButton: false,
          timer: 2000,
        })
        fetchSuppliers()
      } else {
        Swal.fire(
          'Error',
          response.message || 'No se pudo eliminar el proveedor',
          'error'
        )
      }
    }
  }

  return (
    <div className='slide-in-right'>
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
              <th className="text-center">Correo</th>
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
                      onClick={() => handleDeleteSupplier(supplier.uuid)}
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
}

export default SupplierList
