import { BrowserRouter, Route, Routes } from 'react-router-dom';
import RegistrationPage from './pages/registration/RegistrationPage';
import LoginPage from './pages/login/LoginPage';
import HomePage from './pages/home/HomePage';
import Dashboard from './pages/dashboard/Dashboard';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/cadastro" element={<RegistrationPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}
