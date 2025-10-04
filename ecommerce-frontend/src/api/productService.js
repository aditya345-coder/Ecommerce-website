import apiClient from './apiClient';

// Get all products with pagination support
export const getProducts = async (page = 0, size = 12, sort = 'id', direction = 'asc') => {
  try {
    const response = await apiClient.get(`/api/products?page=${page}&size=${size}&sort=${sort}&direction=${direction}`);
    
    // Backend returns: { success: true, message: "Success", data: { content: [...], pageable: {...}, totalElements: 16 } }
    // Extract the products array from the nested structure
    if (response.data && response.data.success && response.data.data) {
      return {
        products: response.data.data.content || [],
        totalElements: response.data.data.totalElements || 0,
        totalPages: response.data.data.totalPages || 0,
        currentPage: response.data.data.number || 0,
        pageSize: response.data.data.size || 12
      };
    }
    
    // Fallback for unexpected response format
    return {
      products: response.data || [],
      totalElements: 0,
      totalPages: 0,
      currentPage: 0,
      pageSize: 12
    };
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

// Get products by category with pagination support
export const getProductsByCategory = async (categoryId, page = 0, size = 12, sort = 'id', direction = 'asc') => {
  try {
    const response = await apiClient.get(`/api/products/category/${categoryId}?page=${page}&size=${size}&sort=${sort}&direction=${direction}`);
    
    // Handle the same paginated response format
    if (response.data && response.data.success && response.data.data) {
      return {
        products: response.data.data.content || [],
        totalElements: response.data.data.totalElements || 0,
        totalPages: response.data.data.totalPages || 0,
        currentPage: response.data.data.number || 0,
        pageSize: response.data.data.size || 12
      };
    }
    
    return {
      products: response.data || [],
      totalElements: 0,
      totalPages: 0,
      currentPage: 0,
      pageSize: 12
    };
  } catch (error) {
    console.error('Error fetching products by category:', error);
    throw error;
  }
};

// Get single product by ID
export const getProductById = async (id) => {
  try {
    const response = await apiClient.get(`/api/products/${id}`);
    
    // Backend returns: { success: true, message: "Success", data: {...} }
    if (response.data && response.data.success && response.data.data) {
      return response.data.data;
    }
    
    return response.data;
  } catch (error) {
    console.error('Error fetching product:', error);
    throw error;
  }
};

// Search products
export const searchProducts = async (query, page = 0, size = 12, sort = 'id', direction = 'asc') => {
  try {
    const response = await apiClient.get(`/api/products/search?q=${encodeURIComponent(query)}&page=${page}&size=${size}&sort=${sort}&direction=${direction}`);
    
    // Handle the same paginated response format
    if (response.data && response.data.success && response.data.data) {
      return {
        products: response.data.data.content || [],
        totalElements: response.data.data.totalElements || 0,
        totalPages: response.data.data.totalPages || 0,
        currentPage: response.data.data.number || 0,
        pageSize: response.data.data.size || 12
      };
    }
    
    return {
      products: response.data || [],
      totalElements: 0,
      totalPages: 0,
      currentPage: 0,
      pageSize: 12
    };
  } catch (error) {
    console.error('Error searching products:', error);
    throw error;
  }
};

// Get categories
export const getCategories = async () => {
  try {
    const response = await apiClient.get('/api/categories');
    
    // Handle the same response format
    if (response.data && response.data.success && response.data.data) {
      return response.data.data;
    }
    
    return response.data || [];
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};

// Alias for getProductById (for backward compatibility)
export const getProduct = getProductById;