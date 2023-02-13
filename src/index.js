import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { CategoryProvider } from './context/CategoryContext';
import { AnimatePresence } from 'framer-motion';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AnimatePresence>
    <CategoryProvider>
      <App />
    </CategoryProvider>
    </AnimatePresence>
  

  </React.StrictMode>
);
