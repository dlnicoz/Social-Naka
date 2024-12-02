import React from 'react';
import  categories  from '../../data/categoriesData';

function CategoryField({ selectedCategory, onCategoryChange, selectedProfession, onProfessionChange }) {
  const currentCategory = categories.find(cat => cat.category === selectedCategory);
  
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="block text-gray-700 text-sm font-medium">
          Category
        </label>
        <select
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="w-full px-4 py-3 bg-gray-100 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
        >
          <option value="">Select a category</option>
          {categories.map((category) => (
            <option key={category.category} value={category.category}>
              {category.category}
            </option>
          ))}
        </select>
      </div>

      {currentCategory && (
        <div className="space-y-2">
          <label className="block text-gray-700 text-sm font-medium">
            Profession
          </label>
          <select
            value={selectedProfession}
            onChange={(e) => onProfessionChange(e.target.value)}
            className="w-full px-4 py-3 bg-gray-100 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          >
            <option value="">Select a profession</option>
            {currentCategory.professions.map((profession) => (
              <option key={profession} value={profession}>
                {profession}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
}

export default CategoryField;