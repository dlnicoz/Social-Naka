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
        <div className="max-w-md mx-auto mb-8">
          <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 shadow-lg">
            <h3 className="text-lg font-semibold text-white mb-3">Choose Theme</h3>
            <div className="grid grid-cols-2 gap-2">
              {Object.values(themes).map((theme) => (
                <button
                  key={theme.id}
                  onClick={() => setCurrentTheme(theme.id)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all
                    ${currentTheme === theme.id 
                      ? 'bg-white/20 text-white ring-2 ring-green-400' 
                      : 'bg-white/10 text-white/80 hover:bg-white/20'
                    }`}
                >
                  {theme.name}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="max-w-md mx-auto">
          <SocialCard profile={profileData} />
        </div>
      </div>
    </div>
  );
}

export default SocialCardFullPage;