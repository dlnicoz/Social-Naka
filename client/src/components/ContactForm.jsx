import React, { useState, useEffect } from 'react'; // Importing useEffect to handle side effects
import { motion } from 'framer-motion';
import axiosInstance from '../utils/axiosInstance'; // Assuming axiosInstance is set up correctly for your API

export default function ContactForm() {
  const [email, setEmail] = useState('');
  const [userDetails, setUserDetails] = useState({ name: '', phone: '' });
  const [message, setMessage] = useState(''); // Added message state
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check login status
  useEffect(() => {
    const token = localStorage.getItem('auth-token');
    setIsLoggedIn(!!token); // If token exists, user is logged in
  }, []);

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
        message, // Sending the message data here
      });
      setEmail(''); // Clear the email field
      setMessage(''); // Clear the message field after sending
      alert('Request submitted successfully!'); // Show success alert
    } catch (error) {
      console.error('Error sending contact request:', error.message);
      alert('Failed to send. Please try again later.');
    }
  };

  return (
    <>
      {isLoggedIn && (
        <form onSubmit={handleSubmit} className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-lg">
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-purple-100">
                Name
              </label>
              <input
                type="text"
                id="name"
                value={userDetails.name}
                onChange={(e) => setUserDetails({ ...userDetails, name: e.target.value })}
                className="mt-1 block w-full rounded-lg bg-white/5 border border-purple-300/20 text-white placeholder-purple-300/50 focus:border-purple-300 focus:ring focus:ring-purple-300/20"
                placeholder="John Doe"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-purple-100">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full rounded-lg bg-white/5 border border-purple-300/20 text-white placeholder-purple-300/50 focus:border-purple-300 focus:ring focus:ring-purple-300/20"
                placeholder="john@example.com"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-purple-100">
                Message
              </label>
              <textarea
                id="message"
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="mt-1 block w-full rounded-lg bg-white/5 border border-purple-300/20 text-white placeholder-purple-300/50 focus:border-purple-300 focus:ring focus:ring-purple-300/20"
                placeholder="Your message here..."
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full py-3 px-4 rounded-lg bg-purple-500 text-white font-medium hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-purple-900 transition-colors"
            >
              Send Message
            </motion.button>
          </div>
        </form>
      )}
    </>
  );
}
