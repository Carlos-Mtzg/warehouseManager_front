import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL_LOCAL;

export async function registerUser(name, lastname, email, role) {
  try {
    const token = localStorage.getItem('accessToken');
    const response = await axios.post(
      `${API_URL}user/register`,
      {
        name,
        lastname,
        email,
        role,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return {
      state: 'success',
      message: response.data.message,
    };
  } catch (error) {
    return {
      state: 'error',
      message: error.response?.data?.message || 'Error al enviar el correo',
    };
  }
}
