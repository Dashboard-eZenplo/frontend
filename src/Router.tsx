import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Registration from './pages/Registration';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/cadastro" element={<Registration />} />
      </Routes>
    </BrowserRouter>
  );
}
