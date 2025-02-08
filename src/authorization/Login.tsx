import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../assets/blacklogo.png";
import shopping from "../assets/CART.png";
import user from "../assets/USER.png";
import search from "../assets/SEARCH.png";
import menu from "../assets/MENU.png";

// API Configuration
const API_URL = "http://localhost:5000/api/auth";

const Login = () => {
	const navigate = useNavigate();

	// Auth States
	const [isSignup, setIsSignup] = useState(false);
	const [isForgotPassword, setIsForgotPassword] = useState(false);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
	});

	// Navbar States
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [isSearchOpen, setIsSearchOpen] = useState(false);
	const [searchQuery, setSearchQuery] = useState("");
	const [isMobile, setIsMobile] = useState(false);
	const searchInputRef = useRef<HTMLInputElement>(null);
	const [cartCount, setCartCount] = useState(0);

	const toggleMenu = () => setIsMenuOpen((prev) => !prev);
	const toggleSearch = () => setIsSearchOpen((prev) => !prev);
	const toggleCart = () => console.log("Cart toggled");

	// Effects
	useEffect(() => {
		const checkMobile = () => setIsMobile(window.innerWidth <= 768);
		checkMobile();
		window.addEventListener("resize", checkMobile);
		return () => window.removeEventListener("resize", checkMobile);
	}, []);

	useEffect(() => {
		const closeMenu = (e: MouseEvent) => {
			const target = e.target as HTMLElement;
			if (!target.closest("#side-menu") && target.id !== "menu-icon") {
				setIsMenuOpen(false);
			}
		};
		window.addEventListener("click", closeMenu);
		return () => window.removeEventListener("click", closeMenu);
	}, []);

	// Handlers
	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError(null);
		setLoading(true);

		try {
			if (isSignup) {
				// Registration
				const response = await axios.post(`${API_URL}/signup`, {
					name: formData.name,
					email: formData.email,
					password: formData.password,
				});

				alert(response.data.message);
				navigate("/");
			} else {
				// Login
				const response = await axios.post(`${API_URL}/login`, {
					email: formData.email,
					password: formData.password,
				});

				alert(response.data.msg); // Since backend returns msg instead of a token
				navigate("/");
			}
		} catch (err: any) {
			setError(err.response?.data?.message || "An error occurred");
		} finally {
			setLoading(false);
		}
	};

	const renderLoginForm = () => {
		if (isForgotPassword) {
			return (
				<form onSubmit={handleSubmit} className="w-full max-w-md">
					<h2 className="text-2xl mb-6 text-center">Reset Password</h2>
					<input
						type="email"
						name="email"
						value={formData.email}
						onChange={handleInputChange}
						placeholder="Enter your email"
						className="w-full p-3 mb-4 border rounded"
						required
					/>
					<button
						type="submit"
						className="w-full bg-black text-white p-3 rounded hover:bg-gray-800 disabled:bg-gray-400"
						disabled={loading}
					>
						{loading ? "Sending..." : "Send Reset Link"}
					</button>
					<p
						className="text-center mt-4 text-blue-500 cursor-pointer"
						onClick={() => setIsForgotPassword(false)}
					>
						Back to Login
					</p>
				</form>
			);
		}

		if (isSignup) {
			return (
				<form onSubmit={handleSubmit} className="w-full max-w-md">
					<h2 className="text-2xl mb-6 text-center">Sign Up</h2>
					<input
						type="text"
						name="name"
						value={formData.name}
						onChange={handleInputChange}
						placeholder="Full Name"
						className="w-full p-3 mb-4 border rounded"
						required
					/>
					<input
						type="email"
						name="email"
						value={formData.email}
						onChange={handleInputChange}
						placeholder="Email"
						className="w-full p-3 mb-4 border rounded"
						required
					/>
					<input
						type="password"
						name="password"
						value={formData.password}
						onChange={handleInputChange}
						placeholder="Password"
						className="w-full p-3 mb-4 border rounded"
						required
					/>
					<button
						type="submit"
						className="w-full bg-black text-white p-3 rounded hover:bg-gray-800 disabled:bg-gray-400"
						disabled={loading}
					>
						{loading ? "Creating Account..." : "Create Account"}
					</button>
					<p className="text-center mt-4">
						Already have an account?{" "}
						<span
							className="text-blue-500 cursor-pointer"
							onClick={() => setIsSignup(false)}
						>
							Login
						</span>
					</p>
				</form>
			);
		}

		return (
			<form onSubmit={handleSubmit} className="w-full max-w-md">
				<h2 className="text-2xl mb-6 text-center">Login</h2>
				{error && (
					<div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
						{error}
					</div>
				)}
				<input
					type="email"
					name="email"
					value={formData.email}
					onChange={handleInputChange}
					placeholder="Email"
					className="w-full p-3 mb-4 border rounded"
					required
				/>
				<input
					type="password"
					name="password"
					value={formData.password}
					onChange={handleInputChange}
					placeholder="Password"
					className="w-full p-3 mb-4 border rounded"
					required
				/>
				<button
					type="submit"
					className="w-full bg-black text-white p-3 rounded hover:bg-gray-800 disabled:bg-gray-400"
					disabled={loading}
				>
					{loading ? "Logging in..." : "Login"}
				</button>
				<div className="flex justify-between mt-4">
					<p
						className="text-blue-500 cursor-pointer"
						onClick={() => setIsForgotPassword(true)}
					>
						Forgot Password?
					</p>
					<p
						className="text-blue-500 cursor-pointer"
						onClick={() => setIsSignup(true)}
					>
						Sign Up
					</p>
				</div>
			</form>
		);
	};

	return (
		<>
			{/* Navbar */}
			<nav className="flex items-center justify-between h-14 sm:h-16 md:h-20 bg-white fixed top-0 left-0 right-0 z-50 px-2 sm:px-4 md:px-8 shadow-md">
				{/* Left Side */}
				<div className="flex items-center space-x-4 text-black">
					<img
						src={menu}
						alt="menu icon"
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
								onChange={(e) => setSearchQuery(e.target.value)}
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
					<Link to="/">
						<div className="flex justify-center items-center">
							<img src={logo} alt="Logo" className="h-16 w-16" />
						</div>
					</Link>
				</div>

				{/* Right Side */}
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
				{isMenuOpen && (
					<div
						className="fixed top-0 left-0 h-screen bg-black/90 text-white z-30 transform transition-transform duration-500 ease-in-out w-[410px]"
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

							{/* Menu Links */}
							<div className="flex-1 space-y-4 sm:space-y-6 text-base sm:text-lg font-regular">
								<Link to="/" className="block hover:text-gray-400 py-2">HOME</Link>
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
							</div>
						</div>
					</div>
				)}
			</nav>

			{/* Login Form */}
			<div className="min-h-screen flex items-center justify-center bg-gray-100 pt-20">
				<div className="bg-white p-8 rounded-lg shadow-md">
					{renderLoginForm()}
				</div>
			</div>
		</>
	);
};

export default Login;