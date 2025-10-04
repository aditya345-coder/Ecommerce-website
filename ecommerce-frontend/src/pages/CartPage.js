import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { formatProductPrice, formatTotalPrice } from '../utils/currency';

const CartPage = () => {
  const { cart, loading, error, updateItemQuantity, removeItemFromCart, getCartTotal } = useCart();
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Please login to view your cart</h3>
              <p className="text-gray-600 mb-6">You need to be logged in to add items to your cart.</p>
              <Link to="/login" className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700">
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-center py-12">
              <div className="text-lg text-gray-600">Loading cart...</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-center py-12">
              <div className="text-red-600 text-lg mb-4">Error: {error}</div>
              <div className="text-gray-600 text-sm">
                Make sure the backend server is running on http://localhost:8080
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!cart || !cart.items || cart.items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Your cart is empty</h3>
              <p className="text-gray-600 mb-6">Add some products to get started!</p>
              <Link to="/" className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700">
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const handleQuantityChange = async (itemId, newQuantity) => {
    if (newQuantity <= 0) {
      await removeItemFromCart(itemId);
    } else {
      await updateItemQuantity(itemId, newQuantity);
    }
  };

  const handleRemoveItem = async (itemId) => {
    await removeItemFromCart(itemId);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>
        
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Cart Items</h2>
          </div>
          
          <div className="divide-y divide-gray-200">
            {cart.items.map((item) => (
              <div key={item.id} className="px-6 py-4 flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <img
                    src={item.product?.imageUrl || 'https://via.placeholder.com/100x100?text=No+Image'}
                    alt={item.product?.name || 'Product'}
                    className="h-20 w-20 object-cover rounded-md"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/100x100?text=No+Image';
                    }}
                  />
                </div>
                
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-medium text-gray-900 truncate">
                    {item.product?.name || 'Unknown Product'}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {formatProductPrice(item.unitPrice)} each
                  </p>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                    className="bg-gray-200 text-gray-600 px-2 py-1 rounded-md hover:bg-gray-300"
                  >
                    -
                  </button>
                  <span className="px-3 py-1 bg-gray-100 rounded-md min-w-[3rem] text-center">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                    className="bg-gray-200 text-gray-600 px-2 py-1 rounded-md hover:bg-gray-300"
                  >
                    +
                  </button>
                </div>
                
                <div className="text-lg font-medium text-gray-900">
                  {formatTotalPrice((item.unitPrice || 0) * item.quantity)}
                </div>
                
                <button
                  onClick={() => handleRemoveItem(item.id)}
                  className="text-red-600 hover:text-red-800 px-2 py-1"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
            <div className="flex justify-between items-center">
              <div className="text-lg font-medium text-gray-900">
                Total: {formatTotalPrice(getCartTotal())}
              </div>
              <div className="space-x-4">
                <Link to="/" className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300">
                  Continue Shopping
                </Link>
                <Link to="/checkout" className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700">
                  Proceed to Checkout
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
