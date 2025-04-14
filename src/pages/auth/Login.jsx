import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { useContext, useState } from 'react';
import { authLogin } from '../../services/ApiAuth';
import AuthContext from '../../context/AuthProvider';
import { handleError, handleSuccess } from '../../utils/authAlerts';

import styles from '../../assets/css/auth/authentication.module.css';
import logo from '../../assets/images/logo-color.png';
import { loginValidationSchema } from '../../validations/authValidation';
import PasswordField from '../../components/inputs/PasswordField.jsx';
import EmailField from '../../components/inputs/EmailField.jsx';
import PrimaryButton from '../../components/buttons/PrimaryButton.jsx';

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

          handleSuccess('Inicio de Sesión Correcto', 'Bienvenido al sistema', () => {
            if (role === 'ROLE_USER') {
              navigate('/user');
            } else if (role === 'ROLE_ADMIN') {
              navigate('/admin');
            }
          });
        } else {
          handleError(
            'Error',
            'Correo y/o contraseña incorrectos. Por favor, verifica tus datos.'
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
        <h1 className={`fw-bold text-center ${styles['title']}`}>
          Inicio de Sesión
        </h1>
        <form onSubmit={handleSubmit} className="d-flex flex-column gap-4">
          <EmailField
            id="email"
            name="email"
            label="Correo Electrónico:"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            touched={touched.email}
            error={errors.email}
            placeholder="Escribe aquí tu correo electrónico"
            className={styles['email-input']}
          />
          <PasswordField
            id="password"
            name="password"
            label="Contraseña:"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            touched={touched.password}
            error={errors.password}
            placeholder="Escribe aquí tu contraseña"
            className={styles['password-input']}
          />
          <div className="mt-3">
            <PrimaryButton
              text="Iniciar Sesión"
              type="submit"
              icon="bi bi-box-arrow-in-right"
              disabled={isSubmitting}
              loading={isSubmitting}
              className="w-100"
            />
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
