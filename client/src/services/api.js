import axios from 'axios';

const api = axios.create({
  baseURL: '/api',  // Proxy handles the rest
  withCredentials: true,  // To send cookies with requests
});

export default api;
