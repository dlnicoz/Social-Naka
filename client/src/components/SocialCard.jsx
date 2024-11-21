import React from 'react';
import { cn } from '../lib/utils';
import { Github, Twitter, Linkedin, Instagram, Globe, Phone, MapPin } from 'lucide-react';

// Define theme styles
const themeStyles = {
  minimal: 'bg-white border border-gray-200',
  gradient: 'bg-gradient-to-br from-purple-500 to-pink-500 text-white',
  neon: 'bg-black border-2 border-neon-green text-neon-green shadow-neon',
  retro: 'bg-yellow-100 border-2 border-orange-400',
};

// Map of social platform to icon
const iconMap = {
  github: Github,
  twitter: Twitter,
  linkedin: Linkedin,
  instagram: Instagram,
  website: Globe,
};

export default function SocialCard({ user }) {
  return (
    <div className={cn(
      'rounded-lg p-6 max-w-md mx-auto transition-all duration-300',
      themeStyles[user.theme]
    )}>
      <div className="flex flex-col items-center text-center">
        <img
          src={user.profileUrl}
          alt={user.name}
          className="w-24 h-24 rounded-full object-cover mb-4"
        />
        <h2 className="text-2xl font-bold mb-1">{user.name}</h2>
        <p className="text-lg mb-2">{user.profession}</p>

        {user.description && (
          <p className="text-sm mb-4">{user.description}</p>
        )}

        <div className="flex items-center gap-2 mb-4">
          {user.phone && (
            <div className="flex items-center gap-1">
              <Phone size={16} />
              <span className="text-sm">{user.phone}</span>
            </div>
          )}
          {user.location && (
            <div className="flex items-center gap-1">
              <MapPin size={16} />
              <span className="text-sm">{user.location}</span>
            </div>
          )}
        </div>

        <div className="w-full space-y-3">
          {user.socialLinks.map((link, index) => { // Use index as a fallback if `id` is missing
            const Icon = iconMap[link.platform.toLowerCase()] || Globe;
            return (
              <a
                key={link.id || index} // Ensure key is unique
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  'flex items-center gap-2 p-3 rounded-lg transition-all duration-300',
                  user.theme === 'minimal' && 'bg-gray-100 hover:bg-gray-200',
                  user.theme === 'gradient' && 'bg-white/10 hover:bg-white/20',
                  user.theme === 'neon' && 'border border-neon-green hover:bg-neon-green/10',
                  user.theme === 'retro' && 'bg-orange-200 hover:bg-orange-300'
                )}
              >
                <Icon size={20} />
                <span className="flex-1">{link.platform}</span>
              </a>
            );
          })}

        </div>
      </div>
    </div>
  );
}
