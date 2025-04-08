import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL_LOCAL;

export async function createCategory(categoryName) {
    try {
        const token = localStorage.getItem('accessToken');
        const response = await axios.post(
            `${API_URL}category/`,
            {
                name: categoryName,
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
            status: response.status,
            message: response.data.message,
        };
    } catch (error) {
        return {
            state: 'error',
            status: error.response?.status || 500,
            message: error.response?.data?.message || 'Error al registrar la categoria',
        };
    }
}

export async function createSupplier(name, email) {
    try {
        const token = localStorage.getItem('accessToken');
        const response = await axios.post(
            `${API_URL}supplier/`,
            {
                name: name,
                email: email
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
            status: response.status,
            message: response.data.message,
        };
    } catch (error) {
        return {
            state: 'error',
            status: error.response?.status || 500,
            message: error.response?.data?.message || 'Error al registrar la categoria',
        };
    }
}