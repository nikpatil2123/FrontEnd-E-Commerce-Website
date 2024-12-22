import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/blacklogo.png';
import shopping from "../assets/CART.png";
import user from "../assets/USER.png";
import search from "../assets/SEARCH.png";
import menu from "../assets/MENU.png";

// Button Component
const Button = React.forwardRef(({ className, variant, size, children, ...props }, ref) => {
  return (
    <button
      className={`inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 ${className}`}
      ref={ref}
      {...props}
    >
      {children}
    </button>
  );
});

// Accordion Components
const AccordionItem = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="border-b border-gray-200">
      <button
        className="flex w-full items-center justify-between py-4 text-left text-sm hover:text-gray-500"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-medium text-gray-900">{title}</span>
        <span className={`ml-6 flex items-center transform transition-transform ${isOpen ? 'rotate-180' : ''}`}>
          ▼
        </span>
      </button>
      {isOpen && (
        <div className="pb-4">
          {children}
        </div>
      )}
    </div>
  );
};

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
    <>
      <nav className="fixed top-0 left-0 right-0 h-20 bg-white shadow-sm z-50 px-8">
        <div className="flex items-center justify-between h-full max-w-[1400px] mx-auto">
          {/* Left: Menu Icon */}
          <div className="flex items-center space-x-4 text-black">
            <img
              src={menu}
              alt=""
              className="text-xl p-2 hover:opacity-70 transition-opacity w-10 h-10 cursor-pointer"
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
                  onChange={(e) => setSearchQuery(e.target.value)}
                  ref={searchInputRef}
                />
              </div>
            )}
            {!isSearchOpen && (
              <img
                src={search}
                alt="search icon"
                className="text-xl p-2 hover:opacity-70 transition-opacity w-10 h-10 cursor-pointer"
                id="search-icon"
                onClick={toggleSearch}
              />
            )}
          </div>

          {/* Center: Logo */}
          <div className="absolute left-1/2 transform -translate-x-1/2">
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
                className="text-xl p-2 hover:opacity-70 transition-opacity w-10 h-10"
              />
            </Link>
            <div className="relative">
              <img
                src={shopping}
                alt="Shopping Cart Icon"
                className="text-xl p-2 hover:opacity-70 transition-opacity w-10 h-10 cursor-pointer"
                onClick={toggleCart}
              />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {cartCount}
                </span>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Side Menu */}
      <div
        className={`fixed top-0 left-0 h-screen w-[410px] bg-black/90 text-white z-[60] transform transition-transform duration-500 ease-in-out ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        id="side-menu"
      >
        <div className="flex justify-end mb-8">
            {/* <i
              className="fa fa-times text-3xl cursor-pointer hover:text-gray-400"
              onClick={toggleMenu}
            ></i> */}
          </div>
        <div className="p-6 flex flex-col h-full">
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

          <div className="space-y-5 text-sm text-gray-400 mt-auto">
            <Link to="/CustomerService" className="block hover:text-gray-300">Customer Service</Link>
            <Link to="/Orders" className="block hover:text-gray-300">Order Management</Link>
            <Link to="/ReturnPolicy" className="block hover:text-gray-300">Return Policy</Link>
            <Link to="/Privacy" className="block hover:text-gray-300">Privacy</Link>
            <Link to="/FAQ" className="block hover:text-gray-300">FAQ</Link>
            <Link to="/Cookies" className="block hover:text-gray-300">Cookies</Link>
            <Link to="/T&C" className="block hover:text-gray-300">Terms & Condition</Link>

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
    </>
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
                  <p className="text-gray-600">Size: {item.size}</p>
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

const ProductPage = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState('L');
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const product = {
    id: 1,
    name: '545 HALF ZIP HEAVY COTTON SWEATER WINE RED',
    price: 139.00,
    images: [
      'https://picsum.photos/800/800?random=1',
      'https://picsum.photos/800/800?random=2',
      'https://picsum.photos/800/800?random=3',
      'https://picsum.photos/800/800?random=4',
      'https://picsum.photos/800/800?random=5'
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    
  };

  const addToCart = () => {
    const item = {
      id: product.id,
      name: product.name,
      price: product.price,
      size: selectedSize,
      quantity: 1
    };

    setCart(prevCart => {
      const existingItem = prevCart.find(i => 
        i.id === item.id && i.size === item.size
      );
      
      if (existingItem) {
        return prevCart.map(i =>
          i.id === item.id && i.size === item.size
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }
      return [...prevCart, item];
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
    <div className="min-h-screen bg-white">
      <Navbar cartCount={cartCount} toggleCart={toggleCart} />

      <main className="container mx-auto px-4 pt-24">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Product Images */}
          <div className="relative">
            <img
              src={product.images[currentImageIndex]}
alt={product.name}
              className="w-[900px] h-[900px] object-cover"
            />
            <button
              onClick={() => setCurrentImageIndex(i => (i > 0 ? i - 1 : product.images.length - 1))}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/75 p-2 rounded-full hover:bg-white"
            >
              ◀️
            </button>
            <button
              onClick={() => setCurrentImageIndex(i => (i < product.images.length - 1 ? i + 1 : 0))}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/75 p-2 rounded-full hover:bg-white"
            >
              ▶️
            </button>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-medium">{product.name}</h1>
              <p className="text-xl mt-2">₹{product.price.toFixed(2)}</p>
            </div>

            {/* Size Selection */}
            <div className="space-y-4">
              <div className="flex gap-2">
                {product.sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 border rounded ${
                      selectedSize === size 
                        ? 'border-black bg-black text-white' 
                        : 'border-gray-200 hover:border-black'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
              
              <Button 
                className="w-full py-6 text-lg bg-black text-white hover:bg-gray-800"
                onClick={addToCart}
              >
                ADD TO CART
              </Button>
            </div>

            {/* Shipping Info */}
            {/* <div className="text-sm text-gray-600 space-y-1">
              <p>Italy free shipping over €200.</p>
              <p>Worldwide free shipping over €350.</p>
            </div> */}

            {/* Accordion Sections */}
            <div className="space-y-4">
              <AccordionItem title="DETAILS">
                <p className="text-sm text-gray-600">
                  Heavy cotton sweater with half-zip design. Made from premium materials for ultimate comfort and durability.
                </p>
              </AccordionItem>

              <AccordionItem title="SIZE GUIDE">
                <div className="space-y-2 text-sm text-gray-600">
                  <p>XS: Chest 86-91cm, Length 65cm</p>
                  <p>S: Chest 91-96cm, Length 67cm</p>
                  <p>M: Chest 96-101cm, Length 69cm</p>
                  <p>L: Chest 101-106cm, Length 71cm</p>
                  <p>XL: Chest 106-111cm, Length 73cm</p>
                  <p>XXL: Chest 111-116cm, Length 75cm</p>
                </div>
              </AccordionItem>

              <AccordionItem title="WASHING INSTRUCTIONS">
                <ul className="list-disc pl-4 space-y-2 text-sm text-gray-600">
                  <li>Machine wash at 30°C</li>
                  <li>Do not tumble dry</li>
                  <li>Iron on low temperature</li>
                  <li>Do not bleach</li>
                  <li>Dry flat</li>
                </ul>
              </AccordionItem>

              <AccordionItem title="SHIPPING & RETURNS">
                <div className="space-y-4 text-sm text-gray-600">
                  <div>
                    <h4 className="font-medium">Shipping</h4>
                    <p>Free shipping on orders over €350 worldwide. Standard delivery 3-5 working days.</p>
                  </div>
                  <div>
                    <h4 className="font-medium">Returns</h4>
                    <p>Free returns within 14 days. Items must be unworn and in original packaging.</p>
                  </div>
                </div>
              </AccordionItem>
            </div>
          </div>
        </div>
      </main>

      {/* Cart Modal */}
      {isCartOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-[70]">
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

export default ProductPage;