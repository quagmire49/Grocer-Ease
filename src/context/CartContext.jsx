import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);

  // Load cart from localStorage or JSON Server
  useEffect(() => {
    loadCart();
  }, [user]);

  const loadCart = async () => {
    if (user) {
      // Load from JSON Server
      try {
        const response = await axios.get(`http://localhost:3001/carts?userId=${user.id}`);
        if (response.data.length > 0) {
          setCartItems(response.data[0].items || []);
        }
      } catch (error) {
        console.error('Error loading cart:', error);
        // Fallback to localStorage
        const savedCart = localStorage.getItem('grocerease_cart');
        if (savedCart) {
          setCartItems(JSON.parse(savedCart));
        }
      }
    } else {
      // Load from localStorage for guest users
      const savedCart = localStorage.getItem('grocerease_cart');
      if (savedCart) {
        setCartItems(JSON.parse(savedCart));
      }
    }
  };

  const saveCart = async (items) => {
    if (user) {
      // Save to JSON Server
      try {
        const existingCart = await axios.get(`http://localhost:3001/carts?userId=${user.id}`);
        const cartData = {
          userId: user.id,
          items: items,
          updatedAt: new Date().toISOString(),
        };

        if (existingCart.data.length > 0) {
          // Update existing cart
          await axios.put(`http://localhost:3001/carts/${existingCart.data[0].id}`, cartData);
        } else {
          // Create new cart
          await axios.post('http://localhost:3001/carts', cartData);
        }
      } catch (error) {
        console.error('Error saving cart to server:', error);
      }
    }
    // Always save to localStorage as backup
    localStorage.setItem('grocerease_cart', JSON.stringify(items));
  };

  const addToCart = async (product, quantity = 1) => {
    setLoading(true);
    const newItems = [...cartItems];
    const existingItem = newItems.find((item) => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      newItems.push({
        ...product,
        quantity: quantity,
      });
    }

    setCartItems(newItems);
    await saveCart(newItems);
    setLoading(false);
    return newItems;
  };

  const updateQuantity = async (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setLoading(true);
    const newItems = cartItems.map((item) =>
      item.id === productId ? { ...item, quantity } : item
    );
    setCartItems(newItems);
    await saveCart(newItems);
    setLoading(false);
  };

  const removeFromCart = async (productId) => {
    setLoading(true);
    const newItems = cartItems.filter((item) => item.id !== productId);
    setCartItems(newItems);
    await saveCart(newItems);
    setLoading(false);
  };

  const clearCart = async () => {
    setLoading(true);
    setCartItems([]);
    await saveCart([]);
    setLoading(false);
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getCartItemCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };

  const value = {
    cartItems,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    getCartTotal,
    getCartItemCount,
    loading,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

