import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';

// Global Theme Provider
import { ThemeProvider } from './context/ThemeContext';

// Mount app into #root with theme support
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
