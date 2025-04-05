import React, { useState, useEffect , useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Instagram, Youtube, Twitter, BarChart, Smartphone, Palette, Link as LinkIcon } from 'lucide-react';
// import CategorySlider from '../components/CategorySlider';
import { Filter, ArrowLeft, ArrowRight } from 'lucide-react';
import Footer from '../components/Footer'
import { cn } from '../lib/utils';
// import AuthContext  from '../context/AuthContext'; 

function Home() {
  // const { user } = useContext(AuthContext); // Get authentication state
  // const [users, setUsers] = useState([]);
  const apiUrl = import.meta.env.VITE_API_URL;

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

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-r from-rose-100 to-teal-100 pt-16 md:pt-24 lg:pt-32 pb-8 md:pb-12 lg:pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-6 lg:pt-8">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div className="order-2 lg:order-1 relative h-[300px] sm:h-[400px] lg:h-[500px]">
                <motion.img
                  alt="Social media image"
                  src="https://plus.unsplash.com/premium_photo-1685280886282-783846aa76c8?q=80&w=1460&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  className="w-full h-full object-cover rounded-xl shadow-lg"
                  initial={{ scale: 0.95 }}
                  animate={{ scale: 1 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                />
              </div>
              <div className="order-1 lg:order-2">
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-4 md:mb-6"
                >
                  Simplify Your Social Connections with SocialNaka!
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  className="text-base sm:text-lg lg:text-xl text-gray-600 mb-6 md:mb-8"
                >
                  Bring all your social links, events, and content into one beautifully designed page.
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  className="flex flex-col sm:flex-row gap-4"
                >
                  <Link to={"/dashboard"}>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-white text-cyan-900 rounded-full text-base lg:text-lg font-semibold hover:bg-cyan-50"
                    >
                      Get personalized page for free
                    </motion.button>
                  </Link>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Second Hero Section */}
        <div className="relative bg-gradient-to-r from-pink-600 to-purple-500 min-h-[80vh] lg:min-h-screen overflow-hidden py-16 md:py-24 lg:py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-white space-y-4 md:space-y-6"
              >
                <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight">
                  Share your SocialNaka from your Instagram, Youtube, Twitter and other bios
                </h1>
                <p className="text-base sm:text-lg lg:text-xl text-red-100">
                  Add your unique SocialNaka URL to all the platforms and places you find your audience. Then use your QR code to drive your offline traffic online.
                </p>
                <Link to="/login">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-white text-red-900 rounded-full text-base lg:text-lg font-semibold hover:bg-red-50"
                  >
                    Get started for free
                  </motion.button>
                </Link>
              </motion.div>

              <motion.div
                initial={{ scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200 }}
                className="relative h-[300px] sm:h-[400px] lg:h-[500px]"
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
        <div className="bg-white py-12 sm:py-16 lg:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 via-blue-500 to-green-400 p-1"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1, y: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
            >
              <div className="relative rounded-[calc(1.5rem-1px)] bg-white p-4 sm:p-8 lg:p-12">
                <div className="flex items-center justify-between">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={prevTestimonial}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="p-2 rounded-full hover:bg-neutral-100"
                  >
                    <ArrowLeft className="w-4 h-4 sm:w-6 sm:h-6" />
                  </motion.button>

                  <motion.div
                    key={currentTestimonial}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="text-center max-w-3xl mx-auto px-2 sm:px-4"
                  >
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-neutral-900 mb-4 sm:mb-6">
                      {testimonials[currentTestimonial].quote}
                    </h2>
                    <div className="flex items-center justify-center space-x-3 sm:space-x-4">
                      <img
                        src={testimonials[currentTestimonial].image}
                        alt={testimonials[currentTestimonial].author}
                        className="w-8 h-8 sm:w-12 sm:h-12 rounded-full object-cover"
                      />
                      <div className="text-left">
                        <p className="font-semibold text-neutral-900 text-sm sm:text-base">
                          {testimonials[currentTestimonial].author}
                        </p>
                        <p className="text-neutral-500 text-xs sm:text-sm">
                          {testimonials[currentTestimonial].role}
                        </p>
                      </div>
                    </div>
                  </motion.div>

                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    onClick={nextTestimonial}
                    className="p-2 rounded-full hover:bg-neutral-100"
                  >
                    <ArrowRight className="w-4 h-4 sm:w-6 sm:h-6" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* <CategorySlider /> */}
        <Footer />
      </div>
    </>
  );
}

export default Home;
