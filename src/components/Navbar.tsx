import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/blacklogo.png';
import shopping from "../assets/CART.png";
import user from "../assets/USER.png";
import search from "../assets/SEARCH.png";
import menu from "../assets/MENU.png";

const Navbar: React.FC<{ cartCount: number; toggleCart: () => void }> = ({ cartCount, toggleCart }) => {
	// Added mobile state and resize handler
	const [isMobile, setIsMobile] = useState(false);
	useEffect(() => {
		const handleResize = () => {
			setIsMobile(window.innerWidth < 768);
		};
		handleResize();
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [isSearchOpen, setIsSearchOpen] = useState(false);
	const [searchQuery, setSearchQuery] = useState("");
	const searchInputRef = useRef<HTMLInputElement>(null);

	const toggleMenu = () => {
		setIsMenuOpen((prevState) => !prevState);
		setIsSearchOpen(false);
	};

	const toggleSearch = () => {
		setIsSearchOpen((prevState) => !prevState);
	};

	useEffect(() => {
		const closeMenu = (e: MouseEvent) => {
			if (!(e.target as HTMLElement).closest("#side-menu") && (e.target as HTMLElement).id !== "menu-icon") {
				setIsMenuOpen(false);
			}
		};
		window.addEventListener("click", closeMenu);
		return () => window.removeEventListener("click", closeMenu);
	}, []);

	return (
		<nav className="flex items-center justify-between h-20 bg-white fixed top-0 left-0 right-0 z-50 px-8">
			{/* Left: Menu Icon and Search */}
			<div className="flex items-center space-x-4 text-black">
				<img
					src={menu}
					alt=""
					className="text-xl p-2 hover:opacity-70 transition-opacity w-10 h-10 cursor-pointer"
					id="menu-icon"
					onClick={toggleMenu}
				/>
				{isSearchOpen ? (
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
				) : (
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

				{/* Updated Side Menu */}
				<div
					className={`fixed top-0 left-0 h-screen bg-black/90 text-white z-30 transform transition-transform duration-500 ease-in-out ${
						isMenuOpen ? "translate-x-0" : "-translate-x-full"
					} ${isMobile ? "w-[200px]" : "w-[410px]"}`}
					id="side-menu"
				>
					<div className="p-4 sm:p-6 flex flex-col h-full">
						<div className="flex justify-end mb-4 sm:mb-8">
							<button
								onClick={toggleMenu}
								className="text-white hover:text-gray-300 transition-colors p-2"
							>
								<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M6 18L18 6M6 6l12 12"
									/>
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

export default Navbar;
