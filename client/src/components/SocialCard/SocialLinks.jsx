import React from 'react';
import { Github, Twitter, Linkedin, Instagram, Globe } from 'lucide-react';

function SocialLinks({ links, theme }) {
  // Map of social platform to icons with fallback
  const iconMap = {
    github: Github,
    twitter: Twitter,
    linkedin: Linkedin,
    instagram: Instagram,
    website: Globe, // Default for "website"
  };

  return (
    <div className="flex flex-col gap-3 w-full max-w-xs">
      {links.map((link) => {
        const Icon = iconMap[link.platform.toLowerCase()] || Globe; // Fallback to Globe icon
        return (
          <a
            key={link.id}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`w-full py-3 px-4 rounded-xl bg-gradient-to-r ${theme.socialLinks} flex items-center justify-center gap-3 transition-all duration-300 shadow-sm hover:shadow group`}
          >
            {/* Platform Icon */}
            <span className={`${theme.textBody} group-hover:${theme.textPrimary} transition-colors`}>
              <Icon size={24} />
            </span>
            {/* Platform Name */}
            <span className={`font-['Passion_One'] text-xl ${theme.textPrimary}`}>
              {link.platform.charAt(0).toUpperCase() + link.platform.slice(1)}
            </span>
          </a>
        );
      })}
    </div>
  );
}

export default SocialLinks;
