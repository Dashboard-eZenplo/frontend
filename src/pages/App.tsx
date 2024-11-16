import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import RegistrationPage from './registration/RegistrationPage';
import LoginPage from './login/LoginPage';
import UploadDownloadPage from './uploadDownload/UploadDownloadPage';
import NotFoundPage from './error/NotFoundPage';
import Dashboard from './dashboard/Dashboard';
import ManagersPage from './managers/ManagersPage';
import EmployeesPage from './employees/EmployeesPage';
import ProtectedRoute from '../components/ProtectedRoute';
import UnauthorizedPage from './error/UnauthorizedPage';

const App: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />

        <Route
          path="/cadastro"
          element={
            <ProtectedRoute>
              <RegistrationPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/upload"
          element={
            <ProtectedRoute>
              <UploadDownloadPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <ProtectedRoute requireAdmin>
              <ManagersPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/funcionarios"
          element={
            <ProtectedRoute>
              <EmployeesPage />
            </ProtectedRoute>
          }
        />

        <Route path="/unauthorized" element={<UnauthorizedPage />} />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
};

export default App;
