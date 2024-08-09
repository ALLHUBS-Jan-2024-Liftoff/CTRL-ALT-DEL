// // import React from "react";

// // const Cart = () => {
// //   return (
// //     <div>
// //       <h1>Your Cart</h1>
// //       <p>Items in your cart will go here.</p>
// //     </div>
// //   );
// // };

// // export default Cart;

// // Cart.js
// import React from 'react';
// import { useCart } from '../context/CartContext.jsx';

// const Cart = () => {
//   const { cartItems, removeFromCart } = useCart();

//   return (
//     <div>
//       <h2>Your Cart</h2>
//       {cartItems.length === 0 ? (
//         <p>Your cart is empty.</p>
//       ) : (
//         <ul>
//           {cartItems.map((item) => (
//             <li key={item.id}>
//               <img src={item.image} alt={item.name} style={{ height: 100, width: 100 }} />
//               <div>
//                 <h3>{item.name}</h3>
//                 <p>${item.price.toFixed(2)}</p>
//                 <button onClick={() => removeFromCart(item.id)}>Remove</button>
//               </div>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default Cart;

// src/pages/Cart.jsx
// src/pages/Cart.jsx
import React from 'react';
import { useCart } from '../context/CartContext';
import { loadStripe } from '@stripe/stripe-js';
import { useNavigate } from 'react-router-dom';

const stripePromise = loadStripe('pk_test_51PgYz3CD9TYzROTCOsurapFheYpYoil9ZunZ3M5qOcmPwtmDJm5rvCYA7EzIrrbR7G7M4VZbTt5kZogkTdMwG9jV00cAwnjVNd'); // Replace with your Stripe public key

const Cart = () => {
  const { cartItems, removeFromCart } = useCart();
  const navigate = useNavigate();

  const handleCheckout = async () => {
    const response = await fetch('http://localhost:8080/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ cartItems }), // Send cart items to backend
    });

    const sessionId = await response.json();
    const stripe = await stripePromise;
    const { error } = await stripe.redirectToCheckout({ sessionId });
    if (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cartItems.map((item) => (
            <li key={item.id}>
              <img src={item.image} alt={item.name} style={{ height: 100, width: 100 }} />
              <div>
                <h3>{item.name}</h3>
                <p>${item.price.toFixed(2)}</p>
                <button onClick={() => removeFromCart(item.id)}>Remove</button>
              </div>
            </li>
          ))}
        </ul>
      )}
      <button onClick={handleCheckout}>
        Checkout
      </button>
    </div>
  );
};

export default Cart;
