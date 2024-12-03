import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Instagram, Youtube, Twitter, BarChart, Smartphone, Palette, Link as LinkIcon } from 'lucide-react';
import CategorySlider from '../components/CategorySlider';
import { Filter, ArrowLeft, ArrowRight } from 'lucide-react';
import Footer from '../components/Footer'
import axiosInstance from '../utils/axiosInstance';

function Home() {
  const [users, setUsers] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };
  
  const testimonials = [
    {
      quote: "I use SocialNaka analytics to better understand my audience and what converts them.",
      author: "Luke Kidgell",
      role: "Comedian",
      image: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?auto=format&fit=crop&q=80"
    },
    {
      quote: "This platform has transformed how I connect with my followers across all social networks.",
      author: "Sarah Chen",
      role: "Content Creator",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80"
    },
    {
      quote: "The best tool I've found for managing my social media presence effectively.",
      author: "Marcus Zhang",
      role: "Digital Artist",
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80"
    }
  ];

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
        <section className="relative overflow-hidden bg-gradient-to-r from-rose-100 to-teal-100 pt-32 pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="relative h-[500px]">
                <motion.img
                  alt="Social media image"
                  src="https://plus.unsplash.com/premium_photo-1685280886282-783846aa76c8?q=80&w=1460&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  className="w-full h-full object-cover rounded-xl shadow-lg"
                  initial={{ scale: 0.95 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                />
              </div>
              <div>
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="text-6xl font-bold text-gray-900 mb-6"
                >
                  Simplify Your Social Connections with SocialNaka!
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-xl text-gray-600 mb-8"
                >
                  Bring all your social links, events, and content into one beautifully designed page.
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="flex gap-4"
                >
                  <Link
                    to="/signup"
                    className="px-8 py-4 bg-purple-600 text-white rounded-full font-semibold hover:bg-purple-700 transition-colors"
                  >
                    Get Started for Free
                  </Link>
                  <Link
                    to="/learn-more"
                    className="px-8 py-4 bg-white text-purple-600 rounded-full font-semibold border-2 border-purple-600 hover:bg-purple-50 transition-colors"
                  >
                    Learn More
                  </Link>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Hero Section */}
        <div className="relative bg-gradient-to-r from-pink-600 to-purple-500 min-h-screen overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="text-white space-y-6"
              >
                <h1 className="text-5xl sm:text-6xl font-bold leading-tight">
                  Share your SocialNaka from your Instagram, Youtube, Twitter and other bios
                </h1>
                <p className="text-xl text-red-100">
                  Add your unique SocialNaka URL to all the platforms and places you find your audience. Then use your QR code to drive your offline traffic online.
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-red-900 px-8 py-3 rounded-full text-lg font-semibold hover:bg-red-50"
                >
                  Get started for free
                </motion.button>
              </motion.div>

              <motion.div
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200 }}
                className="relative h-[500px]"
              >
                <img
                  src="https://plus.unsplash.com/premium_photo-1685193950944-53efdddf79a9?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Social media image"
                  className="w-full h-full object-cover rounded-xl shadow-lg"
                />
              </motion.div>
            </div>
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="bg-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 via-blue-500 to-green-400 p-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
            >
              <div className="relative rounded-[calc(1.5rem-1px)] bg-white p-8 sm:p-12">
                <div className="flex items-center justify-between">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={prevTestimonial}
                    className="p-2 rounded-full hover:bg-neutral-100"
                  >
                    <ArrowLeft className="w-6 h-6" />
                  </motion.button>

                  <motion.div
                    key={currentTestimonial}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="text-center max-w-3xl mx-auto px-4"
                  >
                    <h2 className="text-4xl sm:text-5xl font-bold text-neutral-900 mb-6">
                      {testimonials[currentTestimonial].quote}
                    </h2>
                    <div className="flex items-center justify-center space-x-4">
                      <img
                        src={testimonials[currentTestimonial].image}
                        alt={testimonials[currentTestimonial].author}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div className="text-left">
                        <p className="font-semibold text-neutral-900">
                          {testimonials[currentTestimonial].author}
                        </p>
                        <p className="text-neutral-500">
                          {testimonials[currentTestimonial].role}
                        </p>
                      </div>
                    </div>
                  </motion.div>

                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={nextTestimonial}
                    className="p-2 rounded-full hover:bg-neutral-100"
                  >
                    <ArrowRight className="w-6 h-6" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
        
        <CategorySlider />

        <Footer />
      </div>
    </>
  );
}

export default Home;
