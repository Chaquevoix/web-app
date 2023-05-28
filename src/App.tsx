import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Login from './pages/auth/Login';
import Account from './pages/Account';
import Register from './pages/auth/Register';
import LinkUser from './pages/auth/LinkUserToAccount';
import { useState, useEffect } from 'react';
import { ConfigProvider, theme, Button, Layout } from "antd";

function App() {
  // Dark theme taken and modified from https://betterprogramming.pub/how-to-toggle-dark-theme-with-ant-design-5-0-eb68552f62b8
  
  const { defaultAlgorithm, darkAlgorithm } = theme;
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleClick = () => {
    setIsDarkMode((previousValue) => !previousValue);
    document.cookie = `ManuallySetLightMode=${isDarkMode}`
  };

  useEffect(() => {
    let themeCookie = document.cookie.split("; ").find((row) => row.startsWith("ManuallySetLightMode="))?.split("=")[1];

    if (themeCookie === "false") {
      setIsDarkMode(true)
    } 
    
    if (themeCookie === "true") {
      setIsDarkMode(false)
    }
  });

  return (
    <ConfigProvider
      theme={{
        algorithm: isDarkMode ? darkAlgorithm : defaultAlgorithm,
      }}>
      <Layout style={{ minHeight: "100vh", color: isDarkMode ? "#f0f0f0" : "#1f1f1f" }}>
          <Button onClick={handleClick}>
            Change Theme to {isDarkMode ? "Light" : "Dark"}
          </Button>

        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/link_user" element={<LinkUser />} />
            <Route path="/account" element={<Account />} />
          </Routes>
        </BrowserRouter>
      </Layout>
    </ConfigProvider>
  );
}

export default App;
