import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/api',
  withCredentials: true, // Ensure cookies are sent with requests
});

// Attach access token to every request
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth-token');
    if (token) {
      config.headers['auth-token'] = token;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle token expiration and refresh token flow
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const { data } = await axios.post('http://localhost:5000/api/users/refresh-token', null, {
          withCredentials: true, // Ensure cookies are sent with the request
        });

        const { token } = data;
        localStorage.setItem('auth-token', token);

        originalRequest.headers['auth-token'] = token;
        return axios(originalRequest);
      } catch (refreshError) {
        console.error('Error refreshing token:', refreshError);
        window.location = '/login';
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
