import React from 'react';

const ProductCard = () => {
  return (
    <div>
      <img scr={product.image} alt={product.name} /> 
      <h3>{product.name}</h3>
      <p>{product.price}</p>
      <button>Add to Cart</button>
    </div>
  );
};

export default ProductCard;