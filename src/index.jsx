// src/index.js or src/index.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles.css'; // Ensure Tailwind styles are imported here
import App from './App';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
