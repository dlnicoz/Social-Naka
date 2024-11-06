import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import SocialCard from '../components/SocialCard';
import { Filter } from 'lucide-react';
import api from '../services/api';

// Mock profiles (unchanged)
const mockProfiles = [
  { 
    id:'12',
    name: 'Alex Rivera',
    profession: 'UI/UX Designer',
    description: 'Passionate about creating beautiful and intuitive user interfaces...',
    photoURL: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80',
    theme: 'gradient',
    contact: {
      phone: '123-456-7890',
    },
    links: {
      instagram: 'https://instagram.com/alex',
      twitter: 'https://twitter.com/alex',
      website: 'https://alexdesigns.com',
      github: 'https://github.com/alex',
      linkedin: 'https://linkedin.com/in/alex'
    }
  },
  
  {
    id: '1',
    name: 'Alex Rivera',
    profession: 'UI/UX Designer',
    description: 'Passionate about creating beautiful and intuitive user interfaces. Specialized in mobile app design and brand identity.',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80',
    featured: true,
    theme: 'gradient'
  },
  {
    id: '2',
    name: 'Sam Chen',
    profession: 'Full Stack Developer',
    description: 'Building scalable web applications with modern technologies. Expert in React, Node.js, and cloud architecture.',
    image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80',
    theme: 'dark'
  },
  {
    id: '3',
    name: 'Jordan Lee',
    profession: 'Digital Artist',
    description: 'Creating stunning digital illustrations and animations. Specializing in character design and concept art.',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80',
    theme: 'elegant'
  },
  {
    id: '4',
    name: 'Emma Wilson',
    profession: 'Content Creator',
    description: 'Digital storyteller and content strategist. Helping brands connect with Gen Z through authentic content.',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80',
    theme: 'vibrant'
  },
  {
    id: '5',
    name: 'Marcus Zhang',
    profession: 'Game Developer',
    description: 'Independent game developer with a passion for creating immersive experiences. Unity and Unreal Engine expert.',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80',
    theme: 'minimal'
  },
  {
    id: '6',
    name: 'Sofia Rodriguez',
    profession: 'Motion Designer',
    description: 'Bringing brands to life through motion design and animation. After Effects and Cinema 4D specialist.',
    image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&q=80',
    theme: 'bordered'
  }
];

const categories = ['All', 'Designers', 'Developers', 'Artists', 'Writers', 'Musicians'];

export function Home() {
  const [cards, setCards] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  // Check user authentication and fetch social cards
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await api.get('/auth/check');  // Backend route to check user session
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

  // Combine mockProfiles with the fetched cards
  const combinedCards = [...mockProfiles, ...cards];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar isAuthenticated={isAuthenticated} user={user} /> {/* Pass props to Navbar */}
      
      <main className="py-20">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
              Discover Amazing Talent
            </h1>
            <p className="text-neutral-600 text-lg">
              Connect with creative professionals and showcase your work
            </p>
          </motion.div>

          {/* Categories */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex gap-3 overflow-x-auto pb-2">
              {categories.map((category, index) => (
                <motion.button
                  key={category}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-4 py-2 rounded-full whitespace-nowrap ${
                    index === 0
                      ? 'bg-indigo-600 text-white'
                      : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                  }`}
                >
                  {category}
                </motion.button>
              ))}
            </div>
            
            <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-100 text-neutral-700 hover:bg-neutral-200">
              <Filter className="w-4 h-4" />
              <span>Filters</span>
            </button>
          </div>

          {/* Cards Grid */}
          <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
            {combinedCards.map((card, index) => (
              <div key={card.id || index} className="break-inside-avoid">
                <SocialCard 
                  id={card.id}
                  user={{
                    name: card.name,
                    profession: card.profession,
                    description: card.description,
                    photoURL: card.image,
                    theme: card.theme,
                    contact: card.contact || {},
                    links: card.links || {}
                  }}
                  featured={card.featured}
                  theme={card.theme}
                />
              </div>
            ))}
          </div>

          {/* Load More Button */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-12 text-center"
          >
            <button className="px-8 py-3 rounded-full bg-neutral-100 text-neutral-700 hover:bg-neutral-200">
              Load More
            </button>
          </motion.div>
        </div>
      </main>
    </div>
  );
}

export default Home;
