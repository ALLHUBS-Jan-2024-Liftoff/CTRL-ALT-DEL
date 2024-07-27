import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState(null);
    const [processing, setProcessing] = useState(false);
    const [succeeded, setSucceeded] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setProcessing(true);

        const {error, paymentIntent} = await stripe.confirmCardPayment('client-secret-from-server', {
            payment_method: {
                card: elements.getElement(CardElement)
            }
        });

        if (error) {
            setError(error.message);
            setProcessing(false);
        } else {
            setSucceeded(true);
            setProcessing(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <CardElement />
            <button disabled={processing || succeeded}>
                {processing ? "Processing…" : "Pay"}
            </button>
            {error && <div>{error}</div>}
            {succeeded && <div>Payment succeeded!</div>}
        </form>
    );
};

export default CheckoutForm;
