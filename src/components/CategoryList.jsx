import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import styles from '../assets/css/users.module.css'
import AxiosClient from '../config/axios-client'

const CategoryList = ({ refresh, onEditCategory }) => {
  const [categories, setCategories] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchCategories()
  }, [refresh])

  const fetchCategories = async () => {
    try {
      const response = await AxiosClient.get('category/')
      console.log(response.data)
      if (response) {
        setCategories(response.data)
        setError(null)
      } else {
        throw new Error(response.message || 'Error al obtener categorías')
      }
    } catch (err) {
      setError(err.message || 'Error inesperado al cargar categorías')
    }
  }

  const deleteCategory = async (uuid) => {
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
      try {
        const response = await AxiosClient.delete(`category/${uuid}`)

        if (response.state === 'success') {
          Swal.fire({
            title: 'Categoría eliminada',
            icon: 'success',
            showConfirmButton: false,
            timer: 2000,
          }).then()
        } else {
          fetchCategories
          throw new Error(
            response.message || 'No se pudo eliminar la categoría'
          )
        }
      } catch (error) {
        Swal.fire(
          'Error',
          error.message || 'Ocurrió un error inesperado',
          'error'
        )
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
                      onClick={() => deleteCategory(category.uuid)}
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
  onEditCategory: PropTypes.func.isRequired,
}

export default CategoryList
