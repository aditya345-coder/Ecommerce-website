import React, { useState, useEffect } from 'react';
import ProductList from '../components/products/ProductList';

const HomePage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Welcome to Our Shop
        </h1>
        <p className="text-xl text-gray-600">
          Discover amazing products at great prices
        </p>
      </div>
      <ProductList />
    </div>
  );
};

export default HomePage;
