import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { createCheckoutSession } from '../services/axiosService';
import { useNavigate } from 'react-router-dom';

const CartComponent = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('/api/product')
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the products!', error);
      });
  }, []);

  const addToCart = (product) => {
    setCart(prevCart => [...prevCart, product]);
  };

  const handleCheckout = async () => {
    try {
      const response = await createCheckoutSession(cart);
      const sessionId = response.data.sessionId;

      const stripe = await stripePromise;
      await stripe.redirectToCheckout({ sessionId });
    } catch (error) {
      console.error('Error during checkout:', error);
    }
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
      <button onClick={handleCheckout} disabled={cart.length === 0}>
        Proceed to Checkout
      </button>
    </div>
  );
};

export default CartComponent;