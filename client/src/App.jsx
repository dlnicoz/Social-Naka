import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Login from './pages/Login';
import Explore from './pages/Explore';
import Signup from './pages/SignUp';
import RequestResetPassword from './pages/RequestResetPassword';
import ResetPassword from './pages/ResetPassword';
import SocialCardFullPage from './pages/SocialCardFullPage';
import CreateSocialCard from './pages/CreateSocialCard';
import AuthCallback from './pages/AuthCallback';

const ConditionalHeader = ({ children }) => {
  const location = useLocation();
  const noHeaderRoutes = ['/login', '/signup', '/request-reset', '/reset-password'];
  const shouldShowHeader = !noHeaderRoutes.some(route => location.pathname.startsWith(route)) && !location.pathname.startsWith('/user/');

  return (
    <>
      {shouldShowHeader && <Header />}
      {children}
    </>
  );
};

function App() {
  return (
    <ConditionalHeader>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<CreateSocialCard />} />
        <Route path="/auth/callback" element={<AuthCallback />} />
        <Route path="/login" element={<Login />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/request-reset" element={<RequestResetPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/user/:username" element={<SocialCardFullPage />} />
      </Routes>
    </ConditionalHeader>
  );
}

export default App;
