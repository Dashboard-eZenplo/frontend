import { BrowserRouter, Route, Routes } from 'react-router-dom';
import RegistrationPage from './pages/registration/RegistrationPage';
import LoginPage from './pages/login/LoginPage';
import HomePage from './pages/home/HomePage';
import CompaniesPage from './pages/admin/CompaniesPage';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/cadastro" element={<RegistrationPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin" element={<CompaniesPage />} />
      </Routes>
    </BrowserRouter>
  );
}
