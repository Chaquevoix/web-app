import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Login from './pages/auth/Login';
import Account from './pages/Account';
import Register from './pages/auth/Register';
import LinkUser from './pages/auth/LinkUserToAccount';

function App() {
  return (
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/link_user" element={<LinkUser />} />
          <Route path="/account" element={<Account />} />
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  );
}

export default App;
