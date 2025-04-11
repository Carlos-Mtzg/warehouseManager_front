import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL_LOCAL;

export async function fetchProductsInStock() {
    try {
        const token = localStorage.getItem("accessToken");
        const response = await axios.get(`${API_URL}stock/`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        
        return {
            state: "success",
            data: response.data.data,
        };
    } catch (error) {
        return {
            state: "error",
            message: error.response?.data?.message || "Error al obtener los productos en stock.",
        };
    }
}

export async function fetchProductByUUID(uuid) {
    try {
        const token = localStorage.getItem("accessToken");
        const response = await axios.get(`${API_URL}stock/${uuid}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return {
            state: "success",
            data: response.data.data,
        };
    } catch (error) {
        return {
            state: "error",
            message: error.response?.data?.message || "Error al obtener el producto por UUID.",
        };
    }
}

export async function registerProductOut(productOutList) {
    try {
        const token = localStorage.getItem("accessToken");
        const response = await axios.post(
            `${API_URL}productOut/`,
            {
                productOutList,
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
            data: response.data.data,
        };
    } catch (error) {
        return {
            state: "error",
            message: error.response?.data?.message || "Error al registrar la salida de productos.",
        };
    }
}