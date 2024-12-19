import React, { useState, useEffect, useRef } from "react";
import logo from "../assets/blacklogo.png"; // Replace with your local logo file
import { Link } from "react-router-dom";
import hero from "../assets/images.png";
const Navbar = () => {
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
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  return (
    <nav className="flex items-center justify-between h-16 bg-transparent fixed top-0 left-0 right-0 z-20 px-4">
      {/* Left: Menu Icon and Search */}
      <div className="flex items-center space-x-4 text-black">
        <i
          className="fa fa-bars cursor-pointer text-xl p-2 hover:text-gray-400"
          id="menu-icon"
          onClick={toggleMenu}
        ></i>
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
            <i
              className="fa fa-search absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-400 cursor-pointer"
              id="search-icon"
              onClick={toggleSearch}
            ></i>
          </div>
        )}
        {!isSearchOpen && (
          <i
            className="fa fa-search text-xl p-2 hover:text-gray-400 cursor-pointer"
            id="search-icon"
            onClick={toggleSearch}
          ></i>
        )}
      </div>

      {/* Center: Logo */}
      <div className="flex-1 text-center">
        <a href="/">
          <img src={logo} alt="Logo" className="h-12 mx-auto" />
        </a>
      </div>

      {/* Right: Wishlist and Cart */}
      <div className="flex items-center space-x-4 text-black">
        <Link to="/login">
          <i className="fa fa-user text-xl p-2 hover:text-gray-400"></i>
        </Link>
        <i className="fa fa-shopping-cart text-xl p-2 hover:text-gray-400"></i>
      </div>

      {/* Side Menu */}
      <div
        className={`fixed top-0 left-0 h-screen w-2/5 bg-black/90 text-white z-30 transform transition-transform duration-500 ease-in-out ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
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

const HeroSection = () => {
  return (
    <header className="relative h-screen flex items-center justify-center">
      <img
        src={hero}
        alt="Tristana Collection"
        className="hero-image absolute w-full h-full object-cover"
      />
    </header>
  );
};

const Comp1 = () => {
  return (
    <div>
      <Navbar />
      <HeroSection />
    </div>
  );
};

export default Comp1;