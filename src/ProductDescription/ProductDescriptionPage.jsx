import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/blacklogo.png';

// Sample product data
const products = [
  {
    id: 1,
    name: 'ITEM1',
    price: 48,
    image: 'https://via.placeholder.com/300x400',
  },
  {
    id: 2,
    name: 'ITEM2', 
    price: 35,
    image: 'https://via.placeholder.com/300x400',
  },
  {
    id: 3,
    name: 'ITEM3',
    price: 70,
    image: 'https://via.placeholder.com/300x400',
  }
];

const Navbar = ({ cartCount, toggleCart }) => {
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
        <a href="/login">
          <i className="fa fa-user text-xl p-2 hover:text-gray-400"></i>
        </a>
        <div className="relative">
          <i 
            className="fa fa-shopping-cart text-xl p-2 hover:text-gray-400 cursor-pointer" 
            onClick={toggleCart}
          ></i>
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
            <a href="/shop" className="flex items-center justify-between hover:text-gray-400">
              <span>SHOP</span> <i className="fa fa-chevron-right text-sm"></i>
            </a>
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

const ProductCard = ({ product, onAddToCart }) => {
  return (
    <div className="product-card block bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105 p-5 text-left">
      <Link to={`/product/${product.id}`} className="block mb-2">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-auto object-cover"
        />
        <h3 className="mt-2 mb-1 text-base text-gray-600">{product.name}</h3>
        <p className="text-xl text-gray-800 font-bold">₹{product.price}</p>
      </Link>
      <button 
        onClick={() => onAddToCart(product)}
        className="w-full py-2 bg-black text-white font-bold rounded-md hover:bg-green-700 transition-colors"
      >
        Add to Cart
      </button>
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
                  <p className="text-gray-600">₹{item.price} x {item.quantity}</p>
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
    <div className="bg-gray-100 min-h-screen">
      <Navbar cartCount={cartCount} toggleCart={toggleCart} />
      
      <div className="flex flex-wrap justify-center gap-5 p-10 mt-16">
        {products.map(product => (
          <ProductCard 
            key={product.id} 
            product={product} 
            onAddToCart={addToCart} 
          />
        ))}
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

