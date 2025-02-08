import React, { useState, useEffect } from 'react';
import axios from 'axios';

const HomeFeedManagement = () => {
	const [mainBanner, setMainBanner] = useState({
		mediaUrl: '',
		mediaType: 'image',
		title: 'Main Banner',
		active: true
	});

	const [mediaPreview, setMediaPreview] = useState(null);

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
			// Add your API call here to save the banner
			console.log('Updating banner:', mainBanner);

			// Example API call:
			// await axios.post('/api/banner/update', mainBanner);

			alert('Banner updated successfully!');
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
