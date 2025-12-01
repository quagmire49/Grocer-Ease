import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaShoppingCart, FaStar, FaTag, FaFire } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import ProductCard from './ProductCard';

const Offers = () => {
  const [products, setProducts] = useState([]);
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    // Filter products that have discounts/offers
    const productsWithOffers = products.filter((product) => product.discount || product.discountPercentage);
    setOffers(productsWithOffers);
  }, [products]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:3001/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
      toast.error('Failed to load offers');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async (product) => {
    if (!isAuthenticated) {
      toast.info('Please login to add items to cart');
      return;
    }

    try {
      await addToCart(product, 1);
      toast.success(`${product.name} added to cart!`);
    } catch (error) {
      toast.error('Failed to add item to cart');
    }
  };

  const calculateDiscountedPrice = (product) => {
    const priceInINR = Math.round(product.price * 83);
    if (product.discountPercentage) {
      const discount = (priceInINR * product.discountPercentage) / 100;
      return Math.round(priceInINR - discount);
    } else if (product.discount) {
      return Math.round(priceInINR - product.discount);
    }
    return priceInINR;
  };

  const getDiscountPercentage = (product) => {
    if (product.discountPercentage) {
      return product.discountPercentage;
    } else if (product.discount) {
      const priceInINR = Math.round(product.price * 83);
      return Math.round((product.discount / priceInINR) * 100);
    }
    return 0;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-400 mx-auto mb-4"></div>
          <p className="text-gray-300">Loading offers...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fade-in">
      {/* Header Section */}
      <div className="mb-10 text-center">
        <div className="flex items-center justify-center space-x-3 mb-3">
          <FaFire className="text-5xl text-orange-500" />
          <h1 className="text-4xl md:text-5xl font-bold text-white">Special Offers</h1>
        </div>
        <p className="text-gray-300 text-lg">Don't miss out on these amazing deals!</p>
      </div>

      {/* Offers Grid */}
      {offers.length === 0 ? (
        <div className="text-center py-16 bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-lg border border-gray-700">
          <FaTag className="text-5xl text-gray-500 mx-auto mb-4" />
          <p className="text-gray-300 text-xl font-medium">No offers available at the moment.</p>
          <p className="text-gray-400 text-sm mt-2">Check back soon for exciting deals!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {offers.map((product) => {
            const discountedPrice = calculateDiscountedPrice(product);
            const originalPrice = Math.round(product.price * 83);
            const discountPercent = getDiscountPercentage(product);

            return (
              <div
                key={product.id}
                className="bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-2xl transition-all overflow-hidden fade-in border border-gray-700 hover:border-orange-500/50 relative"
              >
                {/* Discount Badge */}
                <div className="absolute top-4 right-4 z-10">
                  <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-full font-bold text-sm shadow-lg flex items-center space-x-1">
                    <FaFire />
                    <span>{discountPercent}% OFF</span>
                  </div>
                </div>

                {/* Product Image */}
                <div className="relative h-56 bg-gray-700 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/400x300?text=Product+Image';
                    }}
                  />
                </div>

                {/* Product Info */}
                <div className="p-5">
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold text-white line-clamp-2 mb-2 min-h-[3rem]">
                      {product.name}
                    </h3>
                    <p className="text-sm text-gray-400 line-clamp-2">{product.description}</p>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center space-x-1 mb-4">
                    <FaStar className="text-yellow-400" />
                    <span className="text-sm text-gray-300 font-medium">
                      {product.rating?.toFixed(1) || '4.5'}
                    </span>
                  </div>

                  {/* Price */}
                  <div className="mb-5">
                    <div className="flex items-baseline space-x-2">
                      <span className="text-3xl font-bold text-orange-400">
                        ₹{discountedPrice.toLocaleString('en-IN')}
                      </span>
                      <span className="text-lg text-gray-500 line-through">
                        ₹{originalPrice.toLocaleString('en-IN')}
                      </span>
                    </div>
                    <p className="text-sm text-green-400 font-semibold mt-1">
                      Save ₹{(originalPrice - discountedPrice).toLocaleString('en-IN')}
                    </p>
                  </div>

                  {/* Add to Cart Button */}
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="w-full bg-orange-600 text-white py-3 px-4 rounded-lg hover:bg-orange-700 transition-colors flex items-center justify-center space-x-2 font-semibold shadow-lg hover:shadow-xl"
                  >
                    <FaShoppingCart />
                    <span>Add to Cart</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Results Count */}
      <div className="mt-12 text-center">
        <p className="text-gray-400">
          Showing <span className="text-white font-semibold">{offers.length}</span> special offers
        </p>
      </div>
    </div>
  );
};

export default Offers;

