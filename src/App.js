import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Page1 from './pages/page1';
import Login from './pages/auth/login';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Page1 />
  },
  {
    path: "/auth/login",
    element: <Login />,
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
