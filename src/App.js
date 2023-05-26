import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './pages/Home';
import Login from './pages/auth/Login';
import Account from './pages/Account';
import Register from './pages/auth/Register';
import LinkUser from './pages/auth/linkUserToAccount';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/auth/login",
    element: <Login />,
  },
  {
    path: "/auth/register",
    element: <Register />,
  },
  ,
  {
    path: "auth/link_user",
    element: <LinkUser />,
  },
  {
    path: "/account",
    element: <Account />,
  }
]);

function App() {
  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
}

export default App;
