import apiClient from './apiClient';

export const initiatePayment = async (paymentData) => {
  try {
    console.log('DEBUG: PaymentService - Initiating payment for orderId:', paymentData.orderId);
    // Backend expects orderId as query parameter, not in request body
    const response = await apiClient.post(`/api/payments/initiate?orderId=${paymentData.orderId}`, paymentData);
    console.log('DEBUG: PaymentService - Response received:', response.data);
    // Backend returns ApiResponse<String>, so extract the data field
    return response.data.data;
  } catch (error) {
    console.error('DEBUG: PaymentService - Error initiating payment:', error);
    console.error('DEBUG: PaymentService - Error response:', error.response?.data);
    throw error;
  }
};

export const processPayment = async (paymentId, paymentData) => {
  try {
    const response = await apiClient.post(`/api/payments/${paymentId}/process`, paymentData);
    return response.data;
  } catch (error) {
    console.error('Error processing payment:', error);
    throw error;
  }
};

export const getPaymentStatus = async (paymentId) => {
  try {
    const response = await apiClient.get(`/api/payments/${paymentId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching payment status:', error);
    throw error;
  }
};
