import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './home/HomePage';
import RegistrationPage from './registration/RegistrationPage';
import LoginPage from './login/LoginPage';
import UploadDownloadPage from './uploadDownload/uploadDownloadPage';
import NotFoundPage from './error/NotFoundPage';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/cadastro" element={<RegistrationPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/upload" element={<UploadDownloadPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default App;
