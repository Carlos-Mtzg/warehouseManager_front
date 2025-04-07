import * as yup from 'yup';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import { Modal } from 'react-bootstrap';
import styles from "../assets/css/users.module.css"
import { useState } from 'react';
import { registerUser } from '../services/ApiUser';
import Swal from 'sweetalert2';

const AddUserModal = ({ show, handleClose, onResetForm, onUserAdded }) => {
    const REQUIRED_FIELDS = 'Campo obligatorio';
    const [isSubmitting, setIsSubmitting] = useState(false);

    const validationSchema = yup.object().shape({
        name: yup.string()
            .required(REQUIRED_FIELDS)
            .matches(
                /^[^<>]*$/,
                "Caracteres inválidos '<' o '>'"
            ),
        lastname: yup.string()
            .required(REQUIRED_FIELDS)
            .matches(
                /^[^<>]*$/,
                "Caracteres inválidos '<' o '>'"
            ),
        email: yup.string()
            .required(REQUIRED_FIELDS)
            .email('El correo electrónico no es válido')
            .matches(
                /^[^<>]*$/,
                "El correo electrónico no puede contener los caracteres '<' o '>'"
            ),
        role: yup.string()
            .required(REQUIRED_FIELDS),
    });

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
            lastname: '',
            email: '',
            role: '',
        },
        validationSchema,
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
                    email: values.email,
                    role: {
                        id: roleMapping[values.role],
                    },
                };

                const response = await registerUser(requestBody.name, requestBody.lastname, requestBody.email, requestBody.role);
                if (response.state === 'success') {
                    handleClose();
                    Swal.fire({
                        title: 'Registro correcto',
                        text: 'Usuario registrado correctamente',
                        icon: 'success',
                        showConfirmButton: false,
                        timer: 2000
                    }).then(() => {
                        resetForm();
                        if (onUserAdded) onUserAdded();
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
                setIsSubmitting(false);
            } catch (error) {
                Swal.fire({
                    title: 'Error',
                    text: 'Ocurrió un error inesperado',
                    icon: 'error',
                    showConfirmButton: false,
                    timer: 2000
                })
            } finally {
                await new Promise((resolve) => setTimeout(resolve, 2000));
            }
        }
    });

    const handleCancel = () => {
        resetForm();
        onResetForm(resetForm);
        handleClose();
    };

    return (
        <Modal show={show} onHide={handleClose} centered backdrop="static" keyboard={false}>
            <Modal.Header className={`modal-title fs-5 ${styles['modal-header']}`}>
                <h3>Agregar Usuario</h3>
            </Modal.Header>
            <form onSubmit={handleSubmit}>
                <Modal.Body className='p-4 rounded'>
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
                                placeholder="Escribe aquí tu nueva contraseña"
                            />
                            {touched.name && errors.name ? (
                                <div className="text-danger mt-1" style={{ fontSize: '15px' }}>
                                    {errors.name}
                                </div>
                            ) : null}
                        </div>
                        <div className="form-group">
                            <label
                                htmlFor="lastname"
                                className={`form-label fw-semibold ${styles['label']}`}
                            >
                                Apellidos(s):
                            </label>
                            <input
                                type="text"
                                id="lastname"
                                name="lastname"
                                value={values.lastname}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={`form-control py-3 ${touched.lastname && errors.lastname ? 'is-invalid' : ''}`}
                                placeholder="Escribe aquí tu nueva contraseña"
                            />
                            {touched.lastname && errors.lastname ? (
                                <div className="text-danger mt-1" style={{ fontSize: '15px' }}>
                                    {errors.lastname}
                                </div>
                            ) : null}
                        </div>
                        <div className="form-group">
                            <label
                                htmlFor="email"
                                className={`form-label fw-semibold ${styles['label']}`}
                            >
                                Correo Electrónico:
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={values.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={`form-control py-3 ${touched.email && errors.email ? 'is-invalid' : ''}`}
                                placeholder="Escribe aquí tu nueva contraseña"
                            />
                            {touched.email && errors.email ? (
                                <div className="text-danger mt-1" style={{ fontSize: '15px' }}>
                                    {errors.email}
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
                                value={values.role}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={`form-control py-3 ${touched.role && errors.role ? 'is-invalid' : ''}`}
                            >
                                <option value="" disabled>
                                    Selecciona una opción
                                </option>
                                <option value="admin">Administrador</option>
                                <option value="user">Usuario</option>
                            </select>
                            {touched.role && errors.role ? (
                                <div className="text-danger mt-1" style={{ fontSize: '15px' }}>
                                    {errors.role}
                                </div>
                            ) : null}
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button
                        className={`rounded ${styles['secondary-btn']}`} onClick={handleCancel} type='button'>
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
                            type='submit'
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
    )
};

AddUserModal.propTypes = {
    show: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    onResetForm: PropTypes.func.isRequired,
    onUserAdded: PropTypes.func,
};

export default AddUserModal;
