import React, { useState } from 'react';
import Navbar from './Navbar';

const LoginPage = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);

  const renderLoginForm = () => {
    if (isForgotPassword) {
      return (
        <div className="w-full max-w-md">
          <h2 className="text-2xl mb-6 text-center">Reset Password</h2>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full p-3 mb-4 border rounded"
          />
          <button
            className="w-full bg-black text-white p-3 rounded hover:bg--600"
            onClick={() => setIsForgotPassword(false)}
          >
            Send Reset Link
          </button>
          <p
            className="text-center mt-4 text-blue-500 cursor-pointer"
            onClick={() => setIsForgotPassword(false)}
          >
            Back to Login
          </p>
        </div>
      );
    }

    if (isSignup) {
      return (
        <div className="w-full max-w-md">
          <h2 className="text-2xl mb-6 text-center">Sign Up</h2>
          <input
            type="text"
            placeholder="Full Name"
            className="w-full p-3 mb-4 border rounded"
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 mb-4 border rounded"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 mb-4 border rounded"
          />
          <button
            className="w-full bg-black text-white p-3 rounded hover:bg-gray-600"
          >
            Create Account
          </button>
          <p className="text-center mt-4">
            Already have an account?
            <span
              className="text-blue-500 ml-2 cursor-pointer"
              onClick={() => setIsSignup(false)}
            >
              Login
            </span>
          </p>
        </div>
      );
    }

    return (
      <div className="w-full max-w-md">
        <h2 className="text-2xl mb-6 text-center">Login</h2>
        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 mb-4 border rounded"
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 mb-4 border rounded"
        />
        <button
          className="w-full bg-black text-white p-3 rounded hover:bg-gray-600"
        >
          Login
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
      </div>
    );
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-gray-100 pt-16">
        <div className="bg-white p-8 rounded-lg shadow-md">
          {renderLoginForm()}
        </div>
      </div>
    </>
  );
};

export default LoginPage;

