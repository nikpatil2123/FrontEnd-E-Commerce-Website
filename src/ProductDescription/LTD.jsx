import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/blacklogo.png';
import shopping from "../assets/CART.png";
import user from "../assets/USER.png";
import search from "../assets/SEARCH.png"
import menu from "../assets/MENU.png";

const products = [
  {
    id: 1,
    name: '545 HALF ZIP HEAVY COTTON SWEATER WINE RED',
    price: 139.00,
    image: 'https://picsum.photos/800/800?random=1',
    soldOut: false,
    color: 'Wine Red'
  },
  {
    id: 2,
    name: '545 HALF ZIP HEAVY COTTON SWEATER GLACIER',
    price: 139.00,
    image: 'https://picsum.photos/800/800?random=2',
    soldOut: true,
    color: 'Glacier'
  },
  {
    id: 3,
    name: '545 HALF ZIP HEAVY COTTON SWEATER MINT',
    price: 139.00,
    image: 'https://picsum.photos/800/800?random=3',
    soldOut: true,
    color: 'Mint'
  },
  {
    id: 4,
    name: '545 HALF ZIP HEAVY COTTON SWEATER ALMOND',
    price: 139.00,
    image: 'https://picsum.photos/800/800?random=4',
    soldOut: true,
    color: 'Almond'
  },
  {
    id: 5,
    name: '545 HALF ZIP HEAVY COTTON SWEATER WINE RED',
    price: 139.00,
    image: 'https://picsum.photos/800/800?random=5',
    soldOut: true,
    color: 'Wine Red'
  },
  {
    id: 6,
    name: '545 HALF ZIP HEAVY COTTON SWEATER GLACIER',
    price: 139.00,
    image: 'https://picsum.photos/800/800?random=6',
    soldOut: true,
    color: 'Glacier'
  },
  {
    id: 7,
    name: '545 HALF ZIP HEAVY COTTON SWEATER MINT',
    price: 139.00,
    image: 'https://picsum.photos/800/800?random=7',
    soldOut: true,
    color: 'Mint'
  },
  {
    id: 8,
    name: '545 HALF ZIP HEAVY COTTON SWEATER ALMOND',
    price: 139.00,
    image: 'https://picsum.photos/800/800?random=1',
    soldOut: true,
    color: 'Almond'
  }
];

