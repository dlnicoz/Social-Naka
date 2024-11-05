import { Link, useNavigate } from 'react-router-dom';
import { Menu, Transition } from '@headlessui/react';
import { Layers, LogOut, User, X } from 'lucide-react';
import { useState } from 'react';
import api from '../services/api';

const Navbar = ({ isAuthenticated, user }) => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);

  const clearError = () => setError(null);

  const handleLogin = () => {
    window.location.href = 'http://localhost:5000/api/auth/google';
  };

  const handleLogout = async () => {
    try {
      await api.get('/auth/signout');
      navigate('/');
      window.location.reload(); // Reset app state
    } catch (error) {
      setError('Error logging out');
      console.error(error);
    }
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {error && (
          <div className="relative bg-red-50 p-3">
            <div className="flex">
              <div className="flex-1 flex justify-between">
                <p className="text-sm text-red-700">{error}</p>
                <button className="ml-3 flex-shrink-0" onClick={clearError}>
                  <X className="h-5 w-5 text-red-400" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        )}
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Layers className="h-8 w-8 text-indigo-600" />
              <span className="text-xl font-bold text-gray-900">Social Naka</span>
            </Link>
          </div>

          <div className="flex items-center space-x-2">
            {!isAuthenticated ? (
              <button
                onClick={handleLogin}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Sign in with Google
              </button>
            ) : (
              <Menu as="div" className="relative ml-3">
                <Menu.Button className="flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                  <img
                    className="h-8 w-8 rounded-full"
                    src={user?.profilePhoto || 'https://via.placeholder.com/150'}
                    alt="User Profile"
                  />
                </Menu.Button>
                <Transition
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          to="/dashboard"
                          className={`${
                            active ? 'bg-gray-100' : ''
                          } flex px-4 py-2 text-sm text-gray-700 items-center`}
                        >
                          <User className="mr-2 h-4 w-4" />
                          Dashboard
                        </Link>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={handleLogout}
                          className={`${
                            active ? 'bg-gray-100' : ''
                          } flex w-full px-4 py-2 text-sm text-gray-700 items-center`}
                        >
                          <LogOut className="mr-2 h-4 w-4" />
                          Sign out
                        </button>
                      )}
                    </Menu.Item>
                  </Menu.Items>
                </Transition>
              </Menu>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
