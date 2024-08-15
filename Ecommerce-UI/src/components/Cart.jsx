import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Cart = () => {
  const [products, setProducts] = useState([]);

  // Fetch products from the server when the component is mounted
  useEffect(() => {
    axios.get('/api/product')
      .then(response => {
        setProducts(response.data); // Store the products in state
      })
      .catch(error => {
        console.error('There was an error fetching the products!', error);
      });
  }, []);

  // Function to handle adding a product to the cart
  const addToCart = (product) => {
    console.log('Adding product to cart:', product);
    // Logic to add product to cart goes here
  };

  return (
    <div>
      <h1>Products</h1>
      <ul>
        {products.map(product => (
          <li key={product.id}>
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p>${product.price}</p>
            <button onClick={() => addToCart(product)}>Add to Cart</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Cart;
