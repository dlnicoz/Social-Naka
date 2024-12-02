import React from 'react';
import { 
  Globe, 
  Github, 
  Twitter, 
  Linkedin, 
  Instagram, 
  Youtube,
  Dribbble,
  Palette
} from 'lucide-react';
import { socialPlatforms } from '../../data/socialPlatforms';

function SocialLinks({ links, theme }) {
  const getIcon = (platform) => {
    switch (platform) {
      case 'website':
        return <Globe size={24} />;
      case 'github':
        return <Github size={24} />;
      case 'twitter':
        return <Twitter size={24} />;
      case 'linkedin':
        return <Linkedin size={24} />;
      case 'instagram':
        return <Instagram size={24} />;
      case 'youtube':
        return <Youtube size={24} />;
      case 'dribbble':
        return <Dribbble size={24} />;
      case 'behance':
        return <Palette size={24} />;
      default:
        return null;
    }
  };

  const getPlatformName = (platformId) => {
    const platform = socialPlatforms.find(p => p.id === platformId);
    return platform ? platform.name : platformId;
  };

  return (
    <div className="flex flex-col gap-3 w-full max-w-xs">
      {links.map((link, index) => (
        <a
          key={index}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`w-full py-3 px-4 rounded-xl bg-gradient-to-r ${theme.socialLinks} flex items-center justify-center gap-3 transition-all duration-300 shadow-sm hover:shadow group`}
        >
          <span className={`${theme.textBody} group-hover:${theme.textPrimary} transition-colors`}>
            {getIcon(link.platform)}
          </span>
          <span className={`font-['Passion_One'] text-xl ${theme.textPrimary}`}>
            {getPlatformName(link.platform)}
          </span>
        </a>
      ))}
    </div>
  );
}

export default SocialLinks;