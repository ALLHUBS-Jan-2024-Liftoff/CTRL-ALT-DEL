import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../components/CartProvider'; 
import './CategoryProductPage.css'; 

const CategoryProductsPage = () => {
  const { categoryId } = useParams();
  const { addToCart } = useCart(); 
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  
  useEffect(() => {
    const fetchProductsByCategory = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/product/category/${categoryId}`);
        setProducts(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProductsByCategory();
  }, [categoryId]);

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>Error loading products: {error}</p>;

  return (
    <div>
      <h1>Products in Category</h1>
      <div className="product-card-container">
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product.id} className="product-card">
              <img src={product.imagePath} alt={product.name} className="product-card-image" />
              <div className="product-card-content">
                <h5 className="product-card-title">{product.name}</h5>
                <p className="product-card-price">${product.price.toFixed(2)}</p>
                <button
                  onClick={() => addToCart(product)}
                  className="btn btn-primary mt-3"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No products found for this category.</p>
        )}
      </div>
    </div>
  );
};

export default CategoryProductsPage;
