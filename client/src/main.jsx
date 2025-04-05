import React from 'react';
import { BrowserRouter } from "react-router-dom";
import { createRoot } from 'react-dom/client';
import AuthProvider from './context/AuthContext';
import App from './App';
// import Layout from "./components/Layout";
import './index.css';

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');

createRoot(rootElement).render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <App />
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);
