import PropTypes from 'prop-types';
import Swal from "sweetalert2";
import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { addSupplierSchema } from "../validations/entriesValidation";
import { useFormik } from "formik";
import { createSupplier } from "../services/ApiEntries";
import styles from '../assets/css/entries.module.css';

const AddSupplierModal = ({ show, handleClose, onSupplierAdded }) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const validationSchema = addSupplierSchema;

    const {
        handleSubmit,
        handleChange,
        handleBlur,
        values,
        errors,
        touched,
        resetForm
    } = useFormik({
        initialValues: {
            name: "",
            email: ""
        },
        validationSchema,
        onSubmit: async (values) => {
            try {
                setIsSubmitting(true);
                const response = await createSupplier(values.name, values.email);
                if (response.status === 409) {
                    handleClose();
                    Swal.fire({
                        title: 'Error',
                        text: 'Este proveedor ya ha sido registrado anteriormente',
                        icon: 'error',
                        showConfirmButton: false,
                        timer: 2000
                    }).then(() => {
                        resetForm();
                    })
                }
                if (response.state === 'success') {
                    resetForm();
                    handleClose();
                    Swal.fire({
                        title: 'Registro correcto',
                        text: 'Proveedor registrado correctamente',
                        icon: 'success',
                        showConfirmButton: false,
                        timer: 2000
                    }).then(() => {
                        resetForm();
                        handleClose();
                        if (onSupplierAdded) onSupplierAdded(); // ✅ Ejecutar si está definida
                    });
                } else {
                    Swal.fire({
                        title: 'Error',
                        text: response.message || 'Ocurrió un error inesperado',
                        icon: 'error',
                        showConfirmButton: false,
                        timer: 2000
                    });
                }
            } catch (error) {
                Swal.fire({
                    title: 'Error',
                    text: 'Ocurrió un error inesperado',
                    icon: 'error',
                    showConfirmButton: false,
                    timer: 2000
                });
            } finally {
                setIsSubmitting(false);
            }
        }
    });

    const handleCancel = () => {
        resetForm();
        handleClose();
    };

    return (
        <Modal show={show} onHide={handleCancel} centered backdrop="static" keyboard={false}>
            <Modal.Header className={`modal-title fs-5 ${styles['modal-header']}`}>
                <h3>Agregar Proveedor</h3>
            </Modal.Header>
            <form onSubmit={handleSubmit}>
                <Modal.Body className="p-4 rounded">
                    <div className="d-flex flex-column gap-3">
                        <div className="form-group">
                            <label htmlFor="name" className={`form-label fw-semibold ${styles['label']}`}>
                                Proveedor:
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={values.name}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={`form-control py-3 ${touched.name && errors.name ? 'is-invalid' : ''}`}
                                placeholder="Escribe aquí el nombre del proveedor"
                            />
                            {touched.name && errors.name && (
                                <div className="text-danger mt-1" style={{ fontSize: '15px' }}>
                                    {errors.name}
                                </div>
                            )}
                        </div>
                        <div className="form-group">
                            <label htmlFor="email" className={`form-label fw-semibold ${styles['label']}`}>
                                Correo Electrónico:
                            </label>
                            <input
                                type="text"
                                id="email"
                                name="email"
                                value={values.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={`form-control py-3 ${touched.email && errors.email ? 'is-invalid' : ''}`}
                                placeholder="Escribe aquí el correo del proveedor"
                            />
                            {touched.email && errors.email && (
                                <div className="text-danger mt-1" style={{ fontSize: '15px' }}>
                                    {errors.email}
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
                    <button
                        className={`rounded ${styles['primary-btn']}`}
                        type="submit"
                        disabled={isSubmitting}
                    >
                        <div className={`btn d-flex text-center ${styles['primary-content']}`}>
                            {isSubmitting ? 'Cargando...' : 'Confirmar'}
                        </div>
                        <span></span>
                    </button>
                </Modal.Footer>
            </form>
        </Modal>
    );
};

AddSupplierModal.propTypes = {
    show: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    onSupplierAdded: PropTypes.func, // ✅ OPCIONAL
};

export default AddSupplierModal;
