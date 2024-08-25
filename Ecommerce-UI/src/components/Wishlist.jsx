import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Wishlist () {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() =>  {
    axios.get('/wishlist')
      .then(response =>  {
        setWishlist(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the wishlist!', error);
      });
  }, []);

  return (
    <div className="wishlist-page">
      <h2>Your Wishlist</h2>
      <div className="wishlist-products">
        {wishlist.length > 0 ? (
          wishlist.map((item) => (
            <div key={item.id} className="wishlist-item">
              <img src={item.product.imagePath} alt={item.product.name} />
              <h3>{item.product.name}</h3>
              <p>{item.product.price}</p>
              </div>
          ))
        ) : (
          <p>Your wishlist is empty. Shop now!</p>
        )}
    </div>
    </div>
  );
}

export default Wishlist;