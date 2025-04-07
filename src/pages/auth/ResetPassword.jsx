import * as yup from 'yup';
import { useState } from 'react';
import { useFormik } from 'formik';
import { useNavigate, useParams } from 'react-router-dom';
import { resetPassword } from '../../services/ApiAuth';

import styles from '../../assets/css/auth/authentication.module.css';
import logo from '../../assets/images/logo-color.png';
import Swal from 'sweetalert2';

const ResetPassword = () => {
  const { token } = useParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const REQUIRED_FIELDS = 'Campo obligatorio';

  const validationSchema = yup.object().shape({
    password: yup
      .string()
      .required(REQUIRED_FIELDS)
      .min(8, 'La contraseña debe tener al menos 8 caracteres')
      .matches(
        /[A-Z]/,
        'La contraseña debe contener al menos una letra mayúscula'
      )
      .matches(
        /[a-z]/,
        'La contraseña debe contener al menos una letra minúscula'
      )
      .matches(
        /[\W_]/,
        'La contraseña debe contener al menos un carácter especial (como !, @, #, $, etc.)'
      )
      .trim(),
    repeatPassword: yup
      .string()
      .required(REQUIRED_FIELDS)
      .oneOf([yup.ref('password')], 'Las contraseñas no coinciden'),
  });

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
          const response = await resetPassword(token, values.password);
          if (response.state === 'error') {
            Swal.fire({
              title: 'Error',
              text: 'Ocurrió un error inesperado',
              icon: 'error',
              showConfirmButton: false,
              timer: 2000
            })
          } else {
            Swal.fire({
              title: 'Contraseña restablecida con éxito',
              text: 'Ahora puedes iniciar sesión',
              icon: 'success',
              showConfirmButton: false,
              timer: 2000
            }).then(() => {
              navigate('/login');
            });
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
      className={`d-flex justify-content-center align-items-center ${styles['content']}`}
    >
      <div
        className={`col-8 col-md-5 d-flex flex-column ${styles['form-content']}`}
      >
        <div className="d-flex justify-content-center align-items-center">
          <img className={`${styles['logo']}`} src={logo} alt="Logo" />
        </div>
        <h1 className={`fw-bold text-center ${styles['title']}`}>
          Recuperación de Contraseña
        </h1>
        <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
          <div className="form-group">
            <label
              htmlFor="password"
              className={`form-label fw-semibold ${styles['label']}`}
            >
              Nueva Contraseña:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`form-control py-3 ${touched.password && errors.password ? 'is-invalid' : ''} ${styles['email-input']}`}
              placeholder="Escribe aquí tu nueva contraseña"
            />
            {touched.password && errors.password ? (
              <div className="text-danger mt-1" style={{ fontSize: '15px' }}>
                {errors.password}
              </div>
            ) : null}
          </div>
          <div className="form-group">
            <label
              htmlFor="repeat-password"
              className={`form-label fw-semibold ${styles['label']}`}
            >
              Repite tu contraseña:
            </label>
            <input
              type="password"
              id="repeatPassword"
              name="repeatPassword"
              value={values.repeatPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`form-control py-3 ${touched.repeatPassword && errors.repeatPassword ? 'is-invalid' : ''} ${styles['email-input']}`}
              placeholder="Repite aquí la nueva contraseña"
            />
            {touched.repeatPassword && errors.repeatPassword ? (
              <div className="text-danger mt-1" style={{ fontSize: '15px' }}>
                {errors.repeatPassword}
              </div>
            ) : null}
          </div>
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

export default ResetPassword;
