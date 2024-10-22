import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="mb-4">Oops! The page you're looking for doesn't exist.</p>
      <Link to="/" className="bg-blue-500 text-white px-4 py-2 rounded">
        Go Back to Home
      </Link>
    </div>
  );
};

export default NotFound;
