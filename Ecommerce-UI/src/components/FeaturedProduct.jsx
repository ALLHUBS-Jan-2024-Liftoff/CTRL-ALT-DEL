import React from "react";
import '../App.css';

const FeaturedProduct = () => {
  return (
    <section className="featured-product">
      <h2>Featured Product</h2>
      <div className="product-card gray-square">
        <h3>John Doe's Featured Product</h3>
        <p>$99</p>
        <button>Add to Cart</button>
      </div>
    </section>
  );
};

export default FeaturedProduct