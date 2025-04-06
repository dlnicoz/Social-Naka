import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import SocialCard from '../components/SocialCard';
import categories from '../data/categoriesData';
import supabase from '../utils/supabase';

const Explore = () => {
  const [users, setUsers] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(categories[0]?.category || '');
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const firstRender = useRef(true);

  const fetchSocialCards = async (searchQuery = '', category = '') => {
    setLoading(true);

    try {
      let query = supabase
        .from('social_cards')
        .select('*')
        .order('created_at', { ascending: false });

      // Filter by search (name, slug, profession)
      if (searchQuery) {
        query = query.or(`name.ilike.%${searchQuery}%,slug.ilike.%${searchQuery}%,profession.ilike.%${searchQuery}%`);
      }

      // Filter by category (via professions list)
      if (category) {
        const cat = categories.find((c) => c.category === category);
        if (cat) {
          const professions = cat.professions;
          query = query.in('profession', professions);
        }
      }

      const { data, error } = await query;

      if (error) {
        console.error('Supabase fetch error:', error.message);
        setUsers([]);
      } else {
        setUsers(data || []);
      }

    } catch (err) {
      console.error('Unexpected error:', err);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  // On category or search query change
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      fetchSocialCards('', selectedCategory);
      return;
    }

    const searchQuery = searchParams.get('search') || '';

    fetchSocialCards(searchQuery, selectedCategory);
  }, [searchParams, selectedCategory]);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="mt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Category Filters */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex gap-3 overflow-x-auto pb-6 pt-2">
            {categories.map((category) => (
              <motion.button
                key={category.category}
                onClick={() => setSelectedCategory(category.category)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
                  selectedCategory === category.category
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
                <div key={user.id} className="break-inside-avoid">
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
