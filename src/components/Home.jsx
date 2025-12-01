import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaShoppingCart, FaSearch, FaLeaf, FaTruck, FaTrophy, FaStar } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import ProductCard from './ProductCard';

const Home = () => {
  const { isAuthenticated } = useAuth();
  const { addToCart } = useCart();
  const [bestSellingProducts, setBestSellingProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBestSellingProducts();
  }, []);

  const fetchBestSellingProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:3001/products');
      // Filter products marked as best sellers or top rated products
      const bestSellers = response.data
        .filter((product) => product.bestSeller || product.rating >= 4.5)
        .slice(0, 8); // Show top 8 best sellers
      setBestSellingProducts(bestSellers);
    } catch (error) {
      console.error('Error fetching best selling products:', error);
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

  return (
    <div className="fade-in">
      {/* Hero Section with Image */}
      <div className="relative rounded-2xl overflow-hidden mb-12 shadow-2xl border border-gray-700">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=1200&h=600&fit=crop"
            alt="Fresh Groceries"
            className="w-full h-full object-cover opacity-30"
            onError={(e) => {
              e.target.src = 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=1200&h=600&fit=crop';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 via-gray-800/80 to-gray-900/90"></div>
        </div>
        
        {/* Content */}
        <div className="relative z-10 p-8 md:p-16 text-white">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              {/* Text Content */}
              <div>
                <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
                  Welcome to <span className="text-primary-400">GrocerEase</span>
                </h1>
                <p className="text-xl md:text-2xl mb-6 text-gray-200">
                  Simplifying Your Shopping Experience
                </p>
                <p className="text-lg mb-8 text-gray-300">
                  Browse, search, and purchase your favorite grocery items with ease.
                  Add products to your cart, update quantities, and checkout seamlessly.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    to="/categories"
                    className="bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors shadow-lg text-center"
                  >
                    Start Shopping
                  </Link>
                  {!isAuthenticated && (
                    <Link
                      to="/login"
                      className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-gray-900 transition-colors text-center"
                    >
                      Login
                    </Link>
                  )}
                </div>
              </div>
              
              {/* Image Section */}
              <div className="hidden md:block">
                <div className="relative">
                  <img
                    src="https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=600&h=400&fit=crop"
                    alt="Shopping Experience"
                    className="rounded-xl shadow-2xl border-4 border-primary-500/50"
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1607082349566-187342175e2f?w=600&h=400&fit=crop';
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl shadow-lg hover:shadow-xl transition-all border border-gray-700">
          <div className="text-primary-400 text-4xl mb-4">
            <FaSearch />
          </div>
          <h3 className="text-xl font-semibold mb-2 text-white">Easy Search</h3>
          <p className="text-gray-300">
            Quickly find the products you need with our powerful search functionality.
          </p>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl shadow-lg hover:shadow-xl transition-all border border-gray-700">
          <div className="text-primary-400 text-4xl mb-4">
            <FaShoppingCart />
          </div>
          <h3 className="text-xl font-semibold mb-2 text-white">Smart Cart</h3>
          <p className="text-gray-300">
            Add items to your cart, update quantities, and save for later.
          </p>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl shadow-lg hover:shadow-xl transition-all border border-gray-700">
          <div className="text-primary-400 text-4xl mb-4">
            <FaLeaf />
          </div>
          <h3 className="text-xl font-semibold mb-2 text-white">Fresh Products</h3>
          <p className="text-gray-300">
            Browse through a wide selection of fresh grocery items.
          </p>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl shadow-lg hover:shadow-xl transition-all border border-gray-700">
          <div className="text-primary-400 text-4xl mb-4">
            <FaTruck />
          </div>
          <h3 className="text-xl font-semibold mb-2 text-white">Easy Checkout</h3>
          <p className="text-gray-300">
            Complete your purchase with our streamlined checkout process.
          </p>
        </div>
      </div>

      {/* Best Selling Products Section */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <FaTrophy className="text-4xl text-yellow-400" />
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white">Best Selling Products</h2>
              <p className="text-gray-300 text-sm mt-1">Our most popular items</p>
            </div>
          </div>
          <Link
            to="/products"
            className="text-primary-400 hover:text-primary-300 transition-colors font-semibold hidden md:block"
          >
            View All →
          </Link>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-400"></div>
          </div>
        ) : bestSellingProducts.length === 0 ? (
          <div className="text-center py-12 bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-lg border border-gray-700">
            <p className="text-gray-300">No best selling products available at the moment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {bestSellingProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
                isAuthenticated={isAuthenticated}
              />
            ))}
          </div>
        )}

        {/* View All Link for Mobile */}
        <div className="mt-6 text-center md:hidden">
          <Link
            to="/products"
            className="inline-block text-primary-400 hover:text-primary-300 transition-colors font-semibold"
          >
            View All Products →
          </Link>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-2xl p-8 text-center border border-gray-700">
        <h2 className="text-3xl font-bold text-white mb-4">
          Ready to Start Shopping?
        </h2>
        <p className="text-gray-300 mb-6 text-lg">
          Explore our wide range of grocery products and enjoy a seamless shopping experience.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            to="/products"
            className="inline-block bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors shadow-md"
          >
            Browse Products
          </Link>
          <Link
            to="/offers"
            className="inline-block bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors shadow-md"
          >
            View Offers
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;

