// import React, { useState, useEffect } from "react";
import React, { useCallback, useState, useEffect } from "react";
import {loadStripe} from '@stripe/stripe-js';
import {EmbeddedCheckoutProvider, EmbeddedCheckout} from '@stripe/react-stripe-js';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
// import ProductsPage from './pages/ProductsPage';
import Cart from './pages/Cart';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
// import ProductDetails from './pages/ProductDetails'; // Assuming this is a page component
import './App.css';
import FeaturedProduct from './components/FeaturedProduct';
import ProductsPage from './pages/ProductsPage';
import ProductList from './components/ProductList';
// import Cart from './pages/Cart';
import ProductForm from './components/ProductForm';
import CategoryForm from './components/CategoryForm';
import CategoryList from './components/CategoryList';
import Sellers from './components/Sellers';

const stripePromise = loadStripe("pk_test_51PgYz3CD9TYzROTCOsurapFheYpYoil9ZunZ3M5qOcmPwtmDJm5rvCYA7EzIrrbR7G7M4VZbTt5kZogkTdMwG9jV00cAwnjVNd");

const CheckoutForm = () => {
  const fetchClientSecret = useCallback(() => {
    // Create a Checkout Session
    return fetch("/create-checkout-session", {
      method: "POST",
    })
      .then((res) => res.json())
      .then((data) => data.clientSecret);
  }, []);

  const options = {fetchClientSecret};

  return (
    <div id="checkout">
      <EmbeddedCheckoutProvider
        stripe={stripePromise}
        options={options}
      >
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  )
}

const Return = () => {
  const [status, setStatus] = useState(null);
  const [customerEmail, setCustomerEmail] = useState('');

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const sessionId = urlParams.get('session_id');

    fetch(`/session-status?session_id=${sessionId}`)
      .then((res) => res.json())
      .then((data) => {
        setStatus(data.status);
        setCustomerEmail(data.customer_email);
      });
  }, []);

  if (status === 'open') {
    return (
      <Navigate to="/checkout" />
    )
  }

  if (status === 'complete') {
    return (
      <section id="success">
        <p>
          We appreciate your business! A confirmation email will be sent to {customerEmail}.

          If you have any questions, please email <a href="mailto:orders@example.com">orders@example.com</a>.
        </p>
      </section>
    )
  }

  return null;
}


function App() {

  return (
      <Router>
        <div>
          <Header />
          <Routes>
        <Route path="/checkout" element={<CheckoutForm />} />
        <Route path="/return" element={<Return />} />
        <Route path ="/" element={<HomePage />} />
        <Route path="/products" element={<ProductList />}/>
        <Route path="/newProduct" element={<ProductForm />}/>
        <Route path="/allProducts" element={<ProductList />}/>
        <Route path="/sellers" element={<Sellers />}/>
        <Route path="/allCategories" element={<CategoryList />}/>
        <Route path="/newCategory" element={<CategoryForm />}/>
        {/* <Route path="/product/:id" element={<ProductDetails />} /> */}
        <Route path="/cart" element={<Cart />} /> 
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/register" element={<RegisterPage/>}/> 
      </Routes>
          <Footer />
        </div>


      </Router>
  );
}

export default App;