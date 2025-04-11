import { useState } from 'react';
import { useFormik } from 'formik';
import { useNavigate, useParams } from 'react-router-dom';
import { handleError, handleSuccess } from '../../utils/authAlerts';

import styles from '../../assets/css/auth/authentication.module.css';
import logo from '../../assets/images/logo-color.png';
import { activateAccount, resetPassword } from '../../services/ApiAuth';
import { passwordSchema } from '../../validations/authValidation';
import PasswordField from '../../components/inputs/PasswordField.jsx';

const PasswordForm = () => {
    const { token } = useParams();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    const isResetPassword = window.location.pathname.includes('reset-password');
    const apiCall = isResetPassword ? resetPassword : activateAccount;

    const validationSchema = passwordSchema;
    const { handleSubmit, handleChange, handleBlur, values, errors, touched } =
        useFormik({
            initialValues: {
                password: '',
                repeatPassword: '',
            },
            validationSchema,
            onSubmit: async (values) => {
                try {
                    setIsSubmitting(true);
                    const response = await apiCall(token, values.password);

                    if (response.state === 'error') {
                        handleError('Error', 'Ocurrió un error inesperado');
                    } else if (isResetPassword) {
                        handleSuccess(
                            'Contraseña restablecida con éxito',
                            'Ahora puedes iniciar sesión',
                            () => navigate('/')
                        );
                    } else {
                        handleSuccess(
                            'Tu cuenta ha sido activada correctamente',
                            'Ahora puedes iniciar sesión',
                            () => navigate('/')
                        );
                    }
                } catch (error) {
                    handleError('Error', 'Ocurrió un error inesperado');
                } finally {
                    setIsSubmitting(false);
                    await new Promise((resolve) => setTimeout(resolve, 2000));
                }
            },
        });

    return (
        <div
            className={`d-flex justify-content-center align-items-center ${styles['content']} slide-up`}
        >
            <div
                className={`col-8 col-md-5 d-flex flex-column ${styles['form-content']}`}
            >
                <div className="d-flex justify-content-center align-items-center">
                    <img className={`${styles['logo']}`} src={logo} alt="Logo" />
                </div>
                {isResetPassword ? (
                    <h1 className={`fw-bold text-center ${styles['title']}`}>
                        Recuperación de Contraseña
                    </h1>
                ) : (
                    <>
                        <h1 className={`fw-bold text-center mt-0 ${styles['title']}`}>
                            Activa tu Cuenta
                        </h1>
                        <div className={`alert alert-warning mb-4`} role="alert">
                            <i className="bi bi-info-circle me-2"></i>Para completar tu registro,
                            por favor crea una contraseña segura para acceder al sistema.
                        </div>
                    </>
                )}

                <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
                    <PasswordField
                        id="password"
                        name="password"
                        label="Nueva Contraseña:"
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        touched={touched.password}
                        error={errors.password}
                        placeholder="Escribe aquí tu nueva contraseña"
                        className={styles['email-input']}
                    />
                    <PasswordField
                        id="repeatPassword"
                        name="repeatPassword"
                        label="Repite tu contraseña:"
                        value={values.repeatPassword}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        touched={touched.repeatPassword}
                        error={errors.repeatPassword}
                        placeholder="Repite aquí tu nueva contraseña"
                        className={styles['email-input']}
                    />
                    <div className="d-flex flex-column mt-3">
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
                                <div className={`${styles['submit-content']}`}>Confirmar</div>
                                <span></span>
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PasswordForm;
