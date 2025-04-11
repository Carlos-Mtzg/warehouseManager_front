import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import styles from '../../assets/css/users.module.css'
import { deleteCategory, getAllCategories } from '../../services/ApiCategories.jsx'

const CategoryList = ({ refresh }) => {
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
    const result = await Swal.fire({
      title: '¿Eliminar categoría?',
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
      const response = await deleteCategory(uuid)
      if (response.state === 'success') {
        await Swal.fire({
          title: 'Categoría eliminada',
          text: 'La categoría ha sido eliminada correctamente',
          icon: 'success',
          showConfirmButton: false,
          timer: 2000,
        })
        fetchCategories()
      } else {
        await Swal.fire(
          'Error',
          response.message || 'No se pudo eliminar la categoría',
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
              <th className="text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(categories) && categories.length > 0 ? (
              categories.map((category, index) => (
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
}

export default CategoryList
