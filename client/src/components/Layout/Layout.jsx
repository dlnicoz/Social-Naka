import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import SocialCard from '../SocialCard/SocialCard';
import { Sparkles } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import PageBackground from './PageBackground';

function Layout() {
    const { username } = useParams(); // Get username from URL
  const [socialCard, setSocialCard] = useState(null); // Social card state
  const [error, setError] = useState(null); // Error state
  const [theme, setTheme] = useState('gradient'); // Default theme


  useEffect(() => {
    // Fetch the social card by username
    axios
      .get(`http://localhost:5000/api/social-cards/user/${username}`)
      .then((response) => {setSocialCard(response.data);
      setTheme(response.data.theme || 'gradient') }) // Fallback to 'gradient' if no theme is set)
      .catch((err) => {
        console.error('Error fetching social card:', err.response || err.message); // Log the error for debugging
        setError(err.response?.data?.message || 'Error fetching social card');
      });
  }, [username]);

  if (error) return <p className="text-red-500 text-center mt-10">{error}</p>;
  if (!socialCard) return <p className="text-center mt-10">Loading...</p>;
  return (
    <div className="min-h-screen">
      <PageBackground theme={theme} />
      
      <nav className="relative z-10 p-6 backdrop-blur-sm ">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-1">
            <span className="text-2xl font-bold text-white">Linktree</span>
            <Sparkles className="text-green-400" size={24} />
          </Link>
        </div>
      </nav>

      <main className="relative z-10">
      <SocialCard profile={socialCard} />
      </main>
    </div>
  );
}

export default Layout;