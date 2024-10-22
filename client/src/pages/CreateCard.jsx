import { useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

const CreateCard = () => {
  const [formData, setFormData] = useState({
    profilePhoto: '',
    profession: '',
    description: '',
    socialLinks: [{ platform: '', url: '' }],
    category: '',
    location: '',
    designCustomization: { color: '', font: '' },
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/socialcards', formData);
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Create Social Card</h1>
      <form onSubmit={handleSubmit}>
        {/* Form Fields for Creating a Card */}
        <input
          type="text"
          name="profession"
          placeholder="Profession"
          value={formData.profession}
          onChange={handleChange}
          className="mb-4 p-2 w-full border"
        />
        {/* Add other fields similarly */}
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Create Card</button>
      </form>
    </div>
  );
};

export default CreateCard;
