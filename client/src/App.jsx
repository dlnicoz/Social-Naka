import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Signup from './pages/SignUp';
import SocialCardPage from './pages/SocialCardPage'; // Import dedicated social card page

const ConditionalHeader = ({ children }) => {
  const location = useLocation();
  // List of paths where the header should NOT be shown
  const noHeaderRoutes = ['/login', '/signup', '/user/:username'];
  // Check if the current route should not show the header
  const shouldShowHeader = !noHeaderRoutes.some(route => location.pathname.includes(route));

  return (
    <>
      {shouldShowHeader && <Header />}
      {children}
    </>
  );
};

function App() {
  return (
    <Router>
      <ConditionalHeader>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/user/:username" element={<SocialCardPage />} /> {/* New Route */}
        </Routes>
      </ConditionalHeader>
    </Router>
  );
}

export default App;