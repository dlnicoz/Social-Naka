import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Image as ImageIcon, Palette, Link as LinkIcon, Eye, AlertCircle, MapPin, Phone, Mail } from 'lucide-react';
import { indianCities } from '../data/indianCities';
import { useNavigate } from 'react-router-dom'; // for navigation
import api from '../services/api'; // assuming this handles API requests

const DEFAULT_PROFILE_IMAGE = 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80';

const CreateCard = () => {
  const navigate = useNavigate(); // navigation hook
  const [formData, setFormData] = useState({
    name: '',
    profession: '',
    description: '',
    photoURL: '',
    location: '',
    theme: 'gradient',
    contact: {
      phone: '',
      email: ''
    },
    links: {
      instagram: '',
      twitter: '',
      website: '',
      github: '',
      linkedin: ''
    }
  });

  const [urlError, setUrlError] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const themes = [
    { name: 'gradient', label: 'Gradient' },
    { name: 'dark', label: 'Dark' },
    { name: 'elegant', label: 'Elegant' },
    { name: 'vibrant', label: 'Vibrant' },
    { name: 'minimal', label: 'Minimal' }
  ];

  const socialPlatforms = [
    { key: 'instagram', label: 'Instagram', placeholder: 'https://instagram.com/username' },
    { key: 'twitter', label: 'Twitter', placeholder: 'https://twitter.com/username' },
    { key: 'website', label: 'Website', placeholder: 'https://yourwebsite.com' },
    { key: 'github', label: 'GitHub', placeholder: 'https://github.com/username' },
    { key: 'linkedin', label: 'LinkedIn', placeholder: 'https://linkedin.com/in/username' }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [category, field] = name.split('.');
      setFormData((prev) => ({
        ...prev,
        [category]: {
          ...prev[category],
          [field]: value
        }
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleImageUrlChange = (e) => {
    const url = e.target.value;
    setImageUrl(url);
    if (!url) {
      setFormData((prev) => ({ ...prev, photoURL: '' }));
      setUrlError('');
      return;
    }
    validateImageUrl(url);
  };

  const handleImageUrlPaste = (e) => {
    const pastedUrl = e.clipboardData.getData('text');
    setImageUrl(pastedUrl);
    validateImageUrl(pastedUrl);
  };

  const validateImageUrl = async (url) => {
    if (!url) {
      setFormData((prev) => ({ ...prev, photoURL: '' }));
      setUrlError('');
      return;
    }

    try {
      const img = new Image();
      img.src = url;
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
      });
      setUrlError('');
      setFormData((prev) => ({ ...prev, photoURL: url }));
    } catch {
      setUrlError('Please enter a valid image URL');
      setFormData((prev) => ({ ...prev, photoURL: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/socialcards', formData);
      navigate('/dashboard');
    } catch (error) {
      console.error('Error creating social card:', error);
      alert(error.response?.data?.message || 'Failed to create social card. Please try again.');
    }
  };
  

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-8"
      >
        <div className="space-y-6">
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-6">
            <h1 className="text-2xl font-bold text-neutral-900 mb-6">Create Your Social Card</h1>
            
            <div className="space-y-6">
              {/* Profile Image URL */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="space-y-2"
              >
                <label className="block text-sm font-medium text-neutral-700">
                  Profile Image URL
                </label>
                <div className="flex items-center space-x-4">
                  <img
                    src={formData.photoURL || DEFAULT_PROFILE_IMAGE}
                    alt="Preview"
                    className="w-16 h-16 rounded-xl object-cover"
                  />
                  <input
                    type="url"
                    name="photoURL"
                    value={imageUrl}
                    onChange={handleImageUrlChange}
                    onPaste={handleImageUrlPaste}
                    placeholder="https://example.com/your-image.jpg"
                    className="flex-1 px-4 py-2 rounded-lg border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                {urlError && (
                  <p className="text-red-500 text-sm flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {urlError}
                  </p>
                )}
              </motion.div>

              {/* Basic Info */}
              <div className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <label className="block text-sm font-medium text-neutral-700">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="w-full px-4 py-2 rounded-lg border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <label className="block text-sm font-medium text-neutral-700">Profession</label>
                  <input
                    type="text"
                    name="profession"
                    value={formData.profession}
                    onChange={handleChange}
                    placeholder="UI/UX Designer"
                    className="w-full px-4 py-2 rounded-lg border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <label className="block text-sm font-medium text-neutral-700">Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Tell us about yourself..."
                    rows={4}
                    className="w-full px-4 py-2 rounded-lg border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <label className="block text-sm font-medium text-neutral-700">Location</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 w-5 h-5 text-neutral-400" />
                    <select
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-2 rounded-lg border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 appearance-none"
                      required
                    >
                      <option value="">Select a city</option>
                      {indianCities.map(city => (
                        <option key={city} value={city}>{city}</option>
                      ))}
                    </select>
                  </div>
                </motion.div>
              </div>

              {/* Contact Info */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
                className="space-y-4"
              >
                <h3 className="text-lg font-medium text-neutral-900">Contact Information</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Phone className="w-5 h-5 text-neutral-400" />
                    <input
                      type="tel"
                      name="contact.phone"
                      value={formData.contact.phone}
                      onChange={handleChange}
                      placeholder="Phone number"
                      className="flex-1 px-4 py-2 rounded-lg border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Mail className="w-5 h-5 text-neutral-400" />
                    <input
                      type="email"
                      name="contact.email"
                      value={formData.contact.email}
                      onChange={handleChange}
                      placeholder="Email address"
                      className="flex-1 px-4 py-2 rounded-lg border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </div>
              </motion.div>

              {/* Social Links */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 }}
                className="space-y-4"
              >
                <h3 className="text-lg font-medium text-neutral-900">Social Links</h3>
                <div className="space-y-3">
                  {socialPlatforms.map(platform => (
                    <div key={platform.key} className="flex items-center space-x-2">
                      <LinkIcon className="w-5 h-5 text-neutral-400" />
                      <input
                        type="url"
                        name={`links.${platform.key}`}
                        value={formData.links[platform.key]}
                        onChange={handleChange}
                        placeholder={platform.placeholder}
                        className="flex-1 px-4 py-2 rounded-lg border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Theme Selection */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 }}
              >
                <label className="block text-sm font-medium text-neutral-700">
                  Select Theme
                </label>
                <select
                  name="theme"
                  value={formData.theme}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  {themes.map(theme => (
                    <option key={theme.name} value={theme.name}>{theme.label}</option>
                  ))}
                </select>
              </motion.div>

              <button
                type="submit"
                className="mt-6 w-full py-2 px-4 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700"
              >
                Create Card
              </button>
            </div>
          </form>
        </div>

        {/* Preview */}
        <div className="lg:col-span-1 lg:flex justify-center">
          <div className={`w-full max-w-md rounded-2xl shadow-lg bg-${formData.theme}`}>
            <div className="p-6">
              <div className="flex justify-center">
                <img
                  src={formData.photoURL || DEFAULT_PROFILE_IMAGE}
                  alt="Profile Preview"
                  className="w-24 h-24 rounded-full object-cover"
                />
              </div>
              <h2 className="text-xl font-semibold text-center mt-4">{formData.name || 'John Doe'}</h2>
              <p className="text-sm text-center text-neutral-500">{formData.profession || 'Designer'}</p>
              <p className="text-sm text-center text-neutral-600 mt-2">{formData.description || 'Lorem ipsum dolor sit amet...'}</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CreateCard;
