import React from "react";
import '../App.css';

const ContentArea = () => {
  return (
    <div className="main-content">
      <div className="jumbotron text-center">
        <h2>A Better Local Marketplace</h2>

        <div className="row">
          
        <div className="col-sm-4 mb-4">
          <div className="card">
            <img src="https://via.placeholder.com/150" className="card-img-top" alt="Product" />
            
            <div className="card-body">
              <h5 className="card-title">Product title</h5>
              <p className="card-text">Brief description.</p>
              <a href="#" className="btn btn-primary">Add to Cart</a>
            </div>
          
          </div>
        </div>

        <div className="col-sm-4 mb-4">
          <div className="card">
            <img src="https://via.placeholder.com/150" className="card-img-top" alt="Product" />
            
            <div className="card-body">
              <h5 className="card-title">Product title</h5>
              <p className="card-text">Brief description.</p>
              <a href="#" className="btn btn-primary">Add to Cart</a>
            </div>
          
          </div>
        </div>

        <div className="col-sm-4 mb-4">
          <div className="card">
            <img src="https://via.placeholder.com/150" className="card-img-top" alt="Product" />
            
            <div className="card-body">
              <h5 className="card-title">Product title</h5>
              <p className="card-text">Brief description.</p>
              <a href="#" className="btn btn-primary">Add to Cart</a>
            </div>
          
          </div>
        </div>

        
      </div> 
      </div>
    </div>
  );
};

export default ContentArea;


// <h1>A better local marketplace</h1>
// <p>Your neighborhood market, now digital</p>