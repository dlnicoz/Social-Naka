// src/utils/axiosInstance.js
import axios from 'axios';

// Create an instance of axios to configure base URL, headers, etc.
const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/api', // Replace with your API base URL
  withCredentials: true, // Allow cookies (for refresh token)
});

// Request interceptor: Attach access token to each request
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth-token');
    if (token) {
      config.headers['auth-token'] = token; // Add the access token to the headers
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor: Handle token expiration and refresh
axiosInstance.interceptors.response.use(
  (response) => {
    return response; // If no error, return the response
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) { // Check for 401 Unauthorized (token expired)
      originalRequest._retry = true;

      try {
        // Try to refresh the token using the refresh token stored in the cookie
        const refreshToken = document.cookie
          .split('; ')
          .find(row => row.startsWith('refreshToken='))
          ?.split('=')[1];

        if (refreshToken) {
          // Make a request to refresh the access token
          const res = await axios.post('http://localhost:5000/api/users/refresh-token', { refreshToken });
          const { token } = res.data;

          // Update the access token in localStorage
          localStorage.setItem('auth-token', token);

          // Retry the original request with the new access token
          originalRequest.headers['auth-token'] = token;
          return axios(originalRequest); // Retry the original request
        }
      } catch (err) {
        // Handle errors related to refresh token (e.g., expired refresh token)
        console.error('Error refreshing token:', err);
        window.location = '/login'; // Redirect to login page if refresh fails
      }
    }
    return Promise.reject(error); // If not a 401 error, reject the promise
  }
);

export default axiosInstance;
