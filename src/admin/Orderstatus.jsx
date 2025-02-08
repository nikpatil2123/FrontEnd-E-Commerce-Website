import React, { useState, useEffect } from 'react';
import axios from 'axios';

const OrderManagement = () => {
	const [orders, setOrders] = useState([
		{
			_id: '1',
			customerName: 'John Doe',
			email: 'john@example.com',
			items: [
				{
					productId: '1',
					name: 'Product 1',
					quantity: 2,
					price: 1000
				}
			],
			totalAmount: 2000,
			status: 'pending',
			createdAt: new Date(),
			shippingAddress: '123 Street, City, Country',
			paymentStatus: 'paid'
		}
	]);
	const [currentPage, setCurrentPage] = useState(1);
	const [loading, setLoading] = useState(false);
	const [selectedOrder, setSelectedOrder] = useState(null);
	const ordersPerPage = 10;

	const updateOrderStatus = async (orderId, newStatus) => {
		const updatedOrders = orders.map(order =>
			order._id === orderId ? { ...order, status: newStatus } : order
		);
		setOrders(updatedOrders);
	};

	const getStatusColor = (status) => {
		const colors = {
			pending: 'bg-yellow-100 text-yellow-800',
			processing: 'bg-blue-100 text-blue-800',
			shipped: 'bg-purple-100 text-purple-800',
			delivered: 'bg-green-100 text-green-800',
			cancelled: 'bg-red-100 text-red-800'
		};
		return colors[status] || 'bg-gray-100 text-gray-800';
	};

	return (
		<div className="min-h-screen bg-gray-100 p-8">
			<div className="max-w-7xl mx-auto">
				<div className="bg-white rounded-lg shadow-md">
					<div className="p-6">
						<div className="flex justify-between items-center mb-6">
							<h2 className="text-2xl font-bold">Order Management</h2>
							<div className="flex gap-4">
								<select className="p-2 border rounded-lg">
									<option value="all">All Orders</option>
									<option value="pending">Pending</option>
									<option value="processing">Processing</option>
									<option value="shipped">Shipped</option>
									<option value="delivered">Delivered</option>
									<option value="cancelled">Cancelled</option>
								</select>
								<input
									type="text"
									placeholder="Search orders..."
									className="p-2 border rounded-lg"
								/>
							</div>
						</div>

						<div className="overflow-x-auto">
							<table className="w-full">
								<thead>
									<tr className="bg-gray-50">
										<th className="p-4 text-left">Order ID</th>
										<th className="p-4 text-left">Customer</th>
										<th className="p-4 text-left">Items</th>
										<th className="p-4 text-left">Total</th>
										<th className="p-4 text-left">Status</th>
										<th className="p-4 text-left">Date</th>
										<th className="p-4 text-left">Actions</th>
									</tr>
								</thead>
								<tbody>
									{orders.map((order) => (
										<tr key={order._id} className="border-t hover:bg-gray-50">
											<td className="p-4">{order._id}</td>
											<td className="p-4">
												<div>{order.customerName}</div>
												<div className="text-sm text-gray-500">{order.email}</div>
											</td>
											<td className="p-4">{order.items.length} items</td>
											<td className="p-4">₹{order.totalAmount}</td>
											<td className="p-4">
												<span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(order.status)}`}>
													{order.status}
												</span>
											</td>
											<td className="p-4">
												{new Date(order.createdAt).toLocaleDateString()}
											</td>
											<td className="p-4">
												<select
													value={order.status}
													onChange={(e) => updateOrderStatus(order._id, e.target.value)}
													className="p-2 border rounded-lg"
												>
													<option value="pending">Pending</option>
													<option value="processing">Processing</option>
													<option value="shipped">Shipped</option>
													<option value="delivered">Delivered</option>
													<option value="cancelled">Cancelled</option>
												</select>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>

						<div className="mt-6 flex justify-between items-center">
							<div>
								Showing {orders.length} orders
							</div>
							<div className="flex gap-2">
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
									disabled={orders.length < ordersPerPage}
									className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50"
								>
									Next
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default OrderManagement;