const Navbar = ({ cartCount, toggleCart }) => {
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
      if (!e.target.closest("#side-menu") && e.target.id !== "menu-icon") {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener("click", closeMenu);
    return () => window.removeEventListener("click", closeMenu);
  }, []);

  return (
    <nav className="flex items-center justify-between h-20 bg-white fixed top-0 left-0 right-0 z-50 px-8 shadow-md">
      {/* Left: Menu Icon */}
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
            <i
              className="fa fa-search absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-400 cursor-pointer"
              id="search-icon"
              onClick={toggleSearch}
            ></i>
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

      {/* Right: Wishlist and Cart */}
      <div className="flex items-center space-x-4 text-black">
        <Link to="/login">
          <img
            src={user}
            alt="uSER ICON"
            className="text-xl p-2 hover:text-gray-400 w-10 h-10"
          />
        </Link>
        <div className="relative">
          <img
            src={shopping}
            alt="Shopping Cart Icon"
            className="text-xl p-2 hover:text-gray-400 w-10 h-10"
            onClick={toggleCart}
          ></img>
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
              {cartCount}
            </span>
          )}
        </div>
      </div>

      {/* Side Menu */}
      <div
        className={`fixed top-0 left-0 h-screen w-[300px] bg-black/90 text-white z-30 transform transition-transform duration-500 ease-in-out ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
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
            </Link>
            <Link to="/LTD/:id" className="flex items-center justify-between hover:text-gray-400">
              <span>LTD. ED.</span> <i className="fa fa-chevron-right text-sm"></i>
            </Link>
            <Link to="/Basic/:id" className="flex items-center justify-between hover:text-gray-400">
              <span>BASIC</span>
            </Link>
            <Link to="/Limited/:id" className="flex items-center justify-between hover:text-gray-400">
              <span>LIMITED STOCKS</span>
            </Link>
          </div>

          {/* Footer Links */}
          <div className="space-y-2 text-sm text-gray-400 mt-8">
            <Link to="/CustomerService" className="block hover:text-gray-300">Customer Service</Link>
            <Link to="/Orders" className="block hover:text-gray-300">Order Management</Link>
            <Link to="/ReturnPolicy" className="block hover:text-gray-300">Return Policy</Link>
            <Link to="/Privacy" className="block hover:text-gray-300">Privacy</Link>
            <Link to="/FAQ" className="block hover:text-gray-300">FAQ</Link>
            <Link to="/Cookies" className="block hover:text-gray-300">Cookies</Link>
            <Link to="/T&C" className="block hover:text-gray-300">Terms & Condition</Link>
          </div>

          <div className="flex space-x-4 mt-4 ">
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
    </nav>
  );
};

const ProductCard = ({ product, onAddToCart }) => {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div className="product-card block bg-white overflow-hidden transition-transform duration-300 hover:scale-105 relative margin-10">
      {product.soldOut && (
        <span className="absolute top-4 right-4 z-10 bg-white px-2 py-1 text-xs font-medium text-black border border-gray-200 rounded">
          Sold Out
        </span>
      )}
      <Link to={`/product/${product.id}`} className="block">
        <div className="aspect-[3/4] relative overflow-hidden">
          {!imageError ? (
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
              onError={handleImageError}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-500">
              Image not available
            </div>
          )}
        </div>
        <div className="p-4">
          <div className="flex justify-between items-start">
            <h3 className="text-sm font-medium text-gray-900 flex-1">{product.name}</h3>
            <p className="text-sm font-medium text-gray-900 ml-2">₹{product.price.toFixed(2)}</p>
          </div>
          <p className="mt-1 text-sm text-gray-500">{product.color}</p>
        </div>
      </Link>
    </div>
  );
};

const CartMenu = ({ cart, updateQuantity, removeFromCart, applyDiscount, checkout, closeCart }) => {
  const [discountCode, setDiscountCode] = useState('');

  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="fixed top-0 right-0 h-screen w-full max-w-md bg-white shadow-lg z-40 overflow-hidden flex flex-col">
      <div className="p-6 bg-black text-white flex justify-between items-center">
        <h2 className="text-2xl font-bold">Your Cart</h2>
        <button onClick={closeCart} className="text-white hover:text-gray-300 transition-colors">
          <i className="fa fa-times text-2xl"></i>
        </button>
      </div>
      <div className="flex-grow overflow-y-auto p-6">
        {cart.length === 0 ? (
          <p className="text-gray-500 text-center">Your cart is empty</p>
        ) : (
          cart.map((item) => (
            <div key={item.id} className="mb-6 pb-6 border-b border-gray-200 last:border-b-0">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-bold text-lg">{item.name}</h3>
                  <p className="text-gray-600">€{item.price} x {item.quantity}</p>
                </div>
                <button onClick={() => removeFromCart(item.id)} className="text-black hover:text-red-500 transition-colors">
                  <i className="fa fa-trash"></i>
                </button>
              </div>
              <div className="flex items-center mt-2">
                <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="bg-gray-200 text-black px-3 py-1 rounded-l hover:bg-gray-300 transition-colors">-</button>
                <span className="bg-gray-100 px-4 py-1">{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="bg-gray-200 text-black px-3 py-1 rounded-r hover:bg-gray-300 transition-colors">+</button>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="p-6 bg-gray-50 border-t border-gray-200">
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
          >
            Apply Discount
          </button>
        </div>
        <div className="flex justify-between items-center mb-4">
          <span className="text-lg font-bold">Total:</span>
          <span className="text-2xl font-bold">₹{totalPrice.toFixed(2)}</span>
        </div>
        <button
          onClick={checkout}
          className="w-full bg-black text-white py-3 rounded text-lg font-bold hover:bg-gray-800 transition-colors"
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

const ProductCardsPage = () => {
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
    console.log(`Applying discount with code: ${code}`);
  };

  const checkout = () => {
    console.log('Proceeding to checkout');
  };

  const toggleCart = () => {
    setIsCartOpen(prevState => !prevState);
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="bg-white min-h-screen">
      <Navbar cartCount={cartCount} toggleCart={toggleCart} />
      <div className="w-full px-4 pt-24 pb-8">
        <h1 className="text-3xl font-bold text-left" style={{ fontFamily: 'Helvetica Neue, sans-serif' }}>LIMITED EDITION</h1>
      </div>
      <div className="w-full px-4">
        <div className="grid grid-cols-4 gap-4">
          {products.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={addToCart}
            />
          ))}
        </div>
      </div>

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

export default ProductCardsPage;