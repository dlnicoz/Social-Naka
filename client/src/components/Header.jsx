import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { BadgePlus, Home, LogOut, Pencil, Share2, Search } from 'lucide-react'; // Added Search icon
import SocialIcon from '../assets/socialnakaicon.png';
import Avvvatars from 'avvvatars-react'; // Avatar generation
import { cn } from '../lib/utils';
import axios from 'axios'; // For fetching social card info

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login state
  const [showDropdown, setShowDropdown] = useState(false); // Dropdown visibility
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // Mobile menu visibility
  const [hasSocialCard, setHasSocialCard] = useState(false); // Social card existence
  const [isSearchVisible, setIsSearchVisible] = useState(false); // Toggle search visibility
  const [isSearchOpen, setIsSearchOpen] = useState(false); // Track search bar visibility state
  const location = useLocation(); // Current path
  const isExplore = location.pathname === '/explore'; // Check if on explore page
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

    // Axios Interceptor for refreshing tokens
    axios.interceptors.response.use(
      (response) => response, // Return the response if it's valid
      async (error) => {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
          // If 401 error occurs due to token expiry
          originalRequest._retry = true;

          const refreshToken = localStorage.getItem('refresh-token');
          if (!refreshToken) {
            alert('Session expired. Please log in again.');
            window.location = '/login'; // Redirect to login if refresh token is not available
            return Promise.reject(error);
          }

          // Try to get a new access token using refresh token
          try {
            const res = await axios.post('http://localhost:5000/api/users/refresh-token', { refreshToken });
            const newAccessToken = res.data.token;

            // Save the new access token in localStorage
            localStorage.setItem('auth-token', newAccessToken);

            // Update the original request with the new token
            originalRequest.headers['auth-token'] = newAccessToken;

            // Retry the original request with the new token
            return axios(originalRequest);
          } catch (err) {
            console.error('Error refreshing token:', err.message);
            alert('Session expired. Please log in again.');
            window.location = '/login'; // Redirect to login if refreshing the token fails
            return Promise.reject(err);
          }
        }
        return Promise.reject(error);
      }
    );
  }, [location.pathname]);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('auth-token'); // Remove access token
    localStorage.removeItem('refresh-token'); // Remove refresh token
    setIsLoggedIn(false);
    window.location = '/login'; // Redirect to login page
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
    if (isExplore) setIsSearchOpen(true)
    else setIsSearchOpen(false)
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

            {/* Conditionally Hide Buttons on Explore Page */}
            {!isExplore && (
              <>
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
                    {isDashboard ? (
                      <Home size={20} />
                    ) : hasSocialCard ? (
                      <Pencil size={20} />
                    ) : (
                      <BadgePlus size={20} />
                    )}
                  </motion.div>
                  <span className="font-medium">
                    {isDashboard ? 'Home' : hasSocialCard ? 'Edit' : 'Create'}
                  </span>
                </Link>


                {hasSocialCard && (
                  <Link
                    target="_blank"
                    rel="noopener noreferrer"
                    to={`/user/${userName}`}
                    className={cn(
                      'flex items-center gap-2 px-5 py-2.5 text-sm rounded-full transition-all duration-300', // Slower transitions
                      'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    )}
                  >
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5 }} // Smoother transition
                    >
                      <Share2 size={20} />
                    </motion.div>
                    <span className="font-medium">Share</span>
                  </Link>
                )}
              </>
            )}

            {/* Explore Button */}
            <Link
              to="/explore"
              className={cn(
                'flex items-center gap-2 px-5 py-2.5 text-sm rounded-full transition-all duration-300', // Slower transitions
                isExplore ? 'bg-black text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              )}
            >
              <Search size={20} />
              <span className="font-medium">Explore</span>
            </Link>

            {/* Search Input */}
            {isExplore && (
              <AnimatePresence>
                <motion.div
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: '100%' }}
                  exit={{ opacity: 0, width: 0 }}
                  transition={{ duration: 0.5 }} // Smoother transition
                  className="relative flex-1 ml-2"
                >
                  <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search username @alex"
                    className="w-full pl-11 pr-10 py-2.5 text-sm rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 focus:border-gray-300"
                    autoFocus
                  />
                </motion.div>
              </AnimatePresence>
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
                        transition={{ duration: 0.3 }} // Smoother transition
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
              transition={{ duration: 0.5 }} // Smoother transition
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
