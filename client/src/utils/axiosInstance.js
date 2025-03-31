import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;
const axiosInstance = axios.create({
  baseURL: apiUrl || 'http://localhost:5000/api',
  withCredentials: true,
});
console.log(apiUrl)

// Attach access token to every request
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth-token');
    console.log('[Axios Request] Access Token:', token); // Log the current access token
    if (token) {
      config.headers['auth-token'] = `Bearer ${token}`;
      config.headers.Authorization = `Bearer ${token}`;
      console.log("[Axios access token]" , token)
    }
    return config;
  },
  (error) => {
    console.error('[Axios Request Error]', error);
    return Promise.reject(error);
  }
);

// Handle token expiration and refresh token flow
axiosInstance.interceptors.response.use(
  (response) => response, // Return successful responses as-is
  async (error) => {
    const originalRequest = error.config;

    // If the access token is expired and it's not already retried
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const res = await axiosInstance.post('/users/refresh-token');
        const { token } = res.data;

        localStorage.setItem('auth-token', token);
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        originalRequest.headers['Authorization'] = `Bearer ${token}`;

        return axiosInstance(originalRequest); // Retry the original request
      } catch (refreshError) {
        console.error("Refresh token failed, logging out.");
        localStorage.removeItem('auth-token');
        window.location = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);


export default axiosInstance;
