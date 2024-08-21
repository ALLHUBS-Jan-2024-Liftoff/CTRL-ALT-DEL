import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import Cart from './pages/Cart';
import ChatPage from './pages/ChatPage';
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
import SearchProduct from "./components/SearchProduct";
import ProductDetails from "./components/ProductDetails";
import { CartProvider } from './components/CartProvider';

function App() {
  const [cartItems, setCartItems] = useState([]);

  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('loggedIn') === 'true');

  const handleAddToCart = (product) => {
    const existingItem = cartItems.find(item => item.id === product.id);
    if (existingItem) {
      setCartItems(cartItems.map(item =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  // Function to update the quantity of items in the cart
  const updateCartItemQuantity = (productId, newQuantity) => {
    setCartItems(cartItems.map(item =>
      item.id === productId ? { ...item, quantity: newQuantity } : item
    ));
  };

  // Function to remove an item from the cart
  const removeCartItem = (productId) => {
    setCartItems(cartItems.filter(item => item.id !== productId));
  };

  return (

    <CartProvider>
      <Router>
        <div>
        <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<ProductsPage onAddToCart={handleAddToCart} />} />
            <Route path="/newProduct" element={<ProductForm />} />
            <Route path="/manageProducts" element={<ManageProducts />} />
            <Route path="/updateProduct/:id" element={<ProductUpdateForm />} />
            <Route path="/productDetails/:id" element={<ProductDetails onAddToCart={handleAddToCart} />} />
            <Route path="/sellers" element={<Sellers />} />
            <Route path="/listCategories" element={<CategoryList />} />
            <Route path="/newCategory" element={<CategoryForm />} />
            <Route path="/cart" element={
              <Cart 
                cartItems={cartItems} 
                updateCartItemQuantity={updateCartItemQuantity} 
                removeCartItem={removeCartItem} 
              />
            } />
            <Route path="/search" element={<SearchProduct onAddToCart={handleAddToCart}/>} />
            <Route path="/checkout" element={<CheckoutForm cartItems={cartItems} />} />
            <Route path="/success" element={<SuccessPage />} />
            <Route path="/cancel" element={<CancelPage />} />
            <Route path="/login" element={<LoginPage setIsLoggedIn={setIsLoggedIn} />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/ChatPage" element={<ChatPage />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </CartProvider>

  );
}

export default App;
