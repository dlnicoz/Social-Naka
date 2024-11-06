import React from 'react';
import { Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="mt-20 bg-white border-t border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="flex items-center space-x-2">
            <span className="text-neutral-600">Made with</span>
            <Heart className="w-4 h-4 text-red-500 fill-current" />
            <span className="text-neutral-600">for the Gen Z community</span>
          </div>
          <div className="flex space-x-6 text-sm text-neutral-500">
            <a href="#" className="hover:text-neutral-900">About</a>
            <a href="#" className="hover:text-neutral-900">Privacy</a>
            <a href="#" className="hover:text-neutral-900">Terms</a>
            <a href="#" className="hover:text-neutral-900">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;