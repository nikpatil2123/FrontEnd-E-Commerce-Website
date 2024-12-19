import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/blacklogo.png';

// Reusing the Button component
const Button = React.forwardRef(({ className, variant, size, children, ...props }, ref) => {
  const baseStyle = "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50";
  const variantStyles = {
    ghost: "hover:bg-accent hover:text-accent-foreground",
  };
  const sizeStyles = {
    icon: "h-9 w-9",
  };
  
  return (
    <button
      className={`${baseStyle} ${variantStyles[variant] || ''} ${sizeStyles[size] || ''} ${className || ''}`}
      ref={ref}
      {...props}
    >
      {children}
    </button>
  );
});

// Add Accordion Components
const Accordion = ({ children, type, collapsible, className }) => {
    return (
      <div className={`space-y-1 ${className}`}>
        {children}
      </div>
    );
  };
  
  const AccordionItem = ({ children, value }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <div className="border-b">
        {React.Children.map(children, child => 
          React.cloneElement(child, { isOpen, setIsOpen })
        )}
      </div>
    );
  };
  
  const AccordionTrigger = ({ children, className, isOpen, setIsOpen }) => {
    return (
      <button
        className={`flex w-full items-center justify-between py-4 text-sm font-medium transition-all hover:underline ${className}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {children}
        <span className={`h-4 w-4 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>▼</span>
      </button>
    );
  };
  
  const AccordionContent = ({ children, className, isOpen }) => {
    if (!isOpen) return null;
    return (
      <div className={`pb-4 pt-0 ${className}`}>
        {children}
      </div>
    );
  };
  

// Cart Menu Component
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

// Updated Navbar Component with Cart
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

  return (
    <nav className="flex items-center justify-between h-16 bg-transparent fixed top-0 left-0 right-0 z-20 px-4">
      {/* Left side */}
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
              onChange={(e) => setSearchQuery(e.target.value)}
              ref={searchInputRef}
            />
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
        <Link to="/">
          <img src={logo} alt="Logo" className="h-12 mx-auto" />
        </Link>
      </div>

      {/* Right side */}
      <div className="flex items-center space-x-4 text-black">
        <Link to="/login">
          <i className="fa fa-user text-xl p-2 hover:text-gray-400"></i>
        </Link>
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

// Updated ProductPage Component with Cart Integration
const ProductPage = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState('L');
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  const images = [
    'https://via.placeholder.com/800x800.png?text=Image+1',
    'https://via.placeholder.com/800x800.png?text=Image+2',
    'https://via.placeholder.com/800x800.png?text=Image+3'

  ];

  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

  // Cart functions
  const addToCart = () => {
    const product = {
      id: 1, // You should use actual product ID
      name: 'ITEM1',
      price: 139,
      size: selectedSize,
      quantity: 1
    };

    setCart(prevCart => {
      const existingItem = prevCart.find(item => 
        item.id === product.id && item.size === product.size
      );
      
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id && item.size === product.size
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, product];
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
    <div className="min-h-screen flex flex-col">
      <Navbar cartCount={cartCount} toggleCart={toggleCart} />

      <main className="flex-1 container mx-auto px-4 py-8 mt-16">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Product Images */}
          <div className="relative">
            <img
              src={images[currentImageIndex]}
              alt="Product"
              className="w-full aspect-square object-cover"
            />
            <button
              onClick={() => setCurrentImageIndex(i => (i > 0 ? i - 1 : images.length - 1))}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full"
            >
              <span>◀</span>
            </button>
            <button
              onClick={() => setCurrentImageIndex(i => (i < images.length - 1 ? i + 1 : 0))}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full"
            >
              <span>▶</span>
            </button>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-medium">ITEM1</h2>
              <p className="text-xl mt-2">₹139.00</p>
            </div>

            {/* Size Selection */}
            <div className="space-y-4">
              <div className="flex gap-2">
                {sizes.map(size => (
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

            {/* Accordion sections remain the same */}
            {/* Accordion Sections */}
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="details">
                <AccordionTrigger className="text-left">DETAILS</AccordionTrigger>
                <AccordionContent>
                  <p>Heavy cotton sweater with half-zip design. Made from premium materials for ultimate comfort and durability.</p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="size-guide">
                <AccordionTrigger className="text-left">SIZE GUIDE</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2">
                    <p>XS: Chest 86-91cm, Length 65cm</p>
                    <p>S: Chest 91-96cm, Length 67cm</p>
                    <p>M: Chest 96-101cm, Length 69cm</p>
                    <p>L: Chest 101-106cm, Length 71cm</p>
                    <p>XL: Chest 106-111cm, Length 73cm</p>
                    <p>XXL: Chest 111-116cm, Length 75cm</p>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="washing">
                <AccordionTrigger className="text-left">WASHING INSTRUCTIONS</AccordionTrigger>
                <AccordionContent>
                  <ul className="list-disc pl-4 space-y-2">
                    <li>Machine wash at 30°C</li>
                    <li>Do not tumble dry</li>
                    <li>Iron on low temperature</li>
                    <li>Do not bleach</li>
                    <li>Dry flat</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="shipping">
                <AccordionTrigger className="text-left">SHIPPING & RETURNS</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium">Shipping</h4>
                      <p>Free shipping on orders over 350€ worldwide. Standard delivery 3-5 working days.</p>
                    </div>
                    <div>
                      <h4 className="font-medium">Returns</h4>
                      <p>Free returns within 14 days. Items must be unworn and in original packaging.</p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </main>

      {/* Cart Modal */}
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

export default ProductPage;