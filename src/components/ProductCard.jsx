import { FaShoppingCart, FaStar, FaFire } from 'react-icons/fa';

const ProductCard = ({ product, onAddToCart, isAuthenticated, isOffer = false }) => {
  // Convert USD to INR (1 USD ≈ 83 INR) - rounded to whole number
  const priceInINR = Math.round(product.price * 83);
  
  // Calculate discounted price if offer exists
  const hasOffer = product.discountPercentage || product.discount;
  const discountPercentage = product.discountPercentage || (product.discount ? Math.round((product.discount / priceInINR) * 100) : 0);
  const discountedPrice = hasOffer 
    ? (product.discountPercentage 
        ? Math.round(priceInINR - (priceInINR * product.discountPercentage / 100))
        : Math.round(priceInINR - product.discount))
    : priceInINR;

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-2xl transition-all overflow-hidden fade-in border border-gray-700 hover:border-primary-500/50 relative flex flex-col">
      {/* Discount Badge */}
      {hasOffer && (
        <div className="absolute top-4 right-4 z-10">
          <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1.5 rounded-full font-bold text-xs shadow-lg flex items-center space-x-1">
            <FaFire className="text-xs" />
            <span>{discountPercentage}% OFF</span>
          </div>
        </div>
      )}
      
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

      {/* Product Info - Using flexbox for consistent button alignment */}
      <div className="p-5 flex flex-col flex-grow">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-white line-clamp-2 mb-2 min-h-[3rem]">
            {product.name}
          </h3>
          <p className="text-sm text-gray-400 line-clamp-2">
            {product.description}
          </p>
        </div>

        {/* Rating */}
        <div className="flex items-center space-x-1 mb-4">
          <FaStar className="text-yellow-400" />
          <span className="text-sm text-gray-300 font-medium">{product.rating?.toFixed(1) || '4.5'}</span>
        </div>

        {/* Price */}
        <div className="mb-5">
          <div className="flex items-baseline space-x-2">
            <span className={`text-3xl font-bold ${hasOffer ? 'text-orange-400' : 'text-primary-400'}`}>
              ₹{discountedPrice.toLocaleString('en-IN')}
            </span>
            {hasOffer && (
              <span className="text-lg text-gray-500 line-through">
                ₹{priceInINR.toLocaleString('en-IN')}
              </span>
            )}
          </div>
          {hasOffer && (
            <p className="text-sm text-green-400 font-semibold mt-1">
              Save ₹{(priceInINR - discountedPrice).toLocaleString('en-IN')}
            </p>
          )}
        </div>

        {/* Add to Cart Button - Consistent alignment for both normal and offer products */}
        <button
          onClick={() => onAddToCart(product)}
          className={`w-full text-white py-3 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2 font-semibold shadow-lg hover:shadow-xl mt-auto ${
            isOffer 
              ? 'bg-orange-600 hover:bg-orange-700' 
              : 'bg-primary-600 hover:bg-primary-700'
          }`}
        >
          <FaShoppingCart />
          <span>Add to Cart</span>
        </button>
      </div>
    </div>
  );
};

export default ProductCard;

