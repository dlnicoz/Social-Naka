import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;
const axiosInstance = axios.create({
  baseURL: apiUrl || 'http://localhost:5000/api',
  withCredentials: true, // Ensure cookies are sent with requests
});
console.log(apiUrl)

// Attach access token to every request
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth-token');
    console.log('[Axios Request] Access Token:', token); // Log the current access token
    if (token) {
      config.headers['auth-token'] = token;
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
  (response) => {
    console.log('[Axios Response]', response); // Log successful responses
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      console.warn('[Axios Interceptor] 401 Unauthorized. Attempting token refresh.'); // Log the 401 error
      originalRequest._retry = true;

      try {
        console.log('[Axios Interceptor] Sending refresh token request...');
        const res = await axios.post(`${apiUrl}/users/refresh-token`, null, {
          withCredentials: true, // Ensure cookies are sent with the request
        });

        const { token } = res.data;
        console.log('[Axios Interceptor] New Access Token Received:', token); // Log the new access token

        localStorage.setItem('auth-token', token);
        originalRequest.headers['auth-token'] = token;

        console.log('[Axios Interceptor] Retrying original request...');
        return axiosInstance(originalRequest); // Retry the original request
      } catch (refreshError) {
        console.error('[Axios Interceptor] Error refreshing token:', refreshError);
        console.warn('[Axios Interceptor] Redirecting to login page...');
        localStorage.removeItem('auth-token');
        localStorage.removeItem('refresh-token');
        window.location = '/login';
        return Promise.reject(refreshError);
      }
    }

    console.error('[Axios Interceptor] Request Error:', error); // Log other errors
    return Promise.reject(error);
  }
);

export default axiosInstance;
