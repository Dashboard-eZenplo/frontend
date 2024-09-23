import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './pages/App.tsx';
import './index.css';
import { ThemeProvider } from '@emotion/react';
import customTheme from './styles/themes/customTheme.ts';
import { AuthProvider } from './contexts/AuthContext.tsx';

createRoot(document.getElementById('root')!).render(
  <ThemeProvider theme={customTheme}>
    <StrictMode>
      <AuthProvider>
        <App />
      </AuthProvider>
    </StrictMode>
  </ThemeProvider>
);
