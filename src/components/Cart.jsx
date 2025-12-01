import { Link } from 'react-router-dom';
import { FaTrash, FaPlus, FaMinus, FaShoppingBag } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import { toast } from 'react-toastify';

const Cart = () => {
  const {
    cartItems,
    updateQuantity,
    removeFromCart,
    getCartTotal,
    getCartItemCount,
    clearCart,
  } = useCart();

  const handleQuantityChange = async (productId, newQuantity) => {
    if (newQuantity < 1) {
      await removeFromCart(productId);
      toast.success('Item removed from cart');
    } else {
      await updateQuantity(productId, newQuantity);
    }
  };

  const handleRemove = async (productId) => {
    await removeFromCart(productId);
    toast.success('Item removed from cart');
  };

  if (cartItems.length === 0) {
    return (
      <div className="fade-in">
        <div className="text-center py-16 bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-2xl border border-gray-700">
          <FaShoppingBag className="text-6xl text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Your cart is empty</h2>
          <p className="text-gray-300 mb-6">Start adding items to your cart!</p>
          <Link
            to="/products"
            className="inline-block bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
          >
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Shopping Cart</h1>
        <p className="text-gray-300">
          {getCartItemCount()} {getCartItemCount() === 1 ? 'item' : 'items'} in your cart
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-lg p-6 flex flex-col sm:flex-row gap-4 border border-gray-700"
            >
              {/* Product Image */}
              <div className="w-full sm:w-32 h-32 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/200?text=Product';
                  }}
                />
              </div>

              {/* Product Details */}
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-white mb-1">{item.name}</h3>
                <p className="text-sm text-gray-300 mb-2 line-clamp-2">{item.description}</p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-primary-400 font-bold text-lg">
                      ₹{Math.round(item.price * 83).toLocaleString('en-IN')}
                    </p>
                  </div>
                </div>
              </div>

              {/* Quantity Controls */}
              <div className="flex flex-col items-end justify-between">
                <button
                  onClick={() => handleRemove(item.id)}
                  className="text-red-400 hover:text-red-300 transition-colors mb-2"
                  title="Remove item"
                >
                  <FaTrash />
                </button>

                <div className="flex items-center space-x-3 bg-gray-700/50 rounded-lg p-2 border border-gray-600">
                  <button
                    onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                    className="text-gray-300 hover:text-primary-400 transition-colors"
                    disabled={item.quantity <= 1}
                  >
                    <FaMinus className="w-4 h-4" />
                  </button>
                  <span className="text-lg font-semibold w-8 text-center text-white">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                    className="text-gray-300 hover:text-primary-400 transition-colors"
                    disabled={item.quantity >= item.stock}
                  >
                    <FaPlus className="w-4 h-4" />
                  </button>
                </div>

                <div className="mt-2 text-right">
                  <p className="text-sm text-gray-300">Subtotal</p>
                  <p className="text-lg font-bold text-white">
                    ₹{Math.round((item.price * 83) * item.quantity).toLocaleString('en-IN')}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-lg p-6 sticky top-24 border border-gray-700">
            <h2 className="text-xl font-bold text-white mb-4">Order Summary</h2>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-gray-300">
                <span>Subtotal ({getCartItemCount()} items)</span>
                <span>₹{Math.round(getCartTotal() * 83).toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-gray-300">
                <span>Shipping</span>
                <span className="text-green-400">Free</span>
              </div>
              <div className="flex justify-between text-gray-300">
                <span>Tax</span>
                <span>₹{Math.round((getCartTotal() * 83) * 0.1).toLocaleString('en-IN')}</span>
              </div>
              <div className="border-t border-gray-600 pt-3 flex justify-between text-lg font-bold text-white">
                <span>Total</span>
                <span>₹{Math.round((getCartTotal() * 83) * 1.1).toLocaleString('en-IN')}</span>
              </div>
            </div>

            <Link
              to="/checkout"
              className="block w-full bg-primary-600 text-white text-center py-3 px-4 rounded-lg font-semibold hover:bg-primary-700 transition-colors mb-3"
            >
              Proceed to Checkout
            </Link>

            <Link
              to="/products"
              className="block w-full text-center text-primary-600 py-2 hover:text-primary-700 transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;

