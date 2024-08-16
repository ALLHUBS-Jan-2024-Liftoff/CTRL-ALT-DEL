import React from "react";
import { Link } from "react-router-dom";

const CancelPage = () => {
  return (
    <div className="cancel-page">
      <h1>Payment Canceled</h1>
      <p>Your payment was canceled. You can try checking out again or continue shopping.</p>
      <Link to="/cart" className="btn btn-primary">Return to Cart</Link>
      <Link to="/" className="btn btn-secondary">Continue Shopping</Link>
    </div>
  );
};

export default CancelPage;
