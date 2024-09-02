import { BrowserRouter, Route, Routes } from 'react-router-dom';
import RegistrationPage from './pages/registration/RegistrationPage';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/cadastro" element={<RegistrationPage />} />
      </Routes>
    </BrowserRouter>
  );
}
