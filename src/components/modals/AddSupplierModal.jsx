import PropTypes from 'prop-types';
import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { addSupplierSchema } from "../../validations/entriesValidation.js";
import { useFormik } from "formik";
import { createSupplier } from "../../services/ApiEntries.jsx";
import styles from '../../assets/css/entries.module.css';
import { handleError, handleSuccess } from '../../utils/simpleAlerts.js';
import PrimaryButton from '../buttons/PrimaryButton.jsx';
import PrimaryOutlineButton from '../buttons/PrimaryOutlineButton.jsx';

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
                    handleCancel()
                    handleError('Error', `Este proveedor ya esta registrado en el sistema`);
                    resetForm();
                } else if (response.state === 'success') {
                    handleCancel()
                    handleSuccess(
                        'Registro correcto',
                        'Proveedor registrado correctamente',
                        resetForm,
                        onSupplierAdded
                    );
                } else {
                    handleCancel()
                    handleError('Error', 'Error desconocido');
                }
            } catch (error) {
                handleCancel()
                handleError('Error', 'Ocurrió un error inesperado');
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

AddSupplierModal.propTypes = {
    show: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    onSupplierAdded: PropTypes.func, // ✅ OPCIONAL
};

export default AddSupplierModal;
