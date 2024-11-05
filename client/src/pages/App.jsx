import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '../services/api';
import Home from './Home';
import Login from './Login';
import Dashboard from './Dashboard';
import Loader from '../components/Loader';
import { AuthProvider } from '../contexts/AuthContext'; 

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // null = loading, true/false = loaded
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await api.get('/auth/check');
        setIsAuthenticated(!!response.data.user);
      } catch (error) {
        console.error('User not authenticated', error);
        setIsAuthenticated(false);
      } finally {
        setLoading(false); // Stop loading after check
      }
    };

    checkAuth(); // Run authentication check once on mount
  }, []);

  // Show loading spinner while checking auth status
  if (loading) return <Loader />;

  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/login"
              element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Login />}
            />
            <Route
              path="/dashboard"
              element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" replace />}
            />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
