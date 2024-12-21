import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

// Import your assets here
import logo from "../assets/blacklogo.png";
import shopping from "../assets/CART.png";
import user from "../assets/USER.png";
import search from "../assets/SEARCH.png";
import menu from "../assets/MENU.png";

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
        <img 
          src={shopping} 
          alt="Shopping Cart Icon" 
          className="text-xl p-2 hover:text-gray-400 w-10 h-10"
        />
      </div>

      {/* Side Menu */}
      <div
        className={`fixed top-0 left-0 h-screen w-2/5 bg-black/90 text-white z-30 transform transition-transform duration-500 ease-in-out ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        id="side-menu"
        style={{ width: "410px" }}
      >
        <div className="p-6 flex flex-col h-full">
          <div className="flex justify-end mb-8"></div>

          {/* Main Menu Links */}
          <div className="flex-1 space-y-6 text-lg font-regular">
            <a href="/" className="flex items-center justify-between hover:text-gray-400">
              <span>HOME</span> 
            </a>
            <Link to="/shop" className="flex items-center justify-between hover:text-gray-400">
              <span>SHOP ALL</span>
            </Link>
            <Link to="/LTD/:id" className="flex items-center justify-between hover:text-gray-400">
              <span>LTD. ED.</span>
            </Link>
            <Link to="/Basic/:id" className="flex items-center justify-between hover:text-gray-400">
              <span>BASIC</span>
            </Link>
            <Link to="/Limited/:id" className="flex items-center justify-between hover:text-gray-400">
              <span>LIMITED STOCKS</span>
            </Link>
          </div>

          {/* Footer Links */}
          <div className="space-y-5 text-sm text-gray-400 mt-4">
            <Link to="/CustomerService" className="block hover:text-gray-300">Customer Service</Link>
            <Link to="/Orders" className="block hover:text-gray-300">Order Management</Link>
            <a href="/" className="block hover:text-gray-300">Return Policy</a>
            <a href="/" className="block hover:text-gray-300">Privacy</a>
            <a href="/" className="block hover:text-gray-300">FAQ</a>
            <a href="/" className="block hover:text-gray-300">Cookies</a>
            <a href="/" className="block hover:text-gray-300">Terms & Condition</a>

            {/* Social Icons */}
            <div className="flex space-x-4 mt-4">
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-instagram text-gray-400 hover:text-gray-300 text-lg"></i>
              </a>
              <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-linkedin-in text-gray-400 hover:text-gray-300 text-lg"></i>
              </a>
              <a href="tel:+123456789" target="_blank" rel="noopener noreferrer">
                <i className="fas fa-phone-alt text-gray-400 hover:text-gray-300 text-lg"></i>
              </a>
              <a href="mailto:someone@example.com" target="_blank" rel="noopener noreferrer">
                <i className="fas fa-envelope text-gray-400 hover:text-gray-300 text-lg"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

const AccountSection = () => {
  const accountData = {
    name: "Nidhi Pati",
    location: "India",
    addressCount: 1
  };

  const [activeTab, setActiveTab] = useState('all');

  const orders = [
    {
      id: "ORD123456",
      date: "2024-03-15",
      status: "processing",
      items: [
        { name: "Classic White T-Shirt", quantity: 2, price: 29.99 }
      ],
      total: 59.98
    },
    {
      id: "ORD123455",
      date: "2024-02-28",
      status: "delivered",
      items: [
        { name: "Black Denim Jacket", quantity: 1, price: 89.99 }
      ],
      total: 89.99
    }
  ];

  const filteredOrders = activeTab === 'all' 
    ? orders 
    : orders.filter(order => order.status === activeTab);

  const getStatusColor = (status) => {
    switch(status) {
      case 'processing': return 'text-orange-500';
      case 'delivered': return 'text-green-500';
      default: return 'text-gray-500';
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="space-y-8">
        {/* Account Header */}
        <div className="flex flex-col space-y-2">
          <h1 className="text-2xl font-semibold">Account</h1>
          <a href="/logout" className="text-sm text-gray-600 hover:underline flex items-center space-x-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span>You go out</span>
          </a>
        </div>

        {/* Main Content Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Order History */}
          <div className="space-y-6">
            <h2 className="text-lg font-medium">Order history</h2>
            
            {/* Order Tabs */}
            <div className="flex space-x-4 border-b">
              <button 
                className={`pb-2 px-1 ${activeTab === 'all' ? 'border-b-2 border-black' : ''}`}
                onClick={() => setActiveTab('all')}
              >
                All Orders
              </button>
              <button 
                className={`pb-2 px-1 ${activeTab === 'processing' ? 'border-b-2 border-black' : ''}`}
                onClick={() => setActiveTab('processing')}
              >
                Processing
              </button>
              <button 
                className={`pb-2 px-1 ${activeTab === 'delivered' ? 'border-b-2 border-black' : ''}`}
                onClick={() => setActiveTab('delivered')}
              >
                Delivered
              </button>
            </div>

            {/* Orders List */}
            <div className="space-y-4">
              {filteredOrders.length === 0 ? (
                <p className="text-gray-600 text-sm">No orders found</p>
              ) : (
                filteredOrders.map(order => (
                  <div key={order.id} className="border p-4 rounded-lg space-y-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium">Order #{order.id}</p>
                        <p className="text-sm text-gray-500">
                          {new Date(order.date).toLocaleDateString()}
                        </p>
                      </div>
                      <span className={`capitalize ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </div>
                    
                    {/* Order Items */}
                    <div className="space-y-2">
                      {order.items.map((item, index) => (
                        <div key={index} className="text-sm flex justify-between">
                          <span>{item.quantity}x {item.name}</span>
                          <span>${item.price.toFixed(2)}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="pt-2 border-t flex justify-between">
                      <span className="font-medium">Total</span>
                      <span className="font-medium">${order.total.toFixed(2)}</span>
                    </div>
                    
                    <button className="w-full py-2 text-sm border border-black hover:bg-black hover:text-white transition-colors">
                      View Order Details
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Account Details */}
          <div className="space-y-4">
            <h2 className="text-lg font-medium">Account Details</h2>
            <div className="space-y-2">
              <p className="text-gray-800">{accountData.name}</p>
              <p className="text-gray-600">{accountData.location}</p>
              <a 
                href="/addresses" 
                className="text-sm text-gray-600 hover:underline inline-block mt-2"
              >
                View addresses ({accountData.addressCount})
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const OrderManagement = () => {
  return (
    <div>
      <Navbar />
      <div className="pt-24"> {/* Add padding to account for fixed navbar */}
        <AccountSection />
      </div>
    </div>
  );
};

export default OrderManagement;