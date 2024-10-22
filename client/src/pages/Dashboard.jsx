import { useEffect, useState } from 'react';
import SocialCard from '../components/SocialCard';
import api from '../services/api';

const Dashboard = () => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await api.get('/socialcards');
        setCards(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchCards();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Your Social Cards</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map((card) => (
          <SocialCard key={card._id} card={card} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
