import { Link, useLocation } from 'react-router-dom';
import { FaCheckCircle, FaShoppingBag, FaHome } from 'react-icons/fa';

const OrderSuccess = () => {
  const location = useLocation();
  const order = location.state?.order;

  return (
    <div className="fade-in max-w-2xl mx-auto">
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-2xl p-8 text-center border border-gray-700">
        <div className="mb-6">
          <FaCheckCircle className="text-6xl text-green-400 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-white mb-2">Order Placed Successfully!</h1>
          <p className="text-gray-300">
            Thank you for your purchase. Your order has been confirmed.
          </p>
        </div>

        {order && (
          <div className="bg-gray-700/50 rounded-lg p-6 mb-6 text-left border border-gray-600">
            <h2 className="text-xl font-semibold text-white mb-4">Order Details</h2>
            <div className="space-y-2 text-gray-300">
              <div className="flex justify-between">
                <span className="font-medium">Order Total:</span>
                <span className="font-bold text-primary-400">₹{Math.round(order.total * 83).toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Items:</span>
                <span>{order.items.length} items</span>
              </div>
              {order.shippingAddress && (
                <>
                  <div className="mt-4 pt-4 border-t border-gray-600">
                    <p className="font-medium mb-2 text-white">Shipping Address:</p>
                    <p className="text-sm text-gray-300">
                      {order.shippingAddress.fullName}
                      <br />
                      {order.shippingAddress.address}
                      <br />
                      {order.shippingAddress.city}, {order.shippingAddress.zipCode}
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/products"
            className="inline-flex items-center justify-center space-x-2 bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
          >
            <FaShoppingBag />
            <span>Continue Shopping</span>
          </Link>
          <Link
            to="/"
            className="inline-flex items-center justify-center space-x-2 bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
          >
            <FaHome />
            <span>Go to Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;

