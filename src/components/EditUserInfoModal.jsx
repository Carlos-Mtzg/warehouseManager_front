import React, { useState } from 'react';
import { useFormik } from 'formik';
import PropTypes from 'prop-types';
import { Modal } from 'react-bootstrap';
import Swal from 'sweetalert2';
import styles from '../assets/css/users.module.css';
import { editUserInfoSchema } from '../validations/userValidations';
import { updateInfoUser } from '../services/ApiUser';

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
                    handleClose();
                    Swal.fire({
                        title: 'Actualización Correcta',
                        text: 'Tu información se actualizó correctamente',
                        icon: 'success',
                        showConfirmButton: false,
                        timer: 2000,
                    }).then(() => {
                        resetForm();
                        onUserUpdated();
                    });
                } else {
                    Swal.fire({
                        title: 'Error',
                        text: 'Ocurrió un error inesperado',
                        icon: 'error',
                        showConfirmButton: false,
                        timer: 2000,
                    });
                }
            } catch (error) {
                Swal.fire({
                    title: 'Error',
                    text: 'Ocurrió un error inesperado',
                    icon: 'error',
                    showConfirmButton: false,
                    timer: 2000,
                });
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
                    <button
                        className={`rounded ${styles['secondary-btn']}`}
                        onClick={handleCancel}
                        type="button"
                    >
                        <div className={`btn d-flex text-center ${styles['secondary-content']}`}>
                            Cancelar
                        </div>
                        <span></span>
                    </button>
                    {isSubmitting ? (
                        <button
                            className={`rounded ${styles['primary-btn']}`}
                            type="submit"
                            disabled
                        >
                            <div
                                className={`d-flex align-items-center px-2 gap-2 ${styles['primary-content']}`}
                                style={{ height: '37.6px' }}
                            >
                                Cargando
                                <output
                                    className="spinner-border"
                                    style={{ height: '1.2rem', width: '1.2rem', fontSize: '10px' }}
                                >
                                    <span className="visually-hidden"></span>
                                </output>
                            </div>
                            <span></span>
                        </button>
                    ) : (
                        <button
                            className={`rounded ${styles['primary-btn']}`}
                            type="submit"
                            disabled={isSubmitting}
                        >
                            <div className={`btn d-flex text-center ${styles['primary-content']}`}>
                                Confirmar
                            </div>
                            <span></span>
                        </button>
                    )}
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