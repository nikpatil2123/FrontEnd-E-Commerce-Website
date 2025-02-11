import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import logo from "../assets/blacklogo.png";
import shopping from "../assets/CART.png";
import user from "../assets/USER.png";
import search from "../assets/SEARCH.png";
import menu from "../assets/MENU.png";

const CartMenu = ({ cart, updateQuantity, removeFromCart, applyDiscount, checkout, closeCart }) => {
  const [discountCode, setDiscountCode] = useState('');
  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="fixed top-0 right-0 h-screen w-full sm:max-w-md bg-white shadow-lg z-40 overflow-hidden flex flex-col">
      <div className="p-4 sm:p-6 bg-black text-white flex justify-between items-center">
        <h2 className="text-xl sm:text-2xl font-bold">Your Cart</h2>
        <button onClick={closeCart} className="text-white hover:text-gray-300 transition-colors">
          <i className="fa fa-times text-xl sm:text-2xl"></i>
        </button>
      </div>
      
      <div className="flex-grow overflow-y-auto p-4 sm:p-6">
        {cart.length === 0 ? (
          <p className="text-gray-500 text-center">Your cart is empty</p>
        ) : (
          cart.map((item) => (
            <div key={item.id} className="mb-6 pb-6 border-b border-gray-200 last:border-b-0">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-bold text-base sm:text-lg">{item.name}</h3>
                  <p className="text-gray-600">₹{item.price} x {item.quantity}</p>
                </div>
                <button onClick={() => removeFromCart(item.id)} className="text-black hover:text-red-500 transition-colors">
                  <i className="fa fa-trash"></i>
                </button>
              </div>
              <div className="flex items-center mt-2">
                <button 
                  onClick={() => updateQuantity(item.id, item.quantity - 1)} 
                  className="bg-gray-200 text-black px-3 py-1 rounded-l hover:bg-gray-300 transition-colors"
                >-</button>
                <span className="bg-gray-100 px-4 py-1">{item.quantity}</span>
                <button 
                  onClick={() => updateQuantity(item.id, item.quantity + 1)} 
                  className="bg-gray-200 text-black px-3 py-1 rounded-r hover:bg-gray-300 transition-colors"
                >+</button>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="p-4 sm:p-6 bg-gray-50 border-t border-gray-200">
        <div className="mb-4">
          <input
            type="text"
            placeholder="Discount Code"
            value={discountCode}
            onChange={(e) => setDiscountCode(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
          />
          <button
            onClick={() => applyDiscount(discountCode)}
            className="w-full mt-2 bg-black text-white py-2 rounded hover:bg-gray-800 transition-colors"
          >Apply Discount</button>
        </div>
        <div className="flex justify-between items-center mb-4">
          <span className="text-lg font-bold">Total:</span>
          <span className="text-xl sm:text-2xl font-bold">₹{totalPrice.toFixed(2)}</span>
        </div>
        <button
          onClick={checkout}
          className="w-full bg-black text-white py-3 rounded text-lg font-bold hover:bg-gray-800 transition-colors"
        >Checkout</button>
      </div>
    </div>
  );
};

const Navbar = ({ cartCount, toggleCart }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const searchInputRef = useRef(null);

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
    <nav className="flex items-center justify-between h-16 bg-transparent fixed top-0 left-0 right-0 z-20 px-4 sm:px-8 py-8 sm:py-12 pt-12">
      {/* Left: Menu Icon and Search */}
      <div className="flex items-center space-x-4 text-black">
        <img
          src={menu}
          alt=""
          className="text-xl p-2 hover:text-gray-400 w-10 h-10 cursor-pointer"
          id="menu-icon"
          onClick={toggleMenu}
        />
        {isSearchOpen && (
          <div className="relative flex-1" id="search-input">
            <input
              type="text"
              className="bg-gray-800 text-white px-3 py-1 sm:px-4 sm:py-2 rounded-full focus:outline-none w-full text-sm sm:text-base"
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
          className="text-xl p-2 hover:text-gray-400 w-10 h-10 cursor-pointer"
          id="search-icon"
          onClick={toggleSearch}
        />
        )}
      </div>

      {/* Center: Logo */}
      <div className="flex-1 text-center">
        <a href="/">
          <div className="flex justify-center items-center">
            <img src={logo} alt="Logo" className="h-16 w-16" />
          </div>
        </a>
      </div>

      {/* Right: User and Cart */}
      <div className="flex items-center space-x-4 text-black">
        <Link to="/login">
          <img
            src={user}
            alt="User Icon"
            className="text-xl p-2 hover:text-gray-400 w-10 h-10"
          />
        </Link>
        <div className="relative">
          <img
            src={shopping}
            alt="Shopping Cart Icon"
            className="text-xl p-2 hover:text-gray-400 w-10 h-10 cursor-pointer"
            onClick={toggleCart}
          />
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
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
  );
};

const HeroSection = () => {
  const [banner, setBanner] = useState({ mediaUrl: '', mediaType: 'image' });

  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/banner');
        setBanner(response.data);
      } catch (error) {
        console.error('Error fetching banner:', error);
      }
    };

    fetchBanner();
  }, []);

  return (
    <Link to="/shop">
      <header className="relative h-screen flex items-center justify-center">
        {banner.mediaType === 'video' ? (
          <video
            src={banner.mediaUrl}
            autoPlay
            loop
            muted
            className="hero-image absolute w-full h-full object-cover"
          />
        ) : (
          <img
            src={banner.mediaUrl}
            alt="Tristana Collection"
            className="hero-image absolute w-full h-full object-cover"
          />
        )}
      </header>
    </Link>
  );
};

const Comp1 = () => {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeFromCart = (id) => {
    setCart(prevCart => prevCart.filter(item => item.id !== id));
  };

  const applyDiscount = (code) => {
    // Implement discount logic here
    console.log(`Applying discount with code: ${code}`);
  };

  const checkout = () => {
    // Implement checkout logic here
    console.log('Proceeding to checkout');
  };

  const toggleCart = () => {
    setIsCartOpen(prevState => !prevState);
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <div>
      <Navbar cartCount={cartCount} toggleCart={toggleCart} />
      <HeroSection />
      {isCartOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-30">
          <CartMenu
            cart={cart}
            updateQuantity={updateQuantity}
            removeFromCart={removeFromCart}
            applyDiscount={applyDiscount}
            checkout={checkout}
            closeCart={toggleCart}
          />
        </div>
      )}
    </div>
  );
};

export default Comp1;