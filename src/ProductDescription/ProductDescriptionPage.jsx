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
    image: 'https://picsum.photos/800/800?random=8',
    soldOut: true,
    color: 'Almond'
  }
];

const Navbar = ({ cartCount, toggleCart }) => {
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

      <div
        className={`fixed top-0 left-0 h-screen bg-black/90 text-white z-30 transform transition-transform duration-500 ease-in-out ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        } ${
          isMobile ? "w-[400]" : "w-[410px]"
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

const ProductCard = ({ product, onAddToCart }) => {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="product-card block bg-white overflow-hidden transition-transform duration-300 hover:scale-105 relative">
      {product.soldOut && (
        <span className="absolute top-1 right-1 sm:top-2 sm:right-2 md:top-4 md:right-4 z-10 bg-white px-1 sm:px-2 py-0.5 sm:py-1 text-[8px] sm:text-xs font-medium text-black border border-gray-200 rounded">
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
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-500 text-xs sm:text-sm md:text-base">
              Image not available
            </div>
          )}
        </div>
        <div className="p-2 sm:p-3 md:p-4">
          <div className="flex justify-between items-start">
            <h3 className="text-[10px] sm:text-xs md:text-sm font-medium text-gray-900 flex-1">{product.name}</h3>
            <p className="text-[10px] sm:text-xs md:text-sm font-medium text-gray-900 ml-1 sm:ml-2">₹{product.price.toFixed(2)}</p>
          </div>
          <p className="mt-0.5 sm:mt-1 text-[8px] sm:text-xs md:text-sm text-gray-500">{product.color}</p>
        </div>
      </Link>
    </div>
  );
};

const CartMenu = ({ cart, updateQuantity, removeFromCart, applyDiscount, checkout, closeCart }) => {
  const [discountCode, setDiscountCode] = useState('');
  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="fixed top-0 right-0 h-screen w-full sm:w-[320px] md:w-[400px] bg-white shadow-lg z-40 overflow-hidden flex flex-col">
      <div className="p-3 sm:p-4 md:p-6 bg-black text-white flex justify-between items-center">
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold">Your Cart</h2>
        <button onClick={closeCart} className="text-white hover:text-gray-300 transition-colors">
          <i className="fa fa-times text-lg sm:text-xl md:text-2xl"></i>
        </button>
      </div>

      <div className="flex-grow overflow-y-auto p-3 sm:p-4 md:p-6">
        {cart.length === 0 ? (
          <p className="text-gray-500 text-center text-xs sm:text-sm md:text-base">Your cart is empty</p>
        ) : (
          cart.map((item) => (
            <div key={item.id} className="mb-3 sm:mb-4 md:mb-6 pb-3 sm:pb-4 md:pb-6 border-b border-gray-200 last:border-b-0">
              <div className="flex justify-between items-start mb-1 sm:mb-2">
                <div>
                  <h3 className="font-bold text-xs sm:text-sm md:text-lg">{item.name}</h3>
                  <p className="text-gray-600 text-[10px] sm:text-xs md:text-sm">€{item.price} x {item.quantity}</p>
                </div>
                <button onClick={() => removeFromCart(item.id)} className="text-black hover:text-red-500 transition-colors">
                  <i className="fa fa-trash text-xs sm:text-sm"></i>
                </button>
              </div>
              <div className="flex items-center mt-1 sm:mt-2">
                <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="bg-gray-200 text-black px-1 sm:px-2 md:px-3 py-0.5 sm:py-1 rounded-l hover:bg-gray-300 transition-colors text-xs sm:text-sm">-</button>
                <span className="bg-gray-100 px-2 sm:px-3 md:px-4 py-0.5 sm:py-1 text-xs sm:text-sm">{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="bg-gray-200 text-black px-1 sm:px-2 md:px-3 py-0.5 sm:py-1 rounded-r hover:bg-gray-300 transition-colors text-xs sm:text-sm">+</button>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="p-3 sm:p-4 md:p-6 bg-gray-50 border-t border-gray-200">
        <div className="mb-3 sm:mb-4">
          <input
            type="text"
            placeholder="Discount Code"
            value={discountCode}
            onChange={(e) => setDiscountCode(e.target.value)}
            className="w-full p-1 sm:p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black text-xs sm:text-sm md:text-base"
          />
          <button
            onClick={() => applyDiscount(discountCode)}
            className="w-full mt-1 sm:mt-2 bg-black text-white py-1 sm:py-2 rounded hover:bg-gray-800 transition-colors text-xs sm:text-sm md:text-base"
          >
            Apply Discount
          </button>
        </div>
        <div className="flex justify-between items-center mb-3 sm:mb-4">
          <span className="text-sm sm:text-base md:text-lg font-bold">Total:</span>
          <span className="text-lg sm:text-xl md:text-2xl font-bold">₹{totalPrice.toFixed(2)}</span>
        </div>
        <button
          onClick={checkout}
          className="w-full bg-black text-white py-1 sm:py-2 md:py-3 rounded text-sm sm:text-base md:text-lg font-bold hover:bg-gray-800 transition-colors"
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
      <div className="w-full px-2 sm:px-4 pt-16 sm:pt-20 md:pt-24 pb-2 sm:pb-4 md:pb-8">
        <h4 className="text-xl sm:text-2xl md:text-2xl font-bold text-left" style={{ fontFamily: 'Helvetica Neue, sans-serif' }}>
          SHOP ALL
        </h4>
      </div>
      <div className="w-full px-2 sm:px-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4">
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

