import React from 'react';
import { createRoot } from 'react-dom/client';  // Ensure the correct path
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';  // Import Bootstrap CSS
import '@fortawesome/fontawesome-free/css/all.min.css';  // Import Font Awesome CSS

const container = document.getElementById('root');
const root = createRoot(container!);  // Non-null assertion

root.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>
);
