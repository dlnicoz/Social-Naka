import React, { useState , useEffect } from 'react';
import SocialCard from '../components/SocialCard';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import PageBackground from '../components/Layout/PageBackground';

function SocialCardFullPage() {
  const [currentTheme, setCurrentTheme] = useState('gradient');
  const { username } = useParams(); // Get username from URL
  const [socialCard, setSocialCard] = useState(null); // Social card state
  const [error, setError] = useState(null); // Error state
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    // Fetch the social card by username
    axios
      .get(`${apiUrl}/social-cards/user/${username}`)
      .then((response) => {
        const fetchedData = response.data;
        setSocialCard(fetchedData);
        // if socialData has theme than setTheme to response.data
        if(fetchedData.theme){
          setCurrentTheme(fetchedData.theme)
        }

      })
      .catch((err) => {
        console.error('Error fetching social card:', err.response || err.message); // Log the error for debugging
        setError(err.response?.data?.message || 'Error fetching social card');
      });
  }, [username]);
  

  if (error) return <p className="text-red-500 text-center mt-10">{error}</p>;
  if (!socialCard) return <p className="text-center mt-10">Loading...</p>;

  const profileData = {
    name: "hello 11",
    profession: "Football Coach",
    location: "San Francisco, CA",
    profileUrl: "https://images.unsplash.com/photo-1633332755192-727a05c4013d",
    description: "Passionate about creating beautiful web experiences",
    theme: currentTheme,
    socialLinks: [
      { platform: "github", url: "https://github.com" },
      { platform: "twitter", url: "https://twitter.com" }
    ]
  };

  return (
    <div className="min-h-screen relative">
      <PageBackground theme={currentTheme} />
      
      <div className="relative z-10 min-h-screen py-12 px-4">
        <div className="max-w-md mx-auto">
          <SocialCard profile={socialCard || profileData} />
        </div>
      </div>
    </div>
  );
}

export default SocialCardFullPage;