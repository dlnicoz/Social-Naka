import { useEffect, useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await api.get('/auth/check');
        if (response.data.user) {
          setUser(response.data.user);  // Set the authenticated user data
        } else {
          navigate('/login');  // Redirect to login if not authenticated
        }
      } catch (error) {
        console.error('Error checking authentication:', error);
        navigate('/login');  // Redirect to login if there's an error
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, [navigate]);

  if (loading) return <Loader />;

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold">Welcome, {user?.name}</h1>
      {/* Display user-specific data here */}
    </div>
  );
};

export default Dashboard;
