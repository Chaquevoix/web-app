import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Page1 from './pages/page1';
import Login from './pages/auth/login';
import MyAccount from './pages/myAccount';
import Register from './pages/auth/register';
import LinkUser from './pages/auth/linkUserToAccount';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Page1 />
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
    element: <MyAccount />,
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
