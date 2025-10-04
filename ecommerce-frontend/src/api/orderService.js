import apiClient from './apiClient';

export const createOrder = async (orderData) => {
  try {
    console.log('DEBUG: OrderService - Creating order with data:', orderData);
    const response = await apiClient.post('/api/orders', orderData);
    console.log('DEBUG: OrderService - Response received:', response.data);
    // Backend returns ApiResponse<Order>, so extract the data field
    return response.data.data;
  } catch (error) {
    console.error('DEBUG: OrderService - Error creating order:', error);
    console.error('DEBUG: OrderService - Error response:', error.response?.data);
    throw error;
  }
};

export const getOrders = async (params = {}) => {
  try {
    const queryParams = new URLSearchParams();
    
    if (params.status) queryParams.append('status', params.status);
    if (params.page) queryParams.append('page', params.page);
    if (params.size) queryParams.append('size', params.size);
    if (params.sortBy) queryParams.append('sortBy', params.sortBy);
    if (params.sortOrder) queryParams.append('sortOrder', params.sortOrder);
    
    const queryString = queryParams.toString();
    const url = queryString ? `/api/orders?${queryString}` : '/api/orders';
    
    console.log('DEBUG: OrderService - Fetching orders from:', url);
    const response = await apiClient.get(url);
    console.log('DEBUG: OrderService - Full response:', response);
    console.log('DEBUG: OrderService - response.data:', response.data);
    console.log('DEBUG: OrderService - response.data.data:', response.data.data);
    
    // Backend returns ApiResponse<List<Order>>, so extract the data field
    return response.data.data;
  } catch (error) {
    console.error('DEBUG: OrderService - Error fetching orders:', error);
    console.error('DEBUG: OrderService - Error response:', error.response?.data);
    throw error;
  }
};

export const getOrder = async (orderId) => {
  try {
    const response = await apiClient.get(`/api/orders/${orderId}`);
    // Backend returns ApiResponse<Order>, so extract the data field
    return response.data.data;
  } catch (error) {
    console.error('Error fetching order:', error);
    throw error;
  }
};

export const updateOrderStatus = async (orderId, status) => {
  try {
    const response = await apiClient.put(`/api/orders/${orderId}/status`, { status });
    return response.data;
  } catch (error) {
    console.error('Error updating order status:', error);
    throw error;
  }
};

export const cancelOrder = async (orderId) => {
  try {
    const response = await apiClient.put(`/api/orders/${orderId}/cancel`);
    return response.data;
  } catch (error) {
    console.error('Error cancelling order:', error);
    throw error;
  }
};