import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaTag, FaFire } from 'react-icons/fa';
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
          {offers.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
              isAuthenticated={isAuthenticated}
              isOffer={true}
            />
          ))}
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

