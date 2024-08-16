// import React from 'react';
// import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
// import axios from 'axios';

// const CheckoutForm = () => {
//   const stripe = useStripe();
//   const elements = useElements();

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     if (!stripe || !elements) {
//       // Stripe.js has not yet loaded.
//       return;
//     }

//     const { error, paymentMethod } = await stripe.createPaymentMethod({
//       type: 'card',
//       card: elements.getElement(CardElement),
//     });

//     if (error) {
//       console.error(error);
//     } else {
//       // Send paymentMethod.id to your backend
//       await axios.post('/api/charge', { paymentMethodId: paymentMethod.id });
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <CardElement />
//       <button type="submit" disabled={!stripe}>
//         Pay
//       </button>
//     </form>
//   );
// };

// export default CheckoutForm;

import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";

const stripePromise = loadStripe("pk_test_51PgYz3CD9TYzROTCOsurapFheYpYoil9ZunZ3M5qOcmPwtmDJm5rvCYA7EzIrrbR7G7M4VZbTt5kZogkTdMwG9jV00cAwnjVNd");

const CheckoutForm = () => {
  const handleCheckout = async () => {
    try {
      // Call your backend to create the Stripe Checkout session
      const response = await axios.post("/create-checkout-session");
      const sessionId = response.data;

      // Redirect to Stripe Checkout
      const stripe = await stripePromise;
      await stripe.redirectToCheckout({ sessionId });
    } catch (error) {
      console.error("Error during checkout:", error);
    }
  };

  return (
    <div>
      <button onClick={handleCheckout}>
        Proceed to Checkout
      </button>
    </div>
  );
};

export default CheckoutForm;
