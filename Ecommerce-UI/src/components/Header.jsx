// import React from 'react';
// import '../App.css';
// import { Link } from 'react-router-dom';
// import axiosInstance from '../services/axiosService';
// import { useNavigate } from 'react-router-dom';
// import { useState, useEffect } from 'react';

// const Header = () => {
//   const [searchTerm, setSearchTerm] = useState('');

//   const navigate = useNavigate();
//   const handleLogout = async () => {
//     try {
//         await axiosInstance.post('/logout');
//         localStorage.setItem('loggedIn', false);
//         navigate('/login');
//     } catch (error) {
//         console.error("Logout failed", error);
//     }
// };

// const handleSearch = (e) => {
//   e.preventDefault();
//   if (searchTerm.trim()) {
//       navigate(`/search?name=${searchTerm}`);
//   }
// };

//   return (
//     <header className="header">
//       <div className="container-fluid">
//         <div className="d-flex justify-content-between align-items-center">
//       <Link to="/" className="logo">Easy ECommerce</Link>
//       <div className="search-container">
//         {/* <input type="text" className="search-bar" placeholder="Start typing to search" /> */}
//                 <form onSubmit={handleSearch}>
//                     <input
//                         type="text"
//                         className="search-bar"
//                         placeholder="Search products..."
//                         value={searchTerm}
//                         onChange={(e) => setSearchTerm(e.target.value)}
//                     />
//                     <button type="submit" className="search-button">Search</button>
//                 </form>
//             </div>
        
//         <nav className="navigation">
//         <ul className="nav-list">
//           <li><Link to ="/products">Shop</Link></li>
//           <li><Link to ="/sellers">Sellers</Link></li>
//           <li><Link to ="/about">About</Link></li>
//           <li>{localStorage.getItem('loggedIn') === 'true' ? (
//               <Link onClick={handleLogout}>Logout</Link>
//                  ) : (<Link to="/login">Login</Link>)}
//           </li>
//           <li><Link to ="/cart">Cart</Link></li>
//         </ul>
//       </nav>
//       </div>
//       </div>
//     </header>
//   );
// };

// export default Header;
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../services/axiosService';
import { useCart } from '../components/CartProvider'; // Assuming you have a CartProvider
import './Header.css'

const Header = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const { cartItems } = useCart();

  // Calculate the total number of items in the cart
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

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
              <li><Link to="/products">Shop</Link></li>
              <li><Link to="/sellers">Sellers</Link></li>
              <li><Link to="/about">About</Link></li>
              <li>
                {localStorage.getItem('loggedIn') === 'true' ? (
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
                  {totalItems > 0 && (
                    <span className="header-cart-count">{totalItems}</span>
                  )}
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
