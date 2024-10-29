import { useEffect, useState } from 'react';
import api from '../services/api';
import SocialCard from '../components/SocialCard';
import { Link } from 'react-router-dom';

const Home = () => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await api.get('/socialcards');
        setCards(response.data.cards);  // Adjust based on pagination response
      } catch (error) {
        console.error('Error fetching social cards:', error);
      }
    };

    fetchCards();
  }, []);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold mb-4 text-center">Explore Social Cards</h1>
      <p className="text-center mb-6">Browse public social cards below. <Link to="/login" className="text-blue-500 underline">Log in</Link> to create your own!</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map((card) => (
          <SocialCard key={card._id} card={card} />
        ))}
      </div>
    </div>
  );
};

export default Home;
