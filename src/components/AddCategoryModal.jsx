import PropTypes from 'prop-types'
import Swal from 'sweetalert2'
import { useState } from 'react'
import { Modal } from 'react-bootstrap'
import { addCategorySchema } from '../validations/entriesValidation'
import { useFormik } from 'formik'
import { createCategory } from '../services/ApiEntries'
import styles from '../assets/css/entries.module.css'

const AddCategoryModal = ({ show, handleClose, onCategoryAdded }) => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const validationSchema = addCategorySchema

  const {
    handleSubmit,
    handleChange,
    handleBlur,
    values,
    errors,
    touched,
    resetForm,
  } = useFormik({
    initialValues: {
      categoryName: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        setIsSubmitting(true)
        const response = await createCategory(values.categoryName)

        if (response.status === 409) {
          Swal.fire({
            title: 'Error',
            text: 'Parece que ya hay una categoría registrada con ese nombre',
            icon: 'error',
            showConfirmButton: false,
            timer: 2000,
          })
        } else if (response.status === 'OK' || response.state === 'success') {
          Swal.fire({
            title: 'Registro correcto',
            text: 'Categoría creada correctamente',
            icon: 'success',
            showConfirmButton: false,
            timer: 2000,
          }).then(() => {
            resetForm()
            handleClose()
            if (onCategoryAdded) onCategoryAdded()
          })
        } else {
          Swal.fire({
            title: 'Error',
            text: response.message || 'Ocurrió un error',
            icon: 'error',
            showConfirmButton: false,
            timer: 2000,
          })
        }
      } catch (error) {
        Swal.fire({
          title: 'Error',
          text: 'Ocurrió un error inesperado',
          icon: 'error',
          showConfirmButton: false,
          timer: 2000,
        })
      } finally {
        setIsSubmitting(false)
      }
    },
  })

  const handleCancel = () => {
    resetForm()
    handleClose()
  }

  return (
    <Modal
      show={show}
      onHide={handleCancel}
      centered
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header className={`modal-title fs-5 ${styles['modal-header']}`}>
        <h3>Agregar Categoría</h3>
      </Modal.Header>
      <form onSubmit={handleSubmit}>
        <Modal.Body className="p-4 rounded">
          <div className="form-group">
            <label
              htmlFor="name"
              className={`form-label fw-semibold ${styles['label']}`}
            >
              Nueva Categoría:
            </label>
            <input
              type="text"
              id="categoryName"
              name="categoryName"
              value={values.categoryName}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`form-control py-3 ${
                touched.categoryName && errors.categoryName ? 'is-invalid' : ''
              }`}
              placeholder="Escribe aquí el nombre de la categoría"
            />
            {touched.categoryName && errors.categoryName && (
              <div className="text-danger mt-1" style={{ fontSize: '15px' }}>
                {errors.categoryName}
              </div>
            )}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button
            className={`rounded ${styles['secondary-btn']}`}
            onClick={handleCancel}
            type="button"
          >
            <div
              className={`btn d-flex text-center ${styles['secondary-content']}`}
            >
              Cancelar
            </div>
            <span></span>
          </button>
          <button
            className={`rounded ${styles['primary-btn']}`}
            type="submit"
            disabled={isSubmitting}
          >
            <div
              className={`btn d-flex text-center ${styles['primary-content']}`}
            >
              {isSubmitting ? 'Cargando...' : 'Confirmar'}
            </div>
            <span></span>
          </button>
        </Modal.Footer>
      </form>
    </Modal>
  )
}

AddCategoryModal.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  onCategoryAdded: PropTypes.func,
}

export default AddCategoryModal
