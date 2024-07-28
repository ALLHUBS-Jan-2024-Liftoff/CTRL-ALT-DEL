import React from "react";
import Hero from "../components/Hero";
import FeaturedProduct from '../components/FeaturedProduct';
import { Link } from 'react-router-dom';

// import ProductList from '../components/ProductList';

const HomePage = () => {
  return (
    <div>
      <Hero />
      <FeaturedProduct />
      <Link to="/cart">Go to Cart</Link>
      {/* <ProductList /> */}
    </div>
    
  );
};

export default HomePage;