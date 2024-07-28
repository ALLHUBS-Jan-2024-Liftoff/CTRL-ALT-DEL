import React, { useState, useEffect } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import axios from 'axios';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [clientSecret, setClientSecret] = useState('');
  const [loading, setLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    // Fetch cart items from local state or an API
    setCartItems([
      { id: 1, name: 'Item 1', price: 1000, quantity: 1 },
      { id: 2, name: 'Item 2', price: 2000, quantity: 1 },
    ]);
  }, []);

  useEffect(() => {
    // Calculate the total amount for the cart
    const calculateTotalAmount = () => {
      return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    // Create a PaymentIntent as soon as the page loads
    if (cartItems.length > 0) {
      setLoading(true);
      axios.post('/create-payment-intent', {
        amount: calculateTotalAmount(),
      })
      .then(res => {
        setClientSecret(res.data.clientSecret);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error creating PaymentIntent:', error);
        setLoading(false);
      });
    }
  }, [cartItems]);

  const handleCheckout = async () => {
    setLoading(true);
    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: 'Customer Name',
        },
      },
    });

    if (error) {
      console.error('Payment error:', error);
      setLoading(false);
    } else if (paymentIntent && paymentIntent.status === 'succeeded') {
      console.log('Payment successful!');
      // Handle successful payment here
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Your Cart</h2>
      <ul>
        {cartItems.map(item => (
          <li key={item.id}>
            {item.name} - ${(item.price / 100).toFixed(2)} x {item.quantity}
          </li>
        ))}
      </ul>
      <CardElement />
      <button onClick={handleCheckout} disabled={!stripe || !clientSecret || loading}>
        {loading ? 'Processing...' : 'Checkout'}
      </button>
    </div>
  );
};

export default Cart;
