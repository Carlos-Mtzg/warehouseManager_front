import axios from 'axios';

export async function authLogin(request) {
    let datos = axios
        .post(`${import.meta.env.VITE_API_URL_LOCAL}auth/login`, request, {
            headers: { 'content-type': 'application/json' }
        })
        .then((response) => {
            return response.data;
        }).catch((error) => {
            return { 'state': 'error' }
        });
    return datos;
}