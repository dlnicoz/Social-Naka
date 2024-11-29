import React from 'react';
import { Plus, Trash2 } from 'lucide-react';

function SocialLinksField({ links, onChange }) {
  const handleAddLink = () => {
    onChange([...links, { platform: '', url: '' }]);
  };

  const handleRemoveLink = (index) => {
    const newLinks = links.filter((_, i) => i !== index);
    onChange(newLinks);
  };

  const handleLinkChange = (index, field, value) => {
    const newLinks = [...links];
    newLinks[index] = { ...newLinks[index], [field]: value };
    onChange(newLinks);
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
              <input
                type="text"
                value={link.platform}
                onChange={(e) => handleLinkChange(index, 'platform', e.target.value)}
                placeholder="Platform (e.g., Twitter, Instagram)"
                className="w-full px-4 py-3 bg-gray-100 text-gray-900 placeholder-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
              />
              <input
                type="text"
                value={link.url}
                onChange={(e) => handleLinkChange(index, 'url', e.target.value)}
                placeholder="Profile URL"
                className="w-full px-4 py-3 bg-gray-100 text-gray-900 placeholder-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
              />
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