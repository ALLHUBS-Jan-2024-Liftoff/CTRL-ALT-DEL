import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { CartProvider } from './context/CartContext.jsx';
import Header from './components/Header';
import Hero from './components/Hero';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
// import ProductsPage from './pages/ProductsPage';
import Cart from './pages/Cart';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Success from './pages/Success'; 
import Cancel from './pages/Cancel'; 
// import ProductDetails from './pages/ProductDetails'; // Assuming this is a page component
import './App.css';

const stripePromise = loadStripe('pk_test_51PgYz3CD9TYzROTCOsurapFheYpYoil9ZunZ3M5qOcmPwtmDJm5rvCYA7EzIrrbR7G7M4VZbTt5kZogkTdMwG9jV00cAwnjVNd');

import FeaturedProduct from './components/FeaturedProduct';
import ProductsPage from './pages/ProductsPage';
import ProductList from './components/ProductList';
// import Cart from './pages/Cart';

import ProductForm from './components/ProductForm';
import CategoryForm from './components/CategoryForm';
import CategoryList from './components/CategoryList';
import Sellers from './components/Sellers';
import ManageProducts from './components/ManageProducts';
import ProductUpdateForm from './components/ProductUpdateForm';

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);

    if (query.get("success")) {
      setMessage("Order placed! You will receive an email confirmation.");
    }

    if (query.get("canceled")) {
      setMessage(
        "Order canceled -- continue to shop around and checkout when you're ready."
      );
    }
  }, []);

  return (
    <CartProvider>
    <Elements stripe={stripePromise}>
      <Router>
        <div>
          <Header />
          <Routes>
        <Route path ="/" element={<HomePage />} />
        <Route path="/products" element={<ProductList />}/>
        <Route path="/newProduct" element={<ProductForm />}/>
        <Route path="/manageProducts" element={<ManageProducts />}/>
        <Route path="/updateProduct/:id" element={<ProductUpdateForm />}/>
        <Route path="/sellers" element={<Sellers />}/>
        <Route path="/listCategories" element={<CategoryList />}/>
        <Route path="/newCategory" element={<CategoryForm />}/>

        {/* <Route path="/cart" element={Cart}/> */}

        {/* <Route path="/product/:id" element={<ProductDetails />} /> */}
        <Route path="/cart" element={<Cart />} /> 

        <Route path="/login" element={<LoginPage/>} />
        <Route path="/register" element={<RegisterPage/>}/> 
      </Routes>
          <Footer />
        </div>

        {/* Render the checkout message or product display
        {message ? <Message message={message} /> : <ProductDisplay />} */}
      </Router>
    </Elements>
    </CartProvider>
  );
}

export default App;

