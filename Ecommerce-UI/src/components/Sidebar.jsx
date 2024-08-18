import React from 'react';

const Sidebar = () => {
  const categories = [
    { id: 2, name: 'Handmade Jewelry' },
    { id: 3, name: 'Home Decor' },
    { id: 4, name: 'Organic Skincare' },
    { id: 5, name: 'Artisanal Food & Beverages' }
  ];

  return (
    <div className="list-group">
      {categories.map((category) => (
        <a href="#" className="list-group-item list-group-item-action" key={category.id}>
          {category.name}
        </a>
      ))}
    </div>
  );
};

export default Sidebar;
