import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaSearch, FaShoppingCart, FaStar } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import ProductCard from './ProductCard';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [searchTerm, products]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:3001/products');
      setProducts(response.data);
      setFilteredProducts(response.data);
      setError(null);
    } catch (error) {
      console.error('Error fetching products:', error);
      setError('Failed to load products. Please make sure JSON Server is running.');
      toast.error('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  const filterProducts = () => {
    let filtered = products;

    // Filter by search term only
    if (searchTerm) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
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

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-400 mx-auto mb-4"></div>
          <p className="text-gray-300">Loading products...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="bg-red-900/50 border border-red-700 rounded-lg p-6 max-w-md mx-auto">
          <p className="text-red-200 font-semibold mb-2">Error Loading Products</p>
          <p className="text-red-300 text-sm mb-4">{error}</p>
          <p className="text-gray-300 text-sm">
            Make sure JSON Server is running: <code className="bg-gray-800 px-2 py-1 rounded">npm run server</code>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="fade-in">
      {/* Header Section */}
      <div className="mb-10 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">Our Products</h1>
        <p className="text-gray-300 text-lg">Browse through our wide selection of grocery items</p>
      </div>

      {/* Search Bar - Centered and Better Styled */}
      <div className="max-w-2xl mx-auto mb-12">
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-lg p-4 border border-gray-700">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <FaSearch className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search for products, items, or descriptions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-12 pr-4 py-4 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-lg"
            />
          </div>
        </div>
      </div>

      {/* Products Grid - Better Spacing */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-16 bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-lg border border-gray-700">
          <FaSearch className="text-5xl text-gray-500 mx-auto mb-4" />
          <p className="text-gray-300 text-xl font-medium">No products found matching your search.</p>
          <p className="text-gray-400 text-sm mt-2">Try a different search term</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
              isAuthenticated={isAuthenticated}
            />
          ))}
        </div>
      )}

      {/* Results Count */}
      <div className="mt-12 text-center">
        <p className="text-gray-400">
          Showing <span className="text-white font-semibold">{filteredProducts.length}</span> of{' '}
          <span className="text-white font-semibold">{products.length}</span> products
        </p>
      </div>
    </div>
  );
};

export default Products;

