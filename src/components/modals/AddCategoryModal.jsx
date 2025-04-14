import PropTypes from 'prop-types'
import { useState } from 'react'
import { Modal } from 'react-bootstrap'
import { addCategorySchema } from '../../validations/entriesValidation.js'
import { useFormik } from 'formik'
import { createCategory } from '../../services/ApiEntries.jsx'
import { handleError, handleSuccess } from '../../utils/simpleAlerts.js';
import styles from '../../assets/css/entries.module.css'
import PrimaryButton from '../buttons/PrimaryButton.jsx'
import PrimaryOutlineButton from '../buttons/PrimaryOutlineButton.jsx'

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
        setIsSubmitting(true);
        const response = await createCategory(values.categoryName);

        if (response.status === 409) {
          handleClose()
          handleError(
            'Error',
            'Parece que ya hay una categoría registrada con ese nombre',
          );
          resetForm();
        } else if (response.status === 'OK' || response.state === 'success') {
          handleClose()
          handleSuccess(
            'Registro correcto',
            'Categoría creada correctamente',
            resetForm,
            onCategoryAdded
          );
        } else {
          handleError('Error', response.message || 'Error desconocido');
        }
      } catch (error) {
        handleClose()
        handleError('Error', 'Ocurrió un error inesperado');
      } finally {
        setIsSubmitting(false);
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
              className={`form-control py-3 ${touched.categoryName && errors.categoryName ? 'is-invalid' : ''
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
          <PrimaryOutlineButton
            text="Cancelar"
            type="button"
            onClick={handleCancel}
            className="px-3"
          />
          <PrimaryButton
            text="Confirmar"
            type="submit"
            disabled={isSubmitting}
            loading={isSubmitting}
            className="px-3"
          />
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
