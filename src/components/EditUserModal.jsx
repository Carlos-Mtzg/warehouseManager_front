import { useFormik } from 'formik';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'react-bootstrap';
import { updateUser } from '../services/ApiUser';
import Swal from 'sweetalert2';
import styles from '../assets/css/users.module.css';
import { editUserSchema } from '../validations/userValidations';

const EditUserModal = ({ show, handleClose, user, onUserUpdated }) => {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const validationSchema = editUserSchema;

    const formik = useFormik({
        initialValues: {
            name: user.name || '',
            lastname: user.lastname || '',
            role: user.role.name === 'ROLE_ADMIN' ? 'admin' : user.role.name === 'ROLE_USER' ? 'user' : '',
        },
        validationSchema,
        enableReinitialize: true,
        onSubmit: async (values) => {
            try {
                setIsSubmitting(true);

                const roleMapping = {
                    admin: 1,
                    user: 2,
                };

                const requestBody = {
                    name: values.name,
                    lastname: values.lastname,
                    role: {
                        id: roleMapping[values.role],
                    },
                };

                const response = await updateUser(user.uuid, requestBody.name, requestBody.lastname, requestBody.role);
                if (response.state === 'success') {
                    handleClose();
                    Swal.fire({
                        title: 'Usuario actualizado',
                        text: 'La información del usuario se actualizó correctamente',
                        icon: 'success',
                        showConfirmButton: false,
                        timer: 2000
                    }).then(() => {
                        formik.resetForm();
                        onUserUpdated();
                    });
                } else {
                    Swal.fire({
                        title: 'Error',
                        text: 'Ocurrió un error inesperado',
                        icon: 'error',
                        showConfirmButton: false,
                        timer: 2000
                    })
                }
            } catch (error) {
                Swal.fire({
                    title: 'Error',
                    text: 'Ocurrió un error inesperado',
                    icon: 'error',
                    showConfirmButton: false,
                    timer: 2000
                })
            } finally {
                setIsSubmitting(false);
            }
        },
    });

    const handleCancel = () => {
        formik.resetForm();
        handleClose();
    };

    return (
        <Modal show={show} onHide={handleClose} centered backdrop="static" keyboard={false}>
            <Modal.Header className={`modal-title fs-5 ${styles['modal-header']}`}>
                <h3>Editar Usuario</h3>
            </Modal.Header>
            <form onSubmit={formik.handleSubmit}>
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
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className={`form-control py-3 ${formik.touched.name && formik.errors.name ? 'is-invalid' : ''}`}
                                placeholder="Escribe aquí el nombre"
                            />
                            {formik.touched.name && formik.errors.name ? (
                                <div className="text-danger mt-1" style={{ fontSize: '15px' }}>
                                    {formik.errors.name}
                                </div>
                            ) : null}
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
                                value={formik.values.lastname}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className={`form-control py-3 ${formik.touched.lastname && formik.errors.lastname ? 'is-invalid' : ''}`}
                                placeholder="Escribe aquí el apellido"
                            />
                            {formik.touched.lastname && formik.errors.lastname ? (
                                <div className="text-danger mt-1" style={{ fontSize: '15px' }}>
                                    {formik.errors.lastname}
                                </div>
                            ) : null}
                        </div>
                        <div className="form-group">
                            <label
                                htmlFor="role"
                                className={`form-label fw-semibold ${styles['label']}`}
                            >
                                Rol de Usuario:
                            </label>
                            <select
                                id="role"
                                name="role"
                                value={formik.values.role}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className={`form-control py-3 ${formik.touched.role && formik.errors.role ? 'is-invalid' : ''}`}
                            >
                                <option value="" disabled>
                                    Selecciona una opción
                                </option>
                                <option value="admin">Administrador</option>
                                <option value="user">Almacenista</option>
                            </select>
                            {formik.touched.role && formik.errors.role ? (
                                <div className="text-danger mt-1" style={{ fontSize: '15px' }}>
                                    {formik.errors.role}
                                </div>
                            ) : null}
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button
                        className={`rounded ${styles['secondary-btn']}`} onClick={handleCancel} type="button">
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
                            <div className={`d-flex align-items-center px-2 gap-2 ${styles['primary-content']}`} style={{ height: '37.6px' }}>
                                Cargando
                                <output
                                    className="spinner-border"
                                    style={{ height: "1.2rem", width: "1.2rem", fontSize: "10px" }}
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

EditUserModal.propTypes = {
    show: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    onUserUpdated: PropTypes.func.isRequired,
};

export default EditUserModal;