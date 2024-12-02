import React, { useState } from 'react';
import { themes } from '../components/themes';
import SocialCard from '../components/SocialCard';
import PageBackground from '../components/Layout/PageBackground';

function SocialCardFullPage() {
  const [currentTheme, setCurrentTheme] = useState('gradient');

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
          <SocialCard profile={profileData} />
        </div>
      </div>
    </div>
  );
}

export default SocialCardFullPage;