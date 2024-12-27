import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/blacklogo.png';
import shopping from "../assets/CART.png";
import user from "../assets/USER.png";
import search from "../assets/SEARCH.png"
import menu from "../assets/MENU.png";


const CustomerServicePage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
        const checkMobile = () => {
          setIsMobile(window.innerWidth <= 768);
        };
        
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
      }, []);
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
      if (
        !e.target.closest("#side-menu") &&
        !e.target.closest("#search-input") &&
        e.target.id !== "menu-icon" &&
        e.target.id !== "search-icon"
      ) {
        setIsMenuOpen(false);
        setIsSearchOpen(false);
      }
    };
    window.addEventListener("click", closeMenu);
    return () => window.removeEventListener("click", closeMenu);
  }, []);

  useEffect(() => {
    if (isSearchOpen) {
      searchInputRef.current?.focus();
    }
  }, [isSearchOpen]);

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="flex items-center justify-between h-16 bg-white fixed top-0 left-0 right-0 z-50 px-8 py-4">
        {/* Left: Menu Icon and Search */}
        <div className="flex items-center space-x-4 text-black">
          <img
            src={menu}
            alt=""
            className="text-xl p-2 hover:text-gray-400 w-10 h-10"
            id="menu-icon"
            onClick={toggleMenu}

          />

          {isSearchOpen && (
            <div className="relative flex-1" id="search-input">
              <input
                type="text"
                className="bg-gray-800 text-white px-4 py-2 rounded-full focus:outline-none w-full"
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
              className="text-xl p-2 hover:text-gray-400 w-10 h-10"
              id="search-icon"
              onClick={toggleSearch}
            />
          )}
        </div>

        {/* Center: Logo */}
        <div className="flex-1 text-center">
          <Link to="/" className="flex justify-center items-center">
            <img src={logo} alt="Logo" className="h-16 w-16" />
          </Link>
        </div>

        {/* Right: User and Cart */}
        <div className="flex items-center space-x-4 text-black">
          <Link to="/login">
            <img
              src={user}
              alt="uSER ICON"
              className="text-xl p-2 hover:text-gray-400 w-10 h-10"
            />
          </Link>
          <img
            src={shopping}
            alt="Shopping Cart Icon"
            className="text-xl p-2 hover:text-gray-400 w-10 h-10"
          />

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
          
                    {/* Main Menu Links */}
                    <div className="flex-1 space-y-4 sm:space-y-6 text-base sm:text-lg font-regular">
                      <a href="/" className="block hover:text-gray-400 py-2">HOME</a>
                      <Link to="/shop" className="block hover:text-gray-400 py-2">SHOP ALL</Link>
                      <Link to="/LTD/:id" className="block hover:text-gray-400 py-2">LTD. ED.</Link>
                      <Link to="/Basic/:id" className="block hover:text-gray-400 py-2">BASIC</Link>
                      <Link to="/Limited/:id" className="block hover:text-gray-400 py-2">LIMITED STOCKS</Link>
                    </div>
          
                    {/* Footer Links */}
                    <div className="space-y-3 sm:space-y-5 text-xs sm:text-sm text-gray-400 mt-4">
                      <Link to="/CustomerService" className="block hover:text-gray-300 py-1">Customer Service</Link>
                      <Link to="/Orders" className="block hover:text-gray-300 py-1">Order Management</Link>
                      <Link to="/ReturnPolicy" className="block hover:text-gray-300 py-1">Return Policy</Link>
                      <Link to="/Privacy" className="block hover:text-gray-300 py-1">Privacy</Link>
                      <Link to="/FAQ" className="block hover:text-gray-300 py-1">FAQ</Link>
                      <Link to="/Cookies" className="block hover:text-gray-300 py-1">Cookies</Link>
                      <Link to="/T&C" className="block hover:text-gray-300 py-1">Terms & Condition</Link>
          
                      {/* Social Icons */}
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

      {/* Hero Image */}
      <div className="relative h-96 bg-[#f5e6d3] mt-16">
        <div className="absolute inset-0 flex items-center justify-center">
          <img
            src="https://media.istockphoto.com/id/1320815200/photo/wall-black-background-for-design-stone-black-texture-background.jpg?s=612x612&w=0&k=20&c=hqcH1pKLCLn_ZQ5vUPUfi3BOqMWoBzbk5-61Xq7UMsU="
            alt="Decorative still life with hat and flowers"
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <h2 className="text-7xl font-bold text-white">TRISTANA</h2>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-3xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-8">COOKIES</h2>
        <div className="space-y-6">
          <h3 className="font-semibold">How can we help you?</h3>

          <p className="text-gray-600">
            For online ordering and product information, you can contact us by email.
          </p>

          <p className="text-gray-600">
            Customer care: <a href="mailto:orders@tristana.it" className="underline">orders@tristana.it</a>
          </p>

          <p className="text-gray-600">
            Monday to Friday from 9:00 to 13:00 and from 14:00 to 18:00
          </p>

          <p className="text-gray-600">
            We will reply to your emails within 3 business days.
          </p>

          <p className="text-gray-600">
            For any questions regarding orders, please include your First/Surname, order number and email address.
          </p>

          <p className="text-gray-600">
            You can find answers to frequently asked questions about our terms of sale and our services by consulting our{' '}
            <a href="#" className="underline">FAQ</a>.
          </p>
        </div>
      </main>
    </div>
  );
};

export default CustomerServicePage;

