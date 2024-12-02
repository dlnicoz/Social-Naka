import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Instagram, Youtube, Twitter, BarChart, Smartphone, Palette, Link as LinkIcon } from 'lucide-react';
// import CategorySlider from '../components/CategorySlider';
import { Filter, ArrowLeft, ArrowRight } from 'lucide-react';
import Footer from '../components/Footer'
import axiosInstance from '../utils/axiosInstance';
import mobileimage from '../assets/singlemobile.jpg'

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
      quote: "I use SocialDeck's analytics to better understand my audience and what converts them.",
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
        {/* Welcome Section */}
        <section className="relative overflow-hidden bg-gradient-to-b from-purple-50 to-white pt-32 pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="relative"
              >

                <img
                  src={mobileimage}
                  alt="Profile Preview"
                  className="w-48 h-48 object-cover rounded-full border-4 border-white shadow-lg"
                />

              </motion.div>
              <div>
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
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
        <div className="relative bg-gradient-to-br from-red-900 to-red-950 min-h-screen overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-white space-y-6"
              >
                <h1 className="text-5xl sm:text-6xl font-bold leading-tight">
                  Share your SocialNaka from your Instagram , Youtube , Twitter and other bios
                </h1>
                <p className="text-xl text-red-100">
                  Add your unique Linktree URL to all the platforms and places you find your audience. Then use your QR code to drive your offline traffic online.
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-red-900 px-8 py-3 rounded-full text-lg font-semibold hover:bg-red-50"
                >
                  Get started for free
                </motion.button>
              </motion.div>

              <div className="relative h-[600px]">
                images goes here
              </div>
            </div>
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="bg-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 via-blue-500 to-green-400 p-1">
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
            </div>
          </div>
        </div>
        <div className="border-b">
          {/* <CategorySlider /> */}
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
        <Footer />
      </div>
    </>
  );
}

export default Home;
