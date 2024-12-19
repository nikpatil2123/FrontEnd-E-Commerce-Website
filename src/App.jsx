import React from 'react';
import App1 from './authorization/Login.tsx'; // Login component
import Comp1 from './components/comp1.tsx'; // Home component
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './styles.css';
import Comp2 from './ProductDescription/ProductDescriptionPage.jsx';
import Product from './product/ProductShowcase.jsx';

function App() {
  // Define routes using createBrowserRouter
  const router = createBrowserRouter([
    {
      path: "/", // Home route
      element: <Comp1 />,
    },
    {
      path: "/login", // Login route
      element: <App1 />,
    },
    {
      path: "/shop", // Shop route
      element: <Comp2 />,
    },
    {
      path: "/product/:id", // Product page route
      element: <Product />,
    }
  ]);

  return (
    // Use RouterProvider to enable routing
    <RouterProvider router={router} />
  );
}

export default App;

