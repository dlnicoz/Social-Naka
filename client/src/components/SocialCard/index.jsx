import React from 'react';
import Background from './Background';
import SocialLinks from './SocialLinks';
import { themes } from '../themes';

function SocialCard({ profile }) {
  const currentTheme = themes[profile.theme] || themes.gradient;

  return (
    <div className={`w-full max-w-md mx-auto relative overflow-hidden rounded-3xl shadow-2xl backdrop-blur-sm ${currentTheme.cardBg}`}>
      <Background theme={currentTheme} />
      
      <div className="relative z-10 p-8">
        <div className="flex flex-col items-center text-center space-y-6">
          <div className="w-28 h-28 rounded-full overflow-hidden ring-4 ring-white shadow-lg">
            <img
              src={profile.profileUrl}
              alt={profile.name}
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="space-y-2">
            <h2 className={`text-5xl font-['Passion_One'] ${currentTheme.textPrimary}`}>
              {profile.name}
            </h2>
            <p className={`text-xl font-medium ${currentTheme.textSecondary}`}>
              {profile.profession}
            </p>
            <p className={`text-lg ${currentTheme.textBody}`}>
              {profile.location}
            </p>
          </div>
          
          <p className={`text-xl ${currentTheme.textBody} max-w-xs leading-relaxed`}>
            {profile.description}
          </p>

          <SocialLinks links={profile.socialLinks} theme={currentTheme} />
        </div>
      </div>
    </div>
  );
}

export default SocialCard;