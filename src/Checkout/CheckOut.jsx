import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import logo from '../assets/blacklogo.png';
import shopping from "../assets/CART.png";
import user from "../assets/USER.png";
import search from "../assets/SEARCH.png";
import menu from "../assets/MENU.png";

// Navbar Component
const Navbar = ({ cartCount, toggleCart }) => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [isSearchOpen, setIsSearchOpen] = useState(false);
	const [searchQuery, setSearchQuery] = useState("");
	const searchInputRef = useRef(null);
	const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

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
				className={`fixed top-0 left-0 h-screen bg-black/90 text-white z-30 transform transition-transform duration-500 ease-in-out ${isMenuOpen ? "translate-x-0" : "-translate-x-full"} ${isMobile ? "w-[200px]" : "w-[410px]"}`}
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

					<div className="flex-1 space-y-4 sm:space-y-6 text-base sm:text-lg font-regular">
						<a href="/" className="block hover:text-gray-400 py-2">HOME</a>
						<Link to="/shop" className="block hover:text-gray-400 py-2">SHOP ALL</Link>
						<Link to="/LTD/:id" className="block hover:text-gray-400 py-2">LTD. ED.</Link>
						<Link to="/Basic/:id" className="block hover:text-gray-400 py-2">BASIC</Link>
						<Link to="/Limited/:id" className="block hover:text-gray-400 py-2">LIMITED STOCKS</Link>
					</div>

					<div className="space-y-3 sm:space-y-5 text-xs sm:text-sm text-gray-400 mt-4">
						<Link to="/CustomerService" className="block hover:text-gray-300 py-1">Customer Service</Link>
						<Link to="/Orders" className="block hover:text-gray-300 py-1">Order Management</Link>
						<Link to="/ReturnPolicy" className="block hover:text-gray-300 py-1">Return Policy</Link>
						<Link to="/Privacy" className="block hover:text-gray-300 py-1">Privacy</Link>
						<Link to="/FAQ" className="block hover:text-gray-300 py-1">FAQ</Link>
						<Link to="/Cookies" className="block hover:text-gray-300 py-1">Cookies</Link>
						<Link to="/T&C" className="block hover:text-gray-300 py-1">Terms & Condition</Link>

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

// Add CartMenu component before CheckoutPage
const CartMenu = ({ cart, updateQuantity, removeFromCart, applyDiscount, checkout, closeCart }) => {
	const [discountCode, setDiscountCode] = useState('');
	const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

	return (
		<div className="fixed top-0 right-0 h-screen w-full max-w-md bg-white shadow-lg z-40 overflow-hidden flex flex-col">
			<div className="p-6 bg-black text-white flex justify-between items-center">
				<h2 className="text-2xl font-bold">Your Cart</h2>
				<button onClick={closeCart} className="text-white hover:text-gray-300">×</button>
			</div>

			<div className="flex-grow overflow-y-auto p-6">
				{cart.length === 0 ? (
					<p className="text-gray-500 text-center">Your cart is empty</p>
				) : (
					cart.map((item) => (
						<div key={item.id} className="mb-6 pb-6 border-b border-gray-200">
							<div className="flex justify-between items-start mb-2">
								<div>
									<h3 className="font-bold text-lg">{item.name}</h3>
									<p className="text-gray-600">Size: {item.size}</p>
									<p className="text-gray-600">₹{item.price} x {item.quantity}</p>
								</div>
								<button onClick={() => removeFromCart(item.id)} className="text-red-500">
									Remove
								</button>
							</div>
							<div className="flex items-center mt-2">
								<button
									onClick={() => updateQuantity(item.id, item.quantity - 1)}
									className="bg-gray-200 px-3 py-1 rounded-l"
								>
									-
								</button>
								<span className="px-4 py-1 bg-gray-100">{item.quantity}</span>
								<button
									onClick={() => updateQuantity(item.id, item.quantity + 1)}
									className="bg-gray-200 px-3 py-1 rounded-r"
								>
									+
								</button>
							</div>
						</div>
					))
				)}
			</div>

			<div className="p-6 bg-gray-50 border-t">
				<div className="mb-4">
					<input
						type="text"
						placeholder="Discount Code"
						value={discountCode}
						onChange={(e) => setDiscountCode(e.target.value)}
						className="w-full p-2 border rounded"
					/>
					<button
						onClick={() => applyDiscount(discountCode)}
						className="w-full mt-2 bg-black text-white py-2 rounded"
					>
						Apply Discount
					</button>
				</div>
				<div className="flex justify-between mb-4">
					<span>Total:</span>
					<span className="text-xl font-bold">₹{totalPrice.toFixed(2)}</span>
				</div>
				<button
					onClick={checkout}
					className="w-full bg-black text-white py-3 rounded text-lg"
				>
					Checkout
				</button>
			</div>
		</div>
	);
};


const CheckoutPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Debug: log received state
  console.log("Checkout state:", location.state);

  const stateData = location.state || {};
  const stateItems = stateData.items || [];
  const statePrice = stateData.priceBreakdown || null;

  // Use state items if available, else fallback to localStorage
  const [cart, setCart] = useState(() => (
    stateItems.length > 0 ? stateItems : (localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [])
  ));
  
  // Use passed price details if available; otherwise calculate from cart
  const subtotal = statePrice ? statePrice.basePrice : cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = statePrice ? statePrice.shipping : 50;
  const tax = statePrice ? statePrice.tax : subtotal * 0.18;
  const total = statePrice ? statePrice.total : subtotal + shipping + tax;
  
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [newAddress, setNewAddress] = useState({
    name: '',
    street: '',
    city: '',
    state: '',
    pincode: '',
    phone: ''
  });

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    const savedAddresses = JSON.parse(localStorage.getItem('addresses') || '[]');
    setAddresses(savedAddresses);
  }, []);

  const toggleCart = () => setIsCartOpen(prev => !prev);

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    const updatedCart = cart.map(item =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    );
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const removeFromCart = (id) => {
    const updatedCart = cart.filter(item => item.id !== id);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const handleAddressSubmit = (e) => {
    e.preventDefault();
    const addressId = Date.now();
    const addressWithId = { ...newAddress, id: addressId };
    const updatedAddresses = [...addresses, addressWithId];
    setAddresses(updatedAddresses);
    localStorage.setItem('addresses', JSON.stringify(updatedAddresses));
    setShowAddressForm(false);
    setNewAddress({
      name: '',
      street: '',
      city: '',
      state: '',
      pincode: '',
      phone: ''
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar cartCount={cartCount} toggleCart={toggleCart} />
      
      <main className="pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Side - Shipping & Payment */}
            <div className="space-y-8">
              {/* Address Selection */}
              <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>
                {addresses.map((address) => (
                  <div 
                    key={address.id}
                    className={`p-4 border rounded-lg mb-4 cursor-pointer ${
                      selectedAddress === address.id ? 'border-black' : 'border-gray-200'
                    }`}
                    onClick={() => setSelectedAddress(address.id)}
                  >
                    <p className="font-medium">{address.name}</p>
                    <p className="text-gray-600">{address.street}</p>
                    <p className="text-gray-600">{address.city}, {address.state} {address.pincode}</p>
                    <p className="text-gray-600">{address.phone}</p>
                  </div>
                ))}
                <button 
                  onClick={() => setShowAddressForm(true)}
                  className="w-full py-2 border border-black text-black rounded hover:bg-black hover:text-white transition-colors"
                >
                  Add New Address
                </button>
              </div>

              {/* Payment Method */}
              <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
                {['card', 'upi', 'cod'].map((method) => (
                  <label 
                    key={method}
                    className={`block p-4 border rounded-lg mb-4 cursor-pointer ${
                      paymentMethod === method ? 'border-black' : 'border-gray-200'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value={method}
                      checked={paymentMethod === method}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="hidden"
                    />
                    <span className="capitalize">
                      {method === 'cod' ? 'Cash on Delivery' : method.toUpperCase()}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Right Side - Order Summary */}
            <div className="bg-white p-6 rounded-lg shadow h-fit">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              {cart.map((item) => (
                <div key={item.id} className="flex items-center space-x-4 mb-4 pb-4 border-b">
                  {/* Display a fallback image if item.image is absent */}
                  {item.image ? (
                    <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
                  ) : (
                    <div className="w-20 h-20 bg-gray-200 flex items-center justify-center rounded">
                      <span className="text-xs text-gray-500">No Image</span>
                    </div>
                  )}
                  <div className="flex-1">
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-gray-600">Size: {item.size}</p>
                    <div className="flex items-center mt-2">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                      <span className="mx-2">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                    </div>
                  </div>
                  <div>
                    <p className="font-medium">₹{(item.price * item.quantity).toFixed(2)}</p>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}

              <div className="space-y-2 pt-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>₹{shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>₹{tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-lg font-semibold pt-2 border-t">
                  <span>Total</span>
                  <span>₹{total.toFixed(2)}</span>
                </div>
              </div>

              <button 
                onClick={() => {/* Handle place order */}}
                className="w-full mt-6 bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition-colors"
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Address Form Modal */}
      {/* // Replace the existing address form modal code with: */}
			{showAddressForm && (
				<div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
					<div className="bg-white p-6 rounded-lg w-full max-w-md">
						<div className="flex justify-between items-center mb-6">
							<h3 className="text-xl font-semibold">Add New Address</h3>
							<button
								onClick={() => setShowAddressForm(false)}
								className="text-gray-500 hover:text-gray-700 text-2xl"
							>
								×
							</button>
						</div>

						<form onSubmit={handleAddressSubmit} className="space-y-4">
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-1">
									Full Name
								</label>
								<input
									type="text"
									value={newAddress.name}
									onChange={(e) => setNewAddress({ ...newAddress, name: e.target.value })}
									className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
									required
								/>
							</div>

							<div>
								<label className="block text-sm font-medium text-gray-700 mb-1">
									Street Address
								</label>
								<input
									type="text"
									value={newAddress.street}
									onChange={(e) => setNewAddress({ ...newAddress, street: e.target.value })}
									className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
									required
								/>
							</div>

							<div className="grid grid-cols-2 gap-4">
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-1">
										City
									</label>
									<input
										type="text"
										value={newAddress.city}
										onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
										className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
										required
									/>
								</div>
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-1">
										State
									</label>
									<input
										type="text"
										value={newAddress.state}
										onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })}
										className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
										required
									/>
								</div>
							</div>

							<div className="grid grid-cols-2 gap-4">
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-1">
										PIN Code
									</label>
									<input
										type="text"
										value={newAddress.pincode}
										onChange={(e) => setNewAddress({ ...newAddress, pincode: e.target.value })}
										className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
										pattern="[0-9]{6}"
										required
									/>
								</div>
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-1">
										Phone
									</label>
									<input
										type="tel"
										value={newAddress.phone}
										onChange={(e) => setNewAddress({ ...newAddress, phone: e.target.value })}
										className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
										pattern="[0-9]{10}"
										required
									/>
								</div>
							</div>

							<button
								type="submit"
								className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition-colors mt-6"
							>
								Save Address
							</button>
						</form>
					</div>
				</div>
			)}

      {/* Cart Modal */}
      {isCartOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-30">
          <CartMenu 
            cart={cart}
            updateQuantity={updateQuantity}
            removeFromCart={removeFromCart}
            applyDiscount={() => {}}
            checkout={() => {}}
            closeCart={toggleCart}
          />
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;