import React from 'react';
import { themes } from '../themes';
import FormField from './FormField';
import SocialLinksField from './SocialLinksField';
import CategoryField from './CategoryField';
import PrivacySettings from './PrivacySettings';

function SocialCardForm({ data, onChange, onFileChange, errors, loading }) {
  const userName = localStorage.getItem('username') || 'User'; // Retrieve username

  const handleInputChange = (field, value) => {
    onChange({ ...data, [field]: value });
  };

  const handleSocialLinksChange = (newLinks) => {
    onChange({ ...data, socialLinks: newLinks });
  };

  const handleCategoryChange = (category) => {
    onChange({
      ...data,
      category,
      profession: '', // Reset profession when category changes
    });
  };

  const handlePrivacyToggle = () => {
    onChange({ ...data, isPublic: !data.isPublic });
  };

  const shareableLink = `${window.location.origin}/user/${userName}`;

  return (
    <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
      <PrivacySettings
        isPublic={data.isPublic}
        shareableLink={shareableLink}
        onToggle={handlePrivacyToggle}
      />
      <FormField
        label="Name"
        value={data.name}
        onChange={(value) => handleInputChange('name', value)}
        placeholder="Your name"
        error={errors?.name}
        disabled={loading}
      />

      <CategoryField
        selectedCategory={data.category}
        onCategoryChange={handleCategoryChange}
        selectedProfession={data.profession}
        onProfessionChange={(value) => handleInputChange('profession', value)}
        disabled={loading}
      />

      <FormField
        label="Location"
        value={data.location}
        onChange={(value) => handleInputChange('location', value)}
        placeholder="City, Country"
        error={errors?.location}
        disabled={loading}
      />

      {/* Use FormField for Profile Image Upload */}
      <FormField
        label="Upload Profile Image"
        value={data.profileImage}
        onChange={onFileChange} // The function that will handle the file change
        type="file"  // This indicates it's a file input
        error={errors?.profileImage}
        disabled={loading}
      />

      <FormField
        label="Description"
        value={data.description}
        onChange={(value) => handleInputChange('description', value)}
        placeholder="Tell us about yourself"
        multiline
        error={errors?.description}
        disabled={loading}
      />

      <div className="space-y-2">
        <label className="block text-gray-700 text-sm font-medium">Theme</label>
        <div className="grid grid-cols-2 gap-2">
          {Object.values(themes).map((theme) => (
            <button
              key={theme.id}
              type="button"
              onClick={() => handleInputChange('theme', theme.id)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all
                ${data.theme === theme.id
                  ? 'bg-gray-200 text-gray-900 ring-2 ring-green-400'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              disabled={loading}
            >
              {theme.name}
            </button>
          ))}
        </div>
      </div>

      <SocialLinksField
        links={data.socialLinks}
        onChange={handleSocialLinksChange}
        disabled={loading}
      />
    </form>
  );
}

export default SocialCardForm;
