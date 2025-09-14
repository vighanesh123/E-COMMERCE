import React from 'react';
import { Link } from 'react-router-dom';

const CategoryFilter = ({ selectedCategory, onCategoryChange, categories = [] }) => {
  // Safety check for categories
  if (!categories || !Array.isArray(categories)) {
    console.warn('CategoryFilter: categories prop is invalid:', categories);
    return (
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3">Categories</h3>
        <p className="text-gray-500 text-sm">Loading categories...</p>
      </div>
    );
  }

  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-3">Categories</h3>
      <div className="flex flex-wrap gap-2">
        <Link
          to="/products"
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            selectedCategory === '' 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          All
        </Link>
        {categories.map((category) => {
          // Get a sample product ID for this category
          const sampleProductId = getSampleProductIdForCategory(category);
          return (
            <Link
              key={category}
              to={`/products/category/${category}`}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {category}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

// This function is no longer needed since we're linking to category pages instead of product details
const getSampleProductIdForCategory = (category) => {
  // Keeping this function for backward compatibility, but it's not used anymore
  return category;
};

export default CategoryFilter;