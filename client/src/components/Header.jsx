import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Link as LinkIcon, Settings, UserCircle, LogOut } from 'lucide-react';
import { cn } from '../lib/utils';

export default function Header() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login state
  const [showDropdown, setShowDropdown] = useState(false); // Track dropdown visibility
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // Track mobile menu visibility

  // Check login state on mount
  useEffect(() => {
    const token = localStorage.getItem('auth-token');
    setIsLoggedIn(!!token); // Convert token existence to boolean
  }, []);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('auth-token'); // Remove token
    setIsLoggedIn(false); // Update state
    window.location = '/'; // Redirect to homepage
  };

  return (
    <motion.div
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-6 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8" // Add top margin here to give space from top
    >
      <header className="max-w-7xl mx-auto bg-white rounded-full border border-gray-200 shadow-lg">
        <nav className="flex items-center justify-between h-20 px-8">
          {/* Left section */}
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2">
              <LinkIcon className="h-7 w-7 text-gray-700" />
            </Link>

            <Link
              to="/dashboard"
              className={cn(
                'flex items-center gap-2 px-5 py-2.5 text-sm rounded-full transition-all duration-200',
                'bg-gray-100 text-gray-700 hover:bg-gray-200'
              )}
            >
              <Settings size={20} />
              <span className="font-medium">Create</span>
            </Link>
          </div>

          {/* Right section */}
          <div className="flex items-center gap-6">
            {isLoggedIn ? (
              // Profile Section for Logged-in Users
              <div className="relative">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowDropdown((prev) => !prev)} // Toggle dropdown
                  className="flex items-center rounded-full bg-gray-100 p-2 hover:bg-gray-200"
                >
                  <UserCircle className="h-8 w-8 text-gray-700" />
                </motion.button>

                <AnimatePresence>
                  {showDropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50"
                    >
                      <Link
                        to="/dashboard"
                        onClick={() => setShowDropdown(false)}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Dashboard
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="flex items-center space-x-2 w-full px-4 py-2 text-red-600 hover:bg-gray-100"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              // Login and Sign Up Buttons for Guests
              <>
                <Link
                  to="/login"
                  className="rounded-lg bg-cyan-300 hover:bg-cyan-200 px-5 py-2.5 text-sm text-gray-700 hover:text-gray-900 font-medium"
                >
                  Log in
                </Link>
                <Link
                  to="/signup"
                  className={cn(
                    'px-5 py-2.5 text-sm rounded-full font-medium',
                    'bg-gray-900 text-white hover:bg-gray-800'
                  )}
                >
                  Sign up free
                </Link>
              </>
            )}
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          className="md:hidden p-2 text-gray-700"
        >
          <span className="text-2xl">☰</span> {/* Hamburger icon for mobile */}
        </button>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden py-4 bg-white border-t border-gray-200"
            >
              <div className="flex flex-col space-y-4">
                <Link
                  to="/dashboard"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="block px-4 py-2 text-red-600 hover:bg-gray-100"
                >
                  Sign Out
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </motion.div>
  );
}
