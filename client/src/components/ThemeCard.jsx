import React from 'react';
import { cn } from '../lib/utils';

// Define theme styles
const themeStyles = {
  minimal: 'bg-white border border-gray-200',
  gradient: 'bg-gradient-to-br from-purple-500 to-pink-500',
  neon: 'bg-black border-2 border-neon-green shadow-neon',
  retro: 'bg-yellow-100 border-2 border-orange-400',
};

export default function ThemeCard({ theme, isSelected, onClick, preview }) {
  return (
    <div
      onClick={onClick}
      className={cn(
        'rounded-lg p-6 cursor-pointer transition-all duration-300',
        themeStyles[theme],
        isSelected && 'ring-2 ring-blue-500',
        preview ? 'w-full h-[200px]' : 'w-[150px] h-[150px]'
      )}
    >
      <div className="flex flex-col h-full justify-between">
        <h3 className={cn(
          'text-lg font-semibold capitalize',
          theme === 'neon' && 'text-neon-green',
          theme === 'gradient' && 'text-white'
        )}>
          {theme}
        </h3>
        {preview && (
          <div className="space-y-2">
            <div className={cn(
              'h-2 w-24 rounded',
              theme === 'minimal' && 'bg-gray-200',
              theme === 'gradient' && 'bg-white/20',
              theme === 'neon' && 'bg-neon-green',
              theme === 'retro' && 'bg-orange-400'
            )} />
            <div className={cn(
              'h-2 w-16 rounded',
              theme === 'minimal' && 'bg-gray-200',
              theme === 'gradient' && 'bg-white/20',
              theme === 'neon' && 'bg-neon-green',
              theme === 'retro' && 'bg-orange-400'
            )} />
          </div>
        )}
      </div>
    </div>
  );
}
