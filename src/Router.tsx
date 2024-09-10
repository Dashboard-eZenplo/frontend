import { BrowserRouter, Route, Routes } from 'react-router-dom';
import RegistrationPage from './pages/registration/RegistrationPage';
import LoginPage from './pages/login/LoginPage';
import TestePage from './pages/login/TestePage';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/cadastro" element={<RegistrationPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/teste" element={<TestePage />} />
      </Routes>
    </BrowserRouter>
  );
}
