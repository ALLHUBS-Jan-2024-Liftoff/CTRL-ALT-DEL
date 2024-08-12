 
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import FeaturedProduct from './components/FeaturedProduct';
import ProductsPage from './pages/ProductsPage';
import ProductList from './components/ProductList';
// import Cart from './pages/Cart';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProductForm from './components/ProductForm';
import CategoryForm from './components/CategoryForm';
import CategoryList from './components/CategoryList';
import Sellers from './components/Sellers';

function App() {

  return (
   <Router>
    <div>
      <Header />
      <Routes>
        <Route path ="/" element={<HomePage />} />
        <Route path="/products" element={<ProductList />}/>
        <Route path="/newProduct" element={<ProductForm />}/>
        <Route path="/allProducts" element={<ProductList />}/>
        <Route path="/sellers" element={<Sellers />}/>
        <Route path="/allCategories" element={<CategoryList />}/>
        <Route path="/newCategory" element={<CategoryForm />}/>
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