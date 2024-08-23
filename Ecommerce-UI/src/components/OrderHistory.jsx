import React, { useState, useEffect } from 'react';
import './OrderHistory.css'; // You can create a separate CSS file for styling

const OrderHistory = () => {
  const [orderHistory, setOrderHistory] = useState([]);

  useEffect(() => {
    // Fetch order history from local storage when the component mounts
    const savedOrderHistory = JSON.parse(localStorage.getItem('orderHistory')) || [];
    setOrderHistory(savedOrderHistory);
  }, []);

  return (
    <div className="order-history-container">
      <h1 className="order-history-title">Order History</h1>
      {orderHistory.length === 0 ? (
        <p className="order-history-empty">You have no past orders.</p>
      ) : (
        <div className="orders">
          {orderHistory.map((order, index) => (
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
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
