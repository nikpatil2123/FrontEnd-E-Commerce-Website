import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import useCart, { CartMenu } from "../Cart/useCart";
import { API_BASE_URL } from "../config/env";

const ResetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // Extract token from URL params (if using query parameters)
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get('token');
  const email = queryParams.get('email');
  
  const { cart, updateQuantity, removeFromCart, cartCount } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  // Simplified form state - just password and confirmPassword
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [passwordMatch, setPasswordMatch] = useState(true);
  
  // Check password match whenever password or confirmPassword changes
  useEffect(() => {
    setPasswordMatch(!confirmPassword || password === confirmPassword);
  }, [password, confirmPassword]);
  
  const toggleCart = () => {
    setIsCartOpen(prev => !prev);
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate passwords match
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      // Reset password API call
      const response = await axios.post(`${API_BASE_URL}/api/auth/reset-password`, {
        token,
        email,
        password
      });
      
      setSuccess(response.data.message || "Password reset successfully!");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err: any) {
      setError(err.response?.data?.message || "An error occurred during password reset");
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
  
  return (
    <>
      <Navbar cartCount={cartCount} toggleCart={toggleCart} />

      <div className="min-h-screen flex items-center justify-center bg-gray-100 pt-20">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
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
          
          <form onSubmit={handleSubmit} className="w-full">
            <h2 className="text-2xl mb-6 text-center">Reset Your Password</h2>
            
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                New Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border rounded focus:ring-2 focus:ring-black focus:border-transparent"
                required
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                Re-enter Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={`w-full p-3 border rounded focus:ring-2 focus:ring-black focus:border-transparent ${
                  !passwordMatch ? "border-red-500" : ""
                }`}
                required
              />
              {!passwordMatch && (
                <p className="text-red-500 text-sm mt-1">Passwords do not match</p>
              )}
            </div>
            
            <button
              type="submit"
              className="w-full bg-black text-white p-3 rounded hover:bg-gray-800 disabled:bg-gray-400 mt-4"
              disabled={loading || !passwordMatch}
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>
            
            <p className="text-center mt-4">
              <span
                className="text-blue-500 cursor-pointer"
                onClick={() => navigate("/login")}
              >
                Back to Login
              </span>
            </p>
          </form>
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
    </>
  );
};

export default ResetPassword;
