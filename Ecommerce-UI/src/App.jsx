import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import Cart from './pages/Cart';
import CheckoutForm from './components/CheckoutForm';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProductsPage from './pages/ProductsPage';
import ProductForm from './components/ProductForm';
import CategoryForm from './components/CategoryForm';
import CategoryList from './components/CategoryList';
import Sellers from './components/Sellers';
import ManageProducts from "./components/ManageProducts";
import ProductUpdateForm from "./components/ProductUpdateForm";
import SuccessPage from './pages/SuccessPage';
import CancelPage from './pages/CancelPage';

function App() {
  const [cartItems, setCartItems] = useState([]);

  const handleAddToCart = (product) => {
    setCartItems((prevCart) => [...prevCart, product]);
  };

  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage onAddToCart={handleAddToCart} />} />
          <Route path="/newProduct" element={<ProductForm />} />
          <Route path="/manageProducts" element={<ManageProducts />} />
          <Route path="/updateProduct/:id" element={<ProductUpdateForm />} />
          <Route path="/sellers" element={<Sellers />} />
          <Route path="/listCategories" element={<CategoryList />} />
          <Route path="/newCategory" element={<CategoryForm />} />
          <Route path="/cart" element={<Cart cartItems={cartItems} />} />
          <Route path="/checkout" element={<CheckoutForm cartItems={cartItems} />} />
          <Route path="/success" element={<SuccessPage />} />
          <Route path="/cancel" element={<CancelPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
