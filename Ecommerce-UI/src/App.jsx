 
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import FeaturedProduct from './components/FeaturedProduct';

// import ProductsPage from './pages/ProductsPage';
// import Cart from './pages/Cart';
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
        {/* <Route path="/cart" element={Cart}/> */}
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/register" element={<RegisterPage/>}/> 
      </Routes>
      <Footer />
    </div>
   </Router>
  );
}

export default App;