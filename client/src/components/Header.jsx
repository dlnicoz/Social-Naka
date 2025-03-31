import React, { useState, useEffect, useRef, useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { BadgePlus, Home, LogOut, Pencil, Share2, Search, Menu, X } from 'lucide-react'; // Added Search icon
import SocialIcon from '../assets/socialnakaicon.png';
import Avvvatars from 'avvvatars-react'; // Avatar generation
import { cn } from '../lib/utils';
import axios from 'axios'; // For fetching social card info
import { useScrollDirection } from './useScrollDirection';
import { AuthContext } from '../context/AuthContext'; // 🔹 Import AuthContext
import axiosInstance from '../utils/axiosInstance'; // 🔹 Use Axios instance

export default function Header() {
  const { user, logout } = useContext(AuthContext); // 🔹 Get auth state and logout function
  const location = useLocation(); // Current path
  const navigate = useNavigate(); // Add this to handle navigation
  const isDashboard = location.pathname === '/dashboard'; 
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('auth-token')); // Directly initialize from localStorage
  const [showDropdown, setShowDropdown] = useState(false); // Dropdown visibility
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // Mobile menu visibility
  const [hasSocialCard, setHasSocialCard] = useState(false); // Social card existence
  const [isSearchOpen, setIsSearchOpen] = useState(location.pathname === '/explore'); // Set initially based on location
  const dropdownRef = useRef(null); // Reference for dropdown menu
  const profileButtonRef = useRef(null); // Reference for profile button
  const dropdownTimerRef = useRef(null); // Timer for auto-hide dropdown
  const userName = localStorage.getItem('username') || 'User'; // Retrieve username
  const [searchValue, setSearchValue] = useState(''); // Track search input
  const isVisible = useScrollDirection();
  const isExplore = location.pathname === '/explore'; // Check if on explore page
  const fetchedOnce = useRef(false); // Prevent duplicate fetches

  const handleSearch = (event) => {
    const value = event.target.value;
    setSearchValue(value);

    const params = new URLSearchParams(location.search);
    params.set('search', value);

    if (!value) params.delete('search'); // Clear search if empty

    navigate(`/explore?${params.toString()}`);
  };

  // 🔹 Fetch Social Card (Only if logged in & not already fetched)
  useEffect(() => {
    if (!user || fetchedOnce.current) return;
    fetchedOnce.current = true;

    const fetchSocialCard = async () => {
      try {
        const response = await axiosInstance.get('/social-cards/me');
        if (response.status === 200) setHasSocialCard(true);
      } catch {
        setHasSocialCard(false);
      }
    };

    fetchSocialCard();
  }, [user]);

  // Handle logout
  const handleLogout = () => {
    logout(); // 🔹 Use AuthContext logout function
    navigate('/login');
  };

  // Reset the dropdown auto-hide timer
  const resetDropdownTimer = () => {
    if (!showDropdown) return; // Only reset timer when dropdown is open
    clearTimeout(dropdownTimerRef.current); // Clear existing timer
    dropdownTimerRef.current = setTimeout(() => {
      setShowDropdown(false); // Hide dropdown
    }, 3000);
  };

  // Show dropdown with auto-hide logic
  const handleProfileClick = () => {
    setShowDropdown((prev) => {
      const newState = !prev;
      if (newState) resetDropdownTimer(); // Reset the timer only when dropdown opens
      return newState;
    });
  };
  

  return (
    <motion.div
      initial={{ y: 0 }}
      animate={{ y: isVisible ? 0 : -110 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8 pt-6"
    >
      <header
        className={`max-w-7xl mx-auto bg-white border border-gray-200 shadow-lg transition-all duration-50 ease-in-out ${isMobileMenuOpen ? 'rounded-lg' : 'rounded-full'
          }`}
      >
        <nav className="relative px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Left Section with Logo and Mobile Menu Button */}
            <div className="flex items-center gap-6 pl-4">
              <Link to="/" className="flex items-center">
                <img src={SocialIcon} alt="Social Icon" className="h-8 w-8 sm:h-11 sm:w-11" />
              </Link>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center gap-4">
                {!isExplore && (
                  <>
                    <Link
                      to={isDashboard ? '/' : '/dashboard'}
                      className={cn(
                        'flex items-center gap-2 px-5 py-2.5 text-sm rounded-full transition-all duration-200',
                        'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      )}
                    >
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
                        {isDashboard ? <Home size={20} /> : hasSocialCard ? <Pencil size={20} /> : <BadgePlus size={20} />}
                      </motion.div>
                      <span className="font-medium">{isDashboard ? 'Home' : hasSocialCard ? 'Edit' : 'Create'}</span>
                    </Link>

                    {hasSocialCard && (
                      <Link
                        target="_blank"
                        rel="noopener noreferrer"
                        to={`/user/${userName}`}
                        className="flex items-center gap-2 px-5 py-2.5 text-sm rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 transition-all duration-300"
                      >
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                          <Share2 size={20} />
                        </motion.div>
                        <span className="font-medium">Share</span>
                      </Link>
                    )}
                  </>
                )}

                <Link
                  to="/explore"
                  className={cn(
                    'flex items-center gap-2 px-5 py-2.5 text-sm rounded-full transition-all duration-300',
                    isExplore ? 'bg-black text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  )}
                >
                  <Search size={20} />
                  <span className="font-medium">Explore</span>
                </Link>

                {/* Optimized Search Bar Animation */}
                {isExplore && (
                  <AnimatePresence>
                    <motion.div
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: 'auto' }} // Removed unnecessary width="100%"
                      exit={{ opacity: 0, width: 0 }}
                      transition={{ duration: 0.5 }}
                      className="relative flex-1 ml-2"
                    >
                      <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                        <Search className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        value={searchValue}
                        onChange={handleSearch}
                        placeholder="Search profession - football coach"
                        className="w-full pl-11 pr-10 py-2.5 text-sm rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 focus:border-gray-300"
                        autoFocus
                      />
                    </motion.div>
                  </AnimatePresence>
                )}
              </div>
            </div>


            {/* Right Section */}
            <div className="flex items-center gap-4">
              {/* Desktop User Menu */}
              <div className="hidden md:flex items-center gap-6">
                {isLoggedIn ? (
                  <div className="flex items-center gap-4">
                    <span className="text-xl font-semibold text-gray-800 font-poppins">
                      Hey, {userName}!
                    </span>
                    <div className="relative">
                      {/* Profile Avatar Button */}
                      <motion.button
                        ref={profileButtonRef}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setShowDropdown((prev) => !prev)} // Optimized state update
                        className="flex items-center rounded-full bg-gray-100 p-2 hover:bg-gray-200"
                      >
                        <Avvvatars value={userName} size={36} className="rounded-full" />
                      </motion.button>

                      {/* Optimized Dropdown */}
                      <AnimatePresence>
                        {showDropdown && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            transition={{ duration: 0.3 }}
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
                      className="px-5 py-2.5 text-sm rounded-full font-medium bg-gray-900 text-white hover:bg-gray-800"
                    >
                      Sign up free
                    </Link>
                  </>
                )}
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen((prev) => !prev)} // Functional state update
                className="md:hidden p-2 rounded-lg text-gray-500 hover:bg-gray-100"
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>

          </div>

          {/* Mobile Menu */}
          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="md:hidden py-4 space-y-4 border-t border-gray-200"
              >
                {/* Function to close mobile menu */}
                {(() => {
                  const handleCloseMobileMenu = () => setIsMobileMenuOpen(false);

                  return (
                    <>
                      {!isExplore && (
                        <>
                          <Link
                            to={isDashboard ? '/' : '/dashboard'}
                            onClick={handleCloseMobileMenu}
                            className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                          >
                            {isDashboard ? (
                              <Home size={20} />
                            ) : hasSocialCard ? (
                              <Pencil size={20} />
                            ) : (
                              <BadgePlus size={20} />
                            )}
                            <span>{isDashboard ? 'Home' : hasSocialCard ? 'Edit' : 'Create'}</span>
                          </Link>

                          {hasSocialCard && (
                            <Link
                              to={`/user/${userName}`}
                              onClick={handleCloseMobileMenu}
                              className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                            >
                              <Share2 size={20} />
                              <span>Share</span>
                            </Link>
                          )}
                        </>
                      )}

                      <Link
                        to="/explore"
                        onClick={handleCloseMobileMenu}
                        className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                      >
                        <Search size={20} />
                        <span>Explore</span>
                      </Link>

                      {isExplore && (
                        <div className="px-4">
                          <div className="relative">
                            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                              <Search className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                              type="text"
                              value={searchValue}
                              onChange={handleSearch}
                              placeholder="Search profession..."
                              className="w-full pl-11 pr-4 py-2 text-sm rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100"
                            />
                          </div>
                        </div>
                      )}

                      {isLoggedIn ? (
                        <>
                          <div className="px-4 py-2 text-sm font-medium text-gray-700">
                            Hey, {userName}!
                          </div>
                          <button
                            onClick={() => {
                              handleLogout();
                              handleCloseMobileMenu();
                            }}
                            className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                          >
                            <LogOut className="w-4 h-4 mr-2" />
                            <span>Sign Out</span>
                          </button>
                        </>
                      ) : (
                        <div className="px-4 space-y-2">
                          <Link
                            to="/login"
                            onClick={handleCloseMobileMenu}
                            className="block w-full px-4 py-2 text-sm text-center font-medium text-gray-700 bg-cyan-300 hover:bg-cyan-200 rounded-lg"
                          >
                            Log in
                          </Link>
                          <Link
                            to="/signup"
                            onClick={handleCloseMobileMenu}
                            className="block w-full px-4 py-2 text-sm text-center font-medium text-white bg-gray-900 rounded-lg hover:bg-gray-800"
                          >
                            Sign up free
                          </Link>
                        </div>
                      )}
                    </>
                  );
                })()}
              </motion.div>
            </AnimatePresence>
          )}

        </nav>
      </header>
    </motion.div>
  );
}
