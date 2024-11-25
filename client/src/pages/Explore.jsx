import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import SocialCard from '../components/SocialCard';
import CATEGORIES from '../data/categoriesData';

const Explore = () => {
  const [users, setUsers] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const searchQuery = searchParams.get('search') || '';
    fetchSocialCards(searchQuery, selectedCategory);
  }, [searchParams, selectedCategory]);

  const fetchSocialCards = async (searchQuery = '', category = '') => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:5000/api/social-cards?search=${searchQuery}&category=${category}`
      );
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching social cards:', error);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };
  // Fetch users on component mount
  useEffect(() => {
    axios.get('http://localhost:5000/api/social-cards')
      .then(response => setUsers(response.data))
      .catch(error => console.error('Error fetching social cards:', error));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Category Filters */}
        <div className="flex justify-center space-x-4 mb-8">
          {CATEGORIES.slice(0, 3).map((cat) => (
            <button
              key={cat.category}
              onClick={() => setSelectedCategory(cat.category)}
              className={`px-6 py-2 rounded-lg font-medium border transition ${
                selectedCategory === cat.category
                  ? 'bg-blue-500 text-white border-blue-500'
                  : 'bg-white text-gray-800 border-gray-300 hover:bg-blue-50'
              }`}
            >
              {cat.category}
            </button>
          ))}
        </div>

        {/* Pinterest-style Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            <div className="col-span-full text-center text-gray-600">Loading...</div>
          ) : users.length > 0 ? (
            users.map((user) => (
              <div key={user._id || user.id}>
                <SocialCard user={user} />
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
  );
};

export default Explore;
