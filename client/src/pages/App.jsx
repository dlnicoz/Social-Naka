import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './Dashboard';
import CreateCard from './CreateCard';
import EditCard from './EditCard';
import NotFound from './NotFound';
import Header from '../components/Header';

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/create" element={<CreateCard />} />
        <Route path="/edit/:id" element={<EditCard />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
