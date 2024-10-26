import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-4xl font-bold mb-4">Welcome to Social Naka</h1>
      <p className="mb-4">Create and share your professional social cards.</p>
      <Link to="/login" className="bg-blue-500 text-white px-4 py-2 rounded">
        Login with Google
      </Link>
    </div>
  );
};

export default Home;
