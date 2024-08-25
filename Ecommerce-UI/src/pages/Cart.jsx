import React, { useState, useEffect } from 'react';
import { loadStripe } from "@stripe/stripe-js";
import { useCart } from '../components/CartProvider'; // Use the cart context
import axios from 'axios';
import './Cart.css';

const stripePromise = loadStripe("pk_test_51PgYz3CD9TYzROTCOsurapFheYpYoil9ZunZ3M5qOcmPwtmDJm5rvCYA7EzIrrbR7G7M4VZbTt5kZogkTdMwG9jV00cAwnjVNd");

const Cart = () => {
  const { cartItems, addToCart, updateCartItemQuantity, removeCartItem } = useCart(); // Use cart context
  const [pastOrders, setPastOrders] = useState([]);

  const totalCost = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);

  const handleCheckout = async () => {
    try {
      const order = {
        orderDate: new Date().toISOString(),
        items: cartItems,
        total: totalCost,
      };

      // Save the order to local storage
      const orderHistory = JSON.parse(localStorage.getItem('orderHistory')) || [];
      orderHistory.push(order);
      localStorage.setItem('orderHistory', JSON.stringify(orderHistory));

      // Proceed with Stripe checkout
      const response = await axios.post("http://localhost:8080/api/create-checkout-session", {
        name: "Cart Purchase",
        amount: totalCost * 100  // amount in cents
      });

      const sessionId = response.data.id;
      const stripe = await stripePromise;
      const { error } = await stripe.redirectToCheckout({ sessionId });

      if (error) {
        console.error("Stripe checkout error:", error);
      }
    } catch (error) {
      console.error("Error during checkout:", error);
    }
  };

  useEffect(() => {
    const fetchPastOrders = () => {
      const orderHistory = JSON.parse(localStorage.getItem('orderHistory')) || [];
      setPastOrders(orderHistory);
    };

    fetchPastOrders();
  }, []);

  const handleReorder = (orderItems) => {
    // Iterate over each item in the order and add it to the cart
    orderItems.forEach(item => {
      addToCart({
        id: item.id,
        name: item.name,
        price: item.price,
        imagePath: item.imagePath,
        quantity: item.quantity
      });
    });
  };

  const handleDeleteOrderHistory = () => {
    // Clear order history from local storage
    localStorage.removeItem('orderHistory');
    setPastOrders([]); // Clear past orders state
  };

  return (
    <div className="cart-container">
      <h1 className="cart-title">Your Cart</h1>
      {cartItems.length === 0 ? (
        <p className="cart-empty">Your cart is empty</p>
      ) : (
        <div>
          <ul className="cart-items">
            {cartItems.map(item => (
              <li key={item.id} className="cart-item">
                <img
                  src={item.imagePath}
                  alt={item.name}
                  className="cart-item-image"
                />
                <div className="cart-item-details">
                  <p className="cart-item-name">{item.name}</p>
                  <div className="cart-item-quantity">
                    <label htmlFor={`quantity-${item.id}`}>Quantity:</label>
                    <input
                      id={`quantity-${item.id}`}
                      type="number"
                      value={item.quantity}
                      min="1"
                      onChange={(e) => updateCartItemQuantity(item.id, parseInt(e.target.value))}
                    />
                  </div>
                  <p className="cart-item-price">Price: ${item.price.toFixed(2)}</p>
                  <button
                    className="remove-item-button"
                    onClick={() => removeCartItem(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className="cart-summary">
            <h3 className="cart-total">Total: ${totalCost}</h3>
            <button className="cart-checkout-button" onClick={handleCheckout}>
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}

      {/* Display Past Orders */}
      <h2 className="past-orders-title">Past Orders</h2>
      {pastOrders.length > 0 ? (
        <div className="past-orders">
          {pastOrders.map((order, index) => (
            <div key={index} className="order">
              <h3>Order Date: {new Date(order.orderDate).toLocaleDateString()}</h3>
              <p>Total: ${order.total}</p>
              <ul className="order-items">
                {order.items.map((item, idx) => (
                  <li key={idx} className="order-item">
                    <span>{item.name}</span>
                    <span>Quantity: {item.quantity}</span>
                    <span>Price: ${item.price.toFixed(2)}</span>
                  </li>
                ))}
              </ul>
              <button
                className="reorder-button"
                onClick={() => handleReorder(order.items)}
              >
                Reorder
              </button>
            </div>
          ))}
          <button
            className="delete-order-history-button"
            onClick={handleDeleteOrderHistory}
          >
            Delete Order History
          </button>
        </div>
      ) : (
        <p>No past orders found.</p>
      )}
    </div>
  );
};

export default Cart;


