import React from 'react';
import { Sparkles } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import PageBackground from './PageBackground';

function Layout({ children }) {
  const location = useLocation();
  const isProfilePage = location.pathname === '/profile';

  return (
    <div className="min-h-screen">
      <PageBackground theme={isProfilePage ? 'gradient' : 'midnight'} />
      
      <nav className="relative z-10 p-6 backdrop-blur-sm bg-white/10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-1">
            <span className="text-2xl font-bold text-white">Linktree</span>
            <Sparkles className="text-green-400" size={24} />
          </Link>
          
          {!isProfilePage && (
            <Link
              to="/profile"
              className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white font-medium transition-colors"
            >
              View Demo
            </Link>
          )}
        </div>
      </nav>

      <main className="relative z-10">
        {children}
      </main>
    </div>
  );
}

export default Layout;