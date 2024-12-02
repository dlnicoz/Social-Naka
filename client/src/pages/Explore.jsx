import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import SocialCard from '../components/SocialCard/index';
import categories from '../data/categoriesData';

const Explore = () => {
  const [users, setUsers] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(categories[0]?.category || '');
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);

  // Function to fetch social cards based on search query and category
  const fetchSocialCards = async (searchQuery = '', category = '') => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:5000/api/social-cards?search=${searchQuery}&category=${category}&limit=10`
      );
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching social cards:', error);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  // Effect to fetch social cards when search params or category changes
  useEffect(() => {
    const searchQuery = searchParams.get('search') || ''; // Get search query from URL params
    if (searchQuery) {
      // If there's a search query, fetch based on the query
      fetchSocialCards(searchQuery, '');
    } else {
      // If no search query, fetch based on category selection
      fetchSocialCards('', selectedCategory);
    }
  }, [searchParams, selectedCategory]);

  // Fetch users on initial load
  useEffect(() => {
    fetchSocialCards('', selectedCategory); // Default load without search
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="mt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Category Filters */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex gap-3 overflow-x-auto pb-6 pt-2">
            {categories.map((category, index) => (
              <motion.button
                key={category.category}
                onClick={() => setSelectedCategory(category.category)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${selectedCategory === category.category
                  ? 'bg-black text-white'
                  : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                  }`}
              >
                {category.category}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Pinterest-style Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-3 gap-12 space-y-4">
            {loading ? (
              <div className="col-span-full text-center text-gray-600">Loading...</div>
            ) : users.length > 0 ? (
              users.map((user) => (
                <div key={user._id || user.id} className="break-inside-avoid">
                  <SocialCard profile={user} />
                </div>
              ))
            ) : (
              <div className="col-span-full text-center text-gray-600">
                No users found for the selected category or search query.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Explore;
