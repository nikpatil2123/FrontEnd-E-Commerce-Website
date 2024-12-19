import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from '.App.jsx';
import Login from './src/authorization/Login.tsx';

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="Login" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;