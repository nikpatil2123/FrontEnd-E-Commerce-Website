import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/blacklogo.png';
import shopping from "../assets/CART.png";
import user from "../assets/USER.png";
import search from "../assets/SEARCH.png"
import menu from "../assets/MENU.png";


const TermsAndCondition = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef(null);

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
      <nav className="flex items-center justify-between h-16 bg-transparent fixed top-0 left-0 right-0 z-20 px-8 py-12 pt-12">
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
          className={`fixed top-0 left-0 h-screen w-2/5 bg-black/90 text-white z-30 transform transition-transform duration-500 ease-in-out ${isMenuOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          id="side-menu"
          style={{ width: "410px" }}
        >
          <div className="p-6 flex flex-col h-full">
            {/* Close Icon */}
            <div className="flex justify-end mb-8">
              {/* <i
              className="fa fa-times text-3xl cursor-pointer hover:text-gray-400"
              onClick={toggleMenu}
            ></i> */}
            </div>

            {/* Main Menu Links */}
            <div className="flex-1 space-y-6 text-lg font-regular">
              <a href="/" className="flex items-center justify-between hover:text-gray-400">
                <span>HOME</span>
              </a>
              <Link to="/shop" className="flex items-center justify-between hover:text-gray-400">
                <span>SHOP ALL </span>
                {/* <i className="fa fa-chevron-right text-sm"></i> */}
              </Link>
              <Link to="/LTD/:id" className="flex items-center justify-between hover:text-gray-400">
                <span>LTD. ED.</span> <i className="fa fa-chevron-right text-sm"></i>
              </Link>
              <Link to="/Basic/:id" className="flex items-center justify-between hover:text-gray-400">
                <span>BASIC</span>
                {/* <i className="fa fa-chevron-right text-sm"></i> */}
              </Link>
              <Link to="/Limited/:id" className="flex items-center justify-between hover:text-gray-400">
                <span>LIMITED STOCKS</span>
                {/* <i className="fa fa-chevron-right text-sm"></i> */}
              </Link>
              <a href="/" className="flex items-center justify-between hover:text-gray-400">
                {/* <span>ABOUT US</span> <i className="fa fa-chevron-right text-sm"></i> */}
              </a>
            </div>

            {/* Footer Links */}
            <div className="space-y-5 text-sm text-gray-400 mt-4">
              <Link to="/CustomerService" className="block hover:text-gray-300">Customer Service</Link>
              <a href="/" className="block hover:text-gray-300">Order Management</a>
              <a href="/" className="block hover:text-gray-300">Return Policy</a>
              <a href="/" className="block hover:text-gray-300">Privacy</a>
              <a href="/" className="block hover:text-gray-300">FAQ</a>
              <a href="/" className="block hover:text-gray-300">Cookies</a>
              <a href="/" className="block hover:text-gray-300">Terms & Condition</a>


              {/* Icons below the links */}
              <div className="flex space-x-4 mt-4 ">
                <a href="https://www.instagram.com/tristanaindia" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-instagram text-gray-400 hover:text-gray-300 text-lg"></i>
                </a>
                <a href="https://www.linkedin.com/company/tristana-india/" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-linkedin-in text-gray-400 hover:text-gray-300 text-lg"></i>
                </a>
                <a href="tel:+917861915707" target="_blank" rel="noopener noreferrer">
                  <i className="fas fa-phone-alt text-gray-400 hover:text-gray-300 text-lg"></i>
                </a>
                <a href="mailto:tristanaindia@gmail.com" target="_blank" rel="noopener noreferrer">
                  <i className="fas fa-envelope text-gray-400 hover:text-gray-300 text-lg"></i>

                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Image */}
      <div className="relative h-96 bg-[#f5e6d3] mt-24">
        <div className="absolute inset-0 flex items-center justify-center">
          <img
            src="https://amcconsult.com/wp-content/uploads/2023/09/Article_Fast-Fashion-1.jpg"
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
            <h2 className="text-3xl font-bold text-center mb-8">Terms And Condition</h2>
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

export default TermsAndCondition;