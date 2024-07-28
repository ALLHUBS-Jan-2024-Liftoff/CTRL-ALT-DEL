import axios from 'axios';

export const fetchCartItems = async () => {
  // Replace with your API endpoint
  const response = await axios.get('/api/cart');
  return response.data;
};

export const createPaymentIntent = async (items) => {
  // Replace with your API endpoint
  const response = await axios.post('/create-payment-intent', { items });
  return response.data;
};
