import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Link as LinkIcon, Settings, Home, LogOut } from 'lucide-react';
import Avvvatars from 'avvvatars-react'; // Import Avvvatars
import { cn } from '../lib/utils';

export default function Header() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login state
  const [showDropdown, setShowDropdown] = useState(false); // Track dropdown visibility
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // Track mobile menu visibility
  const location = useLocation(); // Get the current location (path)
  
  const dropdownRef = useRef(null); // Reference for the dropdown menu
  const profileButtonRef = useRef(null); // Reference for the profile button
  const dropdownTimerRef = useRef(null); // Timer reference for the auto-hide feature

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

  // Check if current path is the Dashboard
  const isDashboard = location.pathname === '/dashboard';

  // Assuming you have the user info in localStorage or from the auth context
  const userName = localStorage.getItem('username') || 'User'; // Retrieve user name, fallback to 'User'

  // Function to reset the dropdown auto-hide timer
  const resetDropdownTimer = () => {
    // Clear any existing timer
    if (dropdownTimerRef.current) {
      clearTimeout(dropdownTimerRef.current);
    }
    
    // Set a new timer to close the dropdown after 2-3 seconds
    dropdownTimerRef.current = setTimeout(() => {
      setShowDropdown(false); // Hide the dropdown after the delay
    }, 2000); // You can adjust the time delay here (in milliseconds)
  };

  // Show dropdown with auto-hide logic
  const handleProfileClick = () => {
    setShowDropdown((prev) => {
      const newState = !prev;
      if (newState) {
        resetDropdownTimer(); // Reset the timer when the dropdown opens
      }
      return newState;
    });
  };

  // Reset the timer if the dropdown is open and user interacts with it
  useEffect(() => {
    if (showDropdown) {
      resetDropdownTimer();
    }
  }, [showDropdown]);

  return (
    <motion.div
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-6 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8"
    >
      <header className="max-w-7xl mx-auto bg-white rounded-full border border-gray-200 shadow-lg">
        <nav className="flex items-center justify-between h-20 px-8">
          {/* Left section */}
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2">
              <LinkIcon className="h-7 w-7 text-gray-700" />
            </Link>

            {/* Conditionally render Home icon or Settings icon */}
            <Link
              to={isDashboard ? '/' : '/dashboard'} // Link will change based on route
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
                  <Home size={20} /> // Display Home icon when on Dashboard
                ) : (
                  <Settings size={20} /> // Display Settings icon when not on Dashboard
                )}
              </motion.div>
              <span className="font-medium">{isDashboard ? 'Home' : 'Create'}</span>
            </Link>
          </div>

          {/* Right section */}
          <div className="flex items-center gap-6">
            {isLoggedIn ? (
              // Profile Section for Logged-in Users
              <div className="flex items-center gap-4">
                {/* Greeting with the user's name */}
                <span className="text-xl font-semibold text-gray-800 font-poppins">
                  Hey, {userName}!
                </span>

                {/* Profile photo */}
                <div className="relative">
                  <motion.button
                    ref={profileButtonRef} // Reference the profile button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleProfileClick} // Toggle dropdown
                    className="flex items-center rounded-full bg-gray-100 p-2 hover:bg-gray-200"
                  >
                    {/* Generate avatar using Avvvatars */}
                    <Avvvatars
                      value={userName} // Use the username to generate the avatar
                      size={32} // Adjust size as needed
                      className="rounded-full"
                    />
                  </motion.button>

                  <AnimatePresence>
                    {showDropdown && (
                      <motion.div
                        ref={dropdownRef} // Reference the dropdown menu
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
                {/* <Link dont remove this part
                  to="/dashboard"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Dashboard
                </Link> */}
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
