// src/components/Sidebar.jsx

import React from 'react';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();
  const categories = [
    { id: 2, name: 'Handmade Jewelry' },
    { id: 3, name: 'Home Decor' },
    { id: 4, name: 'Organic Skincare' },
    { id: 5, name: 'Artisanal Food & Beverages' },
  ];

  const handleCategoryClick = (categoryId) => {
    navigate(`/category/${categoryId}`); // Navigate to the new route with category ID
  };

  return (
    <div className="list-group">
      {categories.map((category) => (
        <button
          key={category.id}
          className="list-group-item list-group-item-action"
          onClick={() => handleCategoryClick(category.id)}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
};

export default Sidebar;
