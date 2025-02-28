import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import useCart, { CartMenu } from '../Cart/useCart';

// CSS custom style for Helvetica Neue
const helveticaStyle = {
  fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif'
};

const CheckoutPage = () => {
	const location = useLocation();
	const navigate = useNavigate();
	
	// Debug: log received state
	console.log("Checkout state:", location.state);

	const stateData = location.state || {};
	const stateItems = stateData.items || [];
	const statePrice = stateData.priceBreakdown || null;

	const locationData = location.state || {};
	const productFromState = locationData.product;
	const priceBreakdown = locationData.priceBreakdown;
	const selectedSizeFromState = locationData.selectedSize;

	// Use the cart hook instead of managing cart state manually
	const { cart, updateQuantity, removeFromCart, cartCount, totalPrice } = useCart();
	const [isCartOpen, setIsCartOpen] = useState(false);

	const subtotal = priceBreakdown ? priceBreakdown.basePrice : cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
	// Override shipping to 0 regardless of priceBreakdown
	const shipping = 0;
	// Update total calculation to always be subtotal + shipping (ignoring priceBreakdown.total)
	const total = subtotal + shipping;

	const [addresses, setAddresses] = useState([]);
	const [selectedAddress, setSelectedAddress] = useState(null);
	const [paymentMethod, setPaymentMethod] = useState('card');
	const [showAddressForm, setShowAddressForm] = useState(false);
	const [newAddress, setNewAddress] = useState({
		name: '',
		street: '',
		city: '',
		state: '',
		pincode: '',
		phone: ''
	});
	const [couponCode, setCouponCode] = useState('');

	useEffect(() => {
		const savedAddresses = JSON.parse(localStorage.getItem('addresses') || '[]');
		setAddresses(savedAddresses);
	}, []);

	const toggleCart = () => setIsCartOpen(prev => !prev);

	const applyDiscount = (code) => {
		console.log(`Applying discount with code: ${code}`);
	};

	const checkout = () => {
		console.log('Proceeding to checkout');
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
		<div className="min-h-screen bg-gray-50" style={helveticaStyle}>
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
										className={`p-4 border rounded-lg mb-4 cursor-pointer ${selectedAddress === address.id ? 'border-black' : 'border-gray-200'
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
										className={`block p-4 border rounded-lg mb-4 cursor-pointer ${paymentMethod === method ? 'border-black' : 'border-gray-200'
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
								<div className="flex justify-between text-lg font-semibold pt-2 border-t">
									<span>Total</span>
									<span>₹{total.toFixed(2)}</span>
								</div>
							</div>
							
							{/* Apply Coupon Field */}
							<div className="mt-4">
								<label className="block text-sm font-medium mb-1">Apply Coupon</label>
								<div className="flex gap-2">
									<input
										type="text"
										value={couponCode}
										onChange={(e) => setCouponCode(e.target.value)}
										placeholder="Enter coupon code"
										className="w-full p-2 border rounded"
									/>
									<button
										onClick={() => alert(`Coupon applied: ${couponCode}`)}
										className="bg-blue-500 text-white px-4 py-2 rounded"
									>
										Apply
									</button>
								</div>
							</div>
							
							<button
								onClick={() => {/* Handle place order */ }}
								className="w-full mt-6 bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition-colors"
							>
								Place Order
							</button>
						</div>
					</div>
				</div>
			</main>

			{/* Address Form Modal */}
			{showAddressForm && (
				<div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
					<div className="bg-white p-6 rounded-lg w-full max-w-md" style={helveticaStyle}>
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

							{/* ...remaining form fields... */}
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
					<div style={helveticaStyle}>
						<CartMenu
							cart={cart}
							updateQuantity={updateQuantity}
							removeFromCart={removeFromCart}
							applyDiscount={applyDiscount}
							checkout={checkout}
							closeCart={toggleCart}
						/>
					</div>
				</div>
			)}
		</div>
	);
};

export default CheckoutPage;