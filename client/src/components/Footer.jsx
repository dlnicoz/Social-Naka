import React, { useState, useEffect } from 'react';
import { Heart, Send } from 'lucide-react';
import axiosInstance from '../utils/axiosInstance';

const Footer = ({ isLoggedIn }) => {
  const [email, setEmail] = useState('');
  const [userDetails, setUserDetails] = useState({ name: '', phone: '' });
  const [showPopup, setShowPopup] = useState(false);

  // Fetch user details when the component loads
  useEffect(() => {
    if (isLoggedIn) {
      // Simulate fetching user data from local storage or an API
      const name = localStorage.getItem('username') || 'Guest';
      const phone = localStorage.getItem('phone') || ''; // Assume `phone` is stored in localStorage
      setUserDetails({ name, phone });
    }
  }, [isLoggedIn]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send email, name, and phone in the request
      await axiosInstance.post('/users/contact', {
        email,
        name: userDetails.name,
        phone: userDetails.phone,
      });

      setShowPopup(true); // Show confirmation popup
      setTimeout(() => setShowPopup(false), 3000); // Hide popup after 3 seconds
      setEmail(''); // Clear the email field
    } catch (error) {
      console.error('Error sending contact request:', error.message);
      alert('Failed to send. Please try again later.');
    }
  };

  return (
    <footer className="mt-20 bg-white border-t border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center space-y-8">
          {/* Show Get in Touch only when logged in */}
          {isLoggedIn && (
            <div className="w-full max-w-md">
              <h3 className="text-lg font-semibold text-neutral-900 text-center mb-4">
                Get in Touch
              </h3>
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 rounded-lg border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
                <button
                  type="submit"
                  className="px-6 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 flex items-center justify-center space-x-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Subscribe</span>
                </button>
              </form>
            </div>
          )}

          {/* Popup */}
          {showPopup && (
            <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg">
              Thank you! We'll get in touch within 24 hours.
            </div>
          )}

          {/* Footer Links */}
          <div className="flex flex-col items-center space-y-4 w-full max-w-lg">
            <div className="flex items-center space-x-2">
              <span className="text-neutral-600">Made with</span>
              <Heart className="w-4 h-4 text-red-500 fill-current" />
              <a
                href="https://dheeraj.sahani.dev/"
                target="_blank"
                rel="noreferrer noopener"
                className="hover:text-neutral-900"
              >
                <span className="text-neutral-600">by dlnicoz</span>
              </a>
            </div>

            <div className="flex flex-wrap justify-center gap-6 text-sm text-neutral-500">
              <a href="#" className="hover:text-neutral-900">About</a>
              <a href="#" className="hover:text-neutral-900">Privacy</a>
              <a href="#" className="hover:text-neutral-900">Terms</a>
              <a href="#" className="hover:text-neutral-900">Contact</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
