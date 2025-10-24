import axios from 'axios';

const api = axios.create({
    baseURL: '/', // Cambiar esto a la URL de backend
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;