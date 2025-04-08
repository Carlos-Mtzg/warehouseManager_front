import * as yup from 'yup'
import PropTypes from 'prop-types'
import { useFormik } from 'formik'
import { Modal } from 'react-bootstrap'
import styles from '../assets/css/users.module.css'
import { useState } from 'react'
import AxiosClient from '../config/axios-client'
import Swal from 'sweetalert2'

const AddSupplier = ({ show, handleClose, onResetForm, onSupplierAdded }) => {
  const REQUIRED = 'Campo obligatorio'
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validationSchema = yup.object().shape({
    name: yup
      .string()
      .required(REQUIRED)
      .matches(/^[^<>]*$/, "Caracteres inválidos '<' o '>'"),
    email: yup
      .string()
      .email('Correo inválido')
      .required(REQUIRED)
      .matches(/^[^<>]*$/, 'Correo inválido'),
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
      email: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        setIsSubmitting(true)

        const response = await AxiosClient.post('/supplier/', {
          name: values.name,
          email: values.email,
        })

        if (response.status === 'OK') {
          Swal.fire({
            title: 'Proveedor registrado',
            icon: 'success',
            showConfirmButton: false,
            timer: 2000,
          }).then(() => {
            resetForm()
            handleClose()
            if (onSupplierAdded) onSupplierAdded()
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
        <h3>Agregar Proveedor</h3>
      </Modal.Header>
      <form onSubmit={handleSubmit}>
        <Modal.Body className="p-4 rounded">
          <div className="form-group mb-3">
            <label
              htmlFor="name"
              className={`form-label fw-semibold ${styles['label']}`}
            >
              Nombre:
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
              placeholder="Ej. Papelería MX"
            />
            {touched.name && errors.name && (
              <div className="text-danger mt-1" style={{ fontSize: '15px' }}>
                {errors.name}
              </div>
            )}
          </div>
          <div className="form-group">
            <label
              htmlFor="email"
              className={`form-label fw-semibold ${styles['label']}`}
            >
              Correo electrónico:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`form-control py-3 ${
                touched.email && errors.email ? 'is-invalid' : ''
              }`}
              placeholder="Ej. proveedor@gmail.com"
            />
            {touched.email && errors.email && (
              <div className="text-danger mt-1" style={{ fontSize: '15px' }}>
                {errors.email}
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

AddSupplier.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  onResetForm: PropTypes.func.isRequired,
  onSupplierAdded: PropTypes.func,
}

export default AddSupplier
