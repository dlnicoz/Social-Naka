import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await api.get('/auth/check');
        if (response.data.user) {
          // If user is authenticated, redirect to dashboard
          navigate('/dashboard');
        }
      } catch (error) {
        console.error('User not authenticated', error);
        // No navigation here to prevent re-looping
      }
    };

    checkAuth();  // Only call checkAuth once when the component mounts
  }, [navigate]);  // Dependencies should only include navigate

  const handleLogin = () => {
    window.location.href = 'http://localhost:5000/api/auth/google';
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl mb-6">Login to Social Naka</h1>
      <button onClick={handleLogin} className="bg-blue-500 text-white px-4 py-2 rounded">
        Login with Google
      </button>
    </div>
  );
};

export default Login;
