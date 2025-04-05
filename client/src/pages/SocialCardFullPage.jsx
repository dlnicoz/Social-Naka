import React, { useState, useEffect } from 'react';
import SocialCard from '../components/SocialCard';
import { useParams } from 'react-router-dom';
import supabase from '../utils/supabase';
import PageBackground from '../components/Layout/PageBackground';

function SocialCardFullPage() {
  const [currentTheme, setCurrentTheme] = useState('gradient');
  const { username } = useParams(); // This is the `slug`
  const [socialCard, setSocialCard] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCardBySlug = async () => {
      const { data, error } = await supabase
        .from('social_cards')
        .select('*')
        .eq('slug', username)
        .single();

      if (error || !data) {
        console.error('Error fetching social card:', error?.message || 'No card found');
        setError('Card not found or something went wrong.');
      } else {
        setSocialCard(data);
        if (data.theme) {
          setCurrentTheme(data.theme);
        }
      }
    };

    fetchCardBySlug();
  }, [username]);

  if (error) return <p className="text-red-500 text-center mt-10">{error}</p>;
  if (!socialCard) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="min-h-screen relative">
      <PageBackground theme={currentTheme} />

      <div className="relative z-10 min-h-screen py-12 px-4">
        <div className="max-w-md mx-auto">
          <SocialCard profile={socialCard} />
        </div>
      </div>
    </div>
  );
}

export default SocialCardFullPage;
