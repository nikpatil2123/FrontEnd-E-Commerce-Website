import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, Link, useLocation } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Importing images
import logo from '../assets/blacklogo.png';
import shopping from "../assets/CART.png";
import user from "../assets/USER.png";
import search from "../assets/SEARCH.png";
import menu from "../assets/MENU.png";
import Navbar from '../components/Navbar';

// API base URL from environment variables
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://fakestoreapi.com';

// Button Component
const Button = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement> & { className?: string }>(
  ({ className, children, ...props }, ref) => {
    return (
      <button
        className={`inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 ${className}`}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

// Accordion Component
const AccordionItem: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="border-b border-gray-200">
      <button
        className="flex w-full items-center justify-between py-4 text-left text-sm hover:text-gray-500"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-medium text-gray-900">{title}</span>
        <span className={`ml-6 flex items-center transform transition-transform ${isOpen ? 'rotate-180' : ''}`}>
          ▼
        </span>
      </button>
      {isOpen && (
        <div className="pb-4">
          {children}
        </div>
      )}
    </div>
  );
};

// Cart Menu Component
const CartMenu: React.FC<{
  cart: Array<{ id: number; name: string; price: number; size: string; quantity: number }>;
  updateQuantity: (id: number, newQuantity: number) => void;
  removeFromCart: (id: number) => void;
  applyDiscount: (code: string) => void;
  checkout: () => void;
  closeCart: () => void;
}> = ({ cart, updateQuantity, removeFromCart, applyDiscount, checkout, closeCart }) => {
  const [discountCode, setDiscountCode] = useState('');
  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="fixed top-0 right-0 h-screen w-full max-w-md bg-white shadow-lg z-40 overflow-hidden flex flex-col">
      <div className="p-6 bg-black text-white flex justify-between items-center">
        <h2 className="text-2xl font-bold">Your Cart</h2>
        <button onClick={closeCart} className="text-white hover:text-gray-300 transition-colors">
          <i className="fa fa-times text-2xl"></i>
        </button>
      </div>
      <div className="flex-grow overflow-y-auto p-6">
        {cart.length === 0 ? (
          <p className="text-gray-500 text-center">Your cart is empty</p>
        ) : (
          cart.map((item, index) => (
            <div 
              key={`cart-item-${item.id}-${item.size || ''}-${index}`} 
              className="mb-6 pb-6 border-b border-gray-200 last:border-b-0"
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-bold text-lg">{item.name}</h3>
                  <p className="text-gray-600">Size: {item.size}</p>
                  <p className="text-gray-600">₹{item.price} x {item.quantity}</p>
                </div>
                <button onClick={() => removeFromCart(item.id)} className="text-black hover:text-red-500 transition-colors">
                  <i className="fa fa-trash"></i>
                </button>
              </div>
              <div className="flex items-center mt-2">
                <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="bg-gray-200 text-black px-3 py-1 rounded-l hover:bg-gray-300 transition-colors">-</button>
                <span className="bg-gray-100 px-4 py-1">{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="bg-gray-200 text-black px-3 py-1 rounded-r hover:bg-gray-300 transition-colors">+</button>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="p-6 bg-gray-50 border-t border-gray-200">
        <div className="mb-4">
          <input
            type="text"
            placeholder="Discount Code"
            value={discountCode}
            onChange={(e) => setDiscountCode(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
          />
          <button
            onClick={() => applyDiscount(discountCode)}
            className="w-full mt-2 bg-black text-white py-2 rounded hover:bg-gray-800 transition-colors"
          >
            Apply Discount
          </button>
        </div>
        <div className="flex justify-between items-center mb-4">
          <span className="text-lg font-bold">Total:</span>
          <span className="text-2xl font-bold">₹{totalPrice.toFixed(2)}</span>
        </div>
        <Link to="/checkout">
        <button
          onClick={checkout}
          className="w-full bg-black text-white py-3 rounded text-lg font-bold hover:bg-gray-800 transition-colors"
        >
          Checkout
				</button>
				</Link>
      </div>
    </div>
  );
};

// Main Product Page Component
const ProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Get product ID from URL
  const navigate = useNavigate();
  const location = useLocation();
  const passedProduct = location.state?.product;
  const [product, setProduct] = useState<any>(passedProduct || null);
  const [loading, setLoading] = useState(passedProduct ? false : true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState('L');
  const [cart, setCart] = useState<Array<{ id: number; name: string; price: number; size: string; quantity: number }>>([]);
	const [isCartOpen, setIsCartOpen] = useState(false);
	
	// Added: Price calculation helper to add extra charges (e.g., shipping and tax)
	const calculateTotalPrice = (basePrice: number) => {
		const shipping = 50; // flat shipping charge
		const tax = basePrice * 0.1; // 10% tax
		const total = basePrice + shipping + tax;
		return { basePrice, shipping, tax, total };
	};

	// Updated: Buy Now handler using calculateTotalPrice
	const handleBuyNow = () => {
		if (product) {
			const priceDetails = calculateTotalPrice(product.price);
			navigate('/checkout', {
				state: {
					product,                // pass full product details
					selectedSize,           // pass the user-selected size
					priceBreakdown: priceDetails
				}
			});
		}
	};


  useEffect(() => {
    if (!passedProduct && id) {
      const fetchProduct = async () => {
        try {
          // Use environment variable for API URL
          const response = await fetch(`${API_BASE_URL}/products/${id}`);
          const data = await response.json();
          
          // Updated: Use the images array directly from the backend
          const transformedProduct = {
            id: data.id,
            name: data.title,
            price: data.price,
            images: data.images || [data.image], // <-- Changed to use backend array of images
            sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
            description: data.description,
          };
          
          setProduct(transformedProduct);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching product:', error);
          navigate('/');
        }
      };

      fetchProduct();
    }
  }, [id, passedProduct, navigate]);

  const addToCart = () => {
    if (product) {
      const newItem = {
        id: product.id,
        name: product.name,
        price: product.price,
        size: selectedSize,
        quantity: 1
      };

      setCart(prevCart => {
        const existingItem = prevCart.find(i => 
          i.id === newItem.id && i.size === newItem.size
        );
        
        if (existingItem) {
          return prevCart.map(i =>
            i.id === newItem.id && i.size === newItem.size
              ? { ...i, quantity: i.quantity + 1 }
              : i
          );
        }
        return [...prevCart, newItem];
      });
    }
  };

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeFromCart = (id: number) => {
    setCart(prevCart => prevCart.filter(item => item.id !== id));
  };

  const applyDiscount = (code: string) => {
    console.log(`Applying discount with code: ${code}`);
    // Implement discount logic here
  };

  const checkout = () => {
    console.log('Proceeding to checkout');
    // Implement checkout logic here
  };

  const toggleCart = () => {
    setIsCartOpen(prevState => !prevState);
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  // Show loading state
  if (loading || !product) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
      </div>
    );
  }

  const images = product?.images || [];

  return (
    <div className="min-h-screen bg-white">
      <Navbar cartCount={cartCount} toggleCart={toggleCart} />
      <main className="container mx-auto px-4 pt-28">
        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* Product Images */}
          <div className="relative">
            <img
              src={images.length > 0 ? images[currentImageIndex] : '/path/to/default-image.jpg'}
              alt={product.name}
              className="w-full h-auto object-cover"
            />
            <button
              onClick={() =>
                setCurrentImageIndex(i =>
                  images.length > 0 ? (i > 0 ? i - 1 : images.length - 1) : 0
                )
              }
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6 text-gray-800" />
            </button>
            <button
              onClick={() =>
                setCurrentImageIndex(i =>
                  images.length > 0 ? (i < images.length - 1 ? i + 1 : 0) : 0
                )
              }
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6 text-gray-800" />
            </button>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-medium helvetica-style">{product.name}</h1>
              <p className="text-xl mt-2">₹{product.price.toFixed(2)}</p>
            </div>

            {/* Size Selection */}
            <div className="space-y-4">
              <div className="flex gap-2">
                {(product.sizes || ['XS', 'S', 'M', 'L', 'XL', 'XXL']).map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 border rounded ${
                      selectedSize === size 
                        ? 'border-black bg-black text-white' 
                        : 'border-gray-200 hover:border-black'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
              
              <Button 
                className="w-full py-6 text-lg bg-black text-white hover:bg-gray-800"
                onClick={addToCart}
              >
                ADD TO CART
              </Button>
						</div>
						<div>
						<Button 
							className="w-full py-6 text-lg bg-black text-white hover:bg-gray-800"
							onClick={handleBuyNow}
						>
							BUY NOW
						</Button>
							</div>	
            {/* Shipping Info */}
            <div className="text-sm text-gray-600 space-y-1">
              <p>Italy free shipping over ₹200.</p>
              <p>Worldwide free shipping over ₹350.</p>
            </div>

            {/* Accordion Sections */}
            <div className="space-y-4">
              <AccordionItem title="DETAILS">
                <p className="text-sm text-gray-600">
                  {product.description}
                </p>
              </AccordionItem>

              <AccordionItem title="SIZE GUIDE">
                <div className="space-y-2 text-sm text-gray-600">
                  <p>XS: Chest 86-91cm, Length 65cm</p>
                  <p>S: Chest 91-96cm, Length 67cm</p>
                  <p>M: Chest 96-101cm, Length 69cm</p>
                  <p>L: Chest 101-106cm, Length 71cm</p>
                  <p>XL: Chest 106-111cm, Length 73cm</p>
                  <p>XXL: Chest 111-116cm, Length 75cm</p>
                </div>
              </AccordionItem>

              <AccordionItem title="WASHING INSTRUCTIONS">
                <ul className="list-disc pl-4 space-y-2 text-sm text-gray-600">
                  <li>Machine wash at 30°C</li>
                  <li>Do not tumble dry</li>
                  <li>Iron on low temperature</li>
                  <li>Do not bleach</li>
                  <li>Dry flat</li>
                </ul>
              </AccordionItem>

              <AccordionItem title="SHIPPING & RETURNS">
                <div className="space-y-4 text-sm text-gray-600">
                  <div>
                    <h4 className="font-medium">Shipping</h4>
                    <p>Free shipping on orders over ₹350 worldwide. Standard delivery 3-5 working days.</p>
                  </div>
                  <div>
                    <h4 className="font-medium">Returns</h4>
                    <p>Free returns within 14 days. Items must be unworn and in original packaging.</p>
                  </div>
                </div>
              </AccordionItem>
            </div>
            <div>
              <Link to="/shop" className="text-blue-600 underline">
                &larr; Back to Shop
              </Link>
            </div>
          </div>
        </div>
        <section className="mt-8">
          <h2 className="text-2xl font-bold mb-4 helvetica-style">Related Products</h2>
        </section>
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

export default ProductPage;

