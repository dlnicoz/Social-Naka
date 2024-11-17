import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Link as LinkIcon, Home, Settings } from 'lucide-react';
import { cn } from '../lib/utils';

export default function Header() {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  const NavLink = ({ to, children }) => (
    <Link
      to={to}
      className={cn(
        'flex items-center gap-2 px-4 py-2 rounded-lg transition-colors',
        isActive(to)
          ? 'bg-gray-100 text-gray-900'
          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
      )}
    >
      {children}
    </Link>
  );

  return (
    <header className="bg-white border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link to="/" className="flex items-center gap-2">
            <LinkIcon className="h-6 w-6 text-blue-500" />
            <span className="text-xl font-bold">LinkHub</span>
          </Link>

          <nav className="flex items-center gap-2">
            <NavLink to="/">
              <Home size={20} />
              <span>Home</span>
            </NavLink>
            <NavLink to="/dashboard">
              <Settings size={20} />
              <span>Create Your Hub</span>
            </NavLink>
          </nav>
        </div>
      </div>
    </header>
  );
}
