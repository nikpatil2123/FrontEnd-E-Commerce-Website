import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductManagement = () => {
	const [products, setProducts] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [newProduct, setNewProduct] = useState({
		name: '',
		price: '',
		description: '',
		category: '',
		subCategory: '',
		discount: '', // <-- new discount field
		stock: {
			XS: 0,
			S: 0,
			M: 0,
			L: 0,
			XL: 0,
			XXL: 0
		},
		images: [],
		isLimited: false,
		limitedQuantity: null
	});
	const [editingProduct, setEditingProduct] = useState(null);
	const productsPerPage = 10;

	useEffect(() => {
		fetchProducts();
	}, [currentPage]);

	const fetchProducts = async () => {
		const response = await axios.get(`http://localhost:5000/api/admin/products?page=${currentPage}&limit=${productsPerPage}`);
		setProducts(response.data);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (editingProduct) {
			await axios.put(`http://localhost:5000/api/admin/products/${editingProduct._id}`, newProduct);
		} else {
			await axios.post('http://localhost:5000/api/admin/products', newProduct);
		}
		fetchProducts();
		resetForm();
	};

	const handleDelete = async (id) => {
		await axios.delete(`http://localhost:5000/api/admin/products/${id}`);
		fetchProducts();
	};

	const resetForm = () => {
		setNewProduct({
			name: '',
			price: '',
			description: '',
			category: '',
			subCategory: '',
			discount: '', // <-- new discount field
			stock: {
				XS: 0,
				S: 0,
				M: 0,
				L: 0,
				XL: 0,
				XXL: 0
			},
			images: [],
			isLimited: false,
			limitedQuantity: null
		});
		setEditingProduct(null);
	};

	const handleImageChange = (e, index) => {
		const file = e.target.files[0];
		if (file) {
			const reader = new FileReader();
			reader.onloadend = () => {
				const newImages = [...newProduct.images];
				newImages[index] = reader.result;
				setNewProduct({ ...newProduct, images: newImages });
			};
			reader.readAsDataURL(file);
		}
	};

	const handleStockChange = (e, size) => {
		const newStock = { ...newProduct.stock, [size]: e.target.value };
		setNewProduct({ ...newProduct, stock: newStock });
	};

	return (
		<div className="min-h-screen bg-gray-100 p-8">
			<div className="max-w-6xl mx-auto">
				<div className="bg-white rounded-lg shadow-md p-6 mb-8">
					<h2 className="text-2xl font-bold mb-6">
						{editingProduct ? 'Edit Product' : 'Add New Product'}
					</h2>

					<form onSubmit={handleSubmit} className="space-y-4">
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div>
								<label className="block text-sm font-medium mb-1">Product Name</label>
								<input
									type="text"
									value={newProduct.name}
									onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
									className="w-full p-2 border rounded-lg"
									required
								/>
							</div>

							<div>
								<label className="block text-sm font-medium mb-1">Price</label>
								<input
									type="number"
									value={newProduct.price}
									onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
									className="w-full p-2 border rounded-lg"
									required
								/>
							</div>

							<div>
								<label className="block text-sm font-medium mb-1">Category</label>
								<select
									value={newProduct.category}
									onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
									className="w-full p-2 border rounded-lg"
									required
								>
									<option value="">Select Category</option>
									<option value="Limited_Edition">Limited Edition</option>
									<option value="Limited_stocks">Limited Stock</option>
									<option value="Basics">Basic</option>
								</select>
							</div>

							<div>
								<label className="block text-sm font-medium mb-1">Stock</label>
								<div className="grid grid-cols-2 gap-2">
									{['XS', 'S', 'M', 'L', 'XL', 'XXL'].map(size => (
										<div key={size}>
											<label className="block text-sm font-medium mb-1">{size}</label>
											<input
												type="number"
												value={newProduct.stock[size]}
												onChange={(e) => handleStockChange(e, size)}
												className="w-full p-2 border rounded-lg"
												required
											/>
										</div>
									))}
								</div>
							</div>
						</div>

						{/* Discount Section */}
						<div>
							<label className="block text-sm font-medium mb-1">Discount</label>
							<input
								type="text"
								placeholder="Enter discount (e.g., 10% off, or 100)"
								value={newProduct.discount}
								onChange={(e) => setNewProduct({ ...newProduct, discount: e.target.value })}
								className="w-full p-2 border rounded-lg"
							/>
						</div>

						<div>
							<label className="block text-sm font-medium mb-1">Description</label>
							<textarea
								value={newProduct.description}
								onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
								className="w-full p-2 border rounded-lg"
								rows={4}
								required
							/>
						</div>

						<div>
							<label className="block text-sm font-medium mb-1">Product Images</label>
							<div className="space-y-2">
								{[0, 1, 2].map((index) => (
									<div key={index}>
										<label className="block text-sm font-medium mb-1">Image {index + 1}</label>
										<input
											type="file"
											onChange={(e) => handleImageChange(e, index)}
											className="w-full p-2 border rounded-lg"
											accept="image/*"
										/>
									</div>
								))}
							</div>
						</div>

						<div className="flex gap-4">
							<button
								type="submit"
								className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
							>
								{editingProduct ? 'Update Product' : 'Add Product'}
							</button>
							{editingProduct && (
								<button
									type="button"
									onClick={resetForm}
									className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600"
								>
									Cancel
								</button>
							)}
						</div>
					</form>
				</div>

				<div className="bg-white rounded-lg shadow-md">
					<div className="p-6">
						<h2 className="text-2xl font-bold mb-6">Product List</h2>
						<div className="overflow-x-auto">
							<table className="w-full">
								<thead>
									<tr className="border-b">
										<th className="text-left p-2">Images</th>
										<th className="text-left p-2">Name</th>
										<th className="text-left p-2">Category</th>
										<th className="text-left p-2">Price</th>
										<th className="text-left p-2">Stock</th>
										<th className="text-left p-2">Actions</th>
									</tr>
								</thead>
								<tbody>
									{products.map((product) => (
										<tr key={product._id} className="border-b">
											<td className="p-2">
												{product.images.map((image, index) => (
													<img
														key={index}
														src={image}
														alt={product.name}
														className="w-16 h-16 object-cover rounded"
													/>
												))}
											</td>
											<td className="p-2">{product.name}</td>
											<td className="p-2">{product.category}</td>
											<td className="p-2">₹{product.price}</td>
											<td className="p-2">
												{Object.entries(product.stock).map(([size, quantity]) => (
													<div key={size}>{size}: {quantity}</div>
												))}
											</td>
											<td className="p-2">
												<div className="flex gap-2">
													<button
														onClick={() => {
															setEditingProduct(product);
															setNewProduct(product);
														}}
														className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
													>
														Edit
													</button>
													<button
														onClick={() => handleDelete(product._id)}
														className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
													>
														Delete
													</button>
												</div>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>

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
								disabled={products.length < productsPerPage}
								className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50"
							>
								Next
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProductManagement;