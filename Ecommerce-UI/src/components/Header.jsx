import React from 'react';
import '../App.css';
import { Link } from 'react-router-dom';
import axiosInstance from '../services/axiosService';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Header = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
        await axiosInstance.post('/logout');
        localStorage.setItem('loggedIn', false);
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
        {/* <input type="text" className="search-bar" placeholder="Start typing to search" /> */}
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
          <li><Link to ="/products">Shop</Link></li>
          <li><Link to ="/sellers">Sellers</Link></li>
          <li><Link to ="/about">About</Link></li>
          <li>{localStorage.getItem('loggedIn') === 'true' ? (
              <Link onClick={handleLogout}>Logout</Link>
                 ) : (<Link to="/login">Login</Link>)}
          </li>
          <li><Link to ="/cart">Cart</Link></li>
        </ul>
      </nav>
  
    </header>
  );
};

export default Header;
