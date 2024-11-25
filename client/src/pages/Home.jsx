import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import SocialCard from '../components/SocialCard';
import CategorySlider from '../components/CategorySlider';
import Footer from '../components/Footer'

function Home() {
  const [users, setUsers] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check login status
  useEffect(() => {
    const token = localStorage.getItem('auth-token');
    setIsLoggedIn(!!token); // If token exists, user is logged in
  }, []);

  // Fetch users on component mount
  useEffect(() => {
    axios.get('http://localhost:5000/api/social-cards')
      .then(response => setUsers(response.data))
      .catch(error => console.error('Error fetching social cards:', error));
  }, []);

  return (
    <>
    <div className="min-h-screen bg-gray-50 ">
      {/* Hero Section */}
      
      <div className="bg-white border-b pt-16">
      <CategorySlider />
        {/* <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center ">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Connect Your Digital World
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Create your personalized social hub and share all your links in one beautiful page
          </p>
          <Link
            to="/dashboard"
            className="bg-blue-500 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-600 transition-colors"
          >
            Create Your Hub
          </Link>
        </div> */}
      </div>

      {/* Pinterest-style Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
          {users.map((user) => (
            <div key={user._id || user.id} className="break-inside-avoid">
              <SocialCard user={user} />
            </div>
          ))}

        </div>
      </div>
    </div>
    <Footer isLoggedIn={isLoggedIn} />
    </>
  );
}

export default Home;
