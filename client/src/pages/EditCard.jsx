import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import SocialCardForm from '../components/SocialCardForm';
import api from '../services/api';

const EditCard = () => {
  const { id } = useParams();
  const [card, setCard] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCard = async () => {
      try {
        const response = await api.get(`/socialcards/${id}`);
        setCard(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchCard();
  }, [id]);

  const handleUpdate = async (updatedData) => {
    try {
      await api.put(`/socialcards/${id}`, updatedData);
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Edit Social Card</h1>
      <SocialCardForm onSubmit={handleUpdate} initialData={card} />
    </div>
  );
};

export default EditCard;
