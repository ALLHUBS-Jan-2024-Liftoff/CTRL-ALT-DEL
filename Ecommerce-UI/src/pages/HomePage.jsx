import React from "react";
import Hero from "../components/Hero";
import FeaturedProduct from '../components/FeaturedProduct';
// import ProductList from '../components/ProductList';

const HomePage = () => {
  return (
    <div>
      <Hero />
      <FeaturedProduct />

      {/* <ProductList /> */}
    </div>
  );
};

export default HomePage;