import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './home/HomePage';
import RegistrationPage from './registration/RegistrationPage';
import LoginPage from './login/LoginPage';
import NotFoundPage from './error/NotFoundPage';
import ManagersPage from './managers/ManagersPage';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/cadastro" element={<RegistrationPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/admin" element={<ManagersPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default App;
