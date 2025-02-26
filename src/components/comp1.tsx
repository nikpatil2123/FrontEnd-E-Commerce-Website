import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import useCart, { CartMenu } from "../Cart/useCart";

const HeroSection = () => {
  const [banner, setBanner] = useState({ mediaUrl: '', mediaType: 'image' });

  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/banner');
        setBanner(response.data);
      } catch (error) {
        console.error('Error fetching banner:', error);
      }
    };

    fetchBanner();
  }, []);

  return (
    <Link to="/shop">
      <header className="relative h-screen flex items-center justify-center">
        {banner.mediaType === 'video' ? (
          <video
            src={banner.mediaUrl}
            autoPlay
            loop
            muted
            className="hero-image absolute w-full h-full object-cover"
          />
        ) : (
          <img
            src={banner.mediaUrl}
            alt="Tristana Collection"
            className="hero-image absolute w-full h-full object-cover"
          />
        )}
      </header>
    </Link>
  );
};

const Comp1 = () => {
  // Use the cart hook instead of local state
  const { cart, addToCart, updateQuantity, removeFromCart, cartCount } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggleCart = () => {
    setIsCartOpen(prevState => !prevState);
  };

  const applyDiscount = (code) => {
    // Implement discount logic here
    console.log(`Applying discount with code: ${code}`);
  };

  const checkout = () => {
    // Implement checkout logic here
    console.log('Proceeding to checkout');
  };

  return (
    <div>
      <Navbar cartCount={cartCount} toggleCart={toggleCart} />
      <HeroSection />
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

export default Comp1;