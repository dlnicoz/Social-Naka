import React from 'react';
import { Github, Twitter } from 'lucide-react';

function SocialLinks({ links, theme }) {
  const getIcon = (platform) => {
    switch (platform.toLowerCase()) {
      case 'github':
        return <Github size={24} />;
      case 'twitter':
        return <Twitter size={24} />;
      default:
        return null;
    }
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
            {link.platform.charAt(0).toUpperCase() + link.platform.slice(1)}
          </span>
        </a>
      ))}
    </div>
  );
}

export default SocialLinks;