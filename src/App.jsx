import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App1 from './authorization/Login.tsx'; // Login component
import Comp1 from './components/comp1.tsx'; // Home component
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
import AdminDashboard from '/src/admin/AdminDashboard.jsx';
import Checkout from './Checkout/CheckOut.jsx';
import ProductManagement from './admin/ProductManagement.jsx';
import OrderStatus from './admin/Orderstatus.jsx';
import HomeFeedManagement from './admin/HomeFeedManagement.jsx';
import Coupons from './admin/Discount.jsx';
import ResetPassword from './authorization/ResetPassword.tsx';
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
		{
			path: "/checkout", // Product page route
			element: <Checkout />,
		},
		{
			path: "/ResetPass", // Product page route
			element: <ResetPassword />,
		},
		{
			path: "/admin", // Product page route
			element: <AdminDashboard />,
		},
		{
			path: "/admin/products",
			element: <ProductManagement />,
		},
		{
			path: "/admin/orders",
			element: <OrderStatus />
		},
		{
			path: "/admin/homefeed",
			element: <HomeFeedManagement />
		},
		{
			path: "/admin/coupons",
			element: <Coupons />
		}




		
  ]);

  return (
    // Use RouterProvider to enable routing
    <RouterProvider router={router} />
  );
}

export default App;

