import React, { useState, useEffect } from 'react';
import { Home, ShoppingCart, User, Search, Menu } from 'lucide-react';
import logo from '../assets/blacklogo.png';
import { LogIn } from "lucide-react";
import { Link } from "react-router-dom";

// Navigation Component
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
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
    <nav className="flex items-center justify-between h-16 bg-transparent fixed top-0 left-0 right-0 z-20 px-4">
      {/* Left: Menu Icon */}
      <div className="flex items-center space-x-4 text-black">
        <i
          className="fa fa-bars cursor-pointer text-xl p-2 hover:text-gray-400"
          id="menu-icon"
          onClick={toggleMenu}
        ></i>
        <i className="fa fa-search text-xl p-2 hover:text-gray-400"></i>
      </div>

      {/* Center: Logo */}
      <div className="flex-1 text-center">
        <a href="/">
          <img src={logo} alt="Logo" className="h-12 mx-auto" />
        </a>
      </div>

      {/* Right: Wishlist and Cart */}
      <div className="flex items-center space-x-4 text-black">
        {/* <Link to="/login"/> */}
        <Link to="/login">
          <i className="fa fa-user text-xl p-2 hover:text-gray-400"></i>
        </Link>
        <i className="fa fa-shopping-cart text-xl p-2 hover:text-gray-400"></i>
      </div>

      {/* Side Menu */}
      <div
        className={`fixed top-0 left-0 h-screen w-2/5 bg-black/90 text-white z-30 transform transition-transform duration-500 ease-in-out ${isMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        id="side-menu"
        style={{ width: "300px" }}
      >
        <div className="p-6 flex flex-col h-full">
          {/* Close Icon */}
          <div className="flex justify-end mb-8">
            <i
              className="fa fa-times text-3xl cursor-pointer hover:text-gray-400"
              onClick={toggleMenu}
            ></i>
          </div>

          {/* Main Menu Links */}
          <div className="flex-1 space-y-6 text-lg font-semibold">
            <a href="/" className="flex items-center justify-between hover:text-gray-400">
              <span>HOME</span> <i className="fa fa-chevron-right text-sm"></i>
            </a>
            <Link to="/shop" className="flex items-center justify-between hover:text-gray-400">
              <span>SHOP</span> <i className="fa fa-chevron-right text-sm"></i>
            </Link>
            <a href="/" className="flex items-center justify-between hover:text-gray-400">
              <span>LAST LOOKS</span> <i className="fa fa-chevron-right text-sm"></i>
            </a>
            <a href="/" className="flex items-center justify-between hover:text-gray-400">
              <span>ABOUT US</span> <i className="fa fa-chevron-right text-sm"></i>
            </a>
            <a href="/" className="flex items-center justify-between hover:text-gray-400">
              <span>CONTACT</span> <i className="fa fa-chevron-right text-sm"></i>
            </a>
          </div>

          {/* Footer Links */}
          <div className="space-y-2 text-sm text-gray-400 mt-8">
            <a href="/" className="block hover:text-gray-300">item1</a>
            <a href="/" className="block hover:text-gray-300">item2</a>
            <a href="/" className="block hover:text-gray-300">item3</a>
            <a href="/" className="block hover:text-gray-300">Privacy</a>
            <a href="/" className="block hover:text-gray-300">FAQ</a>
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
const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto flex justify-between items-center">
        <div>
          <h3 className="text-xl font-bold">TRISTANA</h3>
          <p className="text-sm">© 2024 All Rights Reserved</p>
        </div>
        {/* Footer Links */}
        <div className="flex space-x-4">
          {/* Ensure these links point to actual pages or routes */}
          <a href="#" className="hover:text-gray-300">Privacy Policy</a>
          <a href="#" className="hover:text-gray-300">Terms of Service</a>
          <a href="#" className="hover:text-gray-300">Contact</a>
        </div>
      </div>
    </footer>
  );
};

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
      <Footer />
    </>
  );
};

export default App1;
