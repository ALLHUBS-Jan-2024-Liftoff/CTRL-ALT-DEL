import React from "react";
import { Link } from "react-router-dom";

const SuccessPage = () => {
  return (
    <div className="success-page">
      <h1>Payment Successful!</h1>
      <p>Thank you for your purchase! A confirmation email has been sent to you.</p>
      <p>If you have any questions, please contact our support.</p>
      <Link to="/" className="btn btn-primary">Continue Shopping</Link>
    </div>
  );
};

export default SuccessPage;
