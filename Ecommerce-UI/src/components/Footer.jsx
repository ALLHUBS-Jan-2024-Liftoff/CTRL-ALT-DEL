import React from 'react';
import { Link } from 'react-router-dom';

const Footer = ({ isLoggedIn }) => {
  return (

    <footer className="footer">
      {isLoggedIn && (
        <li><Link to="ChatPage">Chat with seller</Link></li>
      )}
      <div className="conatiner-fluiod text-center py-3">
      <p>© 2024 E-commerce App</p>
      </div>
    </footer>
  );
};

export default Footer;
