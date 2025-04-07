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

export async function getAllUsers() {
  try {
    const token = localStorage.getItem('accessToken');
    const response = await axios.get(`${API_URL}user/list`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    return {
      state: 'success',
      users: response.data,
    };
  } catch (error) {
    return {
      state: 'error',
      message: error.response?.data?.message || 'Error al obtener los usuarios',
    };
  }
}

export async function deleteUser(uuid) {
  try {
    const token = localStorage.getItem('accessToken');
    const response = await axios.delete(`${API_URL}user/${uuid}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return {
      state: 'success',
      message: response.data.message,
    };
  } catch (error) {
    return {
      state: 'error',
      message: error.response?.data?.message || 'Error al eliminar el usuario',
    };
  }
}


export async function deactivateUser(uuid) {
  try {
    const token = localStorage.getItem('accessToken');
    const response = await axios.put(`${API_URL}user/deactivate/${uuid}`, null, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return {
      state: 'success',
      message: response.data.message,
    };
  } catch (error) {
    return {
      state: 'error',
      message: error.response?.data?.message || 'Error al desactivar el usuario',
    };
  }
}

export async function activateUser(uuid) {
  try {
    const token = localStorage.getItem('accessToken');
    const response = await axios.put(`${API_URL}user/activate/${uuid}`, null, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return {
      state: 'success',
      message: response.data.message,
    };
  } catch (error) {
    return {
      state: 'error',
      message: error.response?.data?.message || 'Error al activar el usuario',
    };
  }
}
