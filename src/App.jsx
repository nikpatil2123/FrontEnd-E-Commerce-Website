import React from 'react';
import App1 from './authorization/Login.tsx'; // Login component
import Comp1 from './components/comp1.tsx'; // Home component
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './styles.css';
import Comp2 from './ProductDescription/ProductDescriptionPage.jsx';
import Product from './product/ProductShowcase.tsx';
import Basic from './ProductDescription/BasicProducts.jsx';
import LTD from './ProductDescription/LTD.jsx';
import Limited from './ProductDescription/Limited.jsx';
import Services from './Footer/CustomerServices.jsx';
import Order from './Footer/OrderManagement.jsx';
import Return from './Footer/ReturnPolicy.jsx';
import Privacy from './Footer/Privacy.jsx';
import FAQ from './Footer/FAQ.jsx';
import Cookies from './Footer/Cookies.jsx';
import TermsAndCondition from './Footer/TermsAndCondition.jsx';
// import Checkout from './Checkout/CheckOut.jsx';
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
    },
    {
      path: "/Basic/:id", // Product page route
      element: <Basic />,
    },
    {
      path: "/LTD/:id", // Product page route
      element: <LTD />,
    },
    {
      path: "/Limited/:id", // Product page route
      element: <Limited />,
    },
    {
      path: "/CustomerService", // Product page route
      element: <Services />,
    },
    {
      path: "/Orders", // Product page route
      element: <Order />,
    },
    {
      path: "/ReturnPolicy", // Product page route
      element: <Return />,
    },
    {
      path: "/Privacy", // Product page route
      element: <Privacy />,
    },
    {
      path: "/FAQ", // Product page route
      element: <FAQ />,
    },
    {
      path: "/Cookies", // Product page route
      element: <Cookies />,
    },
    {
      path: "/T&C", // Product page route
      element: <TermsAndCondition />,
    },
    // {
    //   path: "/CheckOut", // Product page route
    //   element: <Checkout />,
    // }
  ]);

  return (
    // Use RouterProvider to enable routing
    <RouterProvider router={router} />
  );
}

export default App;

