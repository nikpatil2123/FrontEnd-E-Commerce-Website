import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import useCart, { CartMenu } from '../Cart/useCart';

const FAQPage = () => {
	// Cart state using useCart hook
	const { cart, addToCart, updateQuantity, removeFromCart, cartCount, totalPrice } = useCart();
	const [isCartOpen, setIsCartOpen] = useState(false);

	const toggleCart = () => {
		setIsCartOpen(prevState => !prevState);
	};

	const applyDiscount = (code) => {
		console.log(`Applying discount with code: ${code}`);
	};

	const checkout = () => {
		console.log('Proceeding to checkout');
	};

	return (
		<div className="min-h-screen bg-white">
			{/* Use the Navbar component */}
			<Navbar cartCount={cartCount} toggleCart={toggleCart} />

			{/* Hero Image */}
			<div className="relative h-96 bg-[#f5e6d3] mt-16">
				<div className="absolute inset-0 flex items-center justify-center">
					<img
						src="https://media.istockphoto.com/id/1320815200/photo/wall-black-background-for-design-stone-black-texture-background.jpg?s=612x612&w=0&k=20&c=hqcH1pKLCLn_ZQ5vUPUfi3BOqMWoBzbk5-61Xq7UMsU="
						alt="Decorative still life with hat and flowers"
						className="object-cover w-full h-full"
					/>
					<div className="absolute inset-0 flex items-center justify-center">
						<h2 className="text-5xl sm:text-6xl md:text-7xl font-bold text-white helvetica-style">TRISTANA</h2>
					</div>
				</div>
			</div>

			{/* Main Content */}
			<main className="max-w-3xl mx-auto px-4 py-16">
				<h2 className="text-3xl font-bold text-center mb-8 helvetica-style">FAQ</h2>
				<div className="space-y-6">
					<p className="text-gray-600">Last updated: March 15, 2023</p>

					<h3 className="text-xl font-semibold">What are cookies?</h3>
					<p className="text-gray-600">
						Cookies are small text files that are placed on your computer or mobile device when you browse websites. They are widely used to make websites work more efficiently, as well as to provide information to the owners of the site.
					</p>

					<h3 className="text-xl font-semibold">How we use cookies</h3>
					<p className="text-gray-600">
						Our website uses cookies for the following purposes:
					</p>
					<ul className="list-disc pl-5 text-gray-600 space-y-2">
						<li><strong>Essential cookies:</strong> These are necessary for the website to function properly. They enable core functionality such as security, network management, and account access.</li>
						<li><strong>Analytical/performance cookies:</strong> These cookies allow us to recognize and count the number of visitors and see how visitors move around our website when they are using it.</li>
						<li><strong>Functionality cookies:</strong> These cookies enable the website to provide enhanced functionality and personalization.</li>
						<li><strong>Targeting cookies:</strong> These cookies may be set through our site by our advertising partners to build a profile of your interests.</li>
					</ul>

					<h3 className="text-xl font-semibold">Managing cookies</h3>
					<p className="text-gray-600">
						Most web browsers allow you to manage your cookie preferences. You can set your browser to refuse cookies, or to alert you when cookies are being sent. The Help portion of the toolbar on most browsers will tell you how to prevent your computer from accepting new cookies, how to have the browser notify you when you receive a new cookie, or how to disable cookies altogether.
					</p>
					<p className="text-gray-600">
						Please note that if you choose to disable cookies, some portions of our website may not function properly.
					</p>

					<h3 className="text-xl font-semibold">Contact Us</h3>
					<p className="text-gray-600">
						If you have any questions about our Cookie Policy, please contact us at <a href="mailto:privacy@tristana.it" className="underline">privacy@tristana.it</a>
					</p>
				</div>
			</main>

			{/* Cart Modal */}
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
		</div>
	);
};

export default FAQPage;

