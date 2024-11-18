import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login'; // Import Login Page
import Signup from './pages/SignUp'; // Import Signup Page

// Component to conditionally render the Header
const ConditionalHeader = ({ children }) => {
  const location = useLocation(); // Get the current route
  const noHeaderRoutes = ['/login', '/signup']; // Routes where Header shouldn't appear

  return (
    <>
      {!noHeaderRoutes.includes(location.pathname) && <Header />}
      {children}
    </>
  );
};

function App() {
  return (
    <Router>
      {/* <div className="min-h-screen"> */}
        <ConditionalHeader>
          {/* <main> */}
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </Routes>
          {/* </main> */}
        </ConditionalHeader>
      {/* </div> */}
    </Router>
  );
}

export default App;
