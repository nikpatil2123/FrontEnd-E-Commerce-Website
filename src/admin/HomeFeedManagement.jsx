import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config/env';

const HomeFeedManagement = () => {
	const [mainBanner, setMainBanner] = useState({
		mediaUrl: '',
		mediaType: 'image',
		title: 'Main Banner',
		active: true
	});

	const [mediaPreview, setMediaPreview] = useState(null);

	useEffect(() => {
		// Fetch the current banner from the server
		const fetchBanner = async () => {
			try {
				const response = await axios.get(`${API_BASE_URL}/api/banner`);
				setMainBanner(response.data);
			} catch (error) {
				console.error('Error fetching banner:', error);
			}
		};

		fetchBanner();
	}, []);

	const handleMediaUpload = (e) => {
		const file = e.target.files[0];
		if (file) {
			const reader = new FileReader();
			reader.onloadend = () => {
				setMainBanner({
					...mainBanner,
					mediaUrl: reader.result,
					mediaType: file.type.startsWith('video/') ? 'video' : 'image'
				});
				setMediaPreview(reader.result);
			};
			reader.readAsDataURL(file);
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const formData = new FormData();
			formData.append('media', mainBanner.mediaUrl);
			formData.append('mediaType', mainBanner.mediaType);
			formData.append('title', mainBanner.title);
			formData.append('active', mainBanner.active);

			const response = await axios.post(`${API_BASE_URL}/api/banner/update`, formData, {
				headers: {
					'Content-Type': 'multipart/form-data'
				}
			});

			alert('Banner updated successfully!');
			setMainBanner(response.data);
			setMediaPreview(null);
		} catch (error) {
			console.error('Error updating banner:', error);
		}
	};

	return (
		<div className="min-h-screen bg-gray-100 p-8">
			<div className="max-w-4xl mx-auto">
				<div className="bg-white rounded-lg shadow-md p-6">
					<h2 className="text-2xl font-bold mb-6">Main Banner Management</h2>

					<form onSubmit={handleSubmit} className="space-y-6">
						<div>
							<label className="block text-sm font-medium mb-2">Upload Image or Video</label>
							<input
								type="file"
								onChange={handleMediaUpload}
								className="w-full p-2 border rounded-lg"
								accept="image/*,video/*"
							/>
							{mediaPreview && (
								<div className="mt-4">
									<p className="text-sm font-medium mb-2">Preview:</p>
									{mainBanner.mediaType === 'video' ? (
										<video
											src={mediaPreview}
											controls
											className="w-full h-64 object-cover rounded-lg"
										/>
									) : (
										<img
											src={mediaPreview}
											alt="Banner Preview"
											className="w-full h-64 object-cover rounded-lg"
										/>
									)}
								</div>
							)}
						</div>

						<div className="flex justify-end gap-4">
							<button
								type="submit"
								className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
							>
								Update Banner
							</button>
						</div>
					</form>

					{mainBanner.mediaUrl && !mediaPreview && (
						<div className="mt-8">
							<h3 className="text-lg font-medium mb-2">Current Banner</h3>
							{mainBanner.mediaType === 'video' ? (
								<video
									src={mainBanner.mediaUrl}
									controls
									className="w-full h-64 object-cover rounded-lg"
								/>
							) : (
								<img
									src={mainBanner.mediaUrl}
									alt="Current Banner"
									className="w-full h-64 object-cover rounded-lg"
								/>
							)}
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default HomeFeedManagement;
