import React from 'react';
import { themes } from '../themes';
import FormField from './FormField';
import SocialLinksField from './SocialLinksField';

function SocialCardForm({ data, onChange }) {
  const handleInputChange = (field, value) => {
    onChange({ ...data, [field]: value });
  };

  const handleSocialLinksChange = (newLinks) => {
    onChange({ ...data, socialLinks: newLinks });
  };

  return (
    <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
      <FormField
        label="Name"
        value={data.name}
        onChange={(value) => handleInputChange('name', value)}
        placeholder="Your name"
      />
      
      <FormField
        label="Profession"
        value={data.profession}
        onChange={(value) => handleInputChange('profession', value)}
        placeholder="Your profession"
      />
      
      <FormField
        label="Location"
        value={data.location}
        onChange={(value) => handleInputChange('location', value)}
        placeholder="City, Country"
      />
      
      <FormField
        label="Profile Image URL"
        value={data.profileUrl}
        onChange={(value) => handleInputChange('profileUrl', value)}
        placeholder="https://example.com/image.jpg"
      />
      
      <FormField
        label="Description"
        value={data.description}
        onChange={(value) => handleInputChange('description', value)}
        placeholder="Tell us about yourself"
        multiline
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
            >
              {theme.name}
            </button>
          ))}
        </div>
      </div>
      
      <SocialLinksField
        links={data.socialLinks}
        onChange={handleSocialLinksChange}
      />
    </form>
  );
}

export default SocialCardForm;