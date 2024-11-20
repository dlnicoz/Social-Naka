import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { BadgePlus, Home, LogOut, Pencil, Share2 } from 'lucide-react';
import SocialIcon from '../assets/socialnakaicon.png'

import Avvvatars from 'avvvatars-react'; // Avatar generation
import { cn } from '../lib/utils';
import axios from 'axios'; // For fetching social card info

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login state
  const [showDropdown, setShowDropdown] = useState(false); // Dropdown visibility
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // Mobile menu visibility
  const [hasSocialCard, setHasSocialCard] = useState(false); // Social card existence
  const location = useLocation(); // Current path
  const dropdownRef = useRef(null); // Reference for dropdown menu
  const profileButtonRef = useRef(null); // Reference for profile button
  const dropdownTimerRef = useRef(null); // Timer for auto-hide dropdown
  const userName = localStorage.getItem('username') || 'User'; // Retrieve username
  // Check login state and fetch social card existence
  useEffect(() => {
    const token = localStorage.getItem('auth-token');
    setIsLoggedIn(!!token);
    if (token) {
      axios
        .get('http://localhost:5000/api/social-cards/me', {
          headers: { 'auth-token': token },
        })
        .then((response) => {
          if (response.status === 200) setHasSocialCard(true);
        })
        .catch(() => setHasSocialCard(false));
    }
  }, []);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('auth-token');
    setIsLoggedIn(false);
    window.location = '/login';
  };

  // Reset the dropdown auto-hide timer
  const resetDropdownTimer = () => {
    if (dropdownTimerRef.current) {
      clearTimeout(dropdownTimerRef.current); // Clear existing timer
    }
    // Set a new timer to close the dropdown after 3 seconds
    dropdownTimerRef.current = setTimeout(() => {
      setShowDropdown(false); // Hide dropdown
    }, 3000);
  };

  // Show dropdown with auto-hide logic
  const handleProfileClick = () => {
    setShowDropdown((prev) => {
      const newState = !prev;
      if (newState) resetDropdownTimer(); // Reset the timer when dropdown opens
      return newState;
    });
  };

  // Reset timer if user interacts with dropdown
  useEffect(() => {
    if (showDropdown) resetDropdownTimer();
  }, [showDropdown]);

  // Check if the current route is the Dashboard
  const isDashboard = location.pathname === '/dashboard';
  return (
    <motion.div
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-6 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8"
    >
      <header className="max-w-7xl mx-auto bg-white rounded-full border border-gray-200 shadow-lg">
        <nav className="flex items-center justify-between h-20 px-8">
          {/* Left Section */}
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2">
              <img src={SocialIcon} alt="Social Icon" className="h-11 w-11 text-gray-700" />
            </Link>


            <Link
              to={isDashboard ? '/' : '/dashboard'}
              className={cn(
                'flex items-center gap-2 px-5 py-2.5 text-sm rounded-full transition-all duration-200',
                'bg-gray-100 text-gray-700 hover:bg-gray-200'
              )}
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {isDashboard ? (<Home size={20} />) : hasSocialCard ? (<Pencil size={20} />) : (<BadgePlus size={20} />)}
              </motion.div>
              <span className="font-medium">{isDashboard ? 'Home' : (hasSocialCard ? 'edit' : 'create')}</span>
            </Link>
            {/* Share Button */}
            {hasSocialCard && (
              <Link
                target="_blank"
                 rel="noopener noreferrer"
                to={`/user/${userName}`} // Link to user's dedicated page
                className={cn(
                  'flex items-center gap-2 px-5 py-2.5 text-sm rounded-full transition-all duration-200',
                  'bg-gray-100 text-gray-700 hover:bg-gray-200'
                )}
              >
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Share2 size={20} />
                </motion.div>

                <span className="font-medium">share</span>
              </Link>
            )}
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-6">
            {isLoggedIn ? (
              <div className="flex items-center gap-4">
                <span className="text-xl font-semibold text-gray-800 font-poppins">
                  Hey, {userName}!
                </span>
                <div className="relative">
                  <motion.button
                    ref={profileButtonRef}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleProfileClick}
                    className="flex items-center rounded-full bg-gray-100 p-2 hover:bg-gray-200"
                  >
                    <Avvvatars value={userName} size={36} className="rounded-full" />
                  </motion.button>
                  <AnimatePresence>
                    {showDropdown && (
                      <motion.div
                        ref={dropdownRef}
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
              </div>
            ) : (
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
                    'px-5 py-2.5 text-sm rounded-full font-medium bg-gray-900 text-white hover:bg-gray-800'
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
          <span className="text-2xl">☰</span>
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
                {hasSocialCard && (
                  <Link
                    to={`/user/${userName}`}
                    className="block px-4 py-2 text-blue-500 hover:bg-gray-100"
                  >
                    Share My Card
                  </Link>
                )}
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