import React, { useState, useEffect } from 'react';
import { Plus, X } from 'lucide-react';
import ThemeCard from '../components/ThemeCard';
// import SocialCard from '../components/SocialCard';
import { generateUUID } from '../lib/utils';
import axiosInstance from '../utils/axiosInstance';
import CATEGORIES from '../data/categoriesData';
import themes from '../components/themes';
import SocialCardUp from '../components/SocialCard';

const defaultUser = {
  name: 'John Doe',
  category: '', // Added category field
  profession: '', // Added profession field
  phone: '+91 9922332233',
  location: 'Chembur, Mumbai',
  description: 'Passionate about creating beautiful web experiences',
  profileUrl: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d',
  theme: 'gradient',
  socialLinks: [
    { id: '1', platform: 'GitHub', url: 'https://github.com' },
    { id: '2', platform: 'Twitter', url: 'https://twitter.com' },
  ],
};

export default function Dashboard() {
  const [formData, setFormData] = useState(defaultUser); // State for form data
  const [loading, setLoading] = useState(true); // State to track loading
  const [isNewCard, setIsNewCard] = useState(true); // State to check if card is new
  const [filteredProfessions, setFilteredProfessions] = useState([]); // State for filtered professions
  const [currentTheme, setCurrentTheme] = useState('gradient'); // State for theme selection

  // Fetch user data on component mount
  useEffect(() => {
    axiosInstance
      .get('/social-cards/me')
      .then((response) => {
        setFormData(response.data);
        setIsNewCard(false);
        // Ensure the current theme is set based on the fetched data
        setCurrentTheme(response.data.theme || 'gradient');  // Use default 'gradient' if no theme found
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


  // Handle category change
  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    setFormData({ ...formData, category: selectedCategory, profession: '' });

    // Ensure dropdown resets
    const categoryData = CATEGORIES.find((cat) => cat.category === selectedCategory);
    setFilteredProfessions(categoryData ? categoryData.professions : []);
  };

  // Handle profession change
  const handleProfessionChange = (e) => {
    const selectedProfession = e.target.value;
    setFormData({ ...formData, profession: selectedProfession });
  };


  // Add a new social link
  const addSocialLink = () => {
    setFormData({
      ...formData,
      socialLinks: [
        ...formData.socialLinks,
        { id: generateUUID(), platform: '', url: '' }, // Use generateUUID for unique IDs
      ],
    });
  };


  // Remove a social link
  const removeSocialLink = (id) => {
    setFormData({
      ...formData,
      socialLinks: formData.socialLinks.filter((link) => link.id !== id),
    });
  };

  // Update social link details
  const updateSocialLink = (id, field, value) => {
    setFormData({
      ...formData,
      socialLinks: formData.socialLinks.map((link) =>
        link.id === id ? { ...link, [field]: value } : link
      ),
    });
  };


  // Save the social card
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

        console.log(formData.socialLinks);

        console.error('Error saving card:', error.response?.data || error.message);
        alert('Failed to save the card. Please check the required fields.');
      });
  };

  if (loading) {
    return <div>Loading...</div>; // Show loading indicator while fetching data
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
            <div className="max-w-md mx-auto">
              {/* <SocialCard user={formData} /> */}
              <SocialCardUp profile={formData} />
            </div>

          </div>

          {/* Form Section */}
          <div className="order-1 lg:order-2 bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-6">
              {isNewCard ? 'Create Your Profile' : 'Edit Your Profile'}
            </h2>
            <div className="space-y-6">
              {/* Basic Information */}
              <div className="space-y-4">
                {/* Name Input */}
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

                {/* Category Dropdown */}
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

                {/* Profession Dropdown */}
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

                {/* Phone Input */}
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

                {/* Location Input */}
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

                {/* Description */}
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

                {/* Profile Image URL */}
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
              <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 shadow-lg">
                <h3 className="text-lg font-semibold text-black mb-3">Choose Theme</h3>
                <div className="grid grid-cols-2 gap-2">
                  {Object.values(themes).map((theme) => (
                    <button
                      key={theme.id}
                      onClick={() => {
                        setCurrentTheme(theme.id);  // Update the currentTheme state
                        setFormData({ ...formData, theme: theme.id });  // Update the formData theme to reflect the selected theme
                      }}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-all
                      ${currentTheme === theme.id
                          ? 'bg-white/20 text-black ring-2 ring-green-400'
                          : 'bg-white/10 text-black/80 hover:bg-black/20'
                        }`}
                    >
                      {theme.name}
                    </button>

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
                  {formData.socialLinks.map((link) => (
                    <div key={link.id} className="flex gap-4 items-start">
                      <div className="flex-1">
                        <input
                          type="text"
                          placeholder="Platform (e.g., Twitter, GitHub)"
                          value={link.platform}
                          onChange={(e) =>
                            updateSocialLink(link.id, 'platform', e.target.value)
                          }
                          className="mb-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                        <input
                          type="url"
                          placeholder="URL"
                          value={link.url}
                          onChange={(e) => updateSocialLink(link.id, 'url', e.target.value)}
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />{/* Social Links */}
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
                  {formData.socialLinks.map((link) => (
                    <div key={link.id} className="flex gap-4 items-start">
                      <div className="flex-1">
                        <input
                          type="text"
                          placeholder="Platform (e.g., Twitter, GitHub)"
                          value={link.platform}
                          onChange={(e) =>
                            updateSocialLink(link.id, 'platform', e.target.value)
                          }
                          className="mb-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                        <input
                          type="url"
                          placeholder="URL"
                          value={link.url}
                          onChange={(e) => updateSocialLink(link.id, 'url', e.target.value)}
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                      </div>
                      <button
                        onClick={() => removeSocialLink(link.id)}
                        className="text-red-500 hover:text-red-600"
                      >
                        <X size={20} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Save Button */}
                      </div>
                      <button
                        onClick={() => removeSocialLink(link.id)}
                        className="text-red-500 hover:text-red-600"
                      >
                        <X size={20} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Save Button */}


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
