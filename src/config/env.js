/**
 * Environment variables configuration
 * This file centralizes all environment variable access
 * and provides fallback values for development
 */

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

// Add other environment variables here as needed
export const ENV = import.meta.env.MODE || 'development';
export const IS_PROD = ENV === 'production';
export const IS_DEV = ENV === 'development';
