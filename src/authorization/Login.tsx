import React, { useState, useEffect, useRef } from 'react';
import { Home, ShoppingCart, User, Search, Menu } from 'lucide-react';
import logo from '../assets/blacklogo.png';
import { LogIn } from "lucide-react";
import { Link } from "react-router-dom";
import shopping from "../assets/CART.png";
import user from "../assets/USER.png";
import search from "../assets/SEARCH.png"
import menu from "../assets/MENU.png";
// Navigation Component
const Navbar = ({ cartCount, toggleCart }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  const toggleMenu = () => {
	setIsMenuOpen((prevState) => !prevState);
	setIsSearchOpen(false);
  };

  const toggleSearch = () => {
	setIsSearchOpen((prevState) => !prevState);
  };

  const handleSearch = (e) => {
	setSearchQuery(e.target.value);
  };

  useEffect(() => {
	const closeMenu = (e) => {
	  if (!e.target.closest("#side-menu") && e.target.id !== "menu-icon") {
		setIsMenuOpen(false);
	  }
	};
	window.addEventListener("click", closeMenu);
	return () => window.removeEventListener("click", closeMenu);
  }, []);

  return (
	<nav className="flex items-center justify-between h-14 sm:h-16 md:h-20 bg-white fixed top-0 left-0 right-0 z-50 px-2 sm:px-4 md:px-8 shadow-md">
	  <div className="flex items-center space-x-2 md:space-x-4 text-black">
		<img
		  src={menu}
		  alt=""
		  className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 p-1 md:p-2 hover:text-gray-400"
		  id="menu-icon"
		  onClick={toggleMenu}
		/>
		{isSearchOpen && (
		  <div className="relative flex-1 w-24 sm:w-32 md:w-64" id="search-input">
			<input
			  type="text"
			  className="bg-gray-800 text-white px-2 md:px-4 py-1 md:py-2 rounded-full focus:outline-none w-full text-xs sm:text-sm md:text-base"
			  placeholder="Search"
			  value={searchQuery}
			  onChange={handleSearch}
			  ref={searchInputRef}
			/>
		  </div>
		)}
		{!isSearchOpen && (
		  <img
			src={search}
			alt="search icon"
			className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 p-1 md:p-2 hover:text-gray-400"
			id="search-icon"
			onClick={toggleSearch}
		  />
		)}
	  </div>

	  <div className="flex-1 text-center">
		<a href="/">
		  <div className="flex justify-center items-center">
			<img src={logo} alt="Logo" className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12" />
		  </div>
		</a>
	  </div>

	  <div className="flex items-center space-x-2 md:space-x-4 text-black">
		<Link to="/login">
		  <img
			src={user}
			alt="User Icon"
			className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 p-1 md:p-2 hover:text-gray-400"
		  />
		</Link>
		<div className="relative">
		  <img
			src={shopping}
			alt="Shopping Cart Icon"
			className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 p-1 md:p-2 hover:text-gray-400"
			onClick={toggleCart}
		  />
		  {cartCount > 0 && (
			<span className="absolute -top-1 -right-1 md:-top-2 md:-right-2 bg-red-500 text-white rounded-full w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 flex items-center justify-center text-[8px] sm:text-xs">
			  {cartCount}
			</span>
		  )}
		</div>
	  </div>

	  {/* Side Menu */}
	  <div
		className={`fixed top-0 left-0 h-screen bg-black/90 text-white z-30 transform transition-transform duration-500 ease-in-out ${
		  isMenuOpen ? "translate-x-0" : "-translate-x-full"
		} ${
		  isMobile ? "w-[200px]" : "w-[410px]"
		}`}
		id="side-menu"
	  >
		<div className="p-4 sm:p-6 flex flex-col h-full">
		  <div className="flex justify-end mb-4 sm:mb-8">
			<button
			  onClick={toggleMenu}
			  className="text-white hover:text-gray-300 transition-colors p-2"
			>
			  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
			  </svg>
			</button>
		  </div>

		  <div className="flex-1 space-y-4 sm:space-y-6 text-base sm:text-lg font-regular">
			<a href="/" className="block hover:text-gray-400 py-2">HOME</a>
			<Link to="/shop" className="block hover:text-gray-400 py-2">SHOP ALL</Link>
			<Link to="/LTD/:id" className="block hover:text-gray-400 py-2">LTD. ED.</Link>
			<Link to="/Basic/:id" className="block hover:text-gray-400 py-2">BASIC</Link>
			<Link to="/Limited/:id" className="block hover:text-gray-400 py-2">LIMITED STOCKS</Link>
		  </div>

		  <div className="space-y-3 sm:space-y-5 text-xs sm:text-sm text-gray-400 mt-4">
			<Link to="/CustomerService" className="block hover:text-gray-300 py-1">Customer Service</Link>
			<Link to="/Orders" className="block hover:text-gray-300 py-1">Order Management</Link>
			<Link to="/ReturnPolicy" className="block hover:text-gray-300 py-1">Return Policy</Link>
			<Link to="/Privacy" className="block hover:text-gray-300 py-1">Privacy</Link>
			<Link to="/FAQ" className="block hover:text-gray-300 py-1">FAQ</Link>
			<Link to="/Cookies" className="block hover:text-gray-300 py-1">Cookies</Link>
			<Link to="/T&C" className="block hover:text-gray-300 py-1">Terms & Condition</Link>

			<div className="flex space-x-4 mt-6 pt-4 border-t border-gray-700">
			  <a href="https://www.instagram.com/tristanaindia/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-300">
				<i className="fab fa-instagram text-lg sm:text-xl"></i>
			  </a>
			  <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-300">
				<i className="fab fa-linkedin-in text-lg sm:text-xl"></i>
			  </a>
			  <a href="tel:+123456789" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-300">
				<i className="fas fa-phone-alt text-lg sm:text-xl"></i>
			  </a>
			  <a href="mailto:someone@example.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-300">
				<i className="fas fa-envelope text-lg sm:text-xl"></i>
			  </a>
			</div>
		  </div>
		</div>
	  </div>
	</nav>
  );
};

