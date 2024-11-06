import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Instagram, Twitter, Phone, Mail, Github, Globe, Linkedin, Youtube } from 'lucide-react';

const themes = {
  default: 'bg-white',
  minimal: 'bg-neutral-50 shadow-sm',
  gradient: 'bg-gradient-to-br from-indigo-500 to-purple-600 text-white',
  dark: 'bg-neutral-900 text-white',
  light: 'bg-neutral-100',
  bordered: 'bg-white border-2 border-indigo-500',
  rounded: 'bg-white rounded-3xl',
  compact: 'bg-white shadow-sm',
  elegant: 'bg-gradient-to-br from-neutral-900 to-neutral-800 text-white',
  vibrant: 'bg-gradient-to-br from-pink-500 to-orange-500 text-white'
};

const themeStyles = {
  default: 'hover:shadow-xl',
  minimal: 'hover:shadow-md',
  gradient: 'hover:shadow-indigo-500/20',
  dark: 'hover:shadow-neutral-900/20',
  light: 'hover:shadow-lg',
  bordered: 'hover:border-indigo-600',
  rounded: 'hover:shadow-xl',
  compact: 'hover:shadow-md',
  elegant: 'hover:shadow-neutral-900/20',
  vibrant: 'hover:shadow-pink-500/20'
};

const SocialCard = ({
  id,
  user,
  featured = false,
  theme = 'default'
}) => {
  const themeClass = themes[theme];
  const hoverClass = themeStyles[theme];
  const isDark = ['gradient', 'dark', 'elegant', 'vibrant'].includes(theme);

  return (
    <motion.div
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`relative overflow-hidden rounded-xl transition-all w-full aspect-[1/1.586] ${themeClass} ${hoverClass} ${
        featured ? 'ring-2 ring-indigo-500 ring-offset-2' : ''
      }`}
    >
      <Link to={`/profile/${id}`} className="block relative h-1/2">
        <img
          src={user.photoURL || 'https://via.placeholder.com/150'}
          alt={user.name}
          className="w-full h-full object-cover"
        />
        <div className={`absolute inset-0 bg-gradient-to-b ${
          isDark ? 'from-transparent to-black/50' : 'from-transparent to-black/30'
        }`} />
      </Link>

      <div className="p-4 h-1/2">
        <div className="flex flex-col h-full">
          <Link to={`/profile/${id}`} className="flex-1">
            <h3 className={`font-bold text-lg leading-tight ${isDark ? 'text-white' : 'text-neutral-900'}`}>
              {user.name}
            </h3>
            <p className={`text-sm ${isDark ? 'text-neutral-200' : 'text-neutral-600'}`}>
              {user.profession}
            </p>
            <p className={`mt-2 text-sm line-clamp-2 ${isDark ? 'text-neutral-300' : 'text-neutral-500'}`}>
              {user.description}
            </p>
          </Link>

          <div className="mt-3 flex space-x-2">
            {user.contact?.phone && (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => window.open(`tel:${user.contact.phone}`)}
                className={`rounded-full ${isDark ? 'bg-white/10 text-white' : 'bg-green-100 text-green-600'} p-1.5`}
              >
                <Phone className="h-4 w-4" />
              </motion.button>
            )}
            {user.links?.instagram && (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => window.open(user.links.instagram, '_blank')}
                className={`rounded-full ${isDark ? 'bg-white/10 text-white' : 'bg-pink-100 text-pink-600'} p-1.5`}
              >
                <Instagram className="h-4 w-4" />
              </motion.button>
            )}
            {user.links?.twitter && (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => window.open(user.links.twitter, '_blank')}
                className={`rounded-full ${isDark ? 'bg-white/10 text-white' : 'bg-blue-100 text-blue-600'} p-1.5`}
              >
                <Twitter className="h-4 w-4" />
              </motion.button>
            )}
            {user.links?.website && (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => window.open(user.links.website, '_blank')}
                className={`rounded-full ${isDark ? 'bg-white/10 text-white' : 'bg-blue-100 text-blue-600'} p-1.5`}
              >
                <Globe className="h-4 w-4" />
              </motion.button>
            )}
            {user.links?.github && (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => window.open(user.links.github, '_blank')}
                className={`rounded-full ${isDark ? 'bg-white/10 text-white' : 'bg-gray-100 text-gray-600'} p-1.5`}
              >
                <Github className="h-4 w-4" />
              </motion.button>
            )}
            {user.links?.linkedin && (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => window.open(user.links.linkedin, '_blank')}
                className={`rounded-full ${isDark ? 'bg-white/10 text-white' : 'bg-blue-100 text-blue-600'} p-1.5`}
              >
                <Linkedin className="h-4 w-4" />
              </motion.button>
            )}
            {user.links?.youtube && (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => window.open(user.links.youtube, '_blank')}
                className={`rounded-full ${isDark ? 'bg-white/10 text-white' : 'bg-red-100 text-red-600'} p-1.5`}
              >
                <Youtube className="h-4 w-4" />
              </motion.button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SocialCard;
