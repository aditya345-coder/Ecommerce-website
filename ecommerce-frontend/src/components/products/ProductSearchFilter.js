import React, { useState, useEffect } from 'react';
import { getCategories } from '../../api/productService';

const ProductSearchFilter = ({ onSearch, onFilterChange, loading }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [categories, setCategories] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Error loading categories:', error);
        setCategories([]);
      }
    };
    loadCategories();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch({
      search: searchTerm,
      category: selectedCategory,
      minPrice: minPrice,
      maxPrice: maxPrice,
      sortBy: sortBy,
      sortOrder: sortOrder
    });
  };

  const handleFilterChange = (filterType, value) => {
    switch (filterType) {
      case 'category':
        setSelectedCategory(value);
        break;
      case 'minPrice':
        setMinPrice(value);
        break;
      case 'maxPrice':
        setMaxPrice(value);
        break;
      case 'sortBy':
        setSortBy(value);
        break;
      case 'sortOrder':
        setSortOrder(value);
        break;
      default:
        break;
    }
    
    // Trigger search with updated filters
    onSearch({
      search: searchTerm,
      category: filterType === 'category' ? value : selectedCategory,
      minPrice: filterType === 'minPrice' ? value : minPrice,
      maxPrice: filterType === 'maxPrice' ? value : maxPrice,
      sortBy: filterType === 'sortBy' ? value : sortBy,
      sortOrder: filterType === 'sortOrder' ? value : sortOrder
    });
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
    setMinPrice('');
    setMaxPrice('');
    setSortBy('name');
    setSortOrder('asc');
    onSearch({
      search: '',
      category: '',
      minPrice: '',
      maxPrice: '',
      sortBy: 'name',
      sortOrder: 'asc'
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      {/* Search Bar */}
      <form onSubmit={handleSearch} className="mb-4">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
        </div>
      </form>

      {/* Filter Toggle */}
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="text-blue-600 hover:text-blue-800 font-medium"
        >
          {showFilters ? 'Hide Filters' : 'Show Filters'}
        </button>
        <button
          onClick={clearFilters}
          className="text-gray-600 hover:text-gray-800 text-sm"
        >
          Clear All Filters
        </button>
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-md">
          {/* Category Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => handleFilterChange('category', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          {/* Price Range */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Min Price
            </label>
            <input
              type="number"
              placeholder="0"
              value={minPrice}
              onChange={(e) => handleFilterChange('minPrice', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Max Price
            </label>
            <input
              type="number"
              placeholder="1000"
              value={maxPrice}
              onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Sort Options */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Sort By
            </label>
            <div className="flex gap-2">
              <select
                value={sortBy}
                onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="name">Name</option>
                <option value="price">Price</option>
                <option value="createdAt">Date Added</option>
              </select>
              <select
                value={sortOrder}
                onChange={(e) => handleFilterChange('sortOrder', e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="asc">Asc</option>
                <option value="desc">Desc</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Active Filters Display */}
      {(searchTerm || selectedCategory || minPrice || maxPrice) && (
        <div className="mt-4 p-3 bg-blue-50 rounded-md">
          <div className="text-sm text-blue-800 font-medium mb-2">Active Filters:</div>
          <div className="flex flex-wrap gap-2">
            {searchTerm && (
              <span className="bg-blue-200 text-blue-800 px-2 py-1 rounded-full text-xs">
                Search: "{searchTerm}"
              </span>
            )}
            {selectedCategory && (
              <span className="bg-blue-200 text-blue-800 px-2 py-1 rounded-full text-xs">
                Category: {categories.find(c => c.id === selectedCategory)?.name || selectedCategory}
              </span>
            )}
            {minPrice && (
              <span className="bg-blue-200 text-blue-800 px-2 py-1 rounded-full text-xs">
                Min: ${minPrice}
              </span>
            )}
            {maxPrice && (
              <span className="bg-blue-200 text-blue-800 px-2 py-1 rounded-full text-xs">
                Max: ${maxPrice}
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductSearchFilter;
