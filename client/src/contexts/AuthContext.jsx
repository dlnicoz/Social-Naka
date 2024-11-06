import { createContext, useContext, useEffect, useState } from 'react';
import api from '../services/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Check session on initial load
    const checkSession = async () => {
      try {
        const response = await api.get('/auth/check');
        setUser(response.data.user); // Set user if session exists
      } catch (error) {
        console.error('Error checking session:', error);
        setUser(null); // No session found
      } finally {
        setLoading(false);
      }
    };

    checkSession();
  }, []);

  const signInWithGoogle = () => {
    window.location.href = 'http://localhost:5000/api/auth/google';
  };

  const logout = async () => {
    try {
      await api.get('/auth/logout');
      setUser(null); // Set user to null on logout
    } catch (error) {
      setError('Failed to log out. Please try again.');
      console.error('Error logging out:', error);
    }
  };

  const clearError = () => setError(null);

  return (
    <AuthContext.Provider value={{ user, loading, error, signInWithGoogle, logout, clearError }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
