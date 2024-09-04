import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './pages/App.tsx';
import './index.css';
import { ThemeProvider } from '@emotion/react';
import customTheme from './styles/themes/customTheme.ts';

createRoot(document.getElementById('root')!).render(
  <ThemeProvider theme={customTheme}>
    <StrictMode>
      <App />
    </StrictMode>
  </ThemeProvider>
);
