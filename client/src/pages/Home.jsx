import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import SocialCard from '../components/SocialCard';
import api from '../services/api';

export function Home() {
  const [cards, setCards] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await api.get('/auth/check-session');  // Backend route to check user session
        setIsAuthenticated(!!response.data.user);
        setUser(response.data.user);
      } catch (error) {
        console.error('User not authenticated', error);
        setIsAuthenticated(false);
      }
    };

    const fetchCards = async () => {
      try {
        const response = await api.get('/socialcards');
        setCards(response.data.cards);
      } catch (error) {
        console.error('Error fetching social cards:', error);
      }
    };

    checkAuth();
    fetchCards();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar isAuthenticated={isAuthenticated} user={user} />  {/* Pass props to Navbar */}
      <main className="py-10">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="px-4 sm:px-0">
            <h1 className="text-3xl font-bold leading-tight text-gray-900">Discover Amazing Professionals</h1>
            <p className="mt-2 text-sm text-gray-600">
              Connect with talented individuals and explore their work.
            </p>
          </div>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {cards.map((card, index) => (
              <SocialCard key={index} user={card} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export default Home;
