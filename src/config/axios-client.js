import axios from 'axios';

const SERVER_URL = import.meta.env.VITE_API_URL_LOCAL;
const APP_JSON = 'application/json';

const AxiosClient = axios.create({
    baseURL: SERVER_URL,
});

const requestHandler = (req) => {
    req.headers['Accept'] = APP_JSON;
    req.headers['Content-Type'] = APP_JSON;
    const accessToken = localStorage.getItem('accessToken')
    if (accessToken) req.headers['Authorization'] = `Bearer ${accessToken}`;    
    return req;
};

AxiosClient.interceptors.request.use(
    (req) => requestHandler(req),
    (error) => Promise.reject(error)
);

AxiosClient.interceptors.response.use(
    (res) => Promise.resolve(res.data),
    (err) => Promise.reject(err)
);

export default AxiosClient;