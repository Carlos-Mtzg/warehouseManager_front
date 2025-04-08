import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import Swal from 'sweetalert2';
import { useContext, useState } from 'react';
import { authLogin } from '../../services/ApiAuth';
import AuthContext from '../../context/AuthProvider';

import styles from '../../assets/css/auth/authentication.module.css';
import logo from '../../assets/images/logo-color.png';
import { loginValidationSchema } from '../../validations/authValidation';

const Login = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { handleLogin } = useContext(AuthContext);

  const validationSchema = loginValidationSchema;

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
      password: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        setIsSubmitting(true);
        const response = await authLogin(values);
        if (response?.accessToken) {
          const { accessToken, role, uuid } = response;
          handleLogin(accessToken, role, uuid);
          Swal.fire({
            title: 'Inicio de Sesión Correcto',
            text: 'Bienvenido al sistema',
            icon: 'success',
            showConfirmButton: false,
            timer: 1000
          }).then(() => {
            navigate('/admin/product-entries');
          });
        } else {
          Swal.fire({
            title: 'Error',
            text: 'Correo y/o contraseña incorrectos. Por favor, verifica tus datos.',
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
        <h1 className={`fw-bold text-center ${styles['title']}`}>
          Inicio de Sesión
        </h1>
        <form onSubmit={handleSubmit} className="d-flex flex-column gap-4">
          <div className="form-group">
            <label
              htmlFor="email"
              className={`form-label fw-semibold ${styles['label']}`}
            >
              Correo electrónico:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`form-control py-3 ${touched.email && errors.email ? 'is-invalid' : ''} ${styles['email-input']}`}
              placeholder="Escribe aquí tu correo electrónico"
            />
            {touched.email && errors.email ? (
              <div className="text-danger mt-1" style={{ fontSize: '15px' }}>
                {errors.email}
              </div>
            ) : null}
          </div>
          <div className="form-group">
            <label
              htmlFor="password"
              className={`form-label fw-semibold ${styles['label']}`}
            >
              Contraseña:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`form-control py-3 ${touched.password && errors.password ? 'is-invalid' : ''} ${styles['password-input']}`}
              placeholder="Escribe aquí tu contraseña"
            />
            {touched.password && errors.password ? (
              <div className="text-danger mt-1" style={{ fontSize: '15px' }}>
                {errors.password}
              </div>
            ) : null}
          </div>
          <div className="row mt-3">
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
                  Iniciar Sesión<i className="bi bi-box-arrow-in-right ms-2"></i>
                </div>
                <span></span>
              </button>
            )}
          </div>
          <Link className={`text-center ${styles['forget-password']}`} to="/forgot-password">
            He olvidado mi contraseña
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
