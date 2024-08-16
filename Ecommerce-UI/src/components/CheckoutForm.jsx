import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { createCheckoutSession } from '../services/axiosService';

const stripePromise = loadStripe("pk_test_51PgYz3CD9TYzROTCOsurapFheYpYoil9ZunZ3M5qOcmPwtmDJm5rvCYA7EzIrrbR7G7M4VZbTt5kZogkTdMwG9jV00cAwnjVNd");

const CheckoutForm = ({ cartItems }) => {
  const handleCheckout = async () => {
    try {
      const response = await createCheckoutSession(cartItems);
      const sessionId = response.data.sessionId;

      const stripe = await stripePromise;
      await stripe.redirectToCheckout({ sessionId });
    } catch (error) {
      console.error("Error during checkout:", error);
    }
  };

  return (
    <div>
      <button onClick={handleCheckout} disabled={!cartItems.length}>
        Proceed to Checkout
      </button>
    </div>
  );
};

export default CheckoutForm;
