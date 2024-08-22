import React, {useState} from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import Cart from './pages/Cart';
import CheckoutForm from './components/CheckoutForm';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProductsPage from './pages/ProductsPage';
import ChatPage from './pages/ChatPage';
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
import About from './components/About';
import { CartProvider, useCart } from './components/CartProvider'; 

function App() {
  return (
    <CartProvider>
      <Router>
        <AppContent />
      </Router>
    </CartProvider>
  );
}

function AppContent() {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('loggedIn') === 'true');
  const { addToCart, updateCartItemQuantity, removeCartItem, cartItems } = useCart();

  return (
    <>
      <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/products" element={<ProductsPage onAddToCart={addToCart} />} />
        <Route path="/newProduct" element={<ProductForm />} />
        <Route path="/manageProducts" element={<ManageProducts />} />
        <Route path="/updateProduct/:id" element={<ProductUpdateForm />} />
        <Route path="/productDetails/:id" element={<ProductDetails onAddToCart={addToCart} />} />
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
        <Route path="/search" element={<SearchProduct onAddToCart={addToCart}/>} />
        <Route path="/checkout" element={<CheckoutForm cartItems={cartItems} />} />
        <Route path="/success" element={<SuccessPage />} />
        <Route path="/cancel" element={<CancelPage />} />
        <Route path="/login" element={<LoginPage setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/ChatPage" element={<ChatPage setIsLoggedIn={setIsLoggedIn} />} />
      </Routes>
      <Footer isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
    </>
  );
}

export default App;
