import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import ContextProvider from './context/ContextProvider';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ContextProvider>
  <BrowserRouter>
    <App />
  </BrowserRouter>
  </ContextProvider>
);
