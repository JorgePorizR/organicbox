import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'https://organicapi.onrender.com/api/',
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});
export default apiClient;