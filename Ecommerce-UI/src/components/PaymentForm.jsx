import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe('pk_test_51PgYz3CD9TYzROTCOsurapFheYpYoil9ZunZ3M5qOcmPwtmDJm5rvCYA7EzIrrbR7G7M4VZbTt5kZogkTdMwG9jV00cAwnjVNd');

const PaymentForm = () => (
    <Elements stripe={stripePromise}>
        <CheckoutForm />
    </Elements>
);

export default PaymentForm;
