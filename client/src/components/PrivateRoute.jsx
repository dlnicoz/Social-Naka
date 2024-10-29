import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem('user');  // Check authentication from localStorage (or session)

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;