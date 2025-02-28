import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { API_BASE_URL } from '../config/env';

const AdminDashboard = () => {
	const [stats, setStats] = useState({
		totalProducts: 0,
		totalRevenue: 0,
		totalOrders: 0,
		totalUsers: 0
	});

	useEffect(() => {
		fetchStats();
	}, []);

	const fetchStats = async () => {
		try {
			const response = await axios.get(`${API_BASE_URL}/api/stats`);
			setStats(response.data);
		} catch (error) {
			console.error('Error fetching stats:', error);
		}
	};

	return (
		<div className="min-h-screen bg-gray-100 flex">
			{/* Side Menu */}
			<div className="w-64 bg-white shadow-lg p-6">
				<h2 className="text-2xl font-bold mb-8 text-gray-800">Admin Menu</h2>
				<ul className="space-y-6">
					<li>
						<Link to="/admin/homefeed" className="block text-lg text-gray-700 hover:text-gray-900 transition-colors">Home Banner</Link>
					</li>
					<li>
						<Link to="/admin/orders" className="block text-lg text-gray-700 hover:text-gray-900 transition-colors">Order Status Management</Link>
					</li>
					<li>
						<Link to="/admin/products" className="block text-lg text-gray-700 hover:text-gray-900 transition-colors">Product Management</Link>
					</li>
					<li>
						<Link to="/admin/coupons" className="block text-lg text-gray-700 hover:text-gray-900 transition-colors">Discount Management</Link>
					</li>
				</ul>
			</div>

			{/* Main Content */}
			<div className="flex-grow p-10">
				{/* Dashboard Header */}
				<div className="bg-white shadow-lg p-8 mb-10 rounded-lg">
					<h1 className="text-4xl font-bold text-gray-800">Admin Dashboard</h1>
				</div>

				{/* Stats Section */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
					<div className="bg-white rounded-lg shadow-lg p-8">
						<h3 className="text-gray-500 text-lg">Total Products</h3>
						<p className="text-4xl font-bold text-gray-800 mt-2">{stats.totalProducts}</p>
					</div>
					<div className="bg-white rounded-lg shadow-lg p-8">
						<h3 className="text-gray-500 text-lg">Total Revenue</h3>
						<p className="text-4xl font-bold text-gray-800 mt-2">₹{stats.totalRevenue}</p>
					</div>
					<div className="bg-white rounded-lg shadow-lg p-8">
						<h3 className="text-gray-500 text-lg">Total Orders</h3>
						<p className="text-4xl font-bold text-gray-800 mt-2">{stats.totalOrders}</p>
					</div>
					<div className="bg-white rounded-lg shadow-lg p-8">
						<h3 className="text-gray-500 text-lg">Total Users</h3>
						<p className="text-4xl font-bold text-gray-800 mt-2">{stats.totalUsers}</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AdminDashboard;
