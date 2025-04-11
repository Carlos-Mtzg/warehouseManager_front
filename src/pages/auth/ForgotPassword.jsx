import { Link, useNavigate } from 'react-router-dom';
import { React, useState } from 'react'
import { useFormik } from 'formik';
import { handleError, handleSuccess } from '../../utils/authAlerts';

import { resetPasswordEmail } from '../../services/ApiAuth';

import styles from '../../assets/css/auth/authentication.module.css';
import logo from '../../assets/images/logo-color.png';
import { forgotPasswordSchema } from '../../validations/authValidation';
import EmailField from '../../components/EmailField';

const ForgotPassword = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    const validationSchema = forgotPasswordSchema;

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
                    handleError('Error', 'Ocurrió un error inesperado');
                } else {
                    handleSuccess(
                        'Correo de recuperación enviado con éxito',
                        'Revisa tu bandeja de entrada para continuar con el proceso',
                        () => navigate('/')
                    );
                }
            } catch (error) {
                handleError('Error', 'Ocurrió un error inesperado');
            } finally {
                setIsSubmitting(false);
                await new Promise((resolve) => setTimeout(resolve, 2000));
            }
        }
    })

    return (
        <div className={`d-flex justify-content-center align-items-center ${styles['content']} slide-up`}>
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
                    <EmailField
                        id="email"
                        name="email"
                        label=""
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        touched={touched.email}
                        error={errors.email}
                        placeholder="Escribe aquí tu correo electrónico"
                        className={styles['email-input']}
                    />
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
                                        className="spinner-border ms-2"
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
                        <Link className={`rounded ${styles['cancel-btn']}`} to='/'>Cancelar</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ForgotPassword