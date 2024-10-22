import { useState } from 'react';

const SocialCardForm = ({ onSubmit, initialData = {} }) => {
  const [formData, setFormData] = useState({
    profilePhoto: initialData.profilePhoto || '',
    profession: initialData.profession || '',
    description: initialData.description || '',
    socialLinks: initialData.socialLinks || [{ platform: '', url: '' }],
    category: initialData.category || '',
    location: initialData.location || '',
    designCustomization: initialData.designCustomization || { color: '', font: '' },
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLinkChange = (index, field, value) => {
    const updatedLinks = [...formData.socialLinks];
    updatedLinks[index][field] = value;
    setFormData({ ...formData, socialLinks: updatedLinks });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        name="profilePhoto"
        placeholder="Profile Photo URL"
        value={formData.profilePhoto}
        onChange={handleChange}
        className="w-full p-2 border border-gray-300 rounded"
      />
      <input
        type="text"
        name="profession"
        placeholder="Profession"
        value={formData.profession}
        onChange={handleChange}
        className="w-full p-2 border border-gray-300 rounded"
      />
      <textarea
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
        className="w-full p-2 border border-gray-300 rounded"
      />
      <div className="space-y-2">
        {formData.socialLinks.map((link, index) => (
          <div key={index} className="flex space-x-2">
            <input
              type="text"
              placeholder="Platform"
              value={link.platform}
              onChange={(e) => handleLinkChange(index, 'platform', e.target.value)}
              className="w-1/2 p-2 border border-gray-300 rounded"
            />
            <input
              type="text"
              placeholder="URL"
              value={link.url}
              onChange={(e) => handleLinkChange(index, 'url', e.target.value)}
              className="w-1/2 p-2 border border-gray-300 rounded"
            />
          </div>
        ))}
      </div>
      <input
        type="text"
        name="category"
        placeholder="Category"
        value={formData.category}
        onChange={handleChange}
        className="w-full p-2 border border-gray-300 rounded"
      />
      <input
        type="text"
        name="location"
        placeholder="Location"
        value={formData.location}
        onChange={handleChange}
        className="w-full p-2 border border-gray-300 rounded"
      />
      <div className="flex space-x-2">
        <input
          type="text"
          name="color"
          placeholder="Color"
          value={formData.designCustomization.color}
          onChange={(e) => setFormData({
            ...formData,
            designCustomization: { ...formData.designCustomization, color: e.target.value }
          })}
          className="w-1/2 p-2 border border-gray-300 rounded"
        />
        <input
          type="text"
          name="font"
          placeholder="Font"
          value={formData.designCustomization.font}
          onChange={(e) => setFormData({
            ...formData,
            designCustomization: { ...formData.designCustomization, font: e.target.value }
          })}
          className="w-1/2 p-2 border border-gray-300 rounded"
        />
      </div>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Save</button>
    </form>
  );
};

export default SocialCardForm;
