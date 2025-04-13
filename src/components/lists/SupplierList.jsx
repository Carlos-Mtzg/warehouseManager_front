import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import styles from '../../assets/css/users.module.css'
import { getAllSuppliers, deleteSupplier } from '../../services/ApiSupplier.jsx'
import { handleError, handleSuccess, handleConfirm } from '../../utils/simpleAlerts.js'

const SupplierList = ({ refresh }) => {
  const [suppliers, setSuppliers] = useState([])

  useEffect(() => {
    fetchSuppliers()
  }, [refresh])

  const fetchSuppliers = async () => {
    const result = await getAllSuppliers()
    if (result.state === 'success') {
      setSuppliers(result.data)
    }
  }

  const handleDeleteSupplier = async (uuid) => {
    const confirmed = await handleConfirm(
      '¿Eliminar proveedor?',
      'Esta acción no se puede deshacer.'
    );

    if (confirmed) {
      const response = await deleteSupplier(uuid)
      if (response.status === 409) {
        handleError(
          'Operación no permitida',
          `Este proveedor no puede eliminarse porque está asociada a una o más entradas.`);
      } else if (response.state === 'success') {
        handleSuccess(
          'Proveedor eliminado',
          'El proveedor ha sido eliminado correctamente',
          null,
          fetchSuppliers
        );
      } else {
        handleError(
          'Error',
          'No se pudo eliminar el proveedor'
        );
      }
    }
  }

  return (
    <div className='slide-in-right'>
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
