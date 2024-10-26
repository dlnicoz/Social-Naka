import SocialCardForm from '../components/SocialCardForm';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

const CreateCard = () => {
  const navigate = useNavigate();

  const handleSubmit = async (data) => {
    try {
      await api.post('/socialcards', data);
      navigate('/dashboard');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Create Social Card</h1>
      <SocialCardForm onSubmit={handleSubmit} />
    </div>
  );
};

export default CreateCard;
