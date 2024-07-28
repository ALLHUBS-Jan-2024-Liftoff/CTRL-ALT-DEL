import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';


const stripePromise = loadStripe('pk_test_51PgYz3CD9TYzROTCOsurapFheYpYoil9ZunZ3M5qOcmPwtmDJm5rvCYA7EzIrrbR7G7M4VZbTt5kZogkTdMwG9jV00cAwnjVNd');

const StripeProvider = ({ children }) => {
  return <Elements stripe={stripePromise}>{children}</Elements>;
};

export default StripeProvider;