import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL_LOCAL;

export async function authLogin(request) {
    let datos = axios
        .post(`${API_URL}auth/login`, request, {
            headers: { 'content-type': 'application/json' }
        })
        .then((response) => {
            return response.data;
        }).catch((error) => {
            return { 'state': 'error' }
        });
    return datos;
}

export async function resetPasswordEmail(email) {
    try {
        const response = await axios.post(
            `${API_URL}auth/reset-email`,
            { email },
            { headers: { "Content-Type": "application/json" } }
        );
        return response.data;
    } catch (error) {
        return {
            state: "error",
            message: error.response?.data?.message || "Error al enviar el correo",
        };
    }
}

export async function resetPassword(token, password) {
    try {
        const response = await axios.post(
            `${API_URL}auth/reset-password/${token}`,
            { password },
            { headers: { "Content-Type": "application/json" } }
        );
        return response.data;
    } catch (error) {
        return {
            state: "error",
            message: error.response?.data?.message || "Error al restablecer la contraseña",
        };
    }
}