// Login Component
const LoginPage = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);

  const renderLoginForm = () => {
    if (isForgotPassword) {
      return (
        <div className="w-full max-w-md">
          <h2 className="text-2xl mb-6 text-center">Reset Password</h2>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full p-3 mb-4 border rounded"
          />
          <button
            className="w-full bg-black text-white p-3 rounded hover:bg--600"
            onClick={() => setIsForgotPassword(false)}
          >
            Send Reset Link
          </button>
          <p
            className="text-center mt-4 text-blue-500 cursor-pointer"
            onClick={() => setIsForgotPassword(false)}
          >
            Back to Login
          </p>
        </div>
      );
    }

    if (isSignup) {
      return (
        <div className="w-full max-w-md">
          <h2 className="text-2xl mb-6 text-center">Sign Up</h2>
          <input
            type="text"
            placeholder="Full Name"
            className="w-full p-3 mb-4 border rounded"
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 mb-4 border rounded"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 mb-4 border rounded"
          />
          <button
            className="w-full bg-black text-white p-3 rounded hover:bg-gray-600"
          >
            Create Account
          </button>
          <p className="text-center mt-4">
            Already have an account?
            <span
              className="text-blue-500 ml-2 cursor-pointer"
              onClick={() => setIsSignup(false)}
            >
              Login
            </span>
          </p>
        </div>
      );
    }

    return (
      <div className="w-full max-w-md">
        <h2 className="text-2xl mb-6 text-center">Login</h2>
        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 mb-4 border rounded"
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 mb-4 border rounded"
        />
        <button
          className="w-full bg-black text-white p-3 rounded hover:bg-gray-600"
        >
          Login
        </button>
        <div className="flex justify-between mt-4">
          <p
            className="text-blue-500 cursor-pointer"
            onClick={() => setIsForgotPassword(true)}
          >
            Forgot Password?
          </p>
          <p
            className="text-blue-500 cursor-pointer"
            onClick={() => setIsSignup(true)}
          >
            Sign Up
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md">
        {renderLoginForm()}
      </div>
    </div>
  );
};

// Footer Component
// const Footer = () => {
//   return (
//     <footer className="bg-gray-800 text-white py-6">
//       <div className="container mx-auto flex justify-between items-center">
//         <div>
//           <h3 className="text-xl font-bold">TRISTANA</h3>
//           <p className="text-sm">© 2024 All Rights Reserved</p>
//         </div>
//         {/* Footer Links */}
//         <div className="flex space-x-4">
//           {/* Ensure these links point to actual pages or routes */}
//           <a href="#" className="hover:text-gray-300">Privacy Policy</a>
//           <a href="#" className="hover:text-gray-300">Terms of Service</a>
//           <a href="#" className="hover:text-gray-300">Contact</a>
//         </div>
//       </div>
//     </footer>
//   );
// };

// Main App Component
const App1 = () => {
  return (
    <>
      {/* Using Fragment instead of div for cleaner markup */}
      <Navbar />
      {/* Added padding to avoid content being hidden behind navbar */}
      <main className='pt-[64px]'>
        {/* Adjust padding based on navbar height */}
        <LoginPage />
      </main>
      {/* Footer should be outside main content */}
      {/* <Footer /> */}
    </>
  );
};

export default App1;
