import React from 'react';
import  themes  from '../themes/themes';

function PageBackground({ theme = 'gradient' }) {
  const currentTheme = themes[theme] || themes['gradient'];

  return (
    <div className="fixed inset-0 -z-10">
      <div className={`absolute inset-0 bg-gradient-to-br ${currentTheme.background}`} />
      
      <div className="absolute inset-0">
        <div className={`absolute -top-48 -left-48 w-96 h-96 ${currentTheme.blobs[0]} rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob`} />
        <div className={`absolute -top-48 -right-48 w-96 h-96 ${currentTheme.blobs[1]} rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000`} />
        <div className={`absolute -bottom-48 left-1/2 -translate-x-1/2 w-96 h-96 ${currentTheme.blobs[2]} rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000`} />
      </div>

      <div className="absolute inset-0 backdrop-blur-sm" />
    </div>
  );
}

export default PageBackground;