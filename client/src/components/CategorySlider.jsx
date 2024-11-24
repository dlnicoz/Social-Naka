import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SocialCard from './SocialCard';
import axiosInstance from '../utils/axiosInstance';
import CATEGORIES from '../data/categoriesData';

export default function CategorySlider() {
  const [currentIndex, setCurrentIndex] = useState(0); // Manual categories
  const [socialCards, setSocialCards] = useState([]); // Social cards fetched from the server
  const [loading, setLoading] = useState(false);

  const categoriesToShow = [CATEGORIES[0], CATEGORIES[3], CATEGORIES[5]]; // Manually pick categories

  useEffect(() => {
    fetchSocialCards(categoriesToShow[currentIndex].category);
  }, [currentIndex]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % categoriesToShow.length);
    }, 5000); // 5000 ms = 5 seconds

    return () => {
      clearInterval(interval); // Cleanup interval on unmount or when index changes
    };
  }, []); // Empty dependency array ensures it runs once when the component mounts

  // Fetch social cards based on the selected category
  const fetchSocialCards = async (category) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(`/social-cards?category=${category}`);
      setSocialCards(response.data);
    } catch (error) {
      console.error('Error fetching social cards:', error.message);
      setSocialCards([]);
    } finally {
      setLoading(false);
    }
  };

  // Handle navigation between categories
  const handleNavigation = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="relative py-20 overflow-hidden bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title and Category */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4">Get your next</h1>
          <motion.h2
            key={currentIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-5xl font-bold text-blue-400"
          >
            {categoriesToShow[currentIndex].category}
          </motion.h2>

          {/* Navigation Dots */}
          <div className="flex justify-center space-x-2 mt-6">
            {categoriesToShow.map((_, index) => (
              <button
                key={index}
                onClick={() => handleNavigation(index)}
                className={`w-2 h-2 rounded-full ${
                  index === currentIndex ? 'bg-gray-800 w-8' : 'bg-gray-300'
                } transition-all duration-300`}
              />
            ))}
          </div>
        </div>

        {/* Social Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {loading ? (
            <div className="col-span-full text-center text-gray-600">Loading...</div>
          ) : socialCards.length > 0 ? (
            <AnimatePresence>
              {socialCards.map((card, index) => (
                <motion.div
                  key={card._id || index}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <SocialCard user={card} />
                </motion.div>
              ))}
            </AnimatePresence>
          ) : (
            <div className="col-span-full text-center text-gray-600">
              No professionals found for this category.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
