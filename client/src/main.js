import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './pages/App.js';
import './style/style.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  React.createElement(React.StrictMode, null, React.createElement(App))
);
