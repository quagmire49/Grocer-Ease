import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaTag, FaBars, FaTimes } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import ProductCard from './ProductCard';

const Categories = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (products.length > 0) {
      const uniqueCategories = [...new Set(products.map((p) => p.category))].sort();
      setCategories(uniqueCategories);
    }
  }, [products]);

  useEffect(() => {
    if (selectedCategory) {
      const filtered = products.filter((p) => p.category === selectedCategory);
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
  }, [selectedCategory, products]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:3001/products');
      setProducts(response.data);
      setFilteredProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
      toast.error('Failed to load products');
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

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setSidebarOpen(false);
  };

  const getCategoryIcon = (category) => {
    const icons = {
      'Grains & Pulses': '🌾',
      'Spices & Condiments': '🌶️',
      'Oils & Ghee': '🫒',
      'Fresh Vegetables': '🥬',
      'Fresh Fruits': '🍎',
      'Dairy Products': '🥛',
      'Snacks & Namkeen': '🍿',
      'Beverages': '☕',
      'Household Essentials': '🧹',
      'Bakery': '🍞',
      'Fruits': '🍎',
      'Vegetables': '🥬',
      'Dairy': '🥛',
      'Meat': '🥩',
      'Seafood': '🐟',
      'Snacks': '🍿',
    };
    return icons[category] || '🛒';
  };

  const getCategoryCount = (category) => {
    return products.filter((p) => p.category === category).length;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-400 mx-auto mb-4"></div>
          <p className="text-gray-300">Loading categories...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fade-in">
      {/* Header Section */}
      <div className="mb-8 text-center">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden bg-gray-800/50 hover:bg-gray-700 p-3 rounded-lg border border-gray-700 text-white"
          >
            {sidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
          <h1 className="text-4xl md:text-5xl font-bold text-white flex-1">Products</h1>
          <div className="w-12"></div>
        </div>
        <p className="text-gray-300 text-lg">Browse products organized by category</p>
      </div>

      <div className="flex gap-6 relative">
        {/* Sidebar - Simple Category List */}
        <div
          className={`${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
          } fixed lg:sticky top-0 left-0 z-40 h-screen lg:h-auto lg:top-20 transition-transform duration-300 ease-in-out bg-gray-900/95 backdrop-blur-md border-r border-gray-700 w-64 lg:w-72 overflow-y-auto`}
        >
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-white">Categories</h2>
              <button
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden text-gray-400 hover:text-white"
              >
                <FaTimes />
              </button>
            </div>

            {/* All Categories Button */}
            <button
              onClick={() => {
                setSelectedCategory(null);
                setSidebarOpen(false);
              }}
              className={`w-full text-left px-4 py-3 rounded-lg mb-4 transition-all flex items-center justify-between ${
                selectedCategory === null
                  ? 'bg-primary-600 text-white shadow-lg'
                  : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700'
              }`}
            >
              <span className="font-semibold">All Categories</span>
              <span className="text-sm bg-gray-700/50 px-2 py-1 rounded">
                {products.length}
              </span>
            </button>

            {/* Category List - Simple Clickable Items */}
            <div className="space-y-2">
              {categories.map((category) => {
                const count = getCategoryCount(category);
                const isSelected = selectedCategory === category;

                return (
                  <button
                    key={category}
                    onClick={() => handleCategoryClick(category)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-all flex items-center justify-between ${
                      isSelected
                        ? 'bg-primary-600 text-white shadow-lg'
                        : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-xl">{getCategoryIcon(category)}</span>
                      <span className="font-medium">{category}</span>
                    </div>
                    <span className="text-sm bg-gray-700/50 px-2 py-1 rounded">
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          ></div>
        )}

        {/* Main Content */}
        <div className="flex-1 min-w-0">
          {/* Selected Category Info */}
          {selectedCategory && (
            <div className="mb-6">
              <div className="inline-flex items-center space-x-2 bg-primary-600/20 border border-primary-500/50 rounded-lg px-6 py-3">
                <FaTag className="text-primary-400" />
                <span className="text-white font-semibold text-lg">
                  {selectedCategory} ({filteredProducts.length} products)
                </span>
              </div>
            </div>
          )}

          {/* Products Grid */}
          {filteredProducts.length === 0 ? (
            <div className="text-center py-16 bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-lg border border-gray-700">
              <FaTag className="text-5xl text-gray-500 mx-auto mb-4" />
              <p className="text-gray-300 text-xl font-medium">No products found in this category.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
          <div className="mt-8 text-center">
            <p className="text-gray-400">
              Showing <span className="text-white font-semibold">{filteredProducts.length}</span> of{' '}
              <span className="text-white font-semibold">{products.length}</span> products
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;
