import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import ProductSearchFilter from './ProductSearchFilter';
import { getProducts, searchProducts, getProductsByCategory } from '../../api/productService';
import { useToastContext } from '../../context/ToastContext';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useState({});
  const { showSuccess } = useToastContext();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async (params = {}) => {
    setLoading(true);
    setError(null);
    
    try {
      // Extract individual parameters from the params object
      const page = params.page || 0;
      const size = params.size || 12;
      const sort = params.sortBy || 'id';
      const direction = params.sortOrder || 'asc';
      
      let response;
      if (params.search) {
        // Use searchProducts if search term is provided
        response = await searchProducts(params.search, page, size, sort, direction);
      } else if (params.category) {
        // Use getProductsByCategory if category is provided
        response = await getProductsByCategory(params.category, page, size, sort, direction);
      } else {
        // Use regular getProducts
        response = await getProducts(page, size, sort, direction);
      }
      
      // Handle the new response format: { products: [...], totalElements: 16, ... }
      if (response && response.products && Array.isArray(response.products)) {
        setProducts(response.products);
      } else {
        setProducts([]);
        setError('Invalid data format received from server');
      }
    } catch (err) {
      console.error('Error fetching products:', err);
      setError('Unable to connect to server. Please make sure the backend is running.');
      setProducts([]); // Ensure products is always an array
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (params) => {
    setSearchParams(params);
    fetchProducts(params);
  };

  const handleAddToCart = (productName) => {
    showSuccess(`${productName} added to cart successfully!`);
  };

  if (loading && products.length === 0) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="text-lg text-gray-600">Loading products...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-600 text-lg mb-4">Error: {error}</div>
        <div className="text-gray-600 text-sm">
          Make sure the backend server is running on http://localhost:8080
        </div>
      </div>
    );
  }

  // Additional safety check
  if (!Array.isArray(products)) {
    return (
      <div className="text-center py-12">
        <div className="text-red-600 text-lg">Error: Products data is not in expected format</div>
      </div>
    );
  }

  return (
    <div>
      <ProductSearchFilter onSearch={handleSearch} loading={loading} />
      
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          {searchParams.search ? `Search Results for "${searchParams.search}"` : 'Our Products'}
        </h2>
        <div className="text-gray-600">
          {products.length} product{products.length !== 1 ? 's' : ''} found
        </div>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
          <p className="text-gray-600 mb-6">
            {searchParams.search || searchParams.category || searchParams.minPrice || searchParams.maxPrice
              ? 'Try adjusting your search criteria or filters.'
              : 'No products are available at the moment.'}
          </p>
          {(searchParams.search || searchParams.category || searchParams.minPrice || searchParams.maxPrice) && (
            <button
              onClick={() => handleSearch({})}
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
            >
              Clear Search & Filters
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map(product => (
            <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;
