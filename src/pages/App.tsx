import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './home/HomePage';
import RegistrationPage from './registration/RegistrationPage';
import LoginPage from './login/LoginPage';
import NotFoundPage from './error/NotFoundPage';
import Dashboard from './dashboard/Dashboard';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/cadastro" element={<RegistrationPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default App;
