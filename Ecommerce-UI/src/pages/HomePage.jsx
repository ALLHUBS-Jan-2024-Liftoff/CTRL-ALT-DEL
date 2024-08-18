import React from "react";
import ContentArea from "../components/ContentArea";
import FeaturedProduct from '../components/FeaturedProduct';
import Sidebar from "../components/Sidebar";
// import ProductList from '../components/ProductList';

const HomePage = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3">
          <Sidebar />
        </div>
        <div className="col-md-9">
          <ContentArea />
        </div>
      </div>
    </div>
  );
};

export default HomePage;