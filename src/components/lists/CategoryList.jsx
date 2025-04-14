import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import styles from '../../assets/css/users.module.css'
import {
  deleteCategory,
  getAllCategories,
} from '../../services/ApiCategories.jsx'
import {
  handleConfirm,
  handleError,
  handleSuccess,
} from '../../utils/simpleAlerts.js'

const CategoryList = ({ refresh, searchTerm }) => {
  const [categories, setCategories] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchCategories()
  }, [refresh])

  const fetchCategories = async () => {
    const result = await getAllCategories()
    if (result.state === 'success') {
      setCategories(result.data)
      setError(null)
    } else {
      setError(result.message)
    }
  }

  const handleDeleteCategory = async (uuid) => {
    const confirmed = await handleConfirm(
      '¿Eliminar categoría?',
      'Esta acción no se puede deshacer.'
    )

    if (confirmed) {
      const response = await deleteCategory(uuid)
      if (response.status === 409) {
        handleError(
          'Operación no permitida',
          `Esta categoría no puede eliminarse porque está asociada a una o más entradas.`
        )
      } else if (response.state === 'success') {
        handleSuccess(
          'Categoria eliminada',
          'La categoría ha sido eliminada correctamente',
          null,
          fetchCategories
        )
      } else {
        handleError('Error', 'No se pudo eliminar la categoría')
      }
    }
  }

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="slide-in-right">
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
              <th className="text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(filteredCategories) &&
            filteredCategories.length > 0 ? (
              filteredCategories.map((category, index) => (
                <tr key={category.id}>
                  <td className="text-center">{index + 1}</td>
                  <td className="text-center">{category.name}</td>
                  <td className="text-center d-flex justify-content-center gap-3">
                    <button
                      className={`text-danger ${styles['btn-custom']}`}
                      onClick={() => handleDeleteCategory(category.uuid)}
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center">
                  No hay categorías disponibles
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

CategoryList.propTypes = {
  refresh: PropTypes.bool.isRequired,
  searchTerm: PropTypes.string.isRequired, 
}

export default CategoryList
