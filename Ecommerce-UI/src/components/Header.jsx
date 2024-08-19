import React, { useState, useEffect } from 'react';
import '../App.css';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../services/axiosService';

const Header = ({isLoggedIn, setIsLoggedIn}) => {

  const [searchTerm, setSearchTerm] = useState('');
  const [userBadge, setUserBadge] = useState(null);
 // const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('loggedIn') === 'true');

  const navigate = useNavigate();

  // Fetch user badge info after login
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
      setUserBadge(null);  // Clear the badge info when logged out
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

  return (
    <header className="header">
      <div className="logo">Easy ECommerce</div>
      <div className="search-container">
        <form onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>
      </div>

      <nav className="navigation">
        <ul className="nav-list">
        {isLoggedIn && userBadge && (
        <div className="user-badge">
          <div className="initials">{userBadge.initials}</div>
          {userBadge.seller && <span className="verified-check">✔️</span>}
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
          <li><Link to="/cart">Cart</Link></li>
        </ul>
      </nav>

    
    </header>
  );
};

export default Header;


