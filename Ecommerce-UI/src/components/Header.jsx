import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../services/axiosService';
import { useCart } from '../components/CartProvider'; 
import '../App.css'; 
import './Header.css'; 

const Header = ({ isLoggedIn, setIsLoggedIn }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [userBadge, setUserBadge] = useState(null);
  const { cartItems } = useCart();
  console.log(cartItems);
  const navigate = useNavigate();

  
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  



  useEffect(() => {
    if (isLoggedIn) {
      const fetchUserBadge = async () => {
        try {
          const response = await axiosInstance.get('/user/badge');
          setUserBadge(response.data);
        } catch (error) {
          console.error("Failed to fetch user badge", error);
        }
      };

      fetchUserBadge();
    }
  }, [isLoggedIn]);

  const handleLogout = async () => {
    try {
      await axiosInstance.post('/logout');
      localStorage.setItem('loggedIn', false);
      setIsLoggedIn(false);
      setUserBadge(null); 
      navigate('/login');
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?name=${searchTerm}`);
    }
  };

  useEffect(() => {
    console.log('Header re-rendered. Cart items:', cartItems);
}, [cartItems]);

  return (
    <header className="header">
      <div className="container-fluid">
        <div className="d-flex justify-content-between align-items-center">

          <Link to="/" className="logo">Easy ECommerce</Link>

          <div className="search-container">
            <form onSubmit={handleSearch}>
              <input
                type="text"
                className="search-bar"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button type="submit" className="search-button">Search</button>
            </form>
          </div>

          <nav className="navigation">
            <ul className="nav-list">
              {isLoggedIn && userBadge && (
                <div className="user-badge">
                  <div className="initials">{userBadge.initials}</div>
                  {userBadge.seller && <span className="verified-check">✔</span>}
                </div>
              )}
              <li><Link to="/products">Shop</Link></li>
              <li><Link to="/sellers">Sellers</Link></li>
              <li><Link to="/about">About</Link></li>
              <li>
                {isLoggedIn ? (
                  <Link onClick={handleLogout}>Logout</Link>
                ) : (
                  <Link to="/login">Login</Link>
                )}
              </li>
              <li>
                <Link to="/cart" className="header-cart-link">
                  <img 
                    src="https://res.cloudinary.com/drorkzpi6/image/upload/f_auto,q_auto/v1/EasyEcommerce/fqwp0ivhz4ymvumxqcix" 
                    alt="Shopping Cart" 
                    className="header-cart-icon"
                  />
                  <span className="header-cart-count">{totalItems}</span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
