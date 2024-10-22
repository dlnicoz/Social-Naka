import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between">
        <Link to="/" className="text-lg font-bold">Social Naka</Link>
        <nav>
          <Link to="/create" className="mr-4">Create Card</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
