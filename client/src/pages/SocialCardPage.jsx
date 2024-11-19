import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import SocialCard from '../components/SocialCard';

export default function SocialCardPage() {
  const { username } = useParams(); // Get username from URL
  const [socialCard, setSocialCard] = useState(null); // Social card state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    // Fetch the social card by username
    axios
      .get(`http://localhost:5000/api/social-cards/user/${username}`)
      .then((response) => setSocialCard(response.data))
      .catch((err) => {
        console.error('Error fetching social card:', err.response || err.message); // Log the error for debugging
        setError(err.response?.data?.message || 'Error fetching social card');
      });
  }, [username]);
  

  if (error) return <p className="text-red-500 text-center mt-10">{error}</p>;
  if (!socialCard) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">{socialCard.name}'s Social Hub</h1>
        <SocialCard user={socialCard} /> {/* Render the social card */}
      </div>
    </div>
  );
}
