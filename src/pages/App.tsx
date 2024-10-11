import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './home/HomePage';
import RegistrationPage from './registration/RegistrationPage';
import LoginPage from './login/LoginPage';
import UploadDownloadPage from './uploadDownload/UploadDownloadPage';
import NotFoundPage from './error/NotFoundPage';
import Dashboard from './dashboard/Dashboard';
import ManagersPage from './managers/ManagersPage';
import EmployeesPage from './employees/EmployeesPage';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/cadastro" element={<RegistrationPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/admin" element={<ManagersPage />} />
      <Route path="/employees" element={<EmployeesPage />} />
      <Route path="/upload" element={<UploadDownloadPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default App;
