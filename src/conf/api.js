import axios from 'axios';
import { BACKEND_URI } from './env';
//LOAD ENV VARIABLES

const api = axios.create({
    baseURL: BACKEND_URI || 'http://localhost:8001/api',
    headers: {
        'Content-Type': 'application/json',
    },
});


export default api;
