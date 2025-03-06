import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import useCart, { CartMenu } from "../Cart/useCart"; // Import CartMenu too
import { API_BASE_URL } from "../config/env"; // Import API_BASE_URL from environment config

const Login = () => {
	const navigate = useNavigate();
	const { cart, updateQuantity, removeFromCart, cartCount, totalPrice } = useCart();
	const [isCartOpen, setIsCartOpen] = useState(false);

	// Auth States
	const [isSignup, setIsSignup] = useState(false);
	const [isForgotPassword, setIsForgotPassword] = useState(false);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [success, setSuccess] = useState<string | null>(null);
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
		resetCode: "", // Added for reset password functionality
		newPassword: "", // Added for reset password functionality
	});
	const [resetStep, setResetStep] = useState(1); // 1: Request code, 2: Enter code and new password

	// Handlers
	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const toggleCart = () => {
		setIsCartOpen(prev => !prev);
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError(null);
		setSuccess(null);
		setLoading(true);

		try {
			if (isSignup) {
				// Registration
				const response = await axios.post(`${API_BASE_URL}/api/auth/signup`, {
					name: formData.name,
					email: formData.email,
					password: formData.password,
				});

				setSuccess(response.data.message || "Account created successfully!");
				setTimeout(() => {
					setIsSignup(false);
				}, 2000);
			} else if (isForgotPassword) {
				if (resetStep === 1) {
					// Step 1: Request reset code
					const response = await axios.post(`${API_BASE_URL}/api/auth/reset-password-request`, {
						email: formData.email
					});
					
					setSuccess(response.data.message || "Reset code sent to your email");
					setResetStep(2);
				} else {
					// Step 2: Verify code and set new password
					const response = await axios.post(`${API_BASE_URL}/api/auth/reset-password-confirm`, {
						email: formData.email,
						resetCode: formData.resetCode,
						newPassword: formData.newPassword
					});
					
					setSuccess(response.data.message || "Password reset successfully!");
					setTimeout(() => {
						setIsForgotPassword(false);
						setResetStep(1);
					}, 2000);
				}
			} else {
				// Login
				const response = await axios.post(`${API_BASE_URL}/api/auth/login`, {
					email: formData.email,
					password: formData.password,
				});

				localStorage.setItem("token", response.data.token || "");
				localStorage.setItem("user", JSON.stringify(response.data.user || {}));
				
				setSuccess("Login successful!");
				setTimeout(() => {
					navigate("/");
				}, 1000);
			}
		} catch (err: any) {
			setError(err.response?.data?.message || "An error occurred");
		} finally {
			setLoading(false);
		}
	};

	const applyDiscount = (code: string) => {
		console.log(`Applying discount with code: ${code}`);
	};

	const checkout = () => {
		console.log('Proceeding to checkout');
	};

	const renderResetPasswordForm = () => {
		if (resetStep === 1) {
			return (
				<>
					<h2 className="text-2xl mb-6 text-center">Reset Password</h2>
					<p className="mb-4 text-center text-gray-600">
						Enter your email address and we'll send you a code to reset your password.
					</p>
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
						{loading ? "Sending..." : "Request Reset Code"}
					</button>
				</>
			);
		}
		
		return (
			<>
				<h2 className="text-2xl mb-6 text-center">Reset Password</h2>
				<p className="mb-4 text-center text-gray-600">
					Enter the code sent to your email and your new password.
				</p>
				<input
					type="text"
					name="resetCode"
					value={formData.resetCode}
					onChange={handleInputChange}
					placeholder="Reset Code"
					className="w-full p-3 mb-4 border rounded"
					required
				/>
				<input
					type="password"
					name="newPassword"
					value={formData.newPassword}
					onChange={handleInputChange}
					placeholder="New Password"
					className="w-full p-3 mb-4 border rounded"
					required
				/>
				<button
					type="submit"
					className="w-full bg-black text-white p-3 rounded hover:bg-gray-800 disabled:bg-gray-400"
					disabled={loading}
				>
					{loading ? "Resetting..." : "Reset Password"}
				</button>
			</>
		);
	};

	const renderLoginForm = () => {
		if (isForgotPassword) {
			return (
				<form onSubmit={handleSubmit} className="w-full max-w-md">
					{renderResetPasswordForm()}
					<p
						className="text-center mt-4 text-blue-500 cursor-pointer"
						onClick={() => {
							setIsForgotPassword(false);
							setResetStep(1);
							setError(null);
							setSuccess(null);
						}}
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
			<Navbar cartCount={cartCount} toggleCart={toggleCart} />

			{/* Login Form */}
			<div className="min-h-screen flex items-center justify-center bg-gray-100 pt-20">
				<div className="bg-white p-8 rounded-lg shadow-md">
					{error && (
						<div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
							{error}
						</div>
					)}
					{success && (
						<div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
							{success}
						</div>
					)}
					{renderLoginForm()}
				</div>
			</div>
			
			{/* Add CartMenu component */}
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
		</>
	);
};

export default Login;