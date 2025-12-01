import { Link } from 'react-router-dom';
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 border-t border-gray-700 mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent mb-4">
              GrocerEase
            </h3>
            <p className="text-gray-400 mb-4">
              Your trusted online grocery store for fresh produce, daily essentials, and household items. Quality products delivered with care.
            </p>
            <p className="text-gray-500 text-sm">
              Shop fresh, shop smart, shop GrocerEase.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-primary-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-gray-400 hover:text-primary-400 transition-colors">
                  All Products
                </Link>
              </li>
              <li>
                <Link to="/categories" className="text-gray-400 hover:text-primary-400 transition-colors">
                  Browse Categories
                </Link>
              </li>
              <li>
                <Link to="/offers" className="text-gray-400 hover:text-primary-400 transition-colors">
                  Special Offers
                </Link>
              </li>
            </ul>
          </div>

          {/* Account & Support */}
          <div>
            <h4 className="text-white font-semibold text-lg mb-4">Account & Support</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/profile" className="text-gray-400 hover:text-primary-400 transition-colors">
                  My Profile
                </Link>
              </li>
              <li>
                <Link to="/cart" className="text-gray-400 hover:text-primary-400 transition-colors">
                  Shopping Cart
                </Link>
              </li>
              <li>
                <span className="text-gray-400">Order Tracking</span>
              </li>
              <li>
                <span className="text-gray-400">Return Policy</span>
              </li>
              <li>
                <span className="text-gray-400">Help Center</span>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-semibold text-lg mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <FaMapMarkerAlt className="text-primary-400 mt-1 flex-shrink-0" />
                <span className="text-gray-400">
                  123 Grocery Street,<br />
                  Mumbai, Maharashtra 400001,<br />
                  India
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <FaPhone className="text-primary-400 flex-shrink-0" />
                <a href="tel:+911234567890" className="text-gray-400 hover:text-primary-400 transition-colors">
                  +91 123 456 7890
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <FaEnvelope className="text-primary-400 flex-shrink-0" />
                <a href="mailto:support@grocerease.com" className="text-gray-400 hover:text-primary-400 transition-colors">
                  support@grocerease.com
                </a>
              </li>
            </ul>
            <div className="mt-4">
              <p className="text-gray-500 text-sm">
                Customer Service Hours:<br />
                Monday - Saturday: 9 AM - 8 PM<br />
                Sunday: 10 AM - 6 PM
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} GrocerEase. All rights reserved.
            </p>
            <p className="text-gray-500 text-sm">
              Made with ❤️ for fresh grocery shopping
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
