import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Admin from './components/Admin/Homepage/homepage';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <GoogleOAuthProvider clientId="50513013028-cjil225du9spjkt60k90vntmphrbr11i.apps.googleusercontent.com">
    < BrowserRouter >
      <Routes>
        <Route path='/*' element={<App />} />
        <Route path='/Admin/*' element={<Admin />} />
      </Routes>
    </BrowserRouter >
  </GoogleOAuthProvider >
);

