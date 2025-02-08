import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
	const [activeTab, setActiveTab] = useState('products');
	const [products, setProducts] = useState([]);
	const [newProduct, setNewProduct] = useState({
		name: '',
		price: '',
		image: '',
		color: '',
		category: '',
		stock: ''
	});

	// Stats
	const [stats, setStats] = useState({
		totalProducts: 0,
		totalRevenue: 0,
		lowStock: 0
	});

	// Add these to your existing state declarations
	const [users, setUsers] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const usersPerPage = 10;

	useEffect(() => {
		fetchProducts();
		fetchStats();
	}, []);

	// Add this to your useEffect
	useEffect(() => {
		fetchUsers();
	}, [currentPage]);

	// Add this function
	const fetchUsers = async () => {
		try {
			const response = await axios.get(`http://localhost:5000/api/users?page=${currentPage}&limit=${usersPerPage}`);
			setUsers(response.data);
		} catch (error) {
			console.error('Error fetching users:', error);
		}
	};
	const fetchStats = async () => {
		try {
			const response = await axios.get('http://localhost:5000/api/stats');
			setStats(response.data);
		} catch (error) {
			console.error('Error fetching stats:', error);
		}
	};

	const fetchProducts = async () => {
		try {
			const response = await axios.get('http://localhost:5000/api/products');
			setProducts(response.data);
		} catch (error) {
			console.error('Error fetching products:', error);
		}
	};

	const handleAddProduct = async (e) => {
		e.preventDefault();
		try {
			await axios.post('http://localhost:5000/api/products', newProduct);
			fetchProducts();
			setNewProduct({ name: '', price: '', image: '', color: '', category: '', stock: '' });
		} catch (error) {
			console.error('Error adding product:', error);
		}
	};

	return (
		<div className="min-h-screen bg-gray-100">
			{/* Dashboard Header */}
			<div className="bg-white shadow-md p-6">
				<h1 className="text-2xl font-bold">Admin Dashboard</h1>
			</div>

			{/* Stats Section */}
			<div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
				<div className="bg-white rounded-lg shadow-md p-6">
					<h3 className="text-gray-500">Total Products</h3>
					<p className="text-3xl font-bold">{stats.totalProducts}</p>
				</div>
				<div className="bg-white rounded-lg shadow-md p-6">
					<h3 className="text-gray-500">Total Revenue</h3>
					<p className="text-3xl font-bold">₹{stats.totalRevenue}</p>
				</div>
				<div className="bg-white rounded-lg shadow-md p-6">
					<h3 className="text-gray-500">Low Stock Items</h3>
					<p className="text-3xl font-bold">{stats.lowStock}</p>
				</div>
			</div>

			
			<div className="mt-8 bg-white rounded-lg shadow-md">
				<div className="border-b px-6 py-4">
					<h2 className="text-xl font-semibold">User Management</h2>
				</div>
				<div className="p-6">
					<table className="w-full">
						<thead>
							<tr className="border-b">
								<th className="text-left p-2">Name</th>
								<th className="text-left p-2">Email</th>
								<th className="text-left p-2">Orders</th>
								<th className="text-left p-2">Joined Date</th>
								<th className="text-left p-2">Status</th>
							</tr>
						</thead>
						<tbody>
							{users.map((user) => (
								<tr key={user._id} className="border-b hover:bg-gray-50">
									<td className="p-2">{user.name}</td>
									<td className="p-2">{user.email}</td>
									<td className="p-2">{user.orderCount || 0}</td>
									<td className="p-2">{new Date(user.createdAt).toLocaleDateString()}</td>
									<td className="p-2">
										<span className={`px-2 py-1 rounded-full text-sm ${user.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
											}`}>
											{user.isActive ? 'Active' : 'Inactive'}
										</span>
									</td>
								</tr>
							))}
						</tbody>
					</table>

					{/* Pagination Controls */}
					<div className="mt-4 flex justify-end gap-2">
						<button
							onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
							disabled={currentPage === 1}
							className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50"
						>
							Previous
						</button>
						<span className="px-4 py-2">Page {currentPage}</span>
						<button
							onClick={() => setCurrentPage(prev => prev + 1)}
							disabled={users.length < usersPerPage}
							className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50"
						>
							Next
						</button>
					</div>
				</div>
			</div>
		</div>
		
	);
};

export default AdminDashboard;
