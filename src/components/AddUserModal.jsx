import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import { Modal } from 'react-bootstrap';
import styles from "../assets/css/users.module.css"
import { useState } from 'react';
import { registerUser } from '../services/ApiUser';
import { handleError, handleSuccess } from '../utils/userAlerts';
import { addUserSchema } from '../validations/userValidations';
import InputField from './InputField';

const AddUserModal = ({ show, handleClose, onResetForm, onUserAdded }) => {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const validationSchema = addUserSchema;

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
                    handleSuccess(
                        'Registro correcto',
                        'Usuario registrado correctamente',
                        resetForm,
                        handleClose,
                        onUserAdded
                    );
                } else {
                    handleError(
                        'Error',
                        'Ocurrió un error inesperado',
                        resetForm,
                        handleClose
                    );
                }
                setIsSubmitting(false);
            } catch (error) {
                handleError(
                    'Error',
                    'Ocurrió un error inesperado',
                    resetForm,
                    handleClose
                );
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
                            <InputField
                                type="text"
                                id="name"
                                name="name"
                                value={values.name}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                touched={touched.name}
                                error={errors.name}
                                placeholder="Escribe aquí el nombre del usuario"
                                className="form-control py-3"
                            />
                        </div>
                        <div className="form-group">
                            <label
                                htmlFor="lastname"
                                className={`form-label fw-semibold ${styles['label']}`}
                            >
                                Apellidos(s):
                            </label>
                            <InputField
                                type="text"
                                id="lastname"
                                name="lastname"
                                value={values.lastname}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                touched={touched.lastname}
                                error={errors.lastname}
                                placeholder="Escribe aquí los apellidos del usuario"
                                className="form-control py-3"
                            />
                        </div>
                        <div className="form-group">
                            <label
                                htmlFor="email"
                                className={`form-label fw-semibold ${styles['label']}`}
                            >
                                Correo Electrónico:
                            </label>
                            <InputField
                                type="email"
                                id="email"
                                name="email"
                                value={values.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                touched={touched.email}
                                error={errors.email}
                                placeholder="Escribe aquí el correo electrónico del usuario"
                                className="form-control py-3"
                            />
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
                                <option value="user">Almacenista</option>
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
                        <>
                            <button
                                className={`rounded ${styles['secondary-btn']}`} onClick={handleCancel} type='button'>
                                <div className={`btn d-flex text-center ${styles['secondary-content']}`}>
                                    Cancelar
                                </div>
                                <span></span>
                            </button>
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
                        </>
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
