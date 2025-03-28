import axios from 'axios';
import { BACKEND_URI } from './env';
//LOAD ENV VARIABLES

const api = axios.create({
    baseURL: BACKEND_URI || 'https://wikipedia-backend-1.onrender.com/api',
    headers: {
        'Content-Type': 'application/json',
    },
});


export default api;
