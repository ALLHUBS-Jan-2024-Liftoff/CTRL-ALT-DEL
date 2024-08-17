// src/pages/Cart.jsx
import React from 'react';
import { loadStripe } from "@stripe/stripe-js";
import axios from 'axios';

// Load Stripe with your public key
const stripePromise = loadStripe("pk_test_51PgYz3CD9TYzROTCOsurapFheYpYoil9ZunZ3M5qOcmPwtmDJm5rvCYA7EzIrrbR7G7M4VZbTt5kZogkTdMwG9jV00cAwnjVNd");

const Cart = ({ cartItems }) => {

    // Calculate the total cost of the cart items
    const totalCost = cartItems.reduce((sum, item) => sum + item.price, 0).toFixed(2);

    const handleCheckout = async () => {
        try {
            // Prepare the request data to send to your backend
            const response = await axios.post("http://localhost:8080/api/create-checkout-session", {
                name: "Cart Purchase",
                amount: totalCost * 100  // Convert total cost to cents
            });

            // Extract the session ID from the backend's response
            const sessionId = response.data.id;

            // Redirect to Stripe's checkout page
            const stripe = await stripePromise;
            const { error } = await stripe.redirectToCheckout({ sessionId });

            if (error) {
                console.error("Stripe checkout error:", error);
            }
        } catch (error) {
            console.error("Error during checkout:", error);
        }
    };

    return (
        <div>
            <h1>Your Cart</h1>
            {cartItems.length === 0 ? (
                <p>Your cart is empty</p>
            ) : (
                <div>
                    <ul>
                        {cartItems.map(item => (
                            <li key={item.id}>
                                {item.name} - ${item.price.toFixed(2)}
                            </li>
                        ))}
                    </ul>
                    <h3>Total: ${totalCost}</h3>
                    <button onClick={handleCheckout} className="btn btn-primary">
                        Proceed to Checkout
                    </button>
                </div>
            )}
        </div>
    );
};

export default Cart;


