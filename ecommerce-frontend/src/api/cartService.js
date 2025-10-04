import apiClient from './apiClient';

export const getCart = async () => {
  try {
    const response = await apiClient.get('/api/cart');
    // Backend returns ApiResponse<CartViewDto>, so extract the data field
    return response.data.data;
  } catch (error) {
    console.error('Error fetching cart:', error);
    throw error;
  }
};

export const addToCart = async (productId, quantity = 1) => {
  try {
    const response = await apiClient.post('/api/cart/items', {
      productId,
      quantity
    });
    // Backend returns ApiResponse<CartViewDto>, so extract the data field
    return response.data.data;
  } catch (error) {
    console.error('Error adding to cart:', error);
    throw error;
  }
};

export const updateCartItem = async (itemId, quantity) => {
  try {
    const response = await apiClient.put(`/api/cart/items/${itemId}`, {
      quantity
    });
    // Backend returns ApiResponse<CartViewDto>, so extract the data field
    return response.data.data;
  } catch (error) {
    console.error('Error updating cart item:', error);
    throw error;
  }
};

export const removeFromCart = async (itemId) => {
  try {
    const response = await apiClient.delete(`/api/cart/items/${itemId}`);
    // Backend returns ApiResponse<CartViewDto>, so extract the data field
    return response.data.data;
  } catch (error) {
    console.error('Error removing from cart:', error);
    throw error;
  }
};

export const clearCart = async () => {
  try {
    // This would need to be implemented in the backend
    // For now, we'll remove items one by one
    const cart = await getCart();
    if (cart && cart.items) {
      for (const item of cart.items) {
        await removeFromCart(item.id);
      }
    }
    return cart;
  } catch (error) {
    console.error('Error clearing cart:', error);
    throw error;
  }
};
