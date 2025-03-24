import { Link, useNavigate } from "react-router-dom"
import { useFormik } from 'formik'
import * as Yup from "yup"
import toast, { Toaster } from 'react-hot-toast';
import { useContext } from "react";
import { authLogin } from "../../services/ApiAuth";
import AuthContext from "../../context/AuthProvider";

import styles from '../../assets/css/auth/authentication.module.css'
import logo from '../../assets/images/logo-color.png'

const Login = () => {
    const navigate = useNavigate();
    const { handleLogin } = useContext(AuthContext);

    const validationSchema = Yup.object({
        email: Yup.string()
            .email("El correo electrónico no es válido")
            .required("El correo electrónico es obligatorio")
            .matches(/^[^<>]*$/, "El correo electrónico no puede contener los caracteres '<' o '>'")
            .trim("El correo electrónico no puede contener solo espacios"),
        password: Yup.string()
            .required("La contraseña es obligatoria")
            .matches(/^[^<>]*$/, "La contraseña no puede contener los caracteres '<' o '>'")
            .trim("La contraseña no puede contener solo espacios"),
    });

    const { handleSubmit, handleChange, handleBlur, values, errors, touched, isSubmitting } = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema,
        onSubmit: async (values) => {
            try {
                const response = await authLogin(values);
                if (response?.accessToken) {
                    const { accessToken, role, uuid } = response;
                    handleLogin(accessToken, role, uuid);
                    toast.success('Inicio de sesión correcto!');
                    setTimeout(() => {
                        navigate("/");
                    }, 2000);
                } else {
                    toast.error("Correo y/o contraseña incorrectos. Por favor, verifica tus datos.");
                }
            } catch (error) {
                toast.error("Ocurrió un error inesperado");
            } finally {
                await new Promise((resolve) => setTimeout(resolve, 2000));
            }
        },
    })

    return (
        <div className={`d-flex justify-content-center align-items-center ${styles['content']}`}>
            <div className={`col-8 col-md-5 d-flex flex-column ${styles['form-content']}`}>
                <div className="d-flex justify-content-center align-items-center">
                    <img className={`${styles['logo']}`} src={logo} alt="Logo" />
                </div>
                <h1 className={`fw-bold text-center ${styles['title']}`}>Inicio de Sesión</h1>
                <form onSubmit={handleSubmit} className="d-flex flex-column gap-4">
                    <div className="form-group">
                        <label htmlFor="email" className={`form-label fw-semibold ${styles['label']}`}>Correo electrónico:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={`form-control ${touched.email && errors.email ? 'is-invalid' : ''} ${styles['email-input']}`}
                            placeholder="Escribe aquí tu correo electrónico"
                        />
                        {touched.email && errors.email ? (
                            <div className="text-danger mt-1" style={{ fontSize: '15px' }}>{errors.email}</div>
                        ) : null}
                    </div>
                    <div className="form-group">
                        <label htmlFor="password" className={`form-label fw-semibold ${styles['label']}`}>Contraseña:</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={values.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={`form-control ${touched.password && errors.password ? 'is-invalid' : ''} ${styles['password-input']}`}
                            placeholder="Escribe aquí tu contraseña"
                        />
                        {touched.password && errors.password ? (
                            <div className="text-danger mt-1" style={{ fontSize: '15px' }}>{errors.password}</div>
                        ) : null}
                    </div>
                    {isSubmitting ? (
                        <button className={`rounded ${styles['submit-btn']}`} type='submit' disabled>
                            <div className={`${styles['submit-content']}`}>
                                Cargando
                                <output className="spinner-border ms-1" style={{ width: '1.25rem', height: '1.25rem' }}>
                                    <span className="visually-hidden"></span>
                                </output>
                            </div>
                            <span></span>
                        </button>
                    ) : (
                        <button className={`rounded ${styles['submit-btn']}`} type='submit' disabled={isSubmitting}>
                            <div className={`${styles['submit-content']}`}>
                                Iniciar Sesión<i className="bi bi-box-arrow-in-right ms-2"></i>
                            </div>
                            <span></span>
                        </button>
                    )}
                    <Link className={`text-center ${styles['forget-password']}`} to="#">He olvidado mi contraseña</Link>
                </form>
            </div>
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
        </div>
    )
}

export default Login