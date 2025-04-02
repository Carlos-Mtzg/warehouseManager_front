import { Link, useNavigate } from 'react-router-dom';
import { React, useState } from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import toast, { Toaster } from 'react-hot-toast';

import { resetPasswordEmail } from '../../services/ApiAuth';

import styles from '../../assets/css/auth/authentication.module.css';
import logo from '../../assets/images/logo-color.png';

const ForgotPassword = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    const validationSchema = Yup.object({
        email: Yup.string()
            .email('El correo electrónico no es válido')
            .required('El correo electrónico es obligatorio')
            .matches(
                /^[^<>]*$/,
                "El correo electrónico no puede contener los caracteres '<' o '>'"
            )
            .trim('El correo electrónico no puede contener solo espacios'),
    });

    const {
        handleSubmit,
        handleChange,
        handleBlur,
        values,
        errors,
        touched,
    } = useFormik({
        initialValues: {
            email: '',
        },
        validationSchema,
        onSubmit: async (values) => {
            try {
                setIsSubmitting(true);
                const response = await resetPasswordEmail(values.email);
                if (response.state === "error") {
                    toast.error(response.message || 'Ocurrió un error inesperado');
                } else {
                    toast.success('Correo de recuperación enviado con éxito');
                    setTimeout(() => {
                        navigate('/login');
                    }, 2000);
                }
                setIsSubmitting(false);
            } catch (error) {
                toast.error('Ocurrió un error inesperado');
            } finally {
                await new Promise((resolve) => setTimeout(resolve, 2000));
            }
        }
    })

    return (
        <div className={`d-flex justify-content-center align-items-center ${styles['content']}`}>
            <div
                className={`col-8 col-md-5 d-flex flex-column ${styles['form-content']}`}
            >
                <div className="d-flex justify-content-center align-items-center">
                    <img className={`${styles['logo']}`} src={logo} alt="Logo" />
                </div>
                <p className={`fw-bold ${styles['title-second']}`}>
                    Introduce tu dirección de correo electrónico
                </p>
                <p className={`${styles['text']}`}>Se te hará llegar un mensaje a tu correo electrónico con un enlace para que puedas restablecer tu contraseña</p>
                <form onSubmit={handleSubmit} className='d-flex flex-column gap-5'>
                    <div className="form-group">
                        <input
                            type='email'
                            id='email'
                            name='email'
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={`form-control py-3 ${touched.email && errors.email ? 'is-invalid' : ''} ${styles['email-input']}`}
                            placeholder='Escribe aquí tu correo electrónico'
                        />
                        {touched.email && errors.email ? (
                            <div className="text-danger mt-1" style={{ fontSize: '15px' }}>
                                {errors.email}
                            </div>
                        ) : null}
                    </div>
                    <div className="d-flex flex-column gap-3">
                        {isSubmitting ? (
                            <button
                                className={`rounded ${styles['submit-btn']}`}
                                type="submit"
                                disabled
                            >
                                <div className={`${styles['submit-content']}`}>
                                    Cargando
                                    <output
                                        className="spinner-border ms-1"
                                        style={{ width: '1.25rem', height: '1.25rem' }}
                                    >
                                        <span className="visually-hidden"></span>
                                    </output>
                                </div>
                                <span></span>
                            </button>
                        ) : (
                            <button
                                className={`rounded ${styles['submit-btn']}`}
                                type="submit"
                                disabled={isSubmitting}
                            >
                                <div className={`${styles['submit-content']}`}>
                                    Enviar
                                </div>
                                <span></span>
                            </button>
                        )}
                        <Link className={`rounded ${styles['cancel-btn']}`} to='/login'>Cancelar</Link>
                    </div>
                </form>
            </div>
            <Toaster position="top-center" reverseOrder={false} />
        </div>
    );
};

export default ForgotPassword