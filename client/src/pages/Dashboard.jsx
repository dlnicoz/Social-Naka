import React, { useState, useEffect } from 'react';
import { Plus, X } from 'lucide-react';
import ThemeCard from '../components/ThemeCard';
import SocialCard from '../components/SocialCard';
import { generateUUID } from '../lib/utils';
import axiosInstance from '../utils/axiosInstance';
import CATEGORIES from '../data/categoriesData';

const defaultUser = {
  name: 'John Doe',
  category:'',
  profession: '',
  phone: '+91 9922332233',
  location: 'Chembur, Mumbai',
  description: 'Passionate about creating beautiful web experiences',
  profileUrl: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d',
  theme: 'minimal',
  socialLinks: [
    { id: '1', platform: 'GitHub', url: 'https://github.com' },
    { id: '2', platform: 'Twitter', url: 'https://twitter.com' },
  ],
};

export default function Dashboard() {
  const [formData, setFormData] = useState(defaultUser);
  const [loading, setLoading] = useState(true);
  const [isNewCard, setIsNewCard] = useState(true);
  const [filteredProfessions, setFilteredProfessions] = useState([]);


  useEffect(() => {
    axiosInstance
      .get('/social-cards/me')
      .then((response) => {
        setFormData(response.data);
        setIsNewCard(false);
      })
      .catch((error) => {
        if (error.response?.status === 404) {
          console.log('No social card found, creating a new one.');
        } else {
          console.error('Error fetching social card:', error.message);
          alert('An error occurred while fetching your social card.');
        }
      })
      .finally(() => setLoading(false));
  }, []);

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    setFormData({ ...formData, category: selectedCategory, profession: '' });

    // Update the professions dropdown
    const categoryData = CATEGORIES.find((cat) => cat.category === selectedCategory);
    setFilteredProfessions(categoryData ? categoryData.professions : []);
  };

  const handleProfessionChange = (e) => {
    setFormData({ ...formData, profession: e.target.value });
  };

  const addSocialLink = () => {
    setFormData({
      ...formData,
      socialLinks: [
        ...formData.socialLinks,
        { id: generateUUID(), platform: '', url: '' },
      ],
    });
  };

  const removeSocialLink = (id) => {
    setFormData({
      ...formData,
      socialLinks: formData.socialLinks.filter((link) => link.id !== id),
    });
  };

  const updateSocialLink = (id, field, value) => {
    setFormData({
      ...formData,
      socialLinks: formData.socialLinks.map((link) =>
        link.id === id ? { ...link, [field]: value } : link
      ),
    });
  };

  const saveCard = () => {
    const apiCall = isNewCard
      ? axiosInstance.post('/social-cards', formData)
      : axiosInstance.put('/social-cards/me', formData);

    apiCall
      .then((response) => {
        console.log('Card saved:', response.data);
        alert('Social Card Saved Successfully!');
        setIsNewCard(false);
      })
      .catch((error) => {
        console.error('Error saving card:', error.response?.data || error.message);
        alert('Failed to save the card. Please check the required fields.');
      });
  };

  if (loading) {
    return <div>Loading...</div>; // Show a loading indicator while data is being fetched
  }
  return (
    <div className="min-h-screen bg-gray-50 py-12 pt-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            {isNewCard ? 'Create Your Social Hub' : 'Edit Your Social Hub'}
          </h1>
          <p className="mt-2 text-gray-600">Customize your profile and share it with the world</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Preview Section */}
          <div className="order-2 lg:order-1">
            <h2 className="text-xl font-semibold mb-4">Preview</h2>
            <SocialCard user={formData} />
          </div>

          {/* Form Section */}
          <div className="order-1 lg:order-2 bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-6">
              {isNewCard ? 'Create Your Profile' : 'Edit Your Profile'}
            </h2>
            <div className="space-y-6">
              {/* Basic Information */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Enter your name"
                    required
                  />
                </div>
                {/* Category and Profession Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Category</label>
                <select
                  value={formData.category}
                  onChange={handleCategoryChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                >
                  <option value="">Select a category</option>
                  {CATEGORIES.map((cat) => (
                    <option key={cat.category} value={cat.category}>
                      {cat.category}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Profession</label>
                <select
                  value={formData.profession}
                  onChange={handleProfessionChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                  disabled={!filteredProfessions.length}
                >
                  <option value="">Select a profession</option>
                  {filteredProfessions.map((prof) => (
                    <option key={prof} value={prof}>
                      {prof}
                    </option>
                  ))}
                </select>
              </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Phone</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Enter your phone number"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Location</label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Enter your location"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={3}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Write a brief description about yourself"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Profile Image URL</label>
                  <input
                    type="url"
                    value={formData.profileUrl}
                    onChange={(e) => setFormData({ ...formData, profileUrl: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Enter a profile image URL"
                    required
                  />
                </div>
              </div>
              {/* Theme Selection */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Choose Theme</h3>
                <div className="grid grid-cols-2 gap-4">
                  {['minimal', 'gradient', 'neon', 'retro'].map((theme) => (
                    <ThemeCard
                      key={theme}
                      theme={theme}
                      isSelected={formData.theme === theme}
                      onClick={() => setFormData({ ...formData, theme })}
                    />
                  ))}
                </div>
              </div>
              {/* Social Links */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Social Links</h3>
                  <button
                    onClick={addSocialLink}
                    className="flex items-center gap-2 text-sm text-blue-500 hover:text-blue-600"
                  >
                    <Plus size={16} />
                    Add Link
                  </button>
                </div>
                <div className="space-y-4">
                  {formData.socialLinks.map((link, index) => (
                    <div key={link.id || index} className="flex gap-4 items-start">
                      <div className="flex-1">
                        <input
                          type="text"
                          placeholder="Platform (e.g., Twitter, GitHub)"
                          value={link.platform}
                          onChange={(e) => updateSocialLink(link.id || index, 'platform', e.target.value)}
                          className="mb-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                        <input
                          type="url"
                          placeholder="URL"
                          value={link.url}
                          onChange={(e) => updateSocialLink(link.id || index, 'url', e.target.value)}
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                      </div>
                      <button
                        onClick={() => removeSocialLink(link.id || index)}
                        className="text-red-500 hover:text-red-600"
                      >
                        <X size={20} />
                      </button>
                    </div>
                  ))}
                </div>

              </div>

              {/* Save Button */}
              <button
                onClick={saveCard}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              >
                Save Card
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}