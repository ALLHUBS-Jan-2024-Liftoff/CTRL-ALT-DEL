import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useCart } from '../components/CartProvider'; 
import './ContentArea.css'; 

const ContentArea = () => {
  const { addToCart } = useCart(); 
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/product/featured"); 
        setProducts(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>Error loading products: {error}</p>;

  return (
    <div className="content-area">
      <h2>Featured Products</h2>
      <div className="product-grid">
        {products.map((product) => (
          <div key={product.id} className="featured-product-card">
            <div className="image-container">
              <img
                src={product.imagePath}
                alt={product.name}
                className="product-image"
              />
            </div>
            <h3 className="product-name">{product.name}</h3>
            <p className="product-price">${product.price.toFixed(2)}</p>
            <button
              className="add-to-cart-button"
              onClick={() => addToCart(product)} 
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContentArea;
