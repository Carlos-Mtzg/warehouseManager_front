import * as yup from 'yup'
import PropTypes from 'prop-types'
import { useFormik } from 'formik'
import { Modal } from 'react-bootstrap'
import styles from '../assets/css/users.module.css'
import { useState } from 'react'
import AxiosClient from '../config/axios-client'
import Swal from 'sweetalert2'

const AddCategory = ({ show, handleClose, onResetForm, onCategoryAdded }) => {
  const REQUIRED_FIELDS = 'Campo obligatorio'
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validationSchema = yup.object().shape({
    name: yup
      .string()
      .required(REQUIRED_FIELDS)
      .matches(/^[^<>]*$/, "Caracteres inválidos '<' o '>'"),
  })

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
      name: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        setIsSubmitting(true)

        const response = await AxiosClient.post('/category/', {
          name: values.name,
        })

        if (response.status === 'OK') {
          Swal.fire({
            title: 'Categoría registrada',
            icon: 'success',
            showConfirmButton: false,
            timer: 2000,
          }).then(() => {
            resetForm()
            handleClose()
            if (onCategoryAdded) onCategoryAdded()
          })
        } else {
          Swal.fire('Error', response.message || 'Ocurrió un error', 'error')
        }
      } catch (error) {
        Swal.fire('Error', 'Ocurrió un error inesperado', 'error')
      } finally {
        setIsSubmitting(false)
      }
    },
  })

  const handleCancel = () => {
    resetForm()
    onResetForm(resetForm)
    handleClose()
  }

  return (
    <Modal
      show={show}
      onHide={handleClose}
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
              Nombre de la categoría:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`form-control py-3 ${
                touched.name && errors.name ? 'is-invalid' : ''
              }`}
              placeholder="Ej. Farmacia"
            />
            {touched.name && errors.name && (
              <div className="text-danger mt-1" style={{ fontSize: '15px' }}>
                {errors.name}
              </div>
            )}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button
            className={`rounded ${styles['secondary-btn']}`}
            type="button"
            onClick={handleCancel}
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

AddCategory.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  onResetForm: PropTypes.func.isRequired,
  onCategoryAdded: PropTypes.func,
}

export default AddCategory
