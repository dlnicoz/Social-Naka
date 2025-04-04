import { createContext, useState, useEffect } from 'react';
import axiosInstance from '../utils/axiosInstance';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const token = localStorage.getItem('auth-token');
    if (!token) {
        setUser(null);  // Ensure user is null if no token
        return;
      }
    const checkAuth = async () => {
      setLoading(true);
      if (token) {
        try {
          // Check if the access token is still valid
          const res = await axiosInstance.get('/social-cards/me', {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUser(res.data);
        } catch (error) {
          console.warn("Access token might be expired, attempting refresh...");
          const newToken = await refreshToken();
          if (newToken) {
            // If refresh was successful, retry fetching user details
            try {
              const res = await axiosInstance.get('/social-cards/me');
              setUser(res.data);
            } catch (error) {
              console.error("Failed to get user after refresh:", error);
              logout();
            }
          } else {
            logout(); // If refresh token also fails, log out user
          }
        }
      }
      setLoading(false);
    };
    checkAuth();
  }, []);

  const refreshToken = async () => {
    try {
      const res = await axiosInstance.post('/users/refresh-token');
      const { token } = res.data;
  
      localStorage.setItem('auth-token', token);
      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      return token;
    } catch (error) {
      console.error("Refresh token failed:", error);
      return null; // Indicate that refresh failed
    }
  };

  const login = async (values) => {
    try {
      const res = await axiosInstance.post('/users/login', values);
      const { accessToken, refreshToken, username, email, profilePic } = res.data;
  
      localStorage.setItem('auth-token', accessToken);
      localStorage.setItem('username' , username)
      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
      // Update the user state with all required fields
      setUser({ username, email, profilePic });
      return res.data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;  
    }
  };
  

  const register = async (values) => {
    try {
      const res = await axiosInstance.post('/users/register', values);
      const { accessToken, refreshToken, username, profilePic } = res.data;
  
      // Store token in localStorage
      localStorage.setItem('auth-token', accessToken);
      localStorage.setItem('username', username);

  
      // Update axios instance with new token
      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
  
      // Update user state with relevant info
      setUser({
        isLogin: true,
        token: accessToken,
        refreshToken,
        username,
        email,
        profilePic: profilePic || null, // Handle optional profile pic
      });
  
      return res.data;
    } catch (error) {
      console.error('Register error:', error);
      throw error;
    }
  };
  

  const logout = () => {
    localStorage.removeItem('auth-token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
