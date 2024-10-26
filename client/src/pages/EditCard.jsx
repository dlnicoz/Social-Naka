import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import SocialCardForm from '../components/SocialCardForm';
import api from '../services/api';

const EditCard = () => {
  const { id } = useParams();
  const [card, setCard] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCard = async () => {
      try {
        const response = await api.get(`/socialcards/${id}`);
        setCard(response.data);
      } catch (error) {
        console.error(error);
        navigate('/dashboard');
      }
    };

    fetchCard();
  }, [id, navigate]);

  const handleSubmit = async (data) => {
    try {
      await api.put(`/socialcards/${id}`, data);
      navigate('/dashboard');
    } catch (error) {
      console.error(error);
    }
  };

  if (!card) return <div>Loading...</div>;

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Edit Social Card</h1>
      <SocialCardForm onSubmit={handleSubmit} initialData={card} />
    </div>
  );
};

export default EditCard;
