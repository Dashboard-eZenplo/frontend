import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './pages/App.tsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@emotion/react';
import customTheme from './styles/themes/customTheme.ts';
import { AuthProvider } from './contexts/AuthContext.tsx';
import { FiltersProvider } from './contexts/FiltersContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={customTheme}>
      <BrowserRouter>
        <AuthProvider>
          <FiltersProvider>
            <App />
          </FiltersProvider>
        </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>
);
