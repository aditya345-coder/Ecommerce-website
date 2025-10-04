import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { getCart, addToCart, updateCartItem, removeFromCart } from '../api/cartService';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { isAuthenticated } = useAuth();

  // Load cart when user is authenticated
  useEffect(() => {
    if (isAuthenticated) {
      loadCart();
    } else {
      setCart(null);
    }
  }, [isAuthenticated]);

  const loadCart = async () => {
    if (!isAuthenticated) return;
    
    setLoading(true);
    setError(null);
    try {
      const cartData = await getCart();
      setCart(cartData);
    } catch (err) {
      console.error('Error loading cart:', err);
      setError('Failed to load cart');
      setCart(null);
    } finally {
      setLoading(false);
    }
  };

  const addItemToCart = async (productId, quantity = 1) => {
    if (!isAuthenticated) {
      setError('Please login to add items to cart');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      await addToCart(productId, quantity);
      await loadCart(); // Reload cart to get updated data
    } catch (err) {
      console.error('Error adding to cart:', err);
      setError('Failed to add item to cart');
    } finally {
      setLoading(false);
    }
  };

  const updateItemQuantity = async (itemId, quantity) => {
    if (!isAuthenticated) return;

    setLoading(true);
    setError(null);
    try {
      await updateCartItem(itemId, quantity);
      await loadCart(); // Reload cart to get updated data
    } catch (err) {
      console.error('Error updating cart item:', err);
      setError('Failed to update item quantity');
    } finally {
      setLoading(false);
    }
  };

  const removeItemFromCart = async (itemId) => {
    if (!isAuthenticated) return;

    setLoading(true);
    setError(null);
    try {
      await removeFromCart(itemId);
      await loadCart(); // Reload cart to get updated data
    } catch (err) {
      console.error('Error removing from cart:', err);
      setError('Failed to remove item from cart');
    } finally {
      setLoading(false);
    }
  };

  const getCartItemCount = () => {
    if (!cart || !cart.items) return 0;
    return cart.items.reduce((total, item) => total + item.quantity, 0);
  };

  const getCartTotal = () => {
    if (!cart || !cart.items) return 0;
    return cart.items.reduce((total, item) => total + (item.unitPrice * item.quantity), 0);
  };

  const value = {
    cart,
    loading,
    error,
    addItemToCart,
    updateItemQuantity,
    removeItemFromCart,
    loadCart,
    getCartItemCount,
    getCartTotal,
    isCartEmpty: !cart || !cart.items || cart.items.length === 0
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
