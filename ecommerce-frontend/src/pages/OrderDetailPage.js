import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getOrder, cancelOrder } from '../api/orderService';

const OrderDetailPage = () => {
  const { id } = useParams();
  const { isAuthenticated } = useAuth();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cancelling, setCancelling] = useState(false);

  useEffect(() => {
    if (isAuthenticated && id) {
      fetchOrder();
    }
  }, [isAuthenticated, id]);

  const fetchOrder = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await getOrder(id);
      setOrder(data);
    } catch (err) {
      console.error('Error fetching order:', err);
      setError('Order not found or server error');
    } finally {
      setLoading(false);
    }
  };

  const handleCancelOrder = async () => {
    if (!window.confirm('Are you sure you want to cancel this order?')) {
      return;
    }

    setCancelling(true);
    try {
      await cancelOrder(id);
      await fetchOrder(); // Refresh order data
      alert('Order cancelled successfully');
    } catch (err) {
      console.error('Error cancelling order:', err);
      alert('Failed to cancel order');
    } finally {
      setCancelling(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
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

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center py-12">
            <div className="text-red-600 text-lg mb-4">Please login to view order details</div>
            <Link to="/login" className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700">
              Login
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center py-12">
            <div className="text-lg text-gray-600">Loading order details...</div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center py-12">
            <div className="text-red-600 text-lg mb-4">Error: {error || 'Order not found'}</div>
            <Link to="/orders" className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700">
              Back to Orders
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Link to="/" className="hover:text-blue-600">Home</Link>
            <span>/</span>
            <Link to="/orders" className="hover:text-blue-600">Orders</Link>
            <span>/</span>
            <span className="text-gray-900">Order #{order.id}</span>
          </div>
        </nav>

        {/* Order Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Order #{order.id}</h1>
              <p className="text-gray-600 mt-1">
                Placed on {formatDate(order.createdAt)}
              </p>
            </div>
            <div className="text-right">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                {order.status}
              </span>
              <p className="text-2xl font-bold text-gray-900 mt-2">
                ${order.totalAmount?.toFixed(2) || '0.00'}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Order Items */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Order Items</h2>
            <div className="space-y-4">
              {order.items?.map((item, index) => (
                <div key={index} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg">
                  <div className="flex-shrink-0">
                    <div className="h-16 w-16 bg-gray-200 rounded-md flex items-center justify-center">
                      <span className="text-gray-400 text-xs">IMG</span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">
                      {item.product?.name || 'Unknown Product'}
                    </h3>
                    <p className="text-sm text-gray-600">
                      SKU: {item.product?.sku || 'N/A'}
                    </p>
                    <p className="text-sm text-gray-600">
                      Quantity: {item.quantity}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">
                      ${item.unitPrice?.toFixed(2) || '0.00'}
                    </p>
                    <p className="text-sm text-gray-600">
                      Total: ${((item.unitPrice || 0) * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Information */}
          <div className="space-y-6">
            {/* Shipping Address */}
            {order.shippingAddress && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Shipping Address</h2>
                <div className="text-gray-700">
                  <p>{order.shippingAddress.street}</p>
                  <p>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}</p>
                  <p>{order.shippingAddress.country}</p>
                </div>
              </div>
            )}

            {/* Billing Address */}
            {order.billingAddress && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Billing Address</h2>
                <div className="text-gray-700">
                  <p>{order.billingAddress.street}</p>
                  <p>{order.billingAddress.city}, {order.billingAddress.state} {order.billingAddress.zipCode}</p>
                  <p>{order.billingAddress.country}</p>
                </div>
              </div>
            )}

            {/* Payment Information */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Payment Information</h2>
              <div className="space-y-2 text-gray-700">
                <p><span className="font-medium">Payment Method:</span> {order.paymentMethod || 'N/A'}</p>
                <p><span className="font-medium">Payment Status:</span> {order.paymentStatus || 'N/A'}</p>
                {order.paymentDate && (
                  <p><span className="font-medium">Payment Date:</span> {formatDate(order.paymentDate)}</p>
                )}
              </div>
            </div>

            {/* Order Actions */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Order Actions</h2>
              <div className="space-y-3">
                {order.status === 'pending' && (
                  <button
                    onClick={handleCancelOrder}
                    disabled={cancelling}
                    className="w-full bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {cancelling ? 'Cancelling...' : 'Cancel Order'}
                  </button>
                )}
                <Link
                  to="/orders"
                  className="w-full bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300 text-center block"
                >
                  Back to Orders
                </Link>
                <Link
                  to="/"
                  className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 text-center block"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailPage;
