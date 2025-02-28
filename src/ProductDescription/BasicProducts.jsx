import React, { useState, useEffect, useRef } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import logo from '../assets/blacklogo.png';
import shopping from "../assets/CART.png";
import user from "../assets/USER.png";
import search from "../assets/SEARCH.png";
import menu from "../assets/MENU.png";
import Navbar from '../components/Navbar';
import useCart, { CartMenu } from '../Cart/useCart';

// Use environment variable for API URL
const API_URL = `${import.meta.env.VITE_API_BASE_URL}/pages/basics?category=Basics`;

const ProductCard = ({ product, onAddToCart }) => {
	return (
		<div className="product-card block bg-white overflow-hidden transition-transform duration-300 hover:scale-105 relative">
			{product.soldOut && (
				<span className="absolute top-1 right-1 sm:top-2 sm:right-2 md:top-4 md:right-4 z-10 bg-white px-1 sm:px-2 py-0.5 sm:py-1 text-[8px] sm:text-xs font-medium text-black border border-gray-200 rounded">
					Sold Out
				</span>
			)}
			<Link to={`/product/${product._id || product.id}`} state={{ product }} className="block">
				<div className="aspect-[3/4] relative overflow-hidden">
					<img
						src={product.images && product.images.length > 0 ? product.images[0] : ''}
						alt={product.name}
						className="w-full h-full object-cover"
					/>
				</div>
				<div className="p-2 sm:p-3 md:p-4">
					<div className="flex justify-between items-start">
						<h3 className="text-[10px] sm:text-xs md:text-sm font-medium text-gray-900 flex-1">{product.name}</h3>
						<p className="text-[10px] sm:text-xs md:text-sm font-medium text-gray-900 ml-1 sm:ml-2">₹{product.price.toFixed(2)}</p>
					</div>
					<p className="mt-0.5 sm:mt-1 text-[8px] sm:text-xs md:text-sm text-gray-500">{product.color}</p>
					{/* {!product.soldOut && (
						<button
							onClick={(e) => {
								e.preventDefault();
								onAddToCart(product);
							}}
							className="mt-2 w-full bg-black text-white text-xs sm:text-sm py-1 sm:py-2 rounded hover:bg-gray-800 transition-colors"
						>
							Add to Cart
						</button>
					)} */}
				</div>
			</Link>
		</div>
	);
};

// Include your existing Navbar component here

const ProductPage = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [isCartOpen, setIsCartOpen] = useState(false);
	const { cart, addToCart, updateQuantity, removeFromCart, cartCount, totalPrice } = useCart();

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				const response = await fetch(API_URL);
				if (!response.ok) throw new Error('Network response was not ok');
				const data = await response.json();

				const productsData = Array.isArray(data)
					? data
					: data.products
						? data.products
						: [];

				if (!Array.isArray(productsData)) {
					throw new Error("Unexpected data format: products data is not an array");
				}
				console.log('Fetched products:', productsData);
				// Updated transformation: use item.name if available, otherwise fallback to item.title
				const transformedData = productsData.map(item => ({
					id: item.id,
					name: item.name || item.title,
					price: item.price,
					images: item.images || [item.image],
					color: ['Wine Red', 'Glacier', 'Mint', 'Almond'][Math.floor(Math.random() * 4)]
				}));

				setProducts(transformedData);
				setLoading(false);
			} catch (err) {
				setError('Failed to fetch products');
				setLoading(false);
				console.error('Error fetching products:', err);
			}
		};

		fetchProducts();
	}, []);

	const applyDiscount = (code) => {
		console.log(`Applying discount with code: ${code}`);
	};

	const checkout = () => {
		console.log('Proceeding to checkout');
	};

	const toggleCart = () => {
		setIsCartOpen(prevState => !prevState);
	};

	return (
		<div className="bg-white min-h-screen">
			<Navbar cartCount={cartCount} toggleCart={toggleCart} />
			{/* Increase top padding to offset fixed Navbar */}
			<div className="w-full px-2 sm:px-4 pt-28 pb-2 sm:pb-4 md:pb-8">
				<h4 className="text-xl sm:text-2xl md:text-2xl font-bold text-left helvetica-style">
					BASIC
				</h4>
			</div>
			<div className="w-full px-2 sm:px-4">
				{loading ? (
					<div className="flex justify-center items-center h-64">
						<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
					</div>
				) : error ? (
					<div className="text-red-500 text-center py-8">{error}</div>
				) : (
					<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4">
						{products.map(product => (
							<ProductCard
								key={product.id}
								product={product}
								onAddToCart={addToCart}
							/>
						))}
					</div>
				)}
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

export default ProductPage;