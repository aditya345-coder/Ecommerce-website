import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { formatProductPrice } from '../../utils/currency';

const ProductCard = ({ product, onAddToCart }) => {
  const [adding, setAdding] = useState(false);
  const { addItemToCart } = useCart();
  const { isAuthenticated } = useAuth();

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      alert('Please login to add items to cart');
      return;
    }

    setAdding(true);
    try {
      await addItemToCart(product.id, 1);
      // Call the callback to show success message
      if (onAddToCart) {
        onAddToCart(product.name);
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Failed to add item to cart');
    } finally {
      setAdding(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="h-48 bg-gray-200 flex items-center justify-center">
        {product.imageUrl ? (
          <img 
            src={product.imageUrl} 
            alt={product.name}
            className="h-full w-full object-cover"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/300x200?text=No+Image';
            }}
          />
        ) : (
          <div className="text-gray-400">No Image</div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg text-gray-900 mb-2">
          {product.name}
        </h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {product.description}
        </p>
        <div className="flex justify-between items-center">
          <span className="text-xl font-bold text-blue-600">
            {formatProductPrice(product.price)}
          </span>
          <div className="flex space-x-2">
            <Link
              to={`/products/${product.id}`}
              className="bg-gray-200 text-gray-800 px-3 py-1 rounded-md text-sm hover:bg-gray-300 transition-colors"
            >
              View
            </Link>
            <button 
              onClick={handleAddToCart}
              disabled={adding}
              className="bg-blue-600 text-white px-3 py-1 rounded-md text-sm hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {adding ? 'Adding...' : 'Add to Cart'}
            </button>
          </div>
        </div>
        {product.stock !== undefined && (
          <div className="mt-2 text-sm text-gray-500">
            Stock: {product.stock}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
