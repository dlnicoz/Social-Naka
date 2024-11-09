import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, User, Menu, LogOut, PlusCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext'; // Adjust the import path

const Navbar = () => {
  const { user, signInWithGoogle, logout, error, clearError } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-neutral-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {error && (
          <div className="relative bg-red-50 p-3">
            <div className="flex">
              <div className="flex-1 flex justify-between">
                <p className="text-sm text-red-700">{error}</p>
                <button className="ml-3 flex-shrink-0" onClick={clearError}>
                  <X className="h-5 w-5 text-red-400" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <User className="w-8 h-8 text-indigo-600" />
            <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              SocialDeck
            </span>
          </Link>

          <div className="flex items-center space-x-4">
            <div className="relative hidden md:block">
              <input
                type="text"
                placeholder="Search profiles..."
                className="w-64 px-4 py-2 rounded-full bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <Search className="absolute right-3 top-2.5 w-5 h-5 text-neutral-400" />
            </div>
            
            {!user ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={signInWithGoogle}
                className="flex items-center space-x-2 px-6 py-2 rounded-full bg-white border-2 border-neutral-200 hover:border-neutral-300 text-neutral-700 font-medium transition-colors"
              >
                <img src="https://www.google.com/favicon.ico" alt="Google" className="w-4 h-4" />
                <span className="hidden sm:inline">Sign in with Google</span>
              </motion.button>
            ) : (
              <>
                {/* Create Card Button */}
                <Link to="/create">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center space-x-2 px-4 py-2 rounded-full bg-indigo-600 text-white"
                  >
                    <PlusCircle className="w-5 h-5" />
                    <span className="hidden sm:inline">Create Card</span>
                  </motion.button>
                </Link>

                <div className="relative">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="relative"
                  >
                    <img
                      src={user.profilePhoto || 'https://via.placeholder.com/150'}
                      alt="Profile"
                      className="w-10 h-10 rounded-full border-2 border-indigo-500"
                    />
                  </motion.button>

                  <AnimatePresence>
                    {isDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg py-1 border border-neutral-200"
                      >
                        <Link
                          to="/dashboard"
                          onClick={() => setIsDropdownOpen(false)}
                          className="block px-4 py-2 text-neutral-700 hover:bg-neutral-50"
                        >
                          Dashboard
                        </Link>
                        <button
                          onClick={logout}
                          className="flex items-center space-x-2 w-full px-4 py-2 text-red-600 hover:bg-neutral-50"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>Sign Out</span>
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </>
            )}

            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden py-4"
            >
              <div className="flex flex-col space-y-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search profiles..."
                    className="w-full px-4 py-2 rounded-full bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <Search className="absolute right-3 top-2.5 w-5 h-5 text-neutral-400" />
                </div>

                {user && (
                  <Link to="/create">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center space-x-2 w-full px-4 py-2 rounded-full bg-indigo-600 text-white"
                    >
                      <PlusCircle className="w-5 h-5" />
                      <span>Create Card</span>
                    </motion.button>
                  </Link>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}

export default Navbar;
