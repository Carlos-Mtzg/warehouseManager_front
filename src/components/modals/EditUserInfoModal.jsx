import React, { useState } from 'react';
import { useFormik } from 'formik';
import PropTypes from 'prop-types';
import { Modal } from 'react-bootstrap';
import styles from '../../assets/css/users.module.css';
import { editUserInfoSchema } from '../../validations/userValidations.js';
import { updateInfoUser } from '../../services/ApiUser.jsx';
import { handleSuccess, handleError } from '../../utils/simpleAlerts.js'
import PrimaryOutlineButton from '../buttons/PrimaryOutlineButton.jsx';
import PrimaryButton from '../buttons/PrimaryButton.jsx';

const EditUserInfoModal = ({ user, handleClose, onUserUpdated }) => {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const validationSchema = editUserInfoSchema;

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
            name: user.name || '',
            lastname: user.lastname || '',
        },
        validationSchema,
        onSubmit: async (values) => {
            try {
                setIsSubmitting(true);
                const response = await updateInfoUser(user.uuid, values.name, values.lastname);

                if (response.state === 'success') {
                    handleClose()
                    handleSuccess(
                        'Actualización Correcta',
                        'Tu información se actualizó correctamente',
                        resetForm,
                        onUserUpdated
                    );
                } else {
                    handleClose()
                    handleError('Error', 'Ocurrió un error inesperado');
                }
            } catch (error) {
                handleClose()
                handleError('Error', 'Ocurrió un error inesperado');
            } finally {
                setIsSubmitting(false);
            }
        },
    });

    const handleCancel = () => {
        resetForm();
        handleClose();
    };

    return (
        <Modal show={true} onHide={handleCancel} centered backdrop="static" keyboard={false}>
            <Modal.Header className={`modal-title fs-5 ${styles['modal-header']}`}>
                <h3>Editar mi Información</h3>
            </Modal.Header>
            <form onSubmit={handleSubmit}>
                <Modal.Body className="p-4 rounded">
                    <div className="d-flex flex-column gap-3">
                        <div className="form-group">
                            <label
                                htmlFor="name"
                                className={`form-label fw-semibold ${styles['label']}`}
                            >
                                Nombre(s):
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={values.name}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={`form-control py-3 ${touched.name && errors.name ? 'is-invalid' : ''}`}
                                placeholder="Escribe aquí el nombre"
                            />
                            {touched.name && errors.name && (
                                <div className="text-danger mt-1" style={{ fontSize: '15px' }}>
                                    {errors.name}
                                </div>
                            )}
                        </div>
                        <div className="form-group">
                            <label
                                htmlFor="lastname"
                                className={`form-label fw-semibold ${styles['label']}`}
                            >
                                Apellido(s):
                            </label>
                            <input
                                type="text"
                                id="lastname"
                                name="lastname"
                                value={values.lastname}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={`form-control py-3 ${touched.lastname && errors.lastname ? 'is-invalid' : ''}`}
                                placeholder="Escribe aquí el apellido"
                            />
                            {touched.lastname && errors.lastname && (
                                <div className="text-danger mt-1" style={{ fontSize: '15px' }}>
                                    {errors.lastname}
                                </div>
                            )}
                        </div>
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
    );
};

EditUserInfoModal.propTypes = {
    user: PropTypes.object.isRequired,
    handleClose: PropTypes.func.isRequired,
    onUserUpdated: PropTypes.func.isRequired,
};

export default EditUserInfoModal;