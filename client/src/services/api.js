import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',  // Your backend URL
  withCredentials: true,  // Important for sending session cookies
});

export default api;
