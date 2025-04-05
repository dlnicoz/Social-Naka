import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '../utils/supabase';

const AuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuth = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (data?.session) {
        console.log("User logged in:", data.session.user);
        navigate('/dashboard'); // Ya jo bhi dashboard route ho
      } else {
        console.error("Auth error:", error);
        navigate('/login');
      }
    };

    handleAuth();
  }, [navigate]);

  return <div>Logging in...</div>;
};

export default AuthCallback;
