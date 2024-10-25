// Dependencies
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client'

// Allows hash routing for a single page website
import { HashRouter } from 'react-router-dom';

// CSS Style
import 'bootstrap/dist/css/bootstrap.min.css'; 
import './index.css';

// Localization provider
import { I18nextProvider } from 'react-i18next';
import i18n from './language/i18n';

// Main App.jsx
import App from './App';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter>
      <I18nextProvider i18n={i18n}>
        <App/> 
      </I18nextProvider>
    </HashRouter>
  </StrictMode>
);
