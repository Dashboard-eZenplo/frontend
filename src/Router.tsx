import { BrowserRouter, Route, Routes } from 'react-router-dom';
import RegistrationPage from './pages/registration/RegistrationPage';
import LoginPage from './pages/login/LoginPage';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/cadastro" element={<RegistrationPage />} />
        <Route path="/" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}
