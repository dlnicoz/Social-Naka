import React, { useState } from 'react';
import { Plus, Trash2, AlertCircle } from 'lucide-react';
import { socialPlatforms } from '../../data/socialPlatforms';

function SocialLinksField({ links, onChange }) {
  const [errors, setErrors] = useState({});

  const handleAddLink = () => {
    onChange([...links, { platform: '', url: '' }]);
  };

  const handleRemoveLink = (index) => {
    const newLinks = links.filter((_, i) => i !== index);
    onChange(newLinks);
    
    // Clear errors for removed link
    const newErrors = { ...errors };
    delete newErrors[index];
    setErrors(newErrors);
  };

  const validateUrl = (url, pattern) => {
    if (!url) return 'URL is required';
    if (!new RegExp(pattern).test(url)) {
      return 'Please enter a valid URL';
    }
    return '';
  };

  const handleLinkChange = (index, field, value) => {
    const newLinks = [...links];
    newLinks[index] = { ...newLinks[index], [field]: value };
    onChange(newLinks);

    // Validate URL when platform is selected or URL is changed
    if (field === 'platform' || field === 'url') {
      const platform = socialPlatforms.find(p => p.id === newLinks[index].platform);
      if (platform && newLinks[index].url) {
        const error = validateUrl(newLinks[index].url, platform.pattern);
        setErrors(prev => ({
          ...prev,
          [index]: error
        }));
      }
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="block text-gray-700 text-sm font-medium">
          Social Links
        </label>
        <button
          type="button"
          onClick={handleAddLink}
          className="inline-flex items-center gap-1 px-3 py-1.5 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors text-sm font-medium"
        >
          <Plus size={16} />
          Add Link
        </button>
      </div>
      
      {links.map((link, index) => (
        <div key={index} className="space-y-2">
          <div className="flex items-start gap-2">
            <div className="flex-1 space-y-2">
              <select
                value={link.platform}
                onChange={(e) => handleLinkChange(index, 'platform', e.target.value)}
                className="w-full px-4 py-3 bg-gray-100 text-gray-900 placeholder-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
              >
                <option value="">Select Platform</option>
                {socialPlatforms.map((platform) => (
                  <option key={platform.id} value={platform.id}>
                    {platform.name}
                  </option>
                ))}
              </select>
              
              {link.platform && (
                <div className="relative">
                  <input
                    type="url"
                    value={link.url}
                    onChange={(e) => handleLinkChange(index, 'url', e.target.value)}
                    placeholder={socialPlatforms.find(p => p.id === link.platform)?.placeholder}
                    className={`w-full px-4 py-3 bg-gray-100 text-gray-900 placeholder-gray-500 rounded-lg focus:outline-none focus:ring-2 ${
                      errors[index] ? 'ring-2 ring-red-400' : 'focus:ring-green-400'
                    }`}
                  />
                  {errors[index] && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center">
                      <AlertCircle className="text-red-500" size={16} />
                      <span className="ml-2 text-sm text-red-500">{errors[index]}</span>
                    </div>
                  )}
                </div>
              )}
            </div>
            <button
              type="button"
              onClick={() => handleRemoveLink(index)}
              className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
            >
              <Trash2 size={20} />
            </button>
          </div>
        </div>
      ))}
      
      {links.length === 0 && (
        <p className="text-gray-500 text-sm text-center py-4">
          No social links added. Click "Add Link" to get started.
        </p>
      )}
    </div>
  );
}

export default SocialLinksField;