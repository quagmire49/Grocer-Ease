import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaUser, FaSignOutAlt, FaHome, FaBars, FaTimes } from 'react-icons/fa';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const { getCartItemCount } = useCart();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setMobileMenuOpen(false);
  };

  return (
    <nav className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 backdrop-blur-md shadow-2xl sticky top-0 z-50 border-b border-gray-700">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="bg-primary-600 p-2 rounded-lg group-hover:bg-primary-500 transition-colors">
              <span className="text-2xl font-bold text-white">G</span>
            </div>
            <span className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">
              GrocerEase
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center space-x-8">
            <Link
              to="/"
              className="text-gray-300 hover:text-primary-400 transition-colors flex items-center space-x-2 font-medium hover:scale-105 transform duration-200"
            >
              <FaHome className="text-sm" />
              <span>Home</span>
            </Link>
            <Link
              to="/products"
              className="text-gray-300 hover:text-primary-400 transition-colors font-medium hover:scale-105 transform duration-200"
            >
              Products
            </Link>
            <Link
              to="/categories"
              className="text-gray-300 hover:text-primary-400 transition-colors font-medium hover:scale-105 transform duration-200"
            >
              Browse Categories
            </Link>
            <Link
              to="/offers"
              className="text-gray-300 hover:text-orange-400 transition-colors font-medium hover:scale-105 transform duration-200"
            >
              Offers
            </Link>
            {isAuthenticated && (
              <Link
                to="/cart"
                className="text-gray-300 hover:text-primary-400 transition-colors flex items-center space-x-2 font-medium hover:scale-105 transform duration-200 relative"
              >
                <FaShoppingCart />
                <span>Cart</span>
                {getCartItemCount() > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold animate-pulse">
                    {getCartItemCount()}
                  </span>
                )}
              </Link>
            )}
          </div>

          {/* User Section */}
          <div className="hidden lg:flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <Link
                  to="/profile"
                  className="flex items-center space-x-2 text-gray-300 hover:text-primary-400 transition-colors font-medium hover:scale-105 transform duration-200"
                >
                  <div className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center">
                    <FaUser className="text-white" />
                  </div>
                  <span>{user?.name || user?.username}</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 text-gray-300 hover:text-red-400 transition-colors font-medium hover:scale-105 transform duration-200"
                >
                  <FaSignOutAlt />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="bg-gradient-to-r from-primary-600 to-primary-700 text-white px-6 py-2.5 rounded-lg hover:from-primary-500 hover:to-primary-600 transition-all font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 duration-200"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden text-gray-300 hover:text-white p-2"
          >
            {mobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-700 py-4 mt-2 animate-slideDown">
            <div className="flex flex-col space-y-3">
              <Link
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className="text-gray-300 hover:text-primary-400 transition-colors flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-gray-800"
              >
                <FaHome />
                <span>Home</span>
              </Link>
              <Link
                to="/products"
                onClick={() => setMobileMenuOpen(false)}
                className="text-gray-300 hover:text-primary-400 transition-colors px-4 py-2 rounded-lg hover:bg-gray-800"
              >
                Products
              </Link>
              <Link
                to="/categories"
                onClick={() => setMobileMenuOpen(false)}
                className="text-gray-300 hover:text-primary-400 transition-colors px-4 py-2 rounded-lg hover:bg-gray-800"
              >
                Browse Categories
              </Link>
              <Link
                to="/offers"
                onClick={() => setMobileMenuOpen(false)}
                className="text-gray-300 hover:text-orange-400 transition-colors px-4 py-2 rounded-lg hover:bg-gray-800"
              >
                Offers
              </Link>
              {isAuthenticated && (
                <>
                  <Link
                    to="/cart"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-gray-300 hover:text-primary-400 transition-colors flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-gray-800 relative"
                  >
                    <FaShoppingCart />
                    <span>Cart</span>
                    {getCartItemCount() > 0 && (
                      <span className="absolute left-8 top-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {getCartItemCount()}
                      </span>
                    )}
                  </Link>
                  <Link
                    to="/profile"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-gray-300 hover:text-primary-400 transition-colors flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-gray-800"
                  >
                    <FaUser />
                    <span>{user?.name || user?.username}</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="text-gray-300 hover:text-red-400 transition-colors flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-gray-800 text-left"
                  >
                    <FaSignOutAlt />
                    <span>Logout</span>
                  </button>
                </>
              )}
              {!isAuthenticated && (
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors text-center font-semibold"
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
