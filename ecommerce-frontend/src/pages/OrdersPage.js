import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getOrders } from '../api/orderService';

const OrdersPage = () => {
  const { isAuthenticated } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [statusFilter, setStatusFilter] = useState('');

  useEffect(() => {
    if (isAuthenticated) {
      fetchOrders();
    }
  }, [isAuthenticated, statusFilter]);

  const fetchOrders = async () => {
    setLoading(true);
    setError(null);
    
    console.log('DEBUG: Fetching orders with filter:', statusFilter);
    try {
      const params = statusFilter ? { status: statusFilter } : {};
      const data = await getOrders(params);
      console.log('DEBUG: Orders data received:', data);
      console.log('DEBUG: Is array?', Array.isArray(data));
      console.log('DEBUG: Data length:', data?.length);
      setOrders(Array.isArray(data) ? data : []);
      console.log('DEBUG: Orders state set to:', Array.isArray(data) ? data.length : 0, 'orders');
    } catch (err) {
      console.error('DEBUG: Error fetching orders:', err);
      console.error('DEBUG: Error response:', err.response?.data);
      setError('Failed to load orders');
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'paid':
        return 'bg-green-100 text-green-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'shipped':
        return 'bg-purple-100 text-purple-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const parseAddress = (addressString) => {
    if (!addressString) return null;
    try {
      if (typeof addressString === 'string') {
        return JSON.parse(addressString);
      }
      return addressString;
    } catch (e) {
      console.error('Failed to parse address:', e);
      return null;
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Order History</h1>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Please login to view your orders</h3>
              <p className="text-gray-600 mb-6">You need to be logged in to view your order history.</p>
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
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Order History</h1>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-center py-12">
              <div className="text-lg text-gray-600">Loading orders...</div>
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
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Order History</h1>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-center py-12">
              <div className="text-red-600 text-lg mb-4">Error: {error}</div>
              <button
                onClick={fetchOrders}
                className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  console.log('DEBUG: Rendering OrdersPage with', orders.length, 'orders');

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Order History</h1>
          <div className="flex items-center space-x-4">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Orders</option>
              <option value="pending">Pending</option>
              <option value="paid">Paid</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        {orders.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No orders found</h3>
              <p className="text-gray-600 mb-6">
                {statusFilter 
                  ? `No orders with status "${statusFilter}" found.`
                  : 'You haven\'t placed any orders yet.'}
              </p>
              <Link to="/" className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700">
                Start Shopping
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        Order #{order.id}
                      </h3>
                      <p className="text-sm text-gray-600">
                        Placed on {formatDate(order.createdAt)}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                      <p className="text-lg font-semibold text-gray-900 mt-1">
                        ${order.totalAmount?.toFixed(2) || '0.00'}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="px-6 py-4">
                  <div className="space-y-3">
                    {order.items?.map((item, index) => (
                      <div key={index} className="flex items-center space-x-4">
                        <div className="flex-shrink-0">
                          {item.product?.imageUrl ? (
                            <img 
                              src={item.product.imageUrl} 
                              alt={item.product.name || 'Product'} 
                              className="h-12 w-12 object-cover rounded-md"
                            />
                          ) : (
                            <div className="h-12 w-12 bg-gray-200 rounded-md flex items-center justify-center">
                              <span className="text-gray-400 text-xs">IMG</span>
                            </div>
                          )}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">
                            {item.product?.name || 'Unknown Product'}
                          </h4>
                          <p className="text-sm text-gray-600">
                            Quantity: {item.quantity} × ${item.unitPrice?.toFixed(2) || '0.00'}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-gray-900">
                            ${((item.unitPrice || 0) * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between items-start">
                    <div className="text-sm text-gray-600">
                      <p className="mb-2"><span className="font-medium">Payment Method:</span> {order.paymentMethod || 'N/A'}</p>
                      {(() => {
                        const address = parseAddress(order.shippingAddress);
                        if (address) {
                          return (
                            <div>
                              <p className="font-medium mb-1">Shipping Address:</p>
                              <div className="ml-4 space-y-0.5">
                                <p>Street: {address.street}</p>
                                <p>City: {address.city}</p>
                                <p>State: {address.state}</p>
                                <p>Zip Code: {address.zipCode}</p>
                                {address.country && <p>Country: {address.country}</p>}
                              </div>
                            </div>
                          );
                        }
                        return null;
                      })()}
                    </div>
                    <div className="flex space-x-2">
                      <Link
                        to={`/orders/${order.id}`}
                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 text-sm"
                      >
                        View Details
                      </Link>
                      {(order.status === 'pending' || order.status === 'PENDING') && (
                        <button className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 text-sm">
                          Cancel Order
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersPage;