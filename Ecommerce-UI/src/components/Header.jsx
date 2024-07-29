import React from 'react';
import '../App.css';
import { Link } from 'react-router-dom';

const Header = () => {

  return (
    <header className="header">
      <div className="logo">Easy ECommerce</div>
      <div className="search-container">
      <input type="text" className="search-bar" placeholder="Start typing to search" />
      </div>
      <nav className="navigation">
        <ul className="nav-list">
          <li><Link to ="/">Shop</Link></li>
          <li><Link to ="/sellers">Sellers</Link></li>
          <li><Link to ="/about">About</Link></li>
          <li><Link to ="/login">Login</Link></li>
        </ul>
      </nav>
      
      </header>
  );
};

export default Header;