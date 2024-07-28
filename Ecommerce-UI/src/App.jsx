 
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StripeProvider from './components/StripeProvider';
import Header from './components/Header';
import Hero from './components/Hero';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import FeaturedProduct from './components/FeaturedProduct';

// import ProductsPage from './pages/ProductsPage';
import CartPage from './pages/CartPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

function App() {

  return (
   <Router>
    <div>
      <Header />
      <Routes>
        <Route path ="/" element={<HomePage />} />
        {/* <Route path="/products" element={<ProductList />}/> */}
        {/* <Route path="/product/:id" element={<ProductDetails />} /> */}
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/register" element={<RegisterPage/>}/> 
        <Route path="/cart" element={<CartPage/>}/>
      </Routes>
      <Footer />
    </div>
   </Router>
  );
}

export default App;