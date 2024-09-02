import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './pages/App.tsx';
import './index.css';
import { ThemeProvider } from '@emotion/react';
import CustomTheme from './CustomTheme/CustomTheme.tsx';

createRoot(document.getElementById('root')!).render(
  <ThemeProvider theme={CustomTheme}>
    <StrictMode>
      <App />
    </StrictMode>
  </ThemeProvider>
);
